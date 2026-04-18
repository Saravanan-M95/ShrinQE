import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Order, Payment, User } from '../models/index.js';

// Reusable function to sync payment status with Cashfree and update our DB
export const syncPaymentStatus = async (orderId) => {
    try {
        console.log(`[SYNC_START] ${orderId}`);
        const clientId = (process.env.CASHFREE_CLIENT_ID || '').trim();
        const clientSecret = (process.env.CASHFREE_CLIENT_SECRET || '').trim();
        const CASHFREE_BASE_URL = process.env.CASHFREE_ENVIRONMENT === 'PRODUCTION'
            ? 'https://api.cashfree.com/pg'
            : 'https://sandbox.cashfree.com/pg';

        let cfData = null;
        let finalStatus = 'pending';
        let pArray = [];

        // Fetch Primary Data
        const isLink = orderId.startsWith('link_');
        const endpoint = isLink ? `/links/${orderId}` : `/orders/${orderId}`;
        
        const response = await axios.get(`${CASHFREE_BASE_URL}${endpoint}`, {
            headers: { 'x-api-version': '2023-08-01', 'x-client-id': clientId, 'x-client-secret': clientSecret }
        });
        
        cfData = response.data;
        // Links return link_status, orders return order_status
        finalStatus = (cfData.link_status || cfData.order_status || '').toUpperCase();

        try {
            // Payments endpoint is the same suffix for links and orders
            const paymentsResponse = await axios.get(`${CASHFREE_BASE_URL}${endpoint}/payments`, {
                headers: { 'x-api-version': '2023-08-01', 'x-client-id': clientId, 'x-client-secret': clientSecret }
            });
            pArray = paymentsResponse.data || [];
            const successfulPayment = pArray.find(p => p.payment_status === 'SUCCESS');
            if (successfulPayment) finalStatus = 'PAID';
        } catch (err) {
            console.log(`Error fetching payments for ${orderId}: ${err.message}`);
        }

        // Resolve internal Order ID
        const resolveOrder = await Order.findOne({ where: { cashfreeOrderId: orderId } });
        if (!resolveOrder) {
            // Check by aggregatorOrderId fallback
            const resolveOrderFallback = await Order.findOne({ where: { aggregatorOrderId: orderId } });
            if (!resolveOrderFallback) {
                console.warn(`[SYNC_WARN] Could not resolve internal order for ${orderId}. Skipping DB sync.`);
                return { success: false, status: 'unknown' };
            }
        }
        const order = resolveOrder || resolveOrderFallback;

        // Map Unified Status
        const normalizedStatus = finalStatus;
        let auditStatus = normalizedStatus;
        if (['PAID', 'SUCCESS', 'CONFIRMED'].includes(normalizedStatus)) auditStatus = 'PAID';
        else if (['ACTIVE', 'OPEN', 'INITIALIZED', 'PENDING', 'LINK_CREATED'].includes(normalizedStatus)) auditStatus = 'PENDING';
        else if (['FAILED', 'CANCELLED', 'EXPIRED', 'USER_DROPPED', 'NOT_ATTEMPTED', 'VOID', 'TERMINATED', 'DROPPED', 'INCOMPLETE'].includes(normalizedStatus)) auditStatus = 'FAILED';

        // Update Order Table
        if (auditStatus === 'PAID') {
            await order.update({ status: 'confirmed', paymentStatus: 'paid' });
            console.log(`Order #${order.id} confirmed successfully.`);
        } else if (auditStatus === 'FAILED') {
            await order.update({ status: 'payment_failed', paymentStatus: 'failed' });
        } else if (auditStatus === 'PENDING') {
            await order.update({ status: 'pending', paymentStatus: 'pending' });
        }

        // Sync Payments Table
        if (pArray.length > 0) {
            for (const p of pArray) {
                const psRaw = (p.payment_status || '').toUpperCase();
                let pStatus = 'PENDING';
                if (psRaw === 'SUCCESS') pStatus = 'PAID';
                else if (['FAILED', 'CANCELLED', 'USER_DROPPED', 'NOT_ATTEMPTED', 'VOID', 'TERMINATED', 'DROPPED', 'INCOMPLETE'].includes(psRaw)) pStatus = 'FAILED';
                
                const cfPaymentId = p.cf_payment_id || p.transaction_id || null;
                const payMethod = p.payment_method ? (typeof p.payment_method === 'object' ? Object.keys(p.payment_method)[0] : String(p.payment_method)) : 'unknown';

                if (cfPaymentId) {
                    const existingTxn = await Payment.findOne({ where: { transactionId: String(cfPaymentId) } });
                    if (existingTxn) {
                        await existingTxn.update({
                            aggregatorStatus: pStatus,
                            paymentMethod: payMethod,
                            rawResponse: p
                        });
                    } else {
                        await Payment.create({
                            orderId: order.id,
                            aggregatorName: 'cashfree',
                            aggregatorOrderId: orderId,
                            transactionId: String(cfPaymentId),
                            aggregatorStatus: pStatus,
                            paymentMethod: payMethod,
                            rawResponse: p
                        });
                    }
                }
            }
        }

        return { success: true, status: auditStatus };
    } catch (err) {
        console.error(`[SYNC_ERROR] ${orderId}:`, err.response?.data || err.message);
        return { success: false, error: err.message };
    }
};

export const createOrder = async (req, res) => {
    try {
        const { orderAmount, itemType, itemId, returnUrl } = req.body;
        const user = req.user; // Available via auth middleware

        if (!user || !user.id) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }

        const clientId = (process.env.CASHFREE_CLIENT_ID || '').trim();
        const clientSecret = (process.env.CASHFREE_CLIENT_SECRET || '').trim();
        const CASHFREE_BASE_URL = process.env.CASHFREE_ENVIRONMENT === 'PRODUCTION'
            ? 'https://api.cashfree.com/pg'
            : 'https://sandbox.cashfree.com/pg';
            
        // We create the ID early to pass to both the database and the URL
        const cfOrderId = `link_${uuidv4().replace(/-/g, '').substring(0, 20)}`; // Use link_ prefix

        // Provide fallback URLs if missing, statically injecting the CF Link ID
        const finalReturnUrl = returnUrl || `${process.env.FRONTEND_URL}/tools/bg-download?order_id=${cfOrderId}`; 

        // We create our DB Order first
        const newOrder = await Order.create({
            userId: user.id,
            amount: orderAmount,
            status: 'initiated',
            paymentStatus: 'pending',
            cashfreeOrderId: cfOrderId,
            itemType: itemType || 'bg-removal',
            itemId: itemId
        });

        // Add order ID and image ID to the returnURL template manually since we know it locally
        const resolvedReturnUrl = finalReturnUrl.includes('?') 
            ? `${finalReturnUrl}&internal_id=${newOrder.id}&image_id=${itemId}`
            : `${finalReturnUrl}?internal_id=${newOrder.id}&image_id=${itemId}`;

        const requestBody = {
            link_id: cfOrderId,
            link_amount: parseFloat(orderAmount).toFixed(2),
            link_currency: "INR",
            link_purpose: "ShrinQE AI Image Processing",
            customer_details: {
                customer_phone: '9999999999',
                customer_email: (user.email || 'customer@example.com').substring(0, 100),
                customer_name: (user.name || 'User').substring(0, 100)
            },
            link_meta: {
                return_url: resolvedReturnUrl
            }
        };

        const response = await axios.post(
            `${CASHFREE_BASE_URL}/links`,
            requestBody,
            {
                headers: {
                    'x-api-version': '2023-08-01',
                    'x-client-id': clientId,
                    'x-client-secret': clientSecret,
                    'Content-Type': 'application/json'
                }
            }
        );

        const apiOrderId = response.data.link_id;
        
        await newOrder.update({ aggregatorOrderId: apiOrderId });

        res.json({
            success: true,
            internalOrderId: newOrder.id,
            orderId: apiOrderId,
            paymentSessionId: null, // Links don't have standard session SDKs
            paymentLink: response.data.link_url // Safely pass the globally functional URL
        });
    } catch (error) {
        console.error('Cashfree Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: error.response?.data?.message || 'Payment initialization failed',
            details: error.response?.data
        });
    }
};

export const verifyPayment = async (req, res) => {
    const { orderId } = req.params; // This is the Cashfree Order ID
    const result = await syncPaymentStatus(orderId);
    res.json({
        success: result.success,
        orderStatus: result.status,
        paymentStatus: result.status,
        error: result.error
    });
};

export const webhookHandler = async (req, res) => {
    try {
        const payload = req.body;
        const data = payload.data || {};
        let cfOrderId = null;

        if (data.order) {
            cfOrderId = data.order.order_id;
        }

        if (cfOrderId) {
            await syncPaymentStatus(cfOrderId);
        }
        res.status(200).send('OK');
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Webhook process failed');
    }
};

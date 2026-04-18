import express from 'express';
import { createOrder, verifyPayment, webhookHandler } from '../controllers/paymentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Protected route to create order
router.post('/create-order', authenticate, createOrder);

// Verify specific order
router.get('/verify/:orderId', verifyPayment);

// Webhook endpoint (public)
router.post('/webhook', express.json({type: 'application/json'}), webhookHandler);

export default router;

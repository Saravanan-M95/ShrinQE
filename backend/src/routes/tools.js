import express from 'express';
import multer from 'multer';
import { removeBackgroundPro } from '../utils/pro-ai-processor.js';
import { enhanceImage, AVAILABLE_PRESETS } from '../utils/enhance-processor.js';
import { uploadToCloudinary, getCloudinaryBuffer } from '../utils/cloudinary.js';
import sharp from 'sharp';
import { authenticate } from '../middleware/auth.js';
import { Order } from '../models/index.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } }); // 20MB

// POST /api/tools/remove-background
router.post('/remove-background', authenticate, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        console.log(`[DEBUG] Received file: ${req.file.originalname}, Size: ${req.file.size}, Mimetype: ${req.file.mimetype}`);
        
        // Use the Professional API (Remove.bg)
        const outputBuffer = await removeBackgroundPro(req.file.buffer);
        
        // 1. Upload Clean Image to Cloudinary
        const fileName = `bg_removed_${req.user.id}_${Date.now()}`;
        const imageId = await uploadToCloudinary(outputBuffer, fileName);
        
        // 2. Generate Watermarked Image for Preview using Sharp
        const imageMetadata = await sharp(outputBuffer).metadata();
        const width = imageMetadata.width;
        const height = imageMetadata.height;

        // Create an SVG with text to overlay exactly fitting the image
        const svgWatermark = `
            <svg width="${width}" height="${height}">
                <style>
                .title { fill: rgba(255, 255, 255, 0.4); font-size: ${Math.floor(width / 10)}px; font-weight: bold; font-family: Arial; }
                </style>
                <text x="50%" y="50%" text-anchor="middle" class="title" transform="rotate(-45 ${width/2} ${height/2})">SHRINQE PREVIEW</text>
            </svg>
        `;
        
        const watermarkedBuffer = await sharp(outputBuffer)
            .composite([{
                input: Buffer.from(svgWatermark),
                gravity: 'center'
            }])
            .png()
            .toBuffer();
        
        res.json({
            success: true,
            imageId: imageId,
            previewBase64: `data:image/png;base64,${watermarkedBuffer.toString('base64')}`
        });

    } catch (e) {
        console.error("AI BG Removal Error:", e);
        
        if (e.message?.includes('API Key is missing')) {
            return res.status(401).json({ 
                error: 'Professional API Key is missing. Please add REMOVE_BG_API_KEY to your backend .env file.' 
            });
        }
        
        res.status(500).json({ error: 'Professional AI processing failed: ' + e.message });
    }
});

// GET /api/tools/download-bg/:imageId — Using wildcard (*) to support Cloudinary folder slashes
router.get('/download-bg/:imageId(*)', authenticate, async (req, res) => {
    try {
        const { imageId } = req.params;
        const userId = req.user.id;

        // Verify if user has a paid order for this item
        const order = await Order.findOne({
            where: {
                userId: userId,
                itemId: imageId,
                paymentStatus: 'paid',
                itemType: 'bg-removal'
            }
        });

        if (!order && process.env.NODE_ENV !== 'development') { // Allow bypass in dev if needed, or enforce strict
             // Optional: bypass payment check for testing if needed
        }

        if (!order) {
            return res.status(403).json({ error: 'Payment required to download this image' });
        }

        // Fetch from Cloudinary
        const cleanBuffer = await getCloudinaryBuffer(imageId);

        res.set('Content-Type', 'image/png');
        res.set('Content-Disposition', `attachment; filename="shrinqe-no-bg-${imageId}.png"`);
        res.send(cleanBuffer);
    } catch (error) {
        console.error("Download BG Error:", error);
        res.status(500).json({ error: 'Failed to download image: ' + error.message });
    }
});

// GET /api/tools/enhance/presets — List available enhancement presets
router.get('/enhance/presets', (req, res) => {
    res.json({ presets: AVAILABLE_PRESETS });
});

// POST /api/tools/enhance — Enhance a photo using Sharp
router.post('/enhance', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const preset = req.body.preset || 'auto';
        console.log(`[ENHANCE] Received file: ${req.file.originalname}, Size: ${req.file.size}, Preset: ${preset}`);

        const outputBuffer = await enhanceImage(req.file.buffer, preset);

        res.set('Content-Type', 'image/jpeg');
        res.send(outputBuffer);
    } catch (e) {
        console.error("Enhancement Error:", e);
        res.status(500).json({ error: 'Photo enhancement failed: ' + e.message });
    }
});

export default router;


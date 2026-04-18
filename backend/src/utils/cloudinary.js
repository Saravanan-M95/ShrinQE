import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a buffer to Cloudinary
 * @param {Buffer} buffer 
 * @param {string} fileName 
 * @returns {Promise<string>} public_id
 */
export const uploadToCloudinary = async (buffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'shrinqe_premium',
        resource_type: 'image',
        public_id: fileName.split('.')[0], // Cloudinary public_id usually doesn't have extension
      },
      (error, result) => {
        if (error) {
            console.error('[CLOUDINARY] Upload Error:', error);
            return reject(error);
        }
        console.log(`[CLOUDINARY] Uploaded successfully. Public ID: ${result.public_id}`);
        resolve(result.public_id);
      }
    );

    uploadStream.end(buffer);
  });
};

/**
 * Fetches an image buffer from Cloudinary
 * @param {string} publicId 
 * @returns {Promise<Buffer>}
 */
export const getCloudinaryBuffer = async (publicId) => {
  try {
    const url = cloudinary.url(publicId, {
      resource_type: 'image',
      secure: true,
    });
    
    console.log(`[CLOUDINARY] Fetching image from: ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image from Cloudinary (Status: ${response.status})`);
    
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('[CLOUDINARY] Download Error:', error);
    throw error;
  }
};

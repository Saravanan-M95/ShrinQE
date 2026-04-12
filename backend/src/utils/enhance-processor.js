import sharp from 'sharp';

/**
 * ShrinQE Photo Enhancer — Powered by Sharp
 * Provides multiple enhancement presets for fixing bad photos.
 * 100% free, no external API calls.
 */

const PRESETS = {
  // Auto Fix: Balanced enhancement for most photos
  auto: {
    name: 'Auto Fix',
    apply: async (pipeline) => {
      return pipeline
        .normalize()                       // Auto-stretch contrast to full range
        .sharpen({ sigma: 1.5, m1: 1.0, m2: 0.5 }) // Mild sharpening
        .modulate({ brightness: 1.05, saturation: 1.15 }) // Slight brightness + color pop
        .gamma(1.1);                       // Lift shadows slightly
    },
  },

  // Sharpen: For blurry/out-of-focus photos
  sharpen: {
    name: 'Sharpen',
    apply: async (pipeline) => {
      return pipeline
        .sharpen({ sigma: 2.0, m1: 1.5, m2: 0.7 }) // Strong unsharp mask
        .modulate({ brightness: 1.02 });
    },
  },

  // Denoise: For grainy/noisy low-light photos
  denoise: {
    name: 'Denoise',
    apply: async (pipeline) => {
      return pipeline
        .median(3)                          // Median filter removes salt-and-pepper noise
        .sharpen({ sigma: 0.8, m1: 0.5, m2: 0.3 }) // Light resharpening after denoise
        .modulate({ brightness: 1.03 });
    },
  },

  // HDR Effect: For dark/flat photos — dramatic contrast and color
  hdr: {
    name: 'HDR Effect',
    apply: async (pipeline) => {
      return pipeline
        .clahe({ width: 3, height: 3 })    // Adaptive histogram equalization
        .modulate({ brightness: 1.05, saturation: 1.3 }) // Vivid colors
        .sharpen({ sigma: 1.2, m1: 0.8, m2: 0.4 })
        .gamma(1.05);                       // Slightly lift midtones for drama
    },
  },

  // Portrait: Optimized for face/selfie enhancement
  portrait: {
    name: 'Portrait',
    apply: async (pipeline) => {
      return pipeline
        .normalize()
        .sharpen({ sigma: 1.0, m1: 0.8, m2: 0.4 }) // Gentle sharpening
        .modulate({ brightness: 1.06, saturation: 1.1 }) // Warm skin tones
        .gamma(1.15);                       // Lift facial shadows
    },
  },

  // Low Light: Rescue extremely dark photos
  lowlight: {
    name: 'Low Light Fix',
    apply: async (pipeline) => {
      return pipeline
        .normalize()                        // Stretch histogram
        .gamma(1.8)                         // Aggressively brighten
        .modulate({ brightness: 1.2, saturation: 1.1 })
        .sharpen({ sigma: 1.0, m1: 0.6, m2: 0.3 })
        .median(2);                         // Light denoise (low-light photos are noisy)
    },
  },
};

/**
 * Enhance an image using a named preset.
 * @param {Buffer} inputBuffer - The original image buffer.
 * @param {string} presetName - One of: auto, sharpen, denoise, hdr, portrait, lowlight
 * @returns {Promise<Buffer>} - The enhanced image buffer (JPEG).
 */
export async function enhanceImage(inputBuffer, presetName = 'auto') {
  const preset = PRESETS[presetName];
  if (!preset) {
    throw new Error(`Unknown preset: "${presetName}". Available: ${Object.keys(PRESETS).join(', ')}`);
  }

  console.log(`[ENHANCE] Applying preset: ${preset.name}`);

  let pipeline = sharp(inputBuffer);

  // Get metadata for logging
  const metadata = await sharp(inputBuffer).metadata();
  console.log(`[ENHANCE] Input: ${metadata.width}×${metadata.height}, ${metadata.format}`);

  // Apply the chosen preset
  pipeline = await preset.apply(pipeline);

  // Output as high-quality JPEG
  const outputBuffer = await pipeline
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  console.log(`[ENHANCE] Output size: ${(outputBuffer.length / 1024).toFixed(1)}KB`);
  return outputBuffer;
}

export const AVAILABLE_PRESETS = Object.entries(PRESETS).map(([key, val]) => ({
  id: key,
  name: val.name,
}));

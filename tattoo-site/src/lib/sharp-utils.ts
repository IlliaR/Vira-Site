import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);

export function sanitizeFilename(original: string): string {
  const ext = '.webp';
  const name = crypto.randomBytes(12).toString('hex');
  return `${name}${ext}`;
}

export async function ensureUploadsDir() {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

export async function processAndSaveImage(
  buffer: Buffer,
  mimeType: string
): Promise<{ filename: string; width: number; height: number }> {
  if (!ALLOWED_MIME.has(mimeType)) {
    throw new Error('Invalid file type');
  }
  if (buffer.length > MAX_SIZE) {
    throw new Error('File too large (max 10 MB)');
  }

  // Dynamic import — sharp is native and may not be available in edge runtime
  const sharp = (await import('sharp')).default;

  await ensureUploadsDir();

  const filename = sanitizeFilename('upload');
  const outPath = path.join(UPLOADS_DIR, filename);

  const { width, height } = await sharp(buffer)
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(outPath);

  return { filename: `/uploads/${filename}`, width: width ?? 0, height: height ?? 0 };
}

export async function deleteImage(filename: string) {
  if (!filename.startsWith('/uploads/')) return;
  const filePath = path.join(process.cwd(), 'public', filename);
  try {
    await fs.unlink(filePath);
  } catch {
    // File may not exist — silently ignore
  }
}

export function sniffMime(buffer: Buffer): string | null {
  // Check magic bytes
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return 'image/jpeg';
  if (buffer[0] === 0x89 && buffer[1] === 0x50) return 'image/png';
  if (buffer[0] === 0x52 && buffer[1] === 0x49) return 'image/webp'; // RIFF
  if (buffer[0] === 0x47 && buffer[1] === 0x49) return 'image/gif';
  return null;
}

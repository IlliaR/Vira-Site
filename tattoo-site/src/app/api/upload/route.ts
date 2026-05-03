import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/admin-auth';
import { processAndSaveImage, sniffMime } from '@/lib/sharp-utils';
import { imageMetaSchema } from '@/schemas/upload';

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Sniff actual mime — don't trust the declared Content-Type
  const mime = sniffMime(buffer) ?? file.type;

  try {
    const { filename, width, height } = await processAndSaveImage(buffer, mime);

    // Parse metadata fields from FormData
    const rawMeta = {
      altTextEn: formData.get('altTextEn')?.toString() ?? '',
      altTextDe: formData.get('altTextDe')?.toString() ?? '',
      categoryId: formData.get('categoryId')?.toString() || undefined,
      tags: formData.get('tags')?.toString() ?? '',
      featured: formData.get('featured') === 'true',
      order: parseInt(formData.get('order')?.toString() ?? '0', 10),
    };

    const meta = imageMetaSchema.parse(rawMeta);

    const image = await (await import('@/lib/prisma')).prisma.galleryImage.create({
      data: { filename, width, height, ...meta },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 422 });
  }
}

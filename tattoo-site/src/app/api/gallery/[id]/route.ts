import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminSession } from '@/lib/admin-auth';
import { deleteImage } from '@/lib/sharp-utils';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const body = await req.json();
  const image = await prisma.galleryImage.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(image);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const image = await prisma.galleryImage.findUnique({ where: { id: params.id } });
  if (image) await deleteImage(image.filename);

  await prisma.galleryImage.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

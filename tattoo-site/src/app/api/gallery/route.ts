import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminSession } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');

  const images = await prisma.galleryImage.findMany({
    where: {
      ...(category ? { category: { slug: category } } : {}),
      ...(featured === 'true' ? { featured: true } : {}),
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    include: { category: true },
  });

  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const body = await req.json();
  const image = await prisma.galleryImage.create({ data: body });
  return NextResponse.json(image, { status: 201 });
}

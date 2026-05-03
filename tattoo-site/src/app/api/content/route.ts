import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminSession } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');

  const blocks = await prisma.textBlock.findMany({
    where: page ? { page } : undefined,
    orderBy: [{ page: 'asc' }, { key: 'asc' }],
  });
  return NextResponse.json(blocks);
}

export async function PATCH(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const body = await req.json();
  const { id, valueEn, valueDe } = body;

  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const block = await prisma.textBlock.update({
    where: { id },
    data: { valueEn, valueDe },
  });
  return NextResponse.json(block);
}

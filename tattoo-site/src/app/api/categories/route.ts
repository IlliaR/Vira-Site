import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminSession } from '@/lib/admin-auth';

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { visible: true },
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const body = await req.json();

  if (!body.slug || !body.nameEn || !body.nameDe) {
    return NextResponse.json({ error: 'slug, nameEn, nameDe required' }, { status: 400 });
  }

  const category = await prisma.category.create({ data: body });
  return NextResponse.json(category, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const body = await req.json();
  const { id, ...data } = body;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const category = await prisma.category.update({ where: { id }, data });
  return NextResponse.json(category);
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await req.json();
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

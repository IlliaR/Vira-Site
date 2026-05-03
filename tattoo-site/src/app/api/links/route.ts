import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminSession } from '@/lib/admin-auth';

export async function GET() {
  const links = await prisma.link.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(links);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const body = await req.json();
  const link = await prisma.link.create({ data: body });
  return NextResponse.json(link, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id, ...data } = await req.json();
  const link = await prisma.link.update({ where: { id }, data });
  return NextResponse.json(link);
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await req.json();
  await prisma.link.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

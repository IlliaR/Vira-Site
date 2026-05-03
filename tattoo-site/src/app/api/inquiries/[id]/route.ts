import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminSession } from '@/lib/admin-auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { status } = await req.json();
  const inquiry = await prisma.bookingInquiry.update({
    where: { id: params.id },
    data: { status },
  });
  return NextResponse.json(inquiry);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdminSession();
  if (error) return error;

  await prisma.bookingInquiry.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

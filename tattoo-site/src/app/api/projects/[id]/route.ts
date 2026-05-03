import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminSession } from '@/lib/admin-auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const body = await req.json();
  const project = await prisma.projectCase.update({ where: { id: params.id }, data: body });
  return NextResponse.json(project);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdminSession();
  if (error) return error;

  await prisma.projectCase.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminSession } from '@/lib/admin-auth';

export async function GET() {
  const projects = await prisma.projectCase.findMany({
    orderBy: { order: 'asc' },
    include: { category: true },
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const body = await req.json();
  const project = await prisma.projectCase.create({ data: body });
  return NextResponse.json(project, { status: 201 });
}

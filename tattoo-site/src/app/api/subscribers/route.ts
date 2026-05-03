import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminSession } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format');

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: 'desc' },
  });

  if (format === 'csv') {
    const rows = [
      ['id', 'email', 'status', 'consentAt', 'consentIp', 'createdAt'],
      ...subscribers.map((s) => [
        s.id, s.email, s.status,
        s.consentAt?.toISOString() ?? '',
        s.consentIp ?? '',
        s.createdAt.toISOString(),
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="subscribers.csv"',
      },
    });
  }

  return NextResponse.json(subscribers);
}

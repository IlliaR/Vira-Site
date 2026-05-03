import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const locale = searchParams.get('locale') ?? 'de';

  if (!token) {
    return NextResponse.redirect(new URL(`/${locale}/newsletter/unsubscribe`, req.url));
  }

  const subscriber = await prisma.newsletterSubscriber.findUnique({ where: { token } });
  if (subscriber) {
    await prisma.newsletterSubscriber.update({
      where: { token },
      data: { status: 'unsubscribed', token: null },
    });
  }

  return NextResponse.redirect(new URL(`/${locale}/newsletter/unsubscribe?token=${token}`, req.url));
}

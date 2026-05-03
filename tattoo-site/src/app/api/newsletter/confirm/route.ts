import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const locale = searchParams.get('locale') ?? 'de';

  if (!token) {
    return NextResponse.redirect(new URL(`/${locale}/newsletter/confirm`, req.url));
  }

  const subscriber = await prisma.newsletterSubscriber.findUnique({ where: { token } });

  if (subscriber && subscriber.status === 'pending') {
    await prisma.newsletterSubscriber.update({
      where: { token },
      data: { status: 'confirmed', consentAt: new Date(), token: null },
    });
  }

  return NextResponse.redirect(new URL(`/${locale}/newsletter/confirm?token=${token}`, req.url));
}

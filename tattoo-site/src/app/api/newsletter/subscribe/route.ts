import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { generateToken } from '@/lib/tokens';
import { sendConfirmationEmail } from '@/lib/resend';
import { newsletterSchema } from '@/schemas/newsletter';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  if (!rateLimit(`newsletter:${ip}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = await req.json();
  const parsed = newsletterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { email, locale } = parsed.data;

  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });

  if (existing?.status === 'confirmed') {
    return NextResponse.json({ code: 'DUPLICATE', error: 'Already subscribed' }, { status: 409 });
  }

  const token = generateToken();

  if (existing) {
    await prisma.newsletterSubscriber.update({
      where: { email },
      data: { token, status: 'pending', consentIp: ip },
    });
  } else {
    await prisma.newsletterSubscriber.create({
      data: { email, token, status: 'pending', consentIp: ip },
    });
  }

  await sendConfirmationEmail(email, token, locale);

  return NextResponse.json({ ok: true });
}

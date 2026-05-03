import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { sendBookingNotification } from '@/lib/resend';
import { processAndSaveImage, sniffMime } from '@/lib/sharp-utils';

async function verifyHcaptcha(token: string): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET_KEY;
  if (!secret) return true; // Skip in dev if not configured

  const res = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `response=${token}&secret=${secret}`,
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  if (!rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const formData = await req.formData();

  const name = formData.get('name')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const phone = formData.get('phone')?.toString().trim() ?? '';
  const idea = formData.get('idea')?.toString().trim() ?? '';
  const size = formData.get('size')?.toString().trim() ?? '';
  const placement = formData.get('placement')?.toString().trim() ?? '';
  const preferredDates = formData.get('preferredDates')?.toString().trim() ?? '';
  const hcaptchaToken = formData.get('hcaptchaToken')?.toString() ?? '';
  const privacyConsent = formData.get('privacyConsent')?.toString();

  if (!name || !email || !idea || !privacyConsent) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (idea.length < 10) {
    return NextResponse.json({ error: 'Idea too short' }, { status: 400 });
  }

  const captchaOk = await verifyHcaptcha(hcaptchaToken);
  if (!captchaOk) {
    return NextResponse.json({ error: 'Captcha failed' }, { status: 400 });
  }

  // Handle optional reference image upload
  let referenceImagePath = '';
  const refFile = formData.get('referenceImage') as File | null;
  if (refFile && refFile.size > 0) {
    if (refFile.size <= 10 * 1024 * 1024) {
      const buffer = Buffer.from(await refFile.arrayBuffer());
      const mime = sniffMime(buffer) ?? refFile.type;
      try {
        const { filename } = await processAndSaveImage(buffer, mime);
        referenceImagePath = filename;
      } catch {
        // Silently skip invalid image
      }
    }
  }

  const inquiry = await prisma.bookingInquiry.create({
    data: { name, email, phone, idea, size, placement, preferredDates, referenceImage: referenceImagePath },
  });

  // Fire notification email (non-blocking)
  sendBookingNotification({ name, email, phone, idea, size, placement, preferredDates }).catch(console.error);

  return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
}

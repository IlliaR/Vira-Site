import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL ?? 'newsletter@example.de';
const REPLY_TO = process.env.RESEND_REPLY_TO ?? 'hello@example.de';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Vira Linevych';

export async function sendConfirmationEmail(email: string, token: string, locale: string) {
  const confirmUrl = `${SITE_URL}/${locale}/newsletter/confirm?token=${token}`;
  const isDE = locale === 'de';

  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to: email,
    subject: isDE
      ? `Bitte bestätige deine Newsletter-Anmeldung – ${SITE_NAME}`
      : `Please confirm your newsletter subscription – ${SITE_NAME}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0A0A0A;">
        <h2 style="font-size:24px;">${isDE ? 'Bestätige deine Anmeldung' : 'Confirm your subscription'}</h2>
        <p>${isDE ? 'Klicke auf den Link unten, um deine E-Mail-Adresse zu bestätigen:' : 'Click the link below to confirm your email address:'}</p>
        <p style="margin:24px 0;">
          <a href="${confirmUrl}" style="background:#C8102E;color:#fff;padding:12px 24px;text-decoration:none;border-radius:2px;display:inline-block;">
            ${isDE ? 'E-Mail bestätigen' : 'Confirm email'}
          </a>
        </p>
        <p style="font-size:13px;color:#666;">${isDE ? 'Wenn du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren.' : "If you didn't sign up, you can safely ignore this email."}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
        <p style="font-size:12px;color:#999;">${SITE_NAME} · ${isDE ? 'Du erhältst diese E-Mail, weil du dich für den Newsletter angemeldet hast.' : 'You are receiving this because you signed up for the newsletter.'}</p>
      </div>
    `,
  });
}

export async function sendBookingNotification(data: {
  name: string;
  email: string;
  phone?: string;
  idea: string;
  size?: string;
  placement?: string;
  preferredDates?: string;
}) {
  await resend.emails.send({
    from: FROM,
    replyTo: data.email,
    to: REPLY_TO,
    subject: `New booking inquiry from ${data.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0A0A0A;">
        <h2>New Booking Inquiry</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-weight:bold;">Name</td><td>${data.name}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;">Email</td><td>${data.email}</td></tr>
          ${data.phone ? `<tr><td style="padding:8px 0;font-weight:bold;">Phone</td><td>${data.phone}</td></tr>` : ''}
          <tr><td style="padding:8px 0;font-weight:bold;vertical-align:top;">Idea</td><td>${data.idea}</td></tr>
          ${data.size ? `<tr><td style="padding:8px 0;font-weight:bold;">Size</td><td>${data.size}</td></tr>` : ''}
          ${data.placement ? `<tr><td style="padding:8px 0;font-weight:bold;">Placement</td><td>${data.placement}</td></tr>` : ''}
          ${data.preferredDates ? `<tr><td style="padding:8px 0;font-weight:bold;">Dates</td><td>${data.preferredDates}</td></tr>` : ''}
        </table>
      </div>
    `,
  });
}

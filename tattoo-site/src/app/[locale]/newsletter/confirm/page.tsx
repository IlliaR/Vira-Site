import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

type Props = { params: { locale: string }; searchParams: { token?: string } };

// Token-based confirmation page — must not be indexed
export const metadata = {
  robots: { index: false, follow: false },
};

export default async function NewsletterConfirmPage({ params: { locale }, searchParams }: Props) {
  const t = await getTranslations({ locale, namespace: 'newsletterConfirm' });
  const { token } = searchParams;

  let success = false;

  if (token) {
    const subscriber = await prisma.newsletterSubscriber.findUnique({ where: { token } });
    if (subscriber && subscriber.status === 'pending') {
      await prisma.newsletterSubscriber.update({
        where: { token },
        data: { status: 'confirmed', consentAt: new Date(), token: null },
      });
      success = true;
    } else if (subscriber?.status === 'confirmed') {
      success = true;
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        {success ? (
          <>
            <h1 className="font-display italic text-4xl text-black mb-4">{t('heading')}</h1>
            <p className="font-sans text-black/60 mb-8">{t('text')}</p>
            <Link
              href={`/${locale}`}
              className="text-xs font-sans uppercase tracking-widest text-black border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors"
            >
              {t('cta')}
            </Link>
          </>
        ) : (
          <>
            <p className="font-display italic text-2xl text-black/50 mb-4">{t('invalid')}</p>
            <Link href={`/${locale}`} className="text-xs font-sans uppercase tracking-widest text-black/50 underline">
              {t('cta')}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

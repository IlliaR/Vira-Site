import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

type Props = { params: { locale: string }; searchParams: { token?: string } };

export default async function UnsubscribePage({ params: { locale }, searchParams }: Props) {
  const t = await getTranslations({ locale, namespace: 'newsletterUnsubscribe' });
  const { token } = searchParams;

  let success = false;

  if (token) {
    const subscriber = await prisma.newsletterSubscriber.findUnique({ where: { token } });
    if (subscriber) {
      await prisma.newsletterSubscriber.update({
        where: { token },
        data: { status: 'unsubscribed', token: null },
      });
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
          </>
        ) : (
          <p className="font-display italic text-2xl text-black/50 mb-4">{t('invalid')}</p>
        )}
        <Link href={`/${locale}`} className="text-xs font-sans uppercase tracking-widest text-black/50 underline">
          {t('cta')}
        </Link>
      </div>
    </div>
  );
}

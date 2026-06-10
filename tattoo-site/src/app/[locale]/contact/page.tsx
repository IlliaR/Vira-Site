import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import BookingForm from '@/components/contact/BookingForm';
import MapEmbed from '@/components/contact/MapEmbed';
import MotionWrapper from '@/components/ui/MotionWrapper';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildPageMetadata({
    locale,
    path: '/contact',
    title: t('contactTitle'),
    description: t('contactDescription'),
  });
}

export default async function ContactPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'contact' });

  const textBlocks = await prisma.textBlock.findMany({ where: { page: 'contact' } });
  const introBock = textBlocks.find((b) => b.key === 'intro');
  const introText = introBock ? (locale === 'de' ? introBock.valueDe : introBock.valueEn) : '';

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Left: form */}
          <div>
            <MotionWrapper>
              <h1 className="font-display italic text-5xl md:text-7xl text-black mb-4">{t('heading')}</h1>
            </MotionWrapper>
            {introText && (
              <MotionWrapper delay={0.1}>
                <p className="font-sans text-black/60 text-base leading-relaxed mb-10">{introText}</p>
              </MotionWrapper>
            )}
            <MotionWrapper delay={0.2}>
              <BookingForm />
            </MotionWrapper>
          </div>

          {/* Right: studio info + map */}
          <div className="lg:pt-24">
            <MotionWrapper delay={0.15}>
              <div className="mb-8">
                <h2 className="font-display italic text-2xl text-black mb-3">{t('studioHeading')}</h2>
                <address className="font-sans text-sm text-black/60 not-italic leading-relaxed">
                  Vira Linevych<br />
                  Musterstraße 1<br />
                  10115 Berlin<br />
                  Germany
                </address>
                <p className="text-xs font-sans text-black/40 mt-3">{t('studioCopy')}</p>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.25}>
              <MapEmbed />
            </MotionWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

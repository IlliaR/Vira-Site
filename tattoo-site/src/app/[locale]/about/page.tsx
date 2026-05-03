import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import MotionWrapper from '@/components/ui/MotionWrapper';
import SvgAccent from '@/components/ui/SvgAccent';
import type { Metadata } from 'next';

export const revalidate = 60;

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('aboutTitle') };
}

export default async function AboutPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'about' });

  const textBlocks = await prisma.textBlock.findMany({ where: { page: 'about' } });
  const bio = textBlocks.find((b) => b.key === 'bio');
  const bioText = bio ? (locale === 'de' ? bio.valueDe : bio.valueEn) : '';

  return (
    <div className="min-h-screen pt-24">
      {/* Hero portrait — full bleed */}
      <div className="full-bleed h-[70vh] md:h-screen max-h-[900px] relative bg-black overflow-hidden">
        <Image
          src="/images/placeholder-portrait.jpg"
          alt="Vira Linevych — portrait"
          fill
          className="object-cover object-top opacity-80"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        <div className="absolute bottom-10 left-6 md:left-16">
          <h1 className="font-display italic text-white text-5xl md:text-7xl">
            {t('heading')}
          </h1>
        </div>
      </div>

      {/* Bio */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <MotionWrapper direction="left">
            <div className="relative">
              <Image
                src="/images/placeholder-process.jpg"
                alt="Vira at work"
                width={580}
                height={720}
                className="w-full h-auto object-cover"
              />
              {/* Ink drip corner accent */}
              <div className="absolute -bottom-10 -right-6 pointer-events-none opacity-30">
                <SvgAccent type="ink-drip" width={80} height={140} />
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <div className="lg:pt-8">
              <div className="prose prose-lg max-w-none">
                {bioText.split('\n\n').map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-sans text-black/80 leading-relaxed mb-6 text-base md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-black/10">
                <SvgAccent type="brushstroke" width={260} height={40} className="opacity-70" />
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
}

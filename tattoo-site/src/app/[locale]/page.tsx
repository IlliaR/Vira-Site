import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/home/Hero';
import IntroText from '@/components/home/IntroText';
import ProjectGrid from '@/components/home/ProjectGrid';
import ImageDivider from '@/components/home/ImageDivider';
import PullQuote from '@/components/home/PullQuote';
import GalleryPreview from '@/components/home/GalleryPreview';
import NewsletterBlock from '@/components/home/NewsletterBlock';

export const revalidate = 60;

type Props = { params: { locale: string } };

export default async function HomePage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const [projects, previewImages, textBlocks] = await Promise.all([
    prisma.projectCase.findMany({
      where: { visible: true },
      orderBy: { order: 'asc' },
      take: 6,
      include: { category: true },
    }),
    prisma.galleryImage.findMany({
      orderBy: { order: 'asc' },
      take: 16,
    }),
    prisma.textBlock.findMany({ where: { page: 'home' } }),
  ]);

  const getBlock = (key: string) => {
    const block = textBlocks.find((b) => b.key === key);
    if (!block) return '';
    return locale === 'de' ? block.valueDe : block.valueEn;
  };

  const introText = getBlock('intro.text');
  const quoteText = getBlock('quote.text');
  const quoteAuthor = getBlock('quote.author');

  return (
    <>
      <Hero tagline={getBlock('hero.tagline') || undefined} />

      {introText && <IntroText text={introText} />}

      <hr className="max-w-[1280px] mx-auto px-6 md:px-10" />

      <ProjectGrid
        projects={projects}
        locale={locale}
        heading={t('projectsHeading')}
      />

      <ImageDivider src="/images/placeholder-divider.jpg" alt="Tattoo studio atmosphere" />

      {quoteText && <PullQuote quote={quoteText} author={quoteAuthor || undefined} />}

      <hr className="max-w-[1280px] mx-auto" />

      <GalleryPreview
        images={previewImages}
        heading={t('galleryHeading')}
        viewAllLabel={t('viewAll')}
        locale={locale}
      />

      <NewsletterBlock />
    </>
  );
}

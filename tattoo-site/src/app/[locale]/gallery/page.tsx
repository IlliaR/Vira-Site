import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import MasonryGrid from '@/components/gallery/MasonryGrid';
import CategoryFilter from '@/components/gallery/CategoryFilter';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 60;

type Props = {
  params: { locale: string };
  searchParams: { category?: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildPageMetadata({
    locale,
    path: '/gallery',
    title: t('galleryTitle'),
    description: t('galleryDescription'),
  });
}

export default async function GalleryPage({ params: { locale }, searchParams }: Props) {
  const t = await getTranslations({ locale, namespace: 'gallery' });
  const { category } = searchParams;

  const [images, categories] = await Promise.all([
    prisma.galleryImage.findMany({
      where: category ? { category: { slug: category } } : undefined,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: { category: true },
    }),
    prisma.category.findMany({
      where: { visible: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <h1 className="font-display italic text-5xl md:text-7xl text-black mb-12">{t('heading')}</h1>

        <Suspense>
          <CategoryFilter categories={categories} allLabel={t('all')} locale={locale} />
        </Suspense>

        <MasonryGrid images={images} locale={locale} />
      </div>
    </div>
  );
}

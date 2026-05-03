import Image from 'next/image';
import Link from 'next/link';
import MotionWrapper from '@/components/ui/MotionWrapper';
import type { GalleryImage } from '@/types';

interface GalleryPreviewProps {
  images: GalleryImage[];
  heading: string;
  viewAllLabel: string;
  locale: string;
}

export default function GalleryPreview({ images, heading, viewAllLabel, locale }: GalleryPreviewProps) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="flex items-baseline justify-between mb-10 md:mb-14">
          <MotionWrapper>
            <h2 className="font-display italic text-4xl md:text-5xl text-black">{heading}</h2>
          </MotionWrapper>
          <Link
            href={`/${locale}/gallery`}
            className="text-xs font-sans uppercase tracking-widest text-black/50 hover:text-red transition-colors link-red hidden sm:block"
          >
            {viewAllLabel}
          </Link>
        </div>

        {/* Masonry preview */}
        <div className="masonry">
          {images.map((img, i) => (
            <Link
              key={img.id}
              href={`/${locale}/gallery`}
              className="masonry-item block overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={img.filename}
                  alt={locale === 'de' ? img.altTextDe : img.altTextEn}
                  width={img.width || 600}
                  height={img.height || 800}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={i < 4 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "view all" */}
        <div className="mt-10 sm:hidden text-center">
          <Link
            href={`/${locale}/gallery`}
            className="text-xs font-sans uppercase tracking-widest text-black/50 hover:text-red transition-colors"
          >
            {viewAllLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from './Lightbox';
import type { GalleryImage } from '@/types';

interface MasonryGridProps {
  images: GalleryImage[];
  locale: string;
}

export default function MasonryGrid({ images, locale }: MasonryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function goPrev() {
    setLightboxIndex((i) => (i === null || i === 0 ? images.length - 1 : i - 1));
  }

  function goNext() {
    setLightboxIndex((i) => (i === null || i === images.length - 1 ? 0 : i + 1));
  }

  if (images.length === 0) {
    return (
      <p className="text-sm font-sans text-black/40 py-16 text-center">
        {locale === 'de' ? 'Keine Bilder gefunden.' : 'No images found.'}
      </p>
    );
  }

  return (
    <>
      <div className="masonry">
        {images.map((img, i) => {
          const alt = locale === 'de' ? img.altTextDe : img.altTextEn;
          return (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.07 }}
              onClick={() => openLightbox(i)}
              className="masonry-item block w-full text-left group overflow-hidden focus-visible:outline-2 focus-visible:outline-red"
              aria-label={alt || `Image ${i + 1}`}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={img.filename}
                  alt={alt || ''}
                  width={img.width || 600}
                  height={img.height || 800}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={i < 6 ? 'eager' : 'lazy'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay with red accent */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-start p-3">
                  <div className="w-4 h-px bg-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          locale={locale}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}

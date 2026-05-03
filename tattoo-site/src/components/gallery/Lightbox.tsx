'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { GalleryImage } from '@/types';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  locale: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, currentIndex, locale, onClose, onPrev, onNext }: LightboxProps) {
  const img = images[currentIndex];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!img) return null;

  const alt = locale === 'de' ? img.altTextDe : img.altTextEn;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors z-10"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        {/* Prev */}
        <button
          aria-label="Previous"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors z-10"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Image */}
        <motion.div
          key={img.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-[90vw] max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={img.filename}
            alt={alt || 'Gallery image'}
            width={img.width || 1200}
            height={img.height || 900}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            priority
          />
          {alt && (
            <p className="absolute -bottom-8 left-0 right-0 text-center text-xs font-sans text-white/40">{alt}</p>
          )}
        </motion.div>

        {/* Next */}
        <button
          aria-label="Next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors z-10"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Counter */}
        <p className="absolute bottom-5 left-0 right-0 text-center text-xs font-sans text-white/30">
          {currentIndex + 1} / {images.length}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

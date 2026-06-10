'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

interface HeroProps {
  tagline?: string;
}

export default function Hero({ tagline }: HeroProps) {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="relative h-screen supports-[height:100dvh]:h-dvh min-h-[600px] flex items-end overflow-hidden bg-black">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/placeholder-hero.jpg"
          alt="Vira Linevych — tattoo artist work"
          fill
          className="object-cover object-center opacity-70"
          priority
          sizes="100vw"
        />
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pb-20 md:pb-28 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="font-display italic text-white text-6xl md:text-8xl xl:text-[100px] leading-none mb-4"
        >
          Vira<br />Linevych
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
          className="font-sans text-white/70 text-sm md:text-base uppercase tracking-[0.2em] mb-8"
        >
          {tagline ?? t('heroTagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.45 }}
        >
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-3 bg-red text-white font-sans text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#a00d24] transition-colors group"
          >
            {t('heroCta')}
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-[4.5rem] md:bottom-8 right-8 md:right-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-white/30 animate-[pulse_2s_ease-in-out_infinite]" />
      </motion.div>
    </section>
  );
}

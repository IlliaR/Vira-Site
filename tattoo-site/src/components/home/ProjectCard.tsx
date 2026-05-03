'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  heroImage: string;
  linkTarget: string;
  index: number;
}

export default function ProjectCard({ title, description, heroImage, linkTarget, index }: ProjectCardProps) {
  const t = useTranslations('home');

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
      className="group relative overflow-hidden bg-black"
    >
      <Link href={linkTarget} className="block">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-400" />

          {/* Category tag */}
          <div className="absolute top-4 left-4 bg-white px-3 py-1">
            <span className="text-xs font-sans uppercase tracking-widest text-black">{title}</span>
          </div>
        </div>

        {/* Card footer */}
        <div className="p-5 bg-white border-t border-black/10">
          <p className="text-sm font-sans text-black/60 leading-snug mb-3 line-clamp-2">{description}</p>
          <span className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-black group-hover:text-red transition-colors">
            {t('seeMore')}
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

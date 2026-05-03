'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const InstagramIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export default function MobileBar() {
  const locale = useLocale();
  const t = useTranslations('nav');

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-black/10 flex h-14">
      <Link
        href={`/${locale}/contact`}
        className="flex-1 flex items-center justify-center bg-red text-white text-xs font-sans uppercase tracking-widest gap-2 hover:bg-[#a00d24] transition-colors"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {t('book')}
      </Link>
      <a
        href="https://instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="w-14 flex items-center justify-center text-black/60 hover:text-red transition-colors border-l border-black/10"
      >
        <InstagramIcon />
      </a>
    </div>
  );
}

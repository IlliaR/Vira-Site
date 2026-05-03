'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const STORAGE_KEY = 'vira_cookie_consent';

export default function CookieBanner() {
  const t = useTranslations('cookie');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t('heading')}
      className="fixed bottom-0 left-0 right-0 z-[200] md:bottom-6 md:left-6 md:right-auto md:max-w-sm bg-white border border-black/15 shadow-lg p-6"
    >
      <p className="text-xs font-sans font-semibold uppercase tracking-widest text-black mb-2">{t('heading')}</p>
      <p className="text-sm font-sans text-black/70 leading-relaxed mb-4">
        {t('text')}{' '}
        <Link href={`/${locale}/datenschutz`} className="underline hover:text-red transition-colors">
          {t('more')}
        </Link>
      </p>
      <div className="flex gap-3">
        {/* Reject equally prominent as Accept (TTDSG §25) */}
        <button
          onClick={handleReject}
          className="flex-1 text-xs font-sans uppercase tracking-widest border border-black/20 py-2.5 hover:border-black transition-colors"
        >
          {t('reject')}
        </button>
        <button
          onClick={handleAccept}
          className="flex-1 text-xs font-sans uppercase tracking-widest bg-black text-white py-2.5 hover:bg-red transition-colors"
        >
          {t('accept')}
        </button>
      </div>
    </div>
  );
}

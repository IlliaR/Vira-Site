'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const other = locale === 'de' ? 'en' : 'de';

  function switchLocale() {
    // Replace the locale segment in the pathname
    const segments = pathname.split('/');
    segments[1] = other;
    router.push(segments.join('/') || `/${other}`);
  }

  return (
    <button
      onClick={switchLocale}
      className={`text-xs font-sans uppercase tracking-widest text-black/60 hover:text-red transition-colors ${className}`}
      aria-label={`Switch to ${other === 'de' ? 'Deutsch' : 'English'}`}
    >
      {other === 'de' ? 'DE' : 'EN'}
    </button>
  );
}

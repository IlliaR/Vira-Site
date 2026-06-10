'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import SvgAccent from '@/components/ui/SvgAccent';

export default function NewsletterBlock() {
  const t = useTranslations('newsletter');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent || !email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, locale }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setEmail('');
        setConsent(false);
      } else if (data.code === 'DUPLICATE') {
        setStatus('duplicate');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="bg-black text-white py-20 md:py-28 relative overflow-hidden">
      {/* Red brushstroke accent */}
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-50">
        <SvgAccent type="brushstroke" width={500} height={70} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-xl">
          <h2 className="font-display italic text-4xl md:text-5xl text-white mb-3">{t('heading')}</h2>
          <p className="font-sans text-white/60 text-sm leading-relaxed mb-8">{t('subheading')}</p>

          {status === 'success' ? (
            <p className="font-display italic text-2xl text-red">{t('success')}</p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('placeholder')}
                  required
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/30 font-sans text-base sm:text-sm px-4 py-3 focus:outline-none focus:border-red transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || !consent}
                  className="bg-red text-white font-sans text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#a00d24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === 'loading' ? '…' : t('submit')}
                </button>
              </div>

              {/* DSGVO consent */}
              <label className="flex items-start gap-3 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-1 accent-red flex-shrink-0"
                />
                <span className="text-xs font-sans text-white/50 leading-relaxed">
                  {t('consent')}{' '}
                  <Link href={`/${locale}/datenschutz`} className="underline hover:text-white transition-colors">
                    {t('privacyLink')}
                  </Link>
                  .
                </span>
              </label>

              {status === 'duplicate' && (
                <p className="text-xs text-red/80 mt-2">{t('duplicate')}</p>
              )}
              {status === 'error' && (
                <p className="text-xs text-red/80 mt-2">{t('error')}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

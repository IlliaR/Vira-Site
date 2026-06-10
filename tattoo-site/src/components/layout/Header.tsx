'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const InstagramIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll while the mobile menu overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { href: `/${locale}/gallery`, label: t('gallery') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-black/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo / Artist name */}
          <Link
            href={`/${locale}`}
            className="font-display italic text-xl text-black hover:text-red transition-colors"
          >
            Vira Linevych
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-sans uppercase tracking-widest text-black/70 hover:text-red transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-red transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="hidden md:flex items-center gap-5">
            <LanguageSwitcher />
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-black/60 hover:text-red transition-colors"
            >
              <InstagramIcon />
            </a>
            <Link
              href={`/${locale}/contact`}
              className="bg-red text-white text-xs font-sans uppercase tracking-widest px-5 py-2.5 hover:bg-[#a00d24] transition-colors"
            >
              {t('book')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-3 -mr-3 min-h-[44px]"
            onClick={() => setMenuOpen(true)}
            aria-label={t('menu')}
          >
            <span className="w-6 h-px bg-black" />
            <span className="w-6 h-px bg-black" />
            <span className="w-4 h-px bg-black" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-6 h-16 border-b border-black/10">
            <Link
              href={`/${locale}`}
              className="font-display italic text-xl text-black"
              onClick={() => setMenuOpen(false)}
            >
              Vira Linevych
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label={t('close')}
              className="text-black/60 hover:text-black"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col px-6 pt-12 gap-8 flex-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-display italic text-4xl text-black hover:text-red transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-red text-white text-sm font-sans uppercase tracking-widest px-6 py-4 text-center"
            >
              {t('book')}
            </Link>
          </nav>

          <div className="flex items-center gap-6 px-6 pb-10">
            <LanguageSwitcher />
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-black/60 hover:text-red transition-colors"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

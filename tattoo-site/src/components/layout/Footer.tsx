import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const legalLinks = [
    { href: `/${locale}/impressum`, label: t('impressum') },
    { href: `/${locale}/datenschutz`, label: t('datenschutz') },
    { href: `/${locale}/agb`, label: t('agb') },
  ];

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <p className="font-display italic text-2xl text-black mb-3">Vira Linevych</p>
          <p className="text-xs font-sans text-black/50 leading-relaxed">
            Tattoo artist & illustrator<br />Berlin, Germany
          </p>
        </div>

        {/* Legal */}
        <div>
          <p className="text-xs uppercase tracking-widest text-black/40 mb-4">{t('legal')}</p>
          <ul className="flex flex-col gap-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-sans text-black/60 hover:text-red transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-px left-0 w-0 h-px bg-red transition-all duration-200 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + newsletter */}
        <div>
          <p className="text-xs uppercase tracking-widest text-black/40 mb-4">Social</p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-xs font-sans uppercase tracking-widest text-black/60 hover:text-red transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-xs font-sans uppercase tracking-widest text-black/60 hover:text-red transition-colors"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs font-sans text-black/30">
          © {year} Vira Linevych. {t('rights')}
        </p>
        <p className="text-xs font-sans text-black/20">
          Hosted in Germany · EU
        </p>
      </div>
    </footer>
  );
}

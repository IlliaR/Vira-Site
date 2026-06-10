import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yoursite.de';
export const OG_IMAGE = { url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 };

/** Canonical + hreflang alternates for a localized page. `path` is locale-relative, e.g. '/gallery'. */
export function pageAlternates(locale: string, path = '') {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      de: `${SITE_URL}/de${path}`,
      en: `${SITE_URL}/en${path}`,
      'x-default': `${SITE_URL}/de${path}`,
    },
  };
}

type PageMetaOptions = {
  locale: string;
  path: string;
  title: string;
  description?: string;
  noIndex?: boolean;
};

/**
 * Per-page metadata: title (templated in the locale layout), description,
 * canonical/hreflang and a complete Open Graph block — Next.js replaces (not
 * deep-merges) nested metadata objects, so openGraph must be fully specified here.
 */
export function buildPageMetadata({ locale, path, title, description, noIndex }: PageMetaOptions): Metadata {
  return {
    title,
    ...(description && { description }),
    alternates: pageAlternates(locale, path),
    openGraph: {
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      url: `${SITE_URL}/${locale}${path}`,
      siteName: 'Vira Linevych',
      title,
      ...(description && { description }),
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      ...(description && { description }),
      images: [OG_IMAGE.url],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

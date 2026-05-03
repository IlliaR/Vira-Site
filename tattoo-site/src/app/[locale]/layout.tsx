import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBar from '@/components/layout/MobileBar';
import CookieBanner from '@/components/layout/CookieBanner';
import '../globals.css';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yoursite.de';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('defaultTitle'),
      template: `%s | Vira Linevych`,
    },
    description: t('defaultDescription'),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'de': `${siteUrl}/de`,
        'en': `${siteUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      url: `${siteUrl}/${locale}`,
      siteName: 'Vira Linevych',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      images: [`${siteUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as 'en' | 'de')) notFound();

  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Vira Linevych',
        jobTitle: 'Tattoo Artist & Illustrator',
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yoursite.de'}/${locale}`,
        sameAs: ['https://instagram.com/'],
      },
      {
        '@type': ['LocalBusiness', 'TattooParlor'],
        name: 'Vira Linevych Studio',
        description: locale === 'de'
          ? 'Tätowiererin & Illustratorin in Berlin. Blackwork, Fine Line, Illustration.'
          : 'Tattoo artist & illustrator in Berlin. Blackwork, fine line, illustration.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Berlin',
          addressCountry: 'DE',
        },
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yoursite.de'}/${locale}`,
        priceRange: '€€',
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="mobile-bar-offset">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileBar />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yoursite.de';
const LOCALES = ['de', 'en'];

const staticRoutes = ['', '/gallery', '/about', '/contact', '/impressum', '/datenschutz', '/agb'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.7,
      });
    }
  }

  return entries;
}

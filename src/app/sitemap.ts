import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/config/site';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getDocSlugs } from '@/lib/content/docs';

/** Every page in every locale, each listing its language alternates. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const absolute = (locale: (typeof routing.locales)[number], href: string) =>
    new URL(getPathname({ locale, href }), base).href;

  // Add new top-level routes here when you create them.
  const hrefs = [
    '/',
    '/examples',
    '/docs',
    '/contact',
    ...(await getDocSlugs()).map((slug) => `/docs/${slug}`),
  ];

  return hrefs.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: absolute(locale, href),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absolute(l, href)])),
      },
    })),
  );
}

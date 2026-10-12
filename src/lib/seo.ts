import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getPathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

/** Shared social card (public/brand). A project can swap the file or set one per page. */
const socialImage = {
  url: '/brand/launchkit-og.png',
  width: 1200,
  height: 630,
  alt: siteConfig.name,
};

/** Open Graph wants a territory-qualified locale. */
export const openGraphLocales: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
};

/**
 * Canonical URL plus an hreflang alternate for every locale. Paths are
 * relative; the root layout's `metadataBase` makes them absolute.
 */
export function localizedAlternates(locale: Locale, href: string): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const alternate of routing.locales) {
    languages[alternate] = getPathname({ locale: alternate, href });
  }
  languages['x-default'] = getPathname({ locale: routing.defaultLocale, href });

  return { canonical: getPathname({ locale, href }), languages };
}

/**
 * Title, description, canonical, hreflang and Open Graph for one localized
 * page. Next.js merges metadata shallowly, so the full `openGraph` object is
 * set here rather than partly inherited from the layout.
 */
export function pageMetadata(
  locale: Locale,
  href: string,
  { title, description }: { title: string; description: string },
): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(locale, href),
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: openGraphLocales[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => openGraphLocales[l]),
      title,
      description,
      url: getPathname({ locale, href }),
      images: [socialImage],
    },
    twitter: { card: 'summary_large_image', title, description, images: [socialImage] },
  };
}

import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { localeFlags, localeNames, routing } from '@/i18n/routing';
import { localizedAlternates, openGraphLocales, pageMetadata } from '@/lib/seo';

describe('locale configuration', () => {
  it('supports English, Spanish, French and German with English as default', () => {
    expect(routing.locales).toEqual(['en', 'es', 'fr', 'de']);
    expect(routing.defaultLocale).toBe('en');
  });

  it('names every locale and maps it to an Open Graph locale', () => {
    for (const locale of routing.locales) {
      expect(localeNames[locale]).toBeTruthy();
      expect(openGraphLocales[locale]).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
    }
  });

  it('gives every locale a flag image for the language menu', () => {
    for (const locale of routing.locales) {
      expect(existsSync(`public/flags/${localeFlags[locale]}.svg`)).toBe(true);
    }
  });
});

describe('SEO metadata', () => {
  it('builds a canonical URL and an hreflang alternate per locale plus x-default', () => {
    expect(localizedAlternates('fr', '/contact')).toEqual({
      canonical: '/fr/contact',
      languages: {
        en: '/en/contact',
        es: '/es/contact',
        fr: '/fr/contact',
        de: '/de/contact',
        'x-default': '/en/contact',
      },
    });
  });

  it('localizes Open Graph and lists the other locales as alternates', () => {
    const metadata = pageMetadata('de', '/', { title: 'Titel', description: 'Beschreibung' });
    expect(metadata.openGraph).toMatchObject({
      locale: 'de_DE',
      alternateLocale: ['en_US', 'es_ES', 'fr_FR'],
      url: '/de',
      title: 'Titel',
    });
  });
});

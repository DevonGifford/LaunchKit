import { defineRouting } from 'next-intl/routing';

/**
 * Supported locales. Add a locale here, add `messages/<locale>.json`,
 * `src/content/<locale>/` and its flag (see `localeFlags`), then run
 * `pnpm i18n:check` to list what's missing.
 */
export const routing = defineRouting({
  locales: ['en', 'es', 'fr', 'de'],
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];

/** Each language named in itself, as a visitor looking for it would expect. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

/**
 * The country whose flag stands beside each language in the header's language
 * menu, as an ISO 3166-1 code; the image is `public/flags/<code>.svg`. A flag
 * is a country, not a language, so it only ever accompanies the name.
 */
export const localeFlags: Record<Locale, string> = {
  en: 'gb',
  es: 'es',
  fr: 'fr',
  de: 'de',
};

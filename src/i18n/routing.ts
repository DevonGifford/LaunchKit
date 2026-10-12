import { defineRouting } from 'next-intl/routing';

/**
 * Supported locales. Add a locale here, add `messages/<locale>.json` and
 * `src/content/<locale>/`, then run `pnpm i18n:check` to list what's missing.
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

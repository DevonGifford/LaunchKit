/**
 * Build-time feature switches (spec §9). Each flag controls a capability that
 * exists in the codebase today; future integrations (analytics, error
 * monitoring) get a flag when — and only when — they are implemented.
 */
export const features = {
  /** Show the light/dark toggle. Without it, the site follows the system preference. */
  themeSwitcher: true,
  /** Show the locale switcher. Locale routing stays on; see src/i18n/routing.ts. */
  localeSwitcher: true,
} as const;

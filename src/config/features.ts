/**
 * Build-time feature switches (spec §9). Each flag controls a capability that
 * exists in the codebase today; future integrations (error monitoring, say)
 * get a flag when — and only when — they are implemented.
 */
export const features = {
  /** Show the light/dark toggle. Without it, the site follows the system preference. */
  themeSwitcher: true,
  /** Show the locale switcher. Locale routing stays on; see src/i18n/routing.ts. */
  localeSwitcher: true,
  /**
   * Vercel Web Analytics: page views without third-party cookies. Loads only
   * in builds on Vercel, once it is enabled in the project's Analytics tab.
   */
  vercelWebAnalytics: true,
  /** Vercel Speed Insights: anonymous Core Web Vitals. Loads only in builds on Vercel. */
  vercelSpeedInsights: true,
} as const;

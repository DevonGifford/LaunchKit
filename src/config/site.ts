import { env } from '@/env';

/** Project identity (spec §9: brand is build-time configuration). */
export const siteConfig = {
  name: 'LaunchKit',
} as const;

/**
 * Canonical origin for absolute URLs (metadata, sitemap, hreflang).
 * Server-only: reads a server environment variable.
 */
export function getSiteUrl(): URL {
  if (env.NEXT_PUBLIC_SITE_URL) return new URL(env.NEXT_PUBLIC_SITE_URL);
  if (env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  return new URL('http://localhost:3000');
}

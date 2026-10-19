import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Typed, validated environment variables. Every variable is optional: a fresh
 * clone builds and runs with no `.env` file. Add new variables here and to
 * `.env.example` together.
 */
export const env = createEnv({
  server: {
    // Set automatically on Vercel; used only as a fallback for the site URL.
    VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
    // "1" in builds and functions on Vercel; Vercel-only integrations need it.
    VERCEL: z.string().optional(),
  },
  client: {
    /** Canonical origin used for metadata, sitemap and hreflang links. */
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
  },
  runtimeEnv: {
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    VERCEL: process.env.VERCEL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  emptyStringAsUndefined: true,
});

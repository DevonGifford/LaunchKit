import { env } from '@/env';
import type { OptionalConsentCategory } from '@/lib/consent/consent';
import { features } from './features';

/** A third-party service the site can load. */
export type Integration = {
  id: string;
  /** The service's own name, shown in the privacy preferences. */
  name: string;
  /**
   * The category a visitor must allow before the service loads, or `null` for
   * one that runs for every visitor. That is the site owner's decision, made
   * from what the provider documents it collects; the privacy policy says it.
   */
  consent: OptionalConsentCategory | null;
  enabled: boolean;
  /** Works only in deployments on Vercel. */
  vercelOnly?: boolean;
};

/**
 * Every third-party service, each switched in src/config/features.ts. Adding one
 * here also needs its component in src/components/layout/consent-integrations.tsx.
 */
export const integrations = [
  {
    id: 'vercelWebAnalytics',
    name: 'Vercel Web Analytics',
    consent: null,
    enabled: features.vercelWebAnalytics,
    vercelOnly: true,
  },
  {
    id: 'vercelSpeedInsights',
    name: 'Vercel Speed Insights',
    consent: null,
    enabled: features.vercelSpeedInsights,
    vercelOnly: true,
  },
] as const satisfies readonly Integration[];

export type IntegrationId = (typeof integrations)[number]['id'];

/**
 * The services this build loads: switched on, and on Vercel if they need it.
 * Server-only: reads a server environment variable.
 */
export function activeIntegrations({ onVercel = env.VERCEL === '1' } = {}) {
  return integrations.filter(
    (integration: Integration) => integration.enabled && (onVercel || !integration.vercelOnly),
  );
}

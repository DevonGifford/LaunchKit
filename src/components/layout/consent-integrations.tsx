import type { ComponentType } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { activeIntegrations, type IntegrationId } from '@/config/integrations';
import { ConsentGate } from './consent-gate';

// The component that loads each service. TypeScript fails until every
// integration in src/config/integrations.ts has one.
const components: Record<IntegrationId, ComponentType> = {
  vercelWebAnalytics: Analytics,
  vercelSpeedInsights: SpeedInsights,
};

/**
 * Loads the third-party services this build uses. A service that needs consent
 * waits for its category; the rest load straight away. Render it inside
 * `ConsentProvider`.
 */
export function ConsentIntegrations() {
  return activeIntegrations().map(({ id, consent }) => {
    const Service = components[id];
    return consent ? (
      <ConsentGate key={id} category={consent}>
        <Service />
      </ConsentGate>
    ) : (
      <Service key={id} />
    );
  });
}

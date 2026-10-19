import { describe, expect, it } from 'vitest';
import { activeIntegrations, integrations } from '@/config/integrations';
import {
  acceptAllChoices,
  allowsCategory,
  consentVersion,
  createConsentRecord,
  parseConsentRecord,
  rejectAllChoices,
} from '@/lib/consent/consent';

const now = new Date('2026-10-19T12:00:00.000Z');

describe('consent records', () => {
  it('round-trips through storage', () => {
    const record = createConsentRecord({ analytics: true, marketing: false }, now);
    expect(parseConsentRecord(JSON.stringify(record))).toEqual({
      version: consentVersion,
      analytics: true,
      marketing: false,
      updatedAt: '2026-10-19T12:00:00.000Z',
    });
  });

  it('treats a missing, malformed or outdated record as no decision', () => {
    const record = createConsentRecord(acceptAllChoices, now);
    expect(parseConsentRecord(null)).toBeNull();
    expect(parseConsentRecord('not json')).toBeNull();
    expect(parseConsentRecord(JSON.stringify({ analytics: true }))).toBeNull();
    expect(parseConsentRecord(JSON.stringify({ ...record, version: 0 }))).toBeNull();
    expect(parseConsentRecord(JSON.stringify({ ...record, analytics: 'yes' }))).toBeNull();
  });
});

describe('allowsCategory', () => {
  it('always allows necessary, even before a decision', () => {
    expect(allowsCategory(null, 'necessary')).toBe(true);
    expect(allowsCategory(createConsentRecord(rejectAllChoices, now), 'necessary')).toBe(true);
  });

  it('allows nothing optional until the visitor decides', () => {
    expect(allowsCategory(null, 'analytics')).toBe(false);
    expect(allowsCategory(null, 'marketing')).toBe(false);
  });

  it('follows the saved choice for each optional category', () => {
    const record = createConsentRecord({ analytics: true, marketing: false }, now);
    expect(allowsCategory(record, 'analytics')).toBe(true);
    expect(allowsCategory(record, 'marketing')).toBe(false);
  });
});

describe('integrations', () => {
  it('have unique ids', () => {
    const ids = integrations.map((integration) => integration.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('load the Vercel services only in builds on Vercel', () => {
    expect(activeIntegrations({ onVercel: false })).toEqual([]);
    expect(activeIntegrations({ onVercel: true }).map(({ id }) => id)).toEqual([
      'vercelWebAnalytics',
      'vercelSpeedInsights',
    ]);
  });

  it('run the Vercel services for every visitor, without waiting for consent', () => {
    expect(activeIntegrations({ onVercel: true }).every(({ consent }) => consent === null)).toBe(
      true,
    );
  });
});

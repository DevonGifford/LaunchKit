import { z } from 'zod';

/** Consent categories, in the order the preferences list them. */
export const consentCategories = ['necessary', 'analytics', 'marketing'] as const;

export type ConsentCategory = (typeof consentCategories)[number];

/** The categories a visitor can turn off. Necessary is always on. */
export type OptionalConsentCategory = Exclude<ConsentCategory, 'necessary'>;

/** A visitor's choice for each optional category. */
export type ConsentChoices = Record<OptionalConsentCategory, boolean>;

/**
 * Bump when the categories or what they cover change: stored choices with
 * another version are ignored, so every visitor is asked again.
 */
export const consentVersion = 1;

/** The local storage key for the visitor's choice. The privacy policy names it. */
export const consentStorageKey = 'consent';

const consentRecordSchema = z.object({
  version: z.literal(consentVersion),
  analytics: z.boolean(),
  marketing: z.boolean(),
  updatedAt: z.iso.datetime(),
});

/** A stored consent decision. */
export type ConsentRecord = z.infer<typeof consentRecordSchema>;

export const acceptAllChoices: ConsentChoices = { analytics: true, marketing: true };
export const rejectAllChoices: ConsentChoices = { analytics: false, marketing: false };

/** Records a decision made now. */
export function createConsentRecord(choices: ConsentChoices, now = new Date()): ConsentRecord {
  return {
    version: consentVersion,
    analytics: choices.analytics,
    marketing: choices.marketing,
    updatedAt: now.toISOString(),
  };
}

/** Reads a stored decision; anything missing, malformed or outdated counts as none. */
export function parseConsentRecord(raw: string | null): ConsentRecord | null {
  if (raw === null) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  const result = consentRecordSchema.safeParse(value);
  return result.success ? result.data : null;
}

/** Whether `category` is allowed. Necessary always is; the rest need a decision. */
export function allowsCategory(record: ConsentRecord | null, category: ConsentCategory) {
  if (category === 'necessary') return true;
  return record?.[category] ?? false;
}

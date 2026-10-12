'use server';

import {
  contactSchema,
  type ContactErrorKey,
  type ContactField,
  type ContactMessage,
} from './contact-schema';

export type ContactActionResult =
  { ok: true } | { ok: false; fieldErrors: Partial<Record<ContactField, ContactErrorKey>> };

/**
 * Validates and accepts a contact message. Delivery is project-specific, so
 * LaunchKit stops at validation: a fresh clone needs no mail or CRM account.
 */
export async function submitContact(input: unknown): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, ContactErrorKey>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message as ContactErrorKey;
    }
    return { ok: false, fieldErrors };
  }

  await deliver(parsed.data);
  return { ok: true };
}

/**
 * Downstream projects: send the message here — email, CRM, webhook. Read any
 * credentials through src/env.ts so a missing value fails safely. Avoid
 * logging message contents; they are personal data.
 */
function deliver(message: ContactMessage): Promise<void> {
  void message;
  return Promise.resolve();
}

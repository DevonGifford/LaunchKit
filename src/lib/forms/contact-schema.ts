import { z } from 'zod';

export const contactTopics = ['project', 'foundation', 'other'] as const;
export const MESSAGE_MIN_LENGTH = 20;

/**
 * Shared by the browser (instant feedback) and the server action (the
 * authority — never trust client validation alone). Each error message is a
 * key under `ContactForm.errors` in messages/*.json, so the UI can translate it.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, { error: 'name' }).max(120, { error: 'name' }),
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: 'email' })),
  topic: z.enum(contactTopics, { error: 'topic' }),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN_LENGTH, { error: 'message' })
    .max(5000, { error: 'message' }),
  consent: z.boolean().refine((value) => value, { error: 'consent' }),
});

export type ContactFormInput = z.input<typeof contactSchema>;
export type ContactMessage = z.output<typeof contactSchema>;
export type ContactField = keyof ContactFormInput;
export type ContactErrorKey = ContactField;

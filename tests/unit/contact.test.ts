import { describe, expect, it } from 'vitest';
import { submitContact } from '@/lib/forms/contact-action';
import { contactSchema } from '@/lib/forms/contact-schema';

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  topic: 'project',
  message: 'I would like to build a new site from LaunchKit.',
  consent: true,
};

describe('contact schema', () => {
  it('accepts a complete message and trims whitespace', () => {
    const result = contactSchema.safeParse({
      ...valid,
      name: '  Ada  ',
      email: ' ada@example.com ',
    });
    expect(result.data).toMatchObject({ name: 'Ada', email: 'ada@example.com' });
  });

  it('reports translation keys, not prose, as error messages', () => {
    const result = contactSchema.safeParse({
      name: ' ',
      email: 'nope',
      topic: 'spam',
      message: 'short',
      consent: false,
    });
    const messages: Record<string, string> = {};
    for (const issue of result.error?.issues ?? []) messages[String(issue.path[0])] = issue.message;
    expect(messages).toEqual({
      name: 'name',
      email: 'email',
      topic: 'topic',
      message: 'message',
      consent: 'consent',
    });
  });
});

describe('submitContact server action', () => {
  it('accepts a valid message', async () => {
    await expect(submitContact(valid)).resolves.toEqual({ ok: true });
  });

  it('re-validates on the server and returns field errors', async () => {
    await expect(submitContact({ ...valid, email: 'not-an-email' })).resolves.toEqual({
      ok: false,
      fieldErrors: { email: 'email' },
    });
  });

  it('rejects input that is not an object at all', async () => {
    const result = await submitContact('<script>');
    expect(result.ok).toBe(false);
  });
});

import { beforeEach, describe, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { ContactForm } from '@/components/forms/contact-form';
import { axeViolations, renderWithIntl } from './utils';

const { submitContact } = vi.hoisted(() => ({ submitContact: vi.fn() }));
vi.mock('@/lib/forms/contact-action', () => ({ submitContact }));

beforeEach(() => {
  submitContact.mockReset();
});

async function fillValidForm() {
  await page.getByLabelText('Name').fill('  Ada Lovelace ');
  await page.getByLabelText('Email').fill('ada@example.com');
  await page.getByRole('combobox', { name: 'Topic' }).click();
  await page.getByRole('option', { name: 'Using LaunchKit' }).click();
  await page.getByLabelText('Message').fill('I would like to start a new site from LaunchKit.');
  await page.getByRole('checkbox', { name: /agree to be contacted/ }).click();
}

describe('contact form', () => {
  test('has no accessibility violations', async () => {
    const screen = await renderWithIntl(<ContactForm />);
    expect(await axeViolations(screen.container)).toEqual([]);
  });

  test('shows linked, translated errors and focuses the first invalid field', async () => {
    const screen = await renderWithIntl(<ContactForm />);
    await page.getByRole('button', { name: 'Send message' }).click();

    const name = page.getByLabelText('Name');
    await expect.element(name).toHaveFocus();
    await expect.element(name).toHaveAttribute('aria-invalid', 'true');
    await expect.element(name).toHaveAccessibleDescription('Please enter your name.');
    await expect.element(page.getByText('Please write at least 20 characters.')).toBeVisible();
    await expect.element(page.getByText('Please choose a topic.')).toBeVisible();
    expect(submitContact).not.toHaveBeenCalled();
    expect(await axeViolations(screen.container)).toEqual([]);
  });

  test('submits validated, trimmed values and confirms success', async () => {
    submitContact.mockResolvedValue({ ok: true });
    await renderWithIntl(<ContactForm />);
    await fillValidForm();
    await page.getByRole('button', { name: 'Send message' }).click();

    const confirmation = page.getByText(/your message has been received/);
    await expect.element(confirmation).toHaveAttribute('role', 'status');
    expect(submitContact).toHaveBeenCalledWith({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      topic: 'foundation',
      message: 'I would like to start a new site from LaunchKit.',
      consent: true,
    });
    await expect.element(confirmation).toHaveFocus();
    await expect.element(page.getByLabelText('Name')).toHaveValue('');
    // The emptied form must not immediately complain about itself.
    await expect.element(page.getByText('Please choose a topic.')).not.toBeInTheDocument();
    await expect.element(page.getByLabelText('Name')).not.toHaveAttribute('aria-invalid', 'true');
  });

  test('shows errors the server returns for individual fields', async () => {
    submitContact.mockResolvedValue({ ok: false, fieldErrors: { email: 'email' } });
    await renderWithIntl(<ContactForm />);
    await fillValidForm();
    await page.getByRole('button', { name: 'Send message' }).click();

    await expect
      .element(page.getByLabelText('Email'))
      .toHaveAccessibleDescription('Please enter a valid email address.');
  });

  test('announces a failure when the request itself fails', async () => {
    submitContact.mockRejectedValue(new Error('Network down'));
    await renderWithIntl(<ContactForm />);
    await fillValidForm();
    await page.getByRole('button', { name: 'Send message' }).click();

    await expect.element(page.getByText(/couldn’t be sent/)).toHaveAttribute('role', 'alert');
  });
});

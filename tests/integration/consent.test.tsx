import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { ConsentGate } from '@/components/layout/consent-gate';
import { ConsentPreferences } from '@/components/layout/consent-preferences';
import { ConsentPrompt } from '@/components/layout/consent-prompt';
import { ConsentProvider, type ConsentService } from '@/components/layout/consent-provider';
import { ConsentSettingsButton } from '@/components/layout/consent-settings-button';
import {
  consentStorageKey,
  createConsentRecord,
  parseConsentRecord,
  type ConsentChoices,
} from '@/lib/consent/consent';
import { axeViolations, renderWithIntl } from './utils';

// next-intl's navigation needs a Next.js runtime; the prompt only renders a link
// to the privacy policy, so a plain anchor stands in (as in navigation.test.tsx).
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: React.ComponentProps<'a'> & { href: string }) => (
    <a href={`/en${href}`} {...props}>
      {children}
    </a>
  ),
}));

// One service that runs for every visitor, and one that waits for analytics.
const services: ConsentService[] = [
  { name: 'Vercel Web Analytics', consent: null },
  { name: 'Example Analytics', consent: 'analytics' },
];

function renderConsent(active: ConsentService[] = services) {
  return renderWithIntl(
    <ConsentProvider services={active}>
      <ConsentPrompt />
      <main id="main" tabIndex={-1}>
        <ConsentSettingsButton />
        <ConsentGate category="analytics">
          <p>Analytics loaded</p>
        </ConsentGate>
      </main>
      <ConsentPreferences />
    </ConsentProvider>,
  );
}

const save = (choices: ConsentChoices) =>
  localStorage.setItem(consentStorageKey, JSON.stringify(createConsentRecord(choices)));
const stored = () => parseConsentRecord(localStorage.getItem(consentStorageKey));
const prompt = () => page.getByRole('region', { name: 'Your privacy' });
const gated = () => page.getByText('Analytics loaded');

async function openPreferences() {
  await page.getByRole('button', { name: 'Privacy settings' }).click();
  const dialog = page.getByRole('dialog', { name: 'Privacy preferences' });
  await expect.element(dialog).toBeVisible();
  return dialog;
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('asks on a first visit, with nothing optional allowed yet', async () => {
  await renderConsent();
  await expect.element(prompt()).toBeVisible();
  await expect.element(gated()).not.toBeInTheDocument();
  expect(stored()).toBeNull();
});

test('mentions anonymous measurement only when a service measures', async () => {
  await renderConsent();
  await expect.element(prompt().getByText(/We count visits/)).toBeVisible();
});

test('promises nothing about measurement when no service measures', async () => {
  await renderConsent([]);
  await expect
    .element(prompt().getByText(/^Analytics and marketing services run only if you allow them\./))
    .toBeVisible();
  await expect.element(prompt().getByText(/We count visits/)).not.toBeInTheDocument();
});

test('accepting all saves the choice, closes the prompt and starts waiting services', async () => {
  await renderConsent();
  await page.getByRole('button', { name: 'Accept all' }).click();

  await expect.element(prompt()).not.toBeInTheDocument();
  await expect.element(gated()).toBeVisible();
  expect(stored()).toMatchObject({ analytics: true, marketing: true });
});

test('rejecting all saves the choice and keeps waiting services off', async () => {
  await renderConsent();
  await page.getByRole('button', { name: 'Reject all' }).click();

  await expect.element(prompt()).not.toBeInTheDocument();
  await expect.element(gated()).not.toBeInTheDocument();
  expect(stored()).toMatchObject({ analytics: false, marketing: false });
});

test('saves a custom choice from the preferences', async () => {
  await renderConsent();
  await page.getByRole('button', { name: 'Manage preferences' }).click();
  const dialog = page.getByRole('dialog', { name: 'Privacy preferences' });

  await dialog.getByRole('switch', { name: 'Marketing' }).click();
  await dialog.getByRole('button', { name: 'Save preferences' }).click();

  await expect.element(dialog).not.toBeInTheDocument();
  await expect.element(prompt()).not.toBeInTheDocument();
  await expect.element(gated()).not.toBeInTheDocument();
  expect(stored()).toMatchObject({ analytics: false, marketing: true });
});

test('restores a saved choice without asking again', async () => {
  save({ analytics: true, marketing: false });
  await renderConsent();

  await expect.element(gated()).toBeVisible();
  await expect.element(prompt()).not.toBeInTheDocument();

  const dialog = await openPreferences();
  await expect.element(dialog.getByRole('switch', { name: 'Analytics' })).toBeChecked();
  await expect.element(dialog.getByRole('switch', { name: 'Marketing' })).not.toBeChecked();
});

test('reopens the preferences later, and withdrawing consent stops the service', async () => {
  save({ analytics: true, marketing: false });
  await renderConsent();
  await expect.element(gated()).toBeVisible();

  const dialog = await openPreferences();
  await dialog.getByRole('switch', { name: 'Analytics' }).click();
  await dialog.getByRole('button', { name: 'Save preferences' }).click();

  await expect.element(gated()).not.toBeInTheDocument();
  expect(stored()).toMatchObject({ analytics: false });
});

test('keeps Necessary on and names the services behind each category', async () => {
  await renderConsent();
  const dialog = await openPreferences();

  const necessary = dialog.getByRole('switch', { name: 'Necessary' });
  await expect.element(necessary).toBeChecked();
  await expect.element(necessary).toBeDisabled();
  await expect.element(dialog.getByText(/Used by Example Analytics\./)).toBeVisible();
  await expect.element(dialog.getByText(/Nothing on this site uses this yet\./)).toBeVisible();
  await expect
    .element(
      dialog.getByText('Always running for every visitor: Vercel Web Analytics.', {
        exact: false,
      }),
    )
    .toBeVisible();

  // Rejecting everything from here still leaves Necessary on.
  await dialog.getByRole('button', { name: 'Reject all' }).click();
  await expect.element(dialog).not.toBeInTheDocument();
  const reopened = await openPreferences();
  await expect.element(reopened.getByRole('switch', { name: 'Necessary' })).toBeChecked();
});

test('works from the keyboard alone', async () => {
  await renderConsent();
  await expect.element(prompt()).toBeVisible();

  await userEvent.tab();
  await expect.element(page.getByRole('link', { name: 'Read the privacy policy' })).toHaveFocus();
  await userEvent.tab();
  await expect.element(page.getByRole('button', { name: 'Reject all' })).toHaveFocus();
  await userEvent.tab();
  await expect.element(page.getByRole('button', { name: 'Accept all' })).toHaveFocus();
  await userEvent.tab();
  await expect.element(page.getByRole('button', { name: 'Manage preferences' })).toHaveFocus();

  await userEvent.keyboard('{Enter}');
  const dialog = page.getByRole('dialog', { name: 'Privacy preferences' });
  await expect.element(dialog).toBeVisible();
  await userEvent.keyboard('{Escape}');
  await expect.element(dialog).not.toBeInTheDocument();
  // Closing without saving decides nothing.
  await expect.element(prompt()).toBeVisible();
  expect(stored()).toBeNull();
});

test('moves focus to the main content once a choice closes the prompt', async () => {
  await renderConsent();
  await page.getByRole('button', { name: 'Manage preferences' }).click();
  const dialog = page.getByRole('dialog', { name: 'Privacy preferences' });
  await dialog.getByRole('button', { name: 'Save preferences' }).click();

  await expect.element(dialog).not.toBeInTheDocument();
  await expect.element(page.getByRole('main')).toHaveFocus();
});

test('returns focus to the privacy settings button when opened from there', async () => {
  save({ analytics: false, marketing: false });
  await renderConsent();
  const dialog = await openPreferences();
  await dialog.getByRole('button', { name: 'Save preferences' }).click();

  await expect.element(dialog).not.toBeInTheDocument();
  await expect.element(page.getByRole('button', { name: 'Privacy settings' })).toHaveFocus();
});

test('has no accessibility violations, asking or managing preferences', async () => {
  const screen = await renderConsent();
  await expect.element(prompt()).toBeVisible();
  expect(await axeViolations(screen.container)).toEqual([]);

  await openPreferences();
  // Contrast is only meaningful once the dialog has finished fading in.
  await expect.poll(() => document.getAnimations().length).toBe(0);
  expect(await axeViolations(document.body)).toEqual([]);
});

test('reserves room for the prompt so it never hides the end of the page', async () => {
  const root = document.documentElement;
  await renderConsent();
  await expect.element(prompt()).toBeVisible();
  await expect.poll(() => root.style.getPropertyValue('--consent-prompt-space')).toMatch(/^\d+px$/);

  await page.getByRole('button', { name: 'Accept all' }).click();
  await expect.poll(() => root.style.getPropertyValue('--consent-prompt-space')).toBe('');
});

test('follows a choice made in another tab', async () => {
  await renderConsent();
  await expect.element(prompt()).toBeVisible();

  save({ analytics: true, marketing: true });
  window.dispatchEvent(new StorageEvent('storage', { key: consentStorageKey }));

  await expect.element(prompt()).not.toBeInTheDocument();
  await expect.element(gated()).toBeVisible();
});

test('still closes the prompt when the browser blocks storage', async () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new DOMException('Blocked', 'SecurityError');
  });
  await renderConsent();
  await page.getByRole('button', { name: 'Reject all' }).click();

  await expect.element(prompt()).not.toBeInTheDocument();
  expect(localStorage.getItem(consentStorageKey)).toBeNull();
});

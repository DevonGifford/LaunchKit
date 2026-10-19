import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { consentStorageKey, createConsentRecord, parseConsentRecord } from '@/lib/consent/consent';
import { ConsentPreferences } from './consent-preferences';
import { ConsentProvider, type ConsentService } from './consent-provider';
import { ConsentSettingsButton } from './consent-settings-button';

// LaunchKit's two services run for every visitor; the third shows how a
// project's own analytics would appear. It's an example, not something LaunchKit loads.
const services: ConsentService[] = [
  { name: 'Vercel Web Analytics', consent: null },
  { name: 'Vercel Speed Insights', consent: null },
  { name: 'PostHog', consent: 'analytics' },
];

const meta = {
  title: 'Layout/Consent preferences',
  component: ConsentPreferences,
  // Each story starts with no saved choice.
  beforeEach: () => {
    localStorage.removeItem(consentStorageKey);
  },
  render: () => (
    <ConsentProvider services={services}>
      {/* In the site, this sits among the footer's legal links. */}
      <ConsentSettingsButton />
      <ConsentPreferences />
    </ConsentProvider>
  ),
} satisfies Meta<typeof ConsentPreferences>;

export default meta;
type Story = StoryObj<typeof meta>;

const openPreferences = async (canvasElement: HTMLElement) => {
  await userEvent.click(within(canvasElement).getByRole('button', { name: 'Privacy settings' }));
  return within(document.body).findByRole('dialog', { name: 'Privacy preferences' });
};

const stored = () => parseConsentRecord(localStorage.getItem(consentStorageKey));

/** The footer's privacy settings button, which opens the preferences at any time. */
export const Default: Story = {};

/**
 * A switch per category. Necessary is always on; the others list the services
 * that use them, and services that run for every visitor are named underneath.
 */
export const Open: Story = {
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const dialog = within(await openPreferences(canvasElement));
    await expect(dialog.getByRole('switch', { name: 'Necessary' })).toBeChecked();
    await expect(dialog.getByRole('switch', { name: 'Necessary' })).toBeDisabled();
    await expect(dialog.getByRole('switch', { name: 'Analytics' })).not.toBeChecked();
    await expect(dialog.getByText(/Used by PostHog/)).toBeInTheDocument();
    await expect(
      dialog.getByText(/Vercel Web Analytics and Vercel Speed Insights/),
    ).toBeInTheDocument();
  },
};

/** Turning on one category and saving stores exactly that choice. */
export const SaveCustomChoice: Story = {
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const dialog = await openPreferences(canvasElement);
    await userEvent.click(within(dialog).getByRole('switch', { name: 'Analytics' }));
    await userEvent.click(within(dialog).getByRole('button', { name: 'Save preferences' }));
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
    await expect(stored()).toMatchObject({ analytics: true, marketing: false });
  },
};

/** Reopened later, the switches show the saved choice. */
export const SavedChoice: Story = {
  tags: ['!autodocs'],
  beforeEach: () => {
    localStorage.setItem(
      consentStorageKey,
      JSON.stringify(createConsentRecord({ analytics: true, marketing: false })),
    );
  },
  play: async ({ canvasElement }) => {
    const dialog = within(await openPreferences(canvasElement));
    await expect(dialog.getByRole('switch', { name: 'Analytics' })).toBeChecked();
    await expect(dialog.getByRole('switch', { name: 'Marketing' })).not.toBeChecked();
  },
};

export const Mobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    await openPreferences(canvasElement);
  },
};

export const Dark: Story = {
  tags: ['!autodocs'],
  globals: { theme: 'dark' },
  play: async ({ canvasElement }) => {
    await openPreferences(canvasElement);
  },
};

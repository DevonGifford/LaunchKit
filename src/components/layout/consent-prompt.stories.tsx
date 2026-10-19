import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Skeleton } from '@/components/ui/skeleton';
import { consentStorageKey, parseConsentRecord } from '@/lib/consent/consent';
import { ConsentPreferences } from './consent-preferences';
import { ConsentPrompt } from './consent-prompt';
import { ConsentProvider, type ConsentService } from './consent-provider';

// What LaunchKit's own site loads on Vercel: two services that run for every visitor.
const services: ConsentService[] = [
  { name: 'Vercel Web Analytics', consent: null },
  { name: 'Vercel Speed Insights', consent: null },
];

/** A stand-in for the page the prompt floats over. */
function PageBehind() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

const meta = {
  title: 'Layout/Consent prompt',
  component: ConsentPrompt,
  parameters: { layout: 'fullscreen' },
  // Every story is a first visit.
  beforeEach: () => {
    localStorage.removeItem(consentStorageKey);
  },
  decorators: [
    (Story) => (
      <ConsentProvider services={services}>
        <PageBehind />
        <Story />
        <ConsentPreferences />
      </ConsentProvider>
    ),
  ],
} satisfies Meta<typeof ConsentPrompt>;

export default meta;
type Story = StoryObj<typeof meta>;

const stored = () => parseConsentRecord(localStorage.getItem(consentStorageKey));

/**
 * Shown in place here. On a page it's fixed to the viewport: see the Desktop,
 * Tablet and Mobile stories.
 */
export const Default: Story = {
  args: { className: 'static mx-auto mb-10 max-w-96' },
};

/**
 * With no service running for every visitor (off Vercel, or with both Vercel
 * switches off), the prompt drops its sentence about measurement.
 */
export const WithoutMeasurement: Story = {
  args: { className: 'static mx-auto mb-10 max-w-96' },
  decorators: [
    (Story) => (
      <ConsentProvider services={[]}>
        <Story />
      </ConsentProvider>
    ),
  ],
  play: async ({ canvasElement }) => {
    const prompt = await within(canvasElement).findByRole('region', { name: 'Your privacy' });
    await expect(within(prompt).queryByText(/We count visits/)).toBeNull();
  },
};

/** A compact card at the bottom right from 1024px. */
export const Desktop: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'desktop' } },
};

/** Below 1024px, a full-width panel along the bottom, inside the page gutters. */
export const Tablet: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'tablet' } },
};

export const Mobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
};

export const Dark: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'desktop' }, theme: 'dark' },
};

/** Accepting everything saves the choice and closes the prompt. */
export const AcceptAll: Story = {
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Accept all' }));
    await waitFor(() => expect(canvas.queryByRole('region', { name: 'Your privacy' })).toBeNull());
    await expect(stored()).toMatchObject({ analytics: true, marketing: true });
  },
};

/** Rejecting is one click too, with the same weight as accepting. */
export const RejectAll: Story = {
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Reject all' }));
    await waitFor(() => expect(canvas.queryByRole('region', { name: 'Your privacy' })).toBeNull());
    await expect(stored()).toMatchObject({ analytics: false, marketing: false });
  },
};

/** Reachable by keyboard: Tab to a choice, then Enter. */
export const Keyboard: Story = {
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prompt = await canvas.findByRole('region', { name: 'Your privacy' });
    await userEvent.tab();
    await expect(
      within(prompt).getByRole('link', { name: 'Read the privacy policy' }),
    ).toHaveFocus();
    await userEvent.tab();
    await expect(within(prompt).getByRole('button', { name: 'Reject all' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(canvas.queryByRole('region', { name: 'Your privacy' })).toBeNull());
  },
};

/** Manage preferences opens the dialog over the prompt. */
export const ManagePreferences: Story = {
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Manage preferences' }));
    const dialog = await within(document.body).findByRole('dialog', {
      name: 'Privacy preferences',
    });
    await expect(within(dialog).getByRole('switch', { name: 'Necessary' })).toBeDisabled();
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ErrorState } from './error-state';

const meta = {
  title: 'Layout/Error',
  component: ErrorState,
  parameters: { layout: 'fullscreen' },
  args: { onRetry: fn(), digest: '2847193650' },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A server error: Next passes a digest that matches its logs, shown as a reference. */
export const Default: Story = {};

/** Errors thrown in the browser have no digest, so there is no reference. */
export const WithoutReference: Story = { args: { digest: undefined } };

/** "Try again" asks Next to render the page again. */
export const TriesAgain: Story = {
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Try again' }));
    await expect(args.onRetry).toHaveBeenCalledOnce();
  },
};

export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

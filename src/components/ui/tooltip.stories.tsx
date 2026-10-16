import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CopyIcon } from 'lucide-react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const meta = {
  title: 'UI/Overlays/Tooltip',
  component: Tooltip,
  decorators: [
    // One provider near the root of the app shares the open and close delays.
    (Story) => (
      <TooltipProvider>
        <div className="p-10">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A short hint on hover or keyboard focus. Never put essential information or
 * interactive content in a tooltip, and keep the trigger's own accessible name.
 */
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Copy link">
          <CopyIcon aria-hidden="true" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy link</TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const body = within(document.body);
    await userEvent.tab();
    await expect(within(canvasElement).getByRole('button', { name: 'Copy link' })).toHaveFocus();
    await expect(await body.findByRole('tooltip')).toHaveTextContent('Copy link');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('tooltip')).not.toBeInTheDocument());
  },
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Opens to the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

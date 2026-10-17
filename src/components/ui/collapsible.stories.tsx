import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ChevronsUpDownIcon } from 'lucide-react';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from './button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';

const meta = {
  title: 'UI/Content/Collapsible',
  component: Collapsible,
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Collapsible {...args} className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium">3 components changed upstream</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Show changed components">
            <ChevronsUpDownIcon aria-hidden="true" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">button.tsx</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">dialog.tsx</div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">sheet.tsx</div>
      </CollapsibleContent>
    </Collapsible>
  ),
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Shows and hides one section. Use an accordion for several. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Show changed components' });
    await expect(canvas.queryByText('dialog.tsx')).not.toBeInTheDocument();
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText('dialog.tsx')).toBeVisible();
  },
};

export const Open: Story = { args: { defaultOpen: true } };

export const Disabled: Story = { args: { disabled: true } };

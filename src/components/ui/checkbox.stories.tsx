import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Checkbox } from './checkbox';
import { Label } from './label';

const meta = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  args: { id: 'terms' },
  decorators: [
    (Story) => (
      <div className="flex items-center gap-3">
        <Story />
        <Label htmlFor="terms">Accept the terms</Label>
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox', { name: 'Accept the terms' });
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};

export const Checked: Story = { args: { defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true } };

export const Invalid: Story = { args: { 'aria-invalid': true } };

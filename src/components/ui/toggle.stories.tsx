import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BoldIcon, BookmarkIcon } from 'lucide-react';
import { expect, userEvent, within } from 'storybook/test';
import { Toggle } from './toggle';

const meta = {
  title: 'UI/Actions/Toggle',
  component: Toggle,
  args: { 'aria-label': 'Bold', children: <BoldIcon aria-hidden="true" /> },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A two-state button. Its pressed state is announced with `aria-pressed`. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole('button', { name: 'Bold' });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  },
};

export const Outline: Story = { args: { variant: 'outline' } };

export const WithText: Story = {
  args: {
    'aria-label': undefined,
    variant: 'outline',
    children: (
      <>
        <BookmarkIcon aria-hidden="true" data-icon="inline-start" />
        Save
      </>
    ),
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Toggle {...args} size="sm" variant="outline" />
      <Toggle {...args} variant="outline" />
      <Toggle {...args} size="lg" variant="outline" />
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true, variant: 'outline' } };

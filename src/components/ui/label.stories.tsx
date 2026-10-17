import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './input';
import { Label } from './label';

const meta = {
  title: 'UI/Forms/Label',
  component: Label,
  args: { children: 'Full name', htmlFor: 'name' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Clicking the label focuses the control it names. */
export const WithInput: Story = {
  render: (args) => (
    <div className="grid max-w-sm gap-2">
      <Label {...args} />
      <Input id="name" autoComplete="name" />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './input';
import { Label } from './label';

const meta = {
  title: 'UI/Forms/Input',
  component: Input,
  args: { id: 'email', type: 'email', placeholder: 'you@example.com' },
  argTypes: { type: { control: 'select', options: ['text', 'email', 'password', 'search'] } },
  decorators: [
    (Story) => (
      <div className="grid max-w-sm gap-2">
        <Label htmlFor="email">Email</Label>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Disabled: Story = { args: { disabled: true } };

/** `aria-invalid` drives the destructive border and ring. */
export const Invalid: Story = { args: { 'aria-invalid': true, defaultValue: 'not-an-email' } };

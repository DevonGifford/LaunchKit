import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from './label';
import { Textarea } from './textarea';

const meta = {
  title: 'UI/Forms/Textarea',
  component: Textarea,
  args: { id: 'message', placeholder: 'How can we help?' },
  decorators: [
    (Story) => (
      <div className="grid max-w-sm gap-2">
        <Label htmlFor="message">Message</Label>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Grows with its content (`field-sizing-content`). */
export const Playground: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const Invalid: Story = { args: { 'aria-invalid': true, defaultValue: 'Hi' } };

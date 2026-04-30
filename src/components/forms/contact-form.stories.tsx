import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ContactForm } from './contact-form';

const meta = {
  title: 'Forms/Contact form',
  component: ContactForm,
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

/** Submitting an empty form shows a translated error beside every field. */
export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));
    await expect(await canvas.findByText('Please enter your name.')).toBeVisible();
    await expect(canvas.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByLabelText('Name')).toHaveFocus();
  },
};

export const OnMobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
};

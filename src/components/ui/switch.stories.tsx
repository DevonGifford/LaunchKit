import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Field, FieldContent, FieldDescription, FieldLabel } from './field';
import { Switch } from './switch';

const meta = {
  title: 'UI/Forms/Switch',
  component: Switch,
  args: { id: 'auto-update' },
  argTypes: { size: { control: 'inline-radio', options: ['default', 'sm'] } },
  render: (args) => (
    <Field orientation="horizontal" className="max-w-sm">
      <Switch {...args} />
      <FieldLabel htmlFor="auto-update">Install updates automatically</FieldLabel>
    </Field>
  ),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Use a switch for a setting that applies straight away; use a checkbox in forms. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole('switch', {
      name: 'Install updates automatically',
    });
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
    await userEvent.keyboard(' ');
    await expect(toggle).not.toBeChecked();
  },
};

export const Checked: Story = { args: { defaultChecked: true } };

export const Small: Story = { args: { size: 'sm' } };

export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

export const WithDescription: Story = {
  render: (args) => (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="auto-update">Install updates automatically</FieldLabel>
        <FieldDescription id="auto-update-hint">
          Security fixes are always installed.
        </FieldDescription>
      </FieldContent>
      <Switch {...args} aria-describedby="auto-update-hint" />
    </Field>
  ),
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Label } from './label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';

const meta = {
  title: 'UI/Forms/Select',
  component: Select,
  decorators: [
    (Story) => (
      <div className="grid w-56 gap-2">
        <Label htmlFor="language">Language</Label>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

function Options() {
  return (
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Languages</SelectLabel>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
        <SelectItem value="de">Deutsch</SelectItem>
      </SelectGroup>
    </SelectContent>
  );
}

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger id="language" className="w-full">
        <SelectValue placeholder="Choose a language" />
      </SelectTrigger>
      <Options />
    </Select>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('combobox', { name: 'Language' }));
    // Radix renders the listbox in a portal on document.body.
    const option = await within(document.body).findByRole('option', { name: 'Español' });
    await userEvent.click(option);
    await expect(within(canvasElement).getByRole('combobox')).toHaveTextContent('Español');
  },
};

export const Small: Story = {
  render: (args) => (
    <Select {...args} defaultValue="en">
      <SelectTrigger id="language" size="sm" className="w-full">
        <SelectValue />
      </SelectTrigger>
      <Options />
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled defaultValue="en">
      <SelectTrigger id="language" className="w-full">
        <SelectValue />
      </SelectTrigger>
      <Options />
    </Select>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger id="language" aria-invalid className="w-full">
        <SelectValue placeholder="Choose a language" />
      </SelectTrigger>
      <Options />
    </Select>
  ),
};

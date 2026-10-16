import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon } from 'lucide-react';
import { expect, userEvent, within } from 'storybook/test';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

const meta = {
  title: 'UI/Actions/Toggle group',
  component: ToggleGroup,
  args: { type: 'single', defaultValue: 'left', variant: 'outline', 'aria-label': 'Alignment' },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One choice at a time, like radio buttons. Arrow keys move between items. */
export const Single: Story = {
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align centre">
        <AlignCenterIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: 'Align right' }));
    await expect(canvas.getByRole('radio', { name: 'Align right' })).toBeChecked();
    await expect(canvas.getByRole('radio', { name: 'Align left' })).not.toBeChecked();
  },
};

/** Any number of choices, like checkboxes. */
export const Multiple: Story = {
  args: { type: 'multiple', defaultValue: ['bold'], 'aria-label': 'Text style' },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithText: Story = {
  args: { defaultValue: 'month', 'aria-label': 'Period' },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
      <ToggleGroupItem value="year">Year</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Disabled: Story = { args: { disabled: true }, render: Single.render };

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Field, FieldDescription, FieldTitle } from './field';
import { Slider } from './slider';

const meta = {
  title: 'UI/Forms/Slider',
  component: Slider,
  args: { defaultValue: [40], max: 100, step: 5, thumbLabels: ['Volume'] },
  decorators: [
    (Story) => (
      <div className="max-w-sm pt-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const thumb = within(canvasElement).getByRole('slider', { name: 'Volume' });
    thumb.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(thumb).toHaveAttribute('aria-valuenow', '45');
  },
};

/** Two thumbs select a range. */
export const Range: Story = {
  args: { defaultValue: [20, 80], thumbLabels: ['Minimum price', 'Maximum price'] },
};

export const Disabled: Story = { args: { disabled: true } };

function WithValue() {
  const [value, setValue] = useState([60]);
  return (
    <Field>
      <div className="flex items-center justify-between">
        <FieldTitle>Monthly budget</FieldTitle>
        <output htmlFor="budget" className="text-sm text-muted-foreground tabular-nums">
          €{value[0]}
        </output>
      </div>
      <Slider
        id="budget"
        value={value}
        onValueChange={setValue}
        max={200}
        step={10}
        thumbLabels={['Monthly budget']}
      />
      <FieldDescription>Drag or use the arrow keys.</FieldDescription>
    </Field>
  );
}

/** A labelled slider that shows its current value. */
export const WithLabelAndValue: Story = { render: () => <WithValue /> };

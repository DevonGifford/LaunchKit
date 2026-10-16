import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useEffect, useState } from 'react';
import { Field, FieldTitle } from './field';
import { Progress } from './progress';

const meta = {
  title: 'UI/Feedback/Progress',
  component: Progress,
  args: { value: 60, 'aria-label': 'Upload progress' },
  argTypes: { value: { control: { type: 'range', min: 0, max: 100 } } },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Give it an accessible name; the value is announced as a percentage. */
export const Default: Story = {};

export const Empty: Story = { args: { value: 0 } };

export const Complete: Story = { args: { value: 100 } };

function LabelledProgress() {
  const [value, setValue] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => setValue((v) => (v >= 100 ? 10 : v + 15)), 800);
    return () => clearInterval(timer);
  }, []);
  return (
    <Field>
      <div className="flex justify-between">
        <FieldTitle id="publish-label">Publishing</FieldTitle>
        <span className="text-sm text-muted-foreground tabular-nums">{Math.min(value, 100)}%</span>
      </div>
      <Progress value={Math.min(value, 100)} aria-labelledby="publish-label" />
    </Field>
  );
}

/** A visible label and percentage, updating over time. */
export const WithLabel: Story = { render: () => <LabelledProgress /> };

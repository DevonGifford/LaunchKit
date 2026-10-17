import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CircleAlertIcon, InfoIcon } from 'lucide-react';
import { Alert, AlertAction, AlertDescription, AlertTitle } from './alert';
import { Button } from './button';

const meta = {
  title: 'UI/Feedback/Alert',
  component: Alert,
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'destructive'] } },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A message that needs attention but not an immediate decision. It uses role="alert". */
export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <InfoIcon aria-hidden="true" />
      <AlertTitle>A new LaunchKit release is available</AlertTitle>
      <AlertDescription>Version 0.3 adds date pickers and a questionnaire.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: { variant: 'destructive' },
  render: (args) => (
    <Alert {...args}>
      <CircleAlertIcon aria-hidden="true" />
      <AlertTitle>Your payment failed</AlertTitle>
      <AlertDescription>Update your card to keep the site online after 30 June.</AlertDescription>
    </Alert>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <Alert {...args}>
      <InfoIcon aria-hidden="true" />
      <AlertTitle>Two components need review</AlertTitle>
      <AlertDescription>They changed upstream since your last sync.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">
          Review
        </Button>
      </AlertAction>
    </Alert>
  ),
};

export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <InfoIcon aria-hidden="true" />
      <AlertTitle>Changes saved</AlertTitle>
    </Alert>
  ),
};

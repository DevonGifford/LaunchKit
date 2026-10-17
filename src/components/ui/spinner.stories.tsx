import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './badge';
import { Button } from './button';
import { Spinner } from './spinner';

const meta = {
  title: 'UI/Feedback/Spinner',
  component: Spinner,
  args: { label: 'Loading' },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** An indeterminate loading indicator with role="status" and a translated label. */
export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Spinner {...args} className="size-3" />
      <Spinner {...args} />
      <Spinner {...args} className="size-6" />
      <Spinner {...args} className="size-8" />
    </div>
  ),
};

/** In a button, disable it while the work runs. */
export const InButton: Story = {
  render: (args) => (
    <Button disabled>
      <Spinner {...args} label="Saving" data-icon="inline-start" />
      Saving
    </Button>
  ),
};

export const InBadge: Story = {
  render: (args) => (
    <Badge variant="secondary">
      <Spinner {...args} label="Syncing" data-icon="inline-start" />
      Syncing
    </Badge>
  ),
};

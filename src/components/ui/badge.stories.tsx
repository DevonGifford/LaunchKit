import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CheckIcon } from 'lucide-react';
import { Badge } from './badge';

const meta = {
  title: 'UI/Feedback/Badge',
  component: Badge,
  args: { children: 'New' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args}>Default</Badge>
      <Badge {...args} variant="secondary">
        Secondary
      </Badge>
      <Badge {...args} variant="destructive">
        Overdue
      </Badge>
      <Badge {...args} variant="outline">
        Draft
      </Badge>
      <Badge {...args} variant="ghost">
        Ghost
      </Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <CheckIcon aria-hidden="true" data-icon="inline-start" />
        Verified
      </>
    ),
  },
};

/** A badge can be a link with `asChild`. */
export const AsLink: Story = {
  render: (args) => (
    <Badge {...args} variant="outline" asChild>
      <a href="#changelog">Changelog</a>
    </Badge>
  ),
};

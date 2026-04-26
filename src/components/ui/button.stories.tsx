import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from './button';

const meta = {
  title: 'UI/Actions/Button',
  component: Button,
  args: { children: 'Get started' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'default', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>Primary</Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args}>Default</Button>
      <Button {...args} size="lg">
        Large <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
      </Button>
    </div>
  ),
};

/** The inverse variants keep contrast on the high-emphasis band in both appearances. */
export const OnEmphasisBand: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3 rounded-xl bg-emphasis p-8 text-emphasis-foreground">
      <Button {...args} variant="inverse" size="lg">
        Read the guide
      </Button>
      <Button {...args} variant="inverse-outline" size="lg">
        Get in touch
      </Button>
    </div>
  ),
};

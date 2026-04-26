import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Logo } from './logo';

const meta = {
  title: 'UI/LaunchKit/Logo',
  component: Logo,
  args: { className: 'h-10 text-foreground' },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drawn in currentColor from an alpha mask — switch the theme to see it follow. */
export const Lockup: Story = { args: { variant: 'lockup' } };

export const Emblem: Story = { args: { variant: 'emblem', className: 'h-16 text-foreground' } };

export const OnEmphasisBand: Story = {
  render: (args) => (
    <div className="rounded-xl bg-emphasis p-10 text-emphasis-foreground">
      <Logo {...args} className="h-10" />
    </div>
  ),
};

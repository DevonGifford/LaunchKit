import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Separator } from './separator';

const meta = {
  title: 'UI/Content/Separator',
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Decorative by default (hidden from assistive technology). */
export const Horizontal: Story = {
  render: (args) => (
    <div className="max-w-sm space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-medium">LaunchKit</p>
        <p className="text-sm text-muted-foreground">A reusable website foundation.</p>
      </div>
      <Separator {...args} />
      <p className="text-sm text-muted-foreground">Build once. Reuse often.</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div className="flex h-5 items-center gap-4 text-sm">
      <span>Docs</span>
      <Separator {...args} />
      <span>Components</span>
      <Separator {...args} />
      <span>Changelog</span>
    </div>
  ),
};

/** Set `decorative={false}` when the division carries meaning for screen readers. */
export const Semantic: Story = {
  args: { decorative: false },
  render: Horizontal.render,
};

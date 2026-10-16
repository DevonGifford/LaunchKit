import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton } from './skeleton';

const meta = {
  title: 'UI/Feedback/Skeleton',
  component: Skeleton,
  args: { className: 'h-4 w-48' },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A placeholder shaped like the content that's loading. */
export const Default: Story = {};

/**
 * Skeletons are decorative, so hide them from assistive technology and announce
 * the loading state once on the container.
 */
export const Card: Story = {
  render: () => (
    <div aria-busy="true" aria-label="Loading project" className="w-72 space-y-3" role="status">
      <Skeleton aria-hidden="true" className="aspect-video w-full rounded-xl" />
      <div aria-hidden="true" className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ),
};

export const ListItem: Story = {
  render: () => (
    <div aria-busy="true" aria-label="Loading team" className="w-72 space-y-4" role="status">
      {[0, 1, 2].map((row) => (
        <div key={row} aria-hidden="true" className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  ),
};

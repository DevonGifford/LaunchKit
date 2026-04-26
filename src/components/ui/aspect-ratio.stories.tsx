import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Image from 'next/image';
import { AspectRatio } from './aspect-ratio';

const meta = {
  title: 'UI/Content/Aspect ratio',
  component: AspectRatio,
  args: { ratio: 16 / 9 },
  argTypes: {
    ratio: { control: 'select', options: [16 / 9, 4 / 3, 1, 3 / 4] },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <AspectRatio {...args} className="overflow-hidden rounded-lg bg-muted">
      <Image
        src="/brand/launchkit-og.png"
        alt="LaunchKit social preview"
        fill
        sizes="28rem"
        className="object-cover"
      />
    </AspectRatio>
  ),
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Keeps media at a fixed shape as its width changes, so the page doesn't jump. */
export const Widescreen: Story = {};

export const Square: Story = { args: { ratio: 1 } };

export const Portrait: Story = { args: { ratio: 3 / 4 } };

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from './avatar';

const meta = {
  title: 'UI/Content/Avatar',
  component: Avatar,
  args: { size: 'default' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] } },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>AM</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Initials stand in until an `AvatarImage` loads, or when there is none. */
export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

/** Overlapping avatars, with a count for the rest. */
export const Group: Story = {
  render: () => (
    <AvatarGroup>
      {['AM', 'JK', 'LR'].map((initials) => (
        <Avatar key={initials}>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+8</AvatarGroupCount>
    </AvatarGroup>
  ),
};

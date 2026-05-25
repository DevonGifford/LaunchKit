import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Container } from './container';

const meta = {
  title: 'UI/Content/Container',
  component: Container,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Centres content up to `max-w-6xl`, with gutters that widen at `sm` and `lg`. */
export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <div className="rounded-lg border border-dashed bg-muted p-6 text-sm text-muted-foreground">
        Content sits inside the container’s gutters. Resize the viewport to see them change.
      </div>
    </Container>
  ),
};

export const OnMobile: Story = {
  ...Default,
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
};

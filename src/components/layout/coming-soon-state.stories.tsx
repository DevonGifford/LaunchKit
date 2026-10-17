import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComingSoonState } from './coming-soon-state';

const meta = {
  title: 'Layout/Coming soon',
  component: ComingSoonState,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ComingSoonState>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The general message, for any page that isn't ready yet. */
export const Default: Story = {};

/** A page can say what is coming in its own words. */
export const ForAPage: Story = {
  args: {
    title: 'Pricing is on its way',
    description:
      'We’re finalising plans for teams of every size. Get in touch in the meantime and we’ll walk you through the options.',
  },
};

export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

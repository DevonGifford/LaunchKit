import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiteFooter } from './site-footer';

const meta = {
  title: 'Layout/Site footer',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['simple', 'full', 'compact', 'mobile'] },
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The brand beside a column per link group and one for the languages. */
export const Full: Story = { args: { variant: 'full' } };

/** Below 1024px the columns move under the brand. */
export const FullOnTablet: Story = {
  tags: ['!autodocs'],
  args: { variant: 'full' },
  globals: { viewport: { value: 'tablet' } },
};

/** The Midnight appearance. */
export const FullDark: Story = {
  tags: ['!autodocs'],
  args: { variant: 'full' },
  globals: { theme: 'dark' },
};

/** One short band: the essential groups and the languages as rows beside the brand. */
export const Compact: Story = { args: { variant: 'compact' } };

/** Below 1024px the rows move under the brand. */
export const CompactOnTablet: Story = {
  tags: ['!autodocs'],
  args: { variant: 'compact' },
  globals: { viewport: { value: 'tablet' } },
};

/** The Midnight appearance. */
export const CompactDark: Story = {
  tags: ['!autodocs'],
  args: { variant: 'compact' },
  globals: { theme: 'dark' },
};

/** For phones: the groups and languages two to a row, the legal links last. */
export const Mobile: Story = {
  tags: ['!autodocs'],
  args: { variant: 'mobile' },
  globals: { viewport: { value: 'mobile' } },
};

/** The Midnight appearance. */
export const MobileDark: Story = {
  tags: ['!autodocs'],
  args: { variant: 'mobile' },
  globals: { viewport: { value: 'mobile' }, theme: 'dark' },
};

/** The footer the site layout uses today. */
export const Simple: Story = { args: { variant: 'simple' } };

/** The simple footer on a phone. */
export const SimpleOnMobile: Story = {
  tags: ['!autodocs'],
  args: { variant: 'simple' },
  globals: { viewport: { value: 'mobile' } },
};

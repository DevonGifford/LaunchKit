import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SectionOf } from '@/lib/content/types';
import { MarketingStats } from './marketing-stats';

/** Fixture copy until the section is placed on a page. */
const section = {
  id: 'numbers',
  type: 'marketing-stats',
  eyebrow: 'By the numbers',
  title: 'A foundation that keeps up with you.',
  description:
    'Every release is checked by the same suite of tests, in every language and both themes, before it reaches your project.',
  stats: [
    { value: '4', label: 'Languages out of the box' },
    { value: '40+', label: 'Tested components' },
    { value: '400+', label: 'Automated tests' },
  ],
} satisfies SectionOf<'marketing-stats'>;

const meta = {
  title: 'Sections/Marketing/Stats',
  component: MarketingStats,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarketingStats>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The figures in one ruled row. */
export const Default: Story = {};

/** From 640px the figures stay in one row. */
export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

/** On phones the figures stack, ruled between. */
export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

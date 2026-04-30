import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SectionOf } from '@/lib/content/types';
import { MarketingTimeline } from './marketing-timeline';

/** Fixture copy until the section is placed on a page. The estimates are illustrative. */
const section = {
  id: 'timeline',
  type: 'marketing-timeline',
  title: 'Same setup, every time.',
  titleMuted: 'It doesn’t have to be.',
  paragraphs: [
    {
      text: 'A framework, a theme, translations, forms, tests and CI, assembled again for every project and slightly differently each time.',
    },
    { text: 'Nine weeks of work that doesn’t make your site different.', emphasis: true },
    {
      text: 'LaunchKit does that work once and keeps it maintained, so each project starts on what makes it its own.',
    },
  ],
  callout: {
    eyebrow: 'With LaunchKit',
    title: 'Day 1: build what matters',
    description:
      'The foundation is done. Start with the brand, content and features only you can add.',
  },
  timeline: {
    title: 'Development timeline',
    badge: 'Estimate',
    columns: { item: 'Capability', before: 'From scratch', after: 'With LaunchKit' },
    rows: [
      { item: 'Project setup and tooling', before: '1 week', after: 'Day 1' },
      { item: 'Design tokens and theming', before: '1 week', after: 'Day 1' },
      { item: 'Accessible UI components', before: '2 weeks', after: 'Day 1' },
      { item: 'Localisation in four languages', before: '1 week', after: 'Day 1' },
      { item: 'Typed content and sections', before: '1 week', after: 'Day 1' },
      { item: 'Forms and server actions', before: '1 week', after: 'Day 1' },
      { item: 'Unit, browser and end-to-end tests', before: '1 week', after: 'Day 1' },
      { item: 'CI, Git hooks and releases', before: '1 week', after: 'Day 1' },
    ],
    total: { item: 'Total', before: '9 weeks', after: 'Day 1' },
    note: 'Estimated for one experienced developer. Replace these figures with your own.',
  },
} satisfies SectionOf<'marketing-timeline'>;

const meta = {
  title: 'Sections/Marketing/Timeline',
  component: MarketingTimeline,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarketingTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The table and the copy side by side. */
export const Default: Story = {};

/** Below 1024px the table sits above the copy. */
export const Tablet: Story = { globals: { viewport: { value: 'tablet' } } };

/** On phones the item column wraps, so the table fits without scrolling sideways. */
export const OnMobile: Story = { globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const Dark: Story = { globals: { theme: 'dark' } };

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SectionOf } from '@/lib/content/types';
import { MarketingReviews } from './marketing-reviews';

/**
 * Placeholder reviews from fictional people. Replace them with real, attributed
 * quotes, used with permission, before the section is published.
 */
const section = {
  id: 'reviews',
  type: 'marketing-reviews',
  eyebrow: 'Reviews',
  title: 'What teams say about LaunchKit',
  reviews: [
    {
      name: 'Amara Osei',
      role: 'Founder, design studio',
      quote:
        'We launched our new site in a week. The sections, the translations and the tests were already there, so we spent the time on our story instead.',
      href: 'https://example.com/reviews/amara-osei',
    },
    {
      name: 'Jonas Weber',
      role: 'Lead developer, software agency',
      quote:
        'The content model is the part I didn’t know I needed. Typed sections mean the build fails before a broken page ever reaches production.',
    },
    {
      name: 'Lucía Romero',
      role: 'Freelance designer',
      quote:
        'Changing the brand took one file. Both themes followed, and the contrast checks told me where my palette needed work.',
    },
    {
      name: 'Théo Martin',
      role: 'CTO, online retailer',
      quote:
        'Four languages from day one. Our French and German customers finally get the same site as everyone else.',
    },
    {
      name: 'Priya Nair',
      role: 'Product manager, SaaS start-up',
      quote:
        'Storybook made reviews easy: every section on its own, at every width, in both themes, before anything went live.',
    },
    {
      name: 'Sam Okafor',
      role: 'Owner, web agency',
      quote:
        'We start every client project from LaunchKit now, and improvements we make for one client reach the others too.',
    },
  ],
} satisfies SectionOf<'marketing-reviews'>;

const meta = {
  title: 'Sections/Marketing/Reviews',
  component: MarketingReviews,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarketingReviews>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three columns of reviews in one ruled frame. */
export const Default: Story = {};

/** Two columns between 640px and 1024px. */
export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

/** On phones the reviews are a swipeable row, with the next one peeking in. */
export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

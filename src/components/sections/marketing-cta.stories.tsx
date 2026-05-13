import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SectionOf } from '@/lib/content/types';
import { MarketingCta } from './marketing-cta';

/** Fixture copy until the section is placed on a page. */
const section = {
  id: 'start',
  type: 'marketing-cta',
  title: 'Start your next site on LaunchKit.',
  description:
    'Clone the foundation, make the brand your own and launch with tests, themes and translations already in place.',
  primaryAction: { label: 'Get started', href: '/docs/getting-started' },
  secondaryAction: { label: 'Talk to us', href: '/contact' },
} satisfies SectionOf<'marketing-cta'>;

const meta = {
  title: 'Sections/Marketing/CTA',
  component: MarketingCta,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarketingCta>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A contained panel on the muted surface; quieter than the full-width call to action. */
export const Default: Story = {};

export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

/** On phones the actions wrap, centred. */
export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

/** With only the primary action. */
export const SingleAction: Story = { args: { secondaryAction: undefined } };

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SectionOf } from '@/lib/content/types';
import { MarketingHeroLaunchKit } from './marketing-hero-launchkit';

/** Fixture copy until the section is placed on a page. */
const section = {
  id: 'hero',
  type: 'marketing-hero-launchkit',
  eyebrow: 'The modern foundation for your next big idea',
  title: ['Launch faster.', 'Build what matters.'],
  titleHighlight: 'matters.',
  audiences: ['For founders', 'For startups', 'For rewrites'],
  description:
    'A refined foundation for founders, startups and businesses ready for a fresh start.',
  primaryAction: { label: 'Get started', href: '/docs/getting-started' },
  secondaryAction: { label: 'See examples', href: '/#adapt' },
  showcase: {
    light: '/marketing/hero-showcase-light.webp',
    dark: '/marketing/hero-showcase-dark.webp',
    alt: 'Three websites built with LaunchKit, shown in browser windows',
    width: 1448,
    height: 1086,
  },
} satisfies SectionOf<'marketing-hero-launchkit'>;

const meta = {
  title: 'Sections/LaunchKit Marketing/Hero LaunchKit',
  component: MarketingHeroLaunchKit,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarketingHeroLaunchKit>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Copy on the left and the showcase bleeding off the right edge, from 1024px. */
export const Default: Story = {};

/** Below 1024px the showcase sits under the copy, wider than the screen and centred. */
export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

/** On phones the showcase is cropped to the central window. */
export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** The Midnight appearance, with its own artwork. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

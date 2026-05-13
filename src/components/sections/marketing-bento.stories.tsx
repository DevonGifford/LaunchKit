import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SectionOf } from '@/lib/content/types';
import { MarketingBento } from './marketing-bento';

/** Screenshots of LaunchKit's own sections, in public/marketing/showcase/. */
const screenshot = (file: string) => ({
  light: `/marketing/showcase/${file}-light.webp`,
  dark: `/marketing/showcase/${file}-dark.webp`,
});

/** Fixture copy until the section is placed on a page. */
const section = {
  id: 'inside',
  type: 'marketing-bento',
  eyebrow: 'Inside LaunchKit',
  title: 'Everything a new site needs, already built.',
  showcase: {
    stat: '20+ sections',
    title: 'Sections for every page',
    description:
      'Heroes, pricing, timelines, FAQs and more, each driven by typed content and ready for both themes.',
    action: { label: 'See what’s included', href: '/#included' },
    images: [
      screenshot('hero'),
      screenshot('pricing'),
      screenshot('timeline'),
      screenshot('infrastructure'),
    ],
    alt: 'LaunchKit sections in turn: the hero, pricing plans, a timeline and an infrastructure overview.',
  },
  marquee: {
    stat: '40+ components',
    title: 'Primitives from shadcn/ui',
    description:
      'Accessible building blocks on Radix UI, restyled with LaunchKit’s tokens and reviewed in Storybook.',
    action: { label: 'Read the docs', href: '/docs' },
    rows: [
      ['Accordion', 'Alert dialog', 'Avatar', 'Badge', 'Button', 'Calendar', 'Card', 'Carousel'],
      ['Checkbox', 'Combobox', 'Dialog', 'Drawer', 'Dropdown menu', 'Popover', 'Select', 'Tabs'],
      ['Input OTP', 'Pagination', 'Radio group', 'Sheet', 'Slider', 'Switch', 'Table', 'Tooltip'],
    ],
  },
  integrations: {
    title: 'Built on tools you know',
    description:
      'Next.js, React and TypeScript underneath; Tailwind CSS, shadcn/ui and Zod on top. Nothing proprietary to learn.',
    tools: [
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'shadcn/ui', icon: 'shadcn-ui' },
      { name: 'Zod', icon: 'zod' },
    ],
  },
  gallery: {
    title: 'Pages that look finished',
    description:
      'Sunlight and Midnight themes, checked for contrast, so every page is presentable from the first deploy.',
    action: { label: 'Make it yours', href: '/docs/making-it-yours' },
    images: [
      { ...screenshot('tech-stack'), alt: 'The tech stack section' },
      { ...screenshot('developer-experience'), alt: 'The developer experience section' },
      { ...screenshot('quality'), alt: 'The quality and automation section' },
    ],
  },
} satisfies SectionOf<'marketing-bento'>;

const meta = {
  title: 'Sections/Marketing/Bento',
  component: MarketingBento,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarketingBento>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Four tiles, two by two. The screenshots take turns and the names drift, unless motion is reduced. */
export const Default: Story = {};

/** Two by two from 768px. */
export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

/** On phones the tiles stack. */
export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast and the dark screenshots. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

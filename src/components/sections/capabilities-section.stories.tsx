import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { CapabilitiesSection } from './capabilities-section';

const learnMore = { label: 'Learn more', href: '/contact' };

/** Fixture copy until the section is placed on a page. */
const cards = {
  id: 'capabilities',
  type: 'capabilities',
  variant: 'cards',
  eyebrow: 'What we do',
  title: 'Engineering capability for real business problems.',
  description:
    'We help companies design, build and run software that creates value, combining experienced engineering teams with modern AI.',
  action: { label: 'Explore our services', href: '/contact' },
  items: [
    {
      icon: 'app-window',
      title: 'Digital products',
      description:
        'Web and mobile applications, designed, engineered and shipped as whole products.',
      action: learnMore,
    },
    {
      icon: 'cloud',
      title: 'Platforms and systems',
      description: 'APIs, services, integrations and cloud infrastructure built to stay reliable.',
      action: learnMore,
    },
    {
      icon: 'sparkles',
      title: 'AI engineering',
      description: 'Products, agents and workflows that put AI to work on real tasks.',
      action: learnMore,
    },
    {
      icon: 'users',
      title: 'Technical leadership',
      description: 'Architecture, modernisation, engineering strategy and fractional leadership.',
      action: learnMore,
    },
  ],
} satisfies SectionOf<'capabilities'>;

const numbered = {
  id: 'capabilities',
  type: 'capabilities',
  variant: 'numbered',
  eyebrow: 'What we do',
  title: 'Specialist engineering for complex environments.',
  description:
    'We design, build and support software for organisations where reliability, security and discretion matter, working alongside your own teams.',
  items: [
    {
      title: 'Project engineering',
      description:
        'Senior teams assembled for defined projects, from new products to critical upgrades.',
      action: learnMore,
    },
    {
      title: 'Embedded engineers',
      description: 'Experienced engineers who join your teams for a defined period.',
      action: learnMore,
    },
    {
      title: 'AI and automation',
      description: 'Practical AI for document processing, research and internal knowledge.',
      action: learnMore,
    },
    {
      title: 'Legacy modernisation',
      description: 'Existing systems extended and improved, with as little disruption as possible.',
      action: learnMore,
    },
  ],
} satisfies SectionOf<'capabilities'>;

const detailed = {
  id: 'capabilities',
  type: 'capabilities',
  variant: 'detailed',
  eyebrow: 'What we do',
  title: 'Identity, digital and communication, designed as one system.',
  description:
    'We help organisations present themselves with confidence through thoughtful design, clear messaging and consistent digital experiences.',
  action: { label: 'Our services', href: '/contact' },
  items: [
    {
      title: 'Brand',
      description:
        'Identity, visual systems and guidelines that give an organisation a clear, recognisable presence.',
      tags: ['Identity', 'Art direction', 'Typography', 'Brand systems', 'Guidelines'],
    },
    {
      title: 'Digital',
      description:
        'Websites and digital experiences that communicate clearly and bring the brand to life online.',
      tags: ['Web design', 'UX and UI', 'Design systems', 'Prototyping', 'Development'],
    },
    {
      title: 'Communications',
      description:
        'Marketing materials and visual communication across every channel a business uses.',
      tags: ['Presentations', 'Reports', 'Campaigns', 'Social', 'Print'],
    },
  ],
} satisfies SectionOf<'capabilities'>;

const meta = {
  title: 'Sections/Capabilities',
  component: CapabilitiesSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CapabilitiesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The items in order (not the tags inside them). */
const items = (canvasElement: HTMLElement) => [
  ...canvasElement.querySelectorAll<HTMLElement>('section > div > :is(ul, ol) > li'),
];

/** Where each item's top edge sits. */
const tops = (canvasElement: HTMLElement) =>
  items(canvasElement).map((item) => Math.round(item.getBoundingClientRect().top));

/** Whether an item has a vertical rule before it. */
const ruled = (item: HTMLElement | undefined) =>
  item ? getComputedStyle(item).borderInlineStartWidth !== '0px' : false;

/** Whether the page scrolls sideways. */
const overflows = (canvasElement: HTMLElement) => {
  const page = canvasElement.ownerDocument.documentElement;
  return page.scrollWidth > page.clientWidth;
};

/** Four cards in a row from 1024px, the heading beside the intro and its link. */
export const Cards: Story = {
  args: cards,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 2 })).toHaveTextContent(cards.title);
    await expect(canvas.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    // The i18n Link adds the locale to internal paths.
    await expect(canvas.getByRole('link', { name: 'Explore our services' })).toHaveAttribute(
      'href',
      '/en/contact',
    );
    await expect(canvas.getAllByRole('link', { name: 'Learn more' })).toHaveLength(4);
    await expect(new Set(tops(canvasElement)).size).toBe(1);
  },
};

/** Two cards to a row on tablets. */
export const CardsOnTablet: Story = {
  tags: ['!autodocs'],
  args: cards,
  globals: { viewport: { value: 'tablet' } },
  play: async ({ canvasElement }) => {
    const [first, second, third] = tops(canvasElement);
    await expect(second).toBe(first);
    await expect(third).toBeGreaterThan(first ?? 0);
  },
};

/** Cards stacked on phones; the page never scrolls sideways. */
export const CardsOnMobile: Story = {
  tags: ['!autodocs'],
  args: cards,
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    const rows = tops(canvasElement);
    await expect(new Set(rows).size).toBe(rows.length);
    await expect(overflows(canvasElement)).toBe(false);
  },
};

/** The Midnight appearance; story tests run axe in light, so this checks dark contrast too. */
export const CardsDark: Story = { tags: ['!autodocs'], args: cards, globals: { theme: 'dark' } };

/** Four numbered columns from 1024px, without a section link. */
export const Numbered: Story = {
  args: numbered,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('listitem')).toHaveLength(4);
    await expect(canvas.getAllByRole('link')).toHaveLength(4);
    await expect(canvas.getByText('04')).toBeInTheDocument();
    await expect(new Set(tops(canvasElement)).size).toBe(1);
  },
};

/** Two numbered columns to a row on tablets. */
export const NumberedOnTablet: Story = {
  tags: ['!autodocs'],
  args: numbered,
  globals: { viewport: { value: 'tablet' } },
  play: async ({ canvasElement }) => {
    const [first, second, third] = tops(canvasElement);
    await expect(second).toBe(first);
    await expect(third).toBeGreaterThan(first ?? 0);
  },
};

/** Numbered items stacked on phones; the page never scrolls sideways. */
export const NumberedOnMobile: Story = {
  tags: ['!autodocs'],
  args: numbered,
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    const rows = tops(canvasElement);
    await expect(new Set(rows).size).toBe(rows.length);
    await expect(overflows(canvasElement)).toBe(false);
  },
};

/** The Midnight appearance of the numbered variant. */
export const NumberedDark: Story = {
  tags: ['!autodocs'],
  args: numbered,
  globals: { theme: 'dark' },
};

/** Three columns from 1024px, a vertical rule between neighbours. */
export const Detailed: Story = {
  args: detailed,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('link', { name: 'Our services' })).toHaveAttribute(
      'href',
      '/en/contact',
    );
    await expect(canvas.getByText('Art direction')).toBeVisible();
    const [first, second, third] = items(canvasElement);
    await expect(first?.getBoundingClientRect().top).toBe(third?.getBoundingClientRect().top);
    await expect([ruled(first), ruled(second), ruled(third)]).toEqual([false, true, true]);
  },
};

/** A second row starts without a rule before it, like the first. */
export const DetailedWithMoreItems: Story = {
  args: {
    ...detailed,
    items: [
      ...detailed.items,
      {
        title: 'Strategy',
        description:
          'Positioning, naming and messaging that set the direction for everything else.',
        tags: ['Research', 'Positioning', 'Naming'],
      },
      {
        title: 'Content',
        description: 'Copy, editorial and photography that keep every channel sounding the same.',
        tags: ['Copywriting', 'Editorial', 'Photography'],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const all = items(canvasElement);
    await expect(all.map(ruled)).toEqual([false, true, true, false, true]);
    await expect(all[3]?.getBoundingClientRect().top).toBeGreaterThan(
      all[0]?.getBoundingClientRect().bottom ?? 0,
    );
  },
};

/** Detailed items stacked between horizontal rules on tablets. */
export const DetailedOnTablet: Story = {
  tags: ['!autodocs'],
  args: detailed,
  globals: { viewport: { value: 'tablet' } },
  play: async ({ canvasElement }) => {
    const [first, second] = items(canvasElement);
    await expect(second?.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      first?.getBoundingClientRect().bottom ?? 0,
    );
    await expect(ruled(second)).toBe(false);
  },
};

/** The same on phones; the page never scrolls sideways. */
export const DetailedOnMobile: Story = {
  tags: ['!autodocs'],
  args: detailed,
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    await expect(overflows(canvasElement)).toBe(false);
  },
};

/** The Midnight appearance of the detailed variant. */
export const DetailedDark: Story = {
  tags: ['!autodocs'],
  args: detailed,
  globals: { theme: 'dark' },
};

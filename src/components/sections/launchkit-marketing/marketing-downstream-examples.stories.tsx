import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { MarketingDownstreamExamples } from './marketing-downstream-examples';

/**
 * Fixture copy until the section is placed on a page. The sites are invented,
 * and their screenshots in tests/fixtures/downstream/ come in three shapes on
 * purpose: a full page, a 16:10 first screen and a 4:3 one.
 */
const section = {
  id: 'company-websites',
  type: 'marketing-downstream-examples',
  title: 'Company Websites',
  description: 'Corporate and brochure websites for established businesses.',
  action: { label: 'View all', href: '/examples' },
  projects: [
    {
      name: 'Atelier',
      description: 'Brand and digital studio for organisations that value considered design.',
      image: '/fixtures/downstream/atelier.webp',
      href: 'https://atelier.example/',
    },
    {
      name: 'Blake & Co.',
      description: 'Software engineering for law firms and financial institutions.',
      image: '/fixtures/downstream/blake-and-co.webp',
      href: 'https://blake-engineering.example/',
    },
    {
      name: 'Principio',
      description: 'Software engineering and AI consulting for ambitious businesses.',
      image: '/fixtures/downstream/principio.webp',
      href: 'https://principio.example/',
    },
  ],
} satisfies SectionOf<'marketing-downstream-examples'>;

const meta = {
  title: 'Sections/Marketing/Downstream examples',
  component: MarketingDownstreamExamples,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarketingDownstreamExamples>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The project cards and their screenshots' frames, featured first. */
const cards = (canvasElement: HTMLElement) =>
  [...canvasElement.querySelectorAll('li a')].map((link) => ({
    card: link.getBoundingClientRect(),
    image: link.querySelector('img')!.parentElement!.getBoundingClientRect(),
  }));

/** Whether the page fits the screen's width. */
const noSidewaysScroll = async (canvasElement: HTMLElement) => {
  const page = canvasElement.ownerDocument.documentElement;
  await expect(page.scrollWidth).toBeLessThanOrEqual(page.clientWidth);
};

/**
 * From 1024px the featured site sits beside the other two, which share its
 * height. Each card links to the live site in the same tab, as LaunchKit's other
 * external links do; the arrow marks it as another site.
 */
const desktopLayout = async (canvasElement: HTMLElement) => {
  const [featured, second, third] = cards(canvasElement);
  await expect(featured!.card.right).toBeLessThan(second!.card.left);
  await expect(featured!.card.width).toBeGreaterThan(second!.card.width);
  await expect(second!.card.bottom).toBeLessThan(third!.card.top);
  await expect(Math.round(third!.card.bottom)).toBe(Math.round(featured!.card.bottom));
  await expect(second!.image.height).toBeGreaterThanOrEqual(112);
  await expect(third!.image.height).toBeGreaterThanOrEqual(112);
  await noSidewaysScroll(canvasElement);
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 2 })).toHaveTextContent(section.title);
    const projects = canvas
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('https://'));
    await expect(projects.map((link) => link.getAttribute('href'))).toEqual(
      section.projects.map((project) => project.href),
    );
    for (const [index, link] of projects.entries()) {
      await expect(link).not.toHaveAttribute('target');
      // The name leads the link's accessible name; the screenshot adds nothing.
      await expect(link.textContent).toMatch(new RegExp(`^${section.projects[index]!.name}`));
      await expect(link.querySelector('img')).toHaveAttribute('alt', '');
    }
    // The i18n Link adds the locale to the internal "View all".
    const viewAll = canvas.getByRole('link', { name: 'View all' });
    await expect(viewAll).toHaveAttribute('href', '/en/examples');
    // The keyboard reaches "View all", then each site once, each with a visible ring.
    await userEvent.tab();
    await expect(viewAll).toHaveFocus();
    for (const link of projects) {
      await userEvent.tab();
      await expect(link).toHaveFocus();
      await expect(getComputedStyle(link).boxShadow).not.toBe('none');
    }
  },
};

/** A wide screen: the featured site is larger, and the other two stack beside it. */
export const Desktop: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'desktop' } },
  play: async ({ canvasElement }) => desktopLayout(canvasElement),
};

/** The Sunlight appearance, on a wide screen. */
export const Light: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'desktop' }, theme: 'light' },
};

/** The Midnight appearance; story tests run axe in light, so this checks dark contrast too. */
export const Dark: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'desktop' }, theme: 'dark' },
};

/** Tablets show the featured site full width, above the other two side by side. */
export const Tablet: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'tablet' } },
  play: async ({ canvasElement }) => {
    const [featured, second, third] = cards(canvasElement);
    await expect(featured!.card.left).toBe(second!.card.left);
    await expect(featured!.card.right).toBe(third!.card.right);
    await expect(featured!.card.bottom).toBeLessThan(second!.card.top);
    await expect(second!.card.top).toBe(third!.card.top);
    await noSidewaysScroll(canvasElement);
  },
};

/** Phones get a compact list: a thumbnail beside each name and description, all alike. */
export const OnMobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    const rows = cards(canvasElement);
    for (const { card, image } of rows) {
      await expect([image.width, image.height]).toEqual([
        rows[0]!.image.width,
        rows[0]!.image.height,
      ]);
      await expect(image.width).toBe(112);
      await expect(image.right).toBeLessThan(card.right - card.width / 2);
    }
    await noSidewaysScroll(canvasElement);
  },
};

/** Phones in the Midnight appearance. */
export const OnMobileDark: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' }, theme: 'dark' },
};

/**
 * Long names and descriptions at 1024px, where the columns are narrowest: they
 * wrap, the screenshots beside the featured one keep at least 7rem, and the
 * columns still end together.
 */
export const LongContent: Story = {
  tags: ['!autodocs'],
  args: {
    title: 'Websites für Kanzleien und Beratungsunternehmen',
    description:
      'Unternehmenswebsites für etablierte Kanzleien, Beratungen und Ingenieurbüros in ganz Europa.',
    projects: [
      {
        name: 'Atelier für Markenentwicklung und digitale Kommunikation',
        description: 'Brand and digital studio for organisations that value considered design.',
        image: '/fixtures/downstream/atelier.webp',
        href: 'https://atelier.example/',
      },
      {
        name: 'Blake & Co. Softwareentwicklung für Rechtsanwaltskanzleien',
        description:
          'Spezialisierte Softwareentwicklung für Kanzleien, Finanzinstitute und Beratungsunternehmen, mit Sicherheit, Diskretion und Kontrolle.',
        image: '/fixtures/downstream/blake-and-co.webp',
        href: 'https://blake-engineering.example/',
      },
      {
        name: 'Principio',
        description:
          'Softwareentwicklung und KI-Beratung für ehrgeizige Unternehmen, von digitalen Produkten bis zu Cloud-Plattformen.',
        image: '/fixtures/downstream/principio.webp',
        href: 'https://principio.example/',
      },
    ],
  },
  parameters: {
    viewport: {
      options: { laptop: { name: 'Laptop (1024)', styles: { width: '1024px', height: '768px' } } },
    },
  },
  globals: { viewport: { value: 'laptop' } },
  play: async ({ canvasElement }) => desktopLayout(canvasElement),
};

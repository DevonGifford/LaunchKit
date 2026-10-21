import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { MarketingDownstreamExamples } from './marketing-downstream-examples';

/**
 * Fixture copy, with placeholder links. The screenshots are design mockups in
 * public/marketing/downstream/, which the Examples page uses too. These three
 * come in different shapes on purpose: a full page (1024×1536), a 16:10 first
 * screen and a 4:3 one.
 */
const section = {
  id: 'company-websites',
  type: 'marketing-downstream-examples',
  title: 'Company Websites',
  description: 'Corporate and brochure websites for established businesses.',
  projects: [
    {
      name: 'Atelier',
      description: 'Brand and digital studio for organisations that value considered design.',
      image: '/marketing/downstream/atelier.webp',
      href: 'https://atelier.example/',
    },
    {
      name: 'Blake & Co.',
      description: 'Software engineering for law firms and financial institutions.',
      image: '/marketing/downstream/blake-and-co.webp',
      href: 'https://blake-engineering.example/',
    },
    {
      name: 'Principio',
      description: 'Software engineering and AI consulting for ambitious businesses.',
      image: '/marketing/downstream/principio.webp',
      href: 'https://principio.example/',
    },
  ],
} satisfies SectionOf<'marketing-downstream-examples'>;

/** A second group, for the stories that show groups one after another. */
const applications = {
  id: 'applications',
  type: 'marketing-downstream-examples',
  title: 'Web & Mobile Applications',
  description: 'Product sites for web and mobile apps.',
  projects: [
    {
      name: 'TableKit',
      description: 'Restaurant reservations, added to any website in minutes.',
      image: '/marketing/downstream/tablekit.webp',
      href: 'https://tablekit.example/',
    },
    {
      name: 'Unpocketed',
      description: 'Record and transcribe audio on Android with the AI models you choose.',
      image: '/marketing/downstream/unpocketed.webp',
      href: 'https://unpocketed.example/',
    },
    {
      name: 'SelfOS',
      description: 'Self-hosted personal data for training, nutrition and habits.',
      image: '/marketing/downstream/selfos.webp',
      href: 'https://selfos.example/',
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
    // One link per site, and no other.
    const projects = canvas.getAllByRole('link');
    await expect(projects.map((link) => link.getAttribute('href'))).toEqual(
      section.projects.map((project) => project.href),
    );
    for (const [index, link] of projects.entries()) {
      await expect(link).not.toHaveAttribute('target');
      // The name leads the link's accessible name; the screenshot adds nothing.
      await expect(link.textContent).toMatch(new RegExp(`^${section.projects[index]!.name}`));
      await expect(link.querySelector('img')).toHaveAttribute('alt', '');
    }
    // The keyboard reaches each site once, with a visible ring.
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
        image: '/marketing/downstream/atelier.webp',
        href: 'https://atelier.example/',
      },
      {
        name: 'Blake & Co. Softwareentwicklung für Rechtsanwaltskanzleien',
        description:
          'Spezialisierte Softwareentwicklung für Kanzleien, Finanzinstitute und Beratungsunternehmen, mit Sicherheit, Diskretion und Kontrolle.',
        image: '/marketing/downstream/blake-and-co.webp',
        href: 'https://blake-engineering.example/',
      },
      {
        name: 'Principio',
        description:
          'Softwareentwicklung und KI-Beratung für ehrgeizige Unternehmen, von digitalen Produkten bis zu Cloud-Plattformen.',
        image: '/marketing/downstream/principio.webp',
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

/**
 * Two groups one after another, as a page shows them under its own hero. The
 * sections' padding alone spaces them; there's no rule between.
 */
export const Stacked: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'desktop' } },
  render: (args) => (
    <>
      <MarketingDownstreamExamples {...args} />
      <MarketingDownstreamExamples {...applications} />
    </>
  ),
  play: async ({ canvasElement }) => {
    const groups = [...canvasElement.querySelectorAll('section')];
    await expect(groups.map((group) => group.querySelector('h2')?.textContent)).toEqual([
      section.title,
      applications.title,
    ]);
    for (const group of groups) await desktopLayout(group);
  },
};

/** The same two groups on phones: one list after another. */
export const StackedOnMobile: Story = {
  ...Stacked,
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => noSidewaysScroll(canvasElement),
};

/**
 * Sites still in progress have no URL yet: their cards are no links and show no
 * arrow, but keep the same layout.
 */
export const InProgress: Story = {
  args: {
    projects: section.projects.map(({ href: _href, ...project }) => project),
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryAllByRole('link')).toEqual([]);
    await expect(canvasElement.querySelectorAll('li')).toHaveLength(3);
    await expect(canvasElement.querySelectorAll('li svg')).toHaveLength(0);
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { HeroSplitSection } from './hero-split-section';

/** Fixture copy until the section is placed on a page. */
const section = {
  id: 'hero',
  type: 'hero-split',
  eyebrow: 'Software engineering for professional services',
  title: 'Engineering for businesses built on trust.',
  description:
    'We provide specialist software engineering teams to law firms, financial institutions and professional-services organisations, helping you modernise systems and introduce AI without compromising security, discretion or control.',
  primaryAction: { label: 'Discuss a project', href: '/contact' },
  secondaryAction: { label: 'Our services', href: '/docs' },
  details: ['London', 'Madrid', 'Europe'],
  image: '/marketing/cta-images/cta-image-2.webp',
  desktopImage: '/marketing/cta-images/cta-image-2-desktop.webp',
  highlights: ['Discretion.', 'Reliability.', 'Modern capability.'],
} satisfies SectionOf<'hero-split'>;

const meta = {
  title: 'Sections/Hero/Hero split',
  component: HeroSplitSection,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof HeroSplitSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The edges of the heading, the button and the photo. */
const edges = (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  return {
    heading: canvas.getByRole('heading', { level: 1 }).getBoundingClientRect(),
    button: canvas.getByRole('link', { name: 'Discuss a project' }).getBoundingClientRect(),
    image: canvasElement.querySelector('img')?.getBoundingClientRect(),
    page: canvasElement.ownerDocument.documentElement,
  };
};

/** The file the browser chose for the photo, once it has one. */
const shownPhoto = async (canvasElement: HTMLElement) => {
  const img = canvasElement.querySelector('img');
  await waitFor(() => expect(img?.currentSrc).toBeTruthy());
  return decodeURIComponent(img?.currentSrc ?? '');
};

/**
 * From 1024px the copy takes the left half and the photo runs to the right edge,
 * in its desktop framing: cropped to the columns.
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent(section.title);
    // The i18n Link adds the locale to internal paths.
    await expect(canvas.getByRole('link', { name: 'Discuss a project' })).toHaveAttribute(
      'href',
      '/en/contact',
    );
    await expect(canvasElement.querySelector('img')).toHaveAttribute('alt', '');
    // The words over the photo are content, so they stay in the accessibility tree.
    const items = canvas.getAllByRole('listitem').map((item) => item.textContent);
    await expect(items.slice(-section.highlights.length)).toEqual(section.highlights);
    const { heading, image, page } = edges(canvasElement);
    await expect(image?.right).toBe(page.clientWidth);
    await expect(heading.right).toBeLessThan(image?.left ?? 0);
    await expect(await shownPhoto(canvasElement)).toContain(section.desktopImage);
  },
};

/**
 * Only the required content: no eyebrow, link, details or words over the photo,
 * and no desktop framing, so the one photo serves every width.
 */
export const Minimal: Story = {
  args: {
    eyebrow: undefined,
    secondaryAction: undefined,
    details: undefined,
    highlights: undefined,
    desktopImage: undefined,
  },
  play: async ({ canvasElement }) => {
    await expect(await shownPhoto(canvasElement)).toContain(section.image);
  },
};

/**
 * A long single word breaks inside the copy's half instead of running under the
 * photo, even at 1024px, where that half is narrowest.
 */
export const LongWord: Story = {
  tags: ['!autodocs'],
  args: { title: 'Softwareentwicklung für Kanzleien.' },
  parameters: {
    viewport: {
      options: { laptop: { name: 'Laptop (1024)', styles: { width: '1024px', height: '768px' } } },
    },
  },
  globals: { viewport: { value: 'laptop' } },
  play: async ({ canvasElement }) => {
    const heading = within(canvasElement).getByRole('heading', { level: 1 });
    await expect(heading.scrollWidth).toBeLessThanOrEqual(heading.clientWidth);
    const { image, page } = edges(canvasElement);
    await expect(heading.getBoundingClientRect().right).toBeLessThan(image?.left ?? 0);
    await expect(page.scrollWidth).toBeLessThanOrEqual(page.clientWidth);
  },
};

/** Whether the photo sits behind the whole hero, copy included, within one screen. */
const behindCopy = async (canvasElement: HTMLElement) => {
  const { heading, button, image, page } = edges(canvasElement);
  const hero = canvasElement.querySelector('section')!.getBoundingClientRect();
  await expect([image?.top, image?.bottom]).toEqual([hero.top, hero.bottom]);
  await expect([image?.left, image?.right]).toEqual([0, page.clientWidth]);
  await expect(heading.top).toBeGreaterThan(hero.top);
  await expect(button.bottom).toBeLessThan(hero.bottom);
  await expect(hero.height).toBeLessThanOrEqual(page.clientHeight);
  await expect(page.scrollWidth).toBeLessThanOrEqual(page.clientWidth);
};

/**
 * On tablets the photo fills the hero behind the copy, which switches to light
 * text. It keeps the original photo: the desktop framing is for 1024px and up.
 */
export const Tablet: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'tablet' } },
  play: async ({ canvasElement }) => {
    await behindCopy(canvasElement);
    await expect(await shownPhoto(canvasElement)).toContain(section.image);
  },
};

/** The same on phones, where the words over the photo are left out. */
export const OnMobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    await behindCopy(canvasElement);
    await expect(within(canvasElement).queryByText('Discretion.')).not.toBeVisible();
    await expect(await shownPhoto(canvasElement)).toContain(section.image);
  },
};

/** Phones in the Midnight appearance. */
export const OnMobileDark: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' }, theme: 'dark' },
};

/** The Midnight appearance; story tests run axe in light, so this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

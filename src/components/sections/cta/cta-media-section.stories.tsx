import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { CtaMediaSection } from './cta-media-section';

/** Fixture copy until the section is placed on a page. */
const section = {
  id: 'cta',
  type: 'cta-media',
  title: 'Have a project in mind?',
  description: 'Tell us where you are, and we will help you plan the next step.',
  primaryAction: { label: 'Start a conversation', href: '/contact' },
  image: '/marketing/cta-images/cta-image-1.webp',
} satisfies SectionOf<'cta-media'>;

const meta = {
  title: 'Sections/CTA/Media',
  component: CtaMediaSection,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof CtaMediaSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The edges of the heading and the action. */
const edges = (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  return {
    heading: canvas.getByRole('heading', { level: 2 }).getBoundingClientRect(),
    action: canvas.getByRole('link').getBoundingClientRect(),
  };
};

/** A dark photo behind the band, faded under the copy; the action sits opposite from 1024px. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Decorative: an empty alt keeps it out of the accessibility tree.
    await expect(canvasElement.querySelector('img')).toHaveAttribute('alt', '');
    await expect(within(canvasElement).getByRole('link')).toHaveAttribute('href', '/en/contact');
    const { heading, action } = edges(canvasElement);
    await expect(action.left).toBeGreaterThan(heading.right);
  },
};

/** A bright photo works too: the wash keeps the copy on an almost plain surface. */
export const WithLightPhoto: Story = {
  args: { image: '/marketing/cta-images/cta-image-3.webp' },
};

/** No photo and no placeholder: a faint dot grid fills the band instead. */
export const WithoutImage: Story = {
  args: { image: undefined },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('img')).toBeNull();
  },
};

/** Stacked on phones; the page never scrolls sideways. */
export const OnMobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    const { heading, action } = edges(canvasElement);
    await expect(action.top).toBeGreaterThan(heading.bottom);
    const page = canvasElement.ownerDocument.documentElement;
    await expect(page.scrollWidth).toBeLessThanOrEqual(page.clientWidth);
  },
};

/** The Midnight appearance; story tests run axe in light, so this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

/** The dot grid in the Midnight appearance. */
export const WithoutImageDark: Story = {
  tags: ['!autodocs'],
  args: { image: undefined },
  globals: { theme: 'dark' },
};

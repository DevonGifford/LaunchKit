import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { CtaSplitSection } from './cta-split-section';

/** Fixture copy until the section is placed on a page. */
const section = {
  id: 'cta',
  type: 'cta-split',
  eyebrow: 'Our approach',
  title: 'Modern tools. Lasting standards.',
  description:
    'Technology keeps changing; what people expect of a well-run organisation does not. We pair current engineering with care for security, reliability and long-term value.',
  primaryAction: { label: 'How we work', href: '/contact' },
  image: '/marketing/cta-images/cta-image-2.webp',
  items: ['Confidentiality', 'Security', 'Accountability', 'Judgement'],
} satisfies SectionOf<'cta-split'>;

const meta = {
  title: 'Sections/CTA/Split',
  component: CtaSplitSection,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof CtaSplitSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The edges of the heading, the list and the photo. */
const edges = (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  return {
    heading: canvas.getByRole('heading', { level: 2 }).getBoundingClientRect(),
    list: canvas.getByRole('list').getBoundingClientRect(),
    image: canvasElement.querySelector('img')?.getBoundingClientRect(),
  };
};

/** From 1024px the photo is a column reaching the left edge, then the copy, a rule and the list. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('listitem')).toHaveLength(4);
    await expect(canvasElement.querySelector('img')).toHaveAttribute('alt', '');
    const { heading, list, image } = edges(canvasElement);
    await expect(image?.left).toBe(0);
    await expect(heading.left).toBeGreaterThan(image?.right ?? Infinity);
    await expect(list.left).toBeGreaterThan(heading.left);
    await expect(Math.round(list.top)).toBeLessThan(Math.round(heading.bottom));
  },
};

/** A bright photo in the column. */
export const WithLightPhoto: Story = {
  args: { image: '/marketing/cta-images/cta-image-4.webp' },
};

/** No photo and no empty column: the copy starts at the page margin, like other sections. */
export const WithoutImage: Story = {
  args: { image: undefined },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('img')).toBeNull();
    // With no photo, the page frame is the section's first child.
    const frame = canvasElement.querySelector('section > div') ?? canvasElement;
    const margin =
      frame.getBoundingClientRect().left + parseFloat(getComputedStyle(frame).paddingLeft);
    await expect(edges(canvasElement).heading.left).toBe(margin);
  },
};

/** The photo becomes a strip above the copy, and the list sits beside it. */
export const Tablet: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'tablet' } },
  play: async ({ canvasElement }) => {
    const { heading, list, image } = edges(canvasElement);
    await expect(image?.bottom).toBeLessThanOrEqual(heading.top);
    await expect(list.left).toBeGreaterThan(heading.left);
  },
};

/** Everything stacks on phones, the list under the copy; the page never scrolls sideways. */
export const OnMobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    const { heading, list, image } = edges(canvasElement);
    await expect(image?.bottom).toBeLessThanOrEqual(heading.top);
    await expect(list.top).toBeGreaterThan(heading.bottom);
    const page = canvasElement.ownerDocument.documentElement;
    await expect(page.scrollWidth).toBeLessThanOrEqual(page.clientWidth);
  },
};

/** The Midnight appearance; story tests run axe in light, so this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

/** Without a photo in the Midnight appearance. */
export const WithoutImageDark: Story = {
  tags: ['!autodocs'],
  args: { image: undefined },
  globals: { theme: 'dark' },
};

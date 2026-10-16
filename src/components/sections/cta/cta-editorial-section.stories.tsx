import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { CtaEditorialSection } from './cta-editorial-section';

/** Fixture copy until the section is placed on a page. */
const section = {
  id: 'cta',
  type: 'cta-editorial',
  eyebrow: 'Ready to start something new?',
  title: 'Let’s talk about your project.',
  primaryAction: { label: 'Start a conversation', href: '/contact' },
} satisfies SectionOf<'cta-editorial'>;

const meta = {
  title: 'Sections/CTA/Editorial',
  component: CtaEditorialSection,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof CtaEditorialSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The edges of the heading and the action. */
const edges = (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  return {
    heading: canvas.getByRole('heading', { level: 2 }).getBoundingClientRect(),
    action: canvas.getByRole('link', { name: 'Start a conversation' }).getBoundingClientRect(),
  };
};

/** An eyebrow and heading, with the action opposite them from 1024px. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 2 })).toHaveTextContent(section.title);
    // The i18n Link adds the locale to internal paths.
    await expect(canvas.getByRole('link', { name: 'Start a conversation' })).toHaveAttribute(
      'href',
      '/en/contact',
    );
    const { heading, action } = edges(canvasElement);
    await expect(action.left).toBeGreaterThan(heading.right);
  },
};

/** With a line of supporting text and a second action. */
export const WithSupportingText: Story = {
  args: {
    description: 'Tell us what you are building and we will reply within two working days.',
    secondaryAction: { label: 'Read the docs', href: '/docs' },
  },
};

/** The action moves under the copy on phones; the page never scrolls sideways. */
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

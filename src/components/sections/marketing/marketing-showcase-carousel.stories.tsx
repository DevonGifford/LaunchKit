import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { MarketingShowcaseCarousel } from './marketing-showcase-carousel';

/** Screenshots of LaunchKit's own sections, in public/marketing/showcase/. */
const screen = (name: string, file: string, href: string) => ({
  name,
  href,
  light: `/marketing/showcase/${file}-light.webp`,
  dark: `/marketing/showcase/${file}-dark.webp`,
});

/** Fixture copy until the section is placed on a page. */
const section = {
  id: 'showcase',
  type: 'marketing-showcase-carousel',
  eyebrow: 'Showcase',
  title: 'Every section, ready to compose.',
  description:
    'Browse the sections LaunchKit ships with. Each one takes typed content, works in four languages and follows the active theme.',
  primaryAction: { label: 'Get started', href: '/docs/getting-started' },
  secondaryAction: { label: 'Read the docs', href: '/docs' },
  items: [
    screen('Hero', 'hero', '/#hero'),
    screen('Pricing', 'pricing', '/#pricing'),
    screen('Timeline', 'timeline', '/#timeline'),
    screen('Infrastructure', 'infrastructure', '/#infrastructure'),
    screen('Tech stack', 'tech-stack', '/#stack'),
    screen('Developer experience', 'developer-experience', '/#developer-experience'),
    screen('Quality and automation', 'quality', '/#quality'),
    screen('Use cases', 'use-cases', '/#adapt'),
  ],
} satisfies SectionOf<'marketing-showcase-carousel'>;

const meta = {
  title: 'Sections/Marketing/Showcase carousel',
  component: MarketingShowcaseCarousel,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarketingShowcaseCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** About three screens at a time; the buttons below step through the rest. */
export const Default: Story = {};

/** The previous button is unavailable at the start; next moves the row along. */
export const StepsThrough: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const previous = canvas.getByRole('button', { name: 'Previous screen' });
    const next = canvas.getByRole('button', { name: 'Next screen' });

    await step('starts at the first screen and steps forward', async () => {
      await expect(previous).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(next);
      await waitFor(() => expect(previous).toHaveAttribute('aria-disabled', 'false'));
    });
  },
};

export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

/** On phones one screen fills most of the width, with the next peeking in. */
export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast and the dark screenshots. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

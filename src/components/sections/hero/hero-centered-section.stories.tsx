import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { HeroCenteredSection } from './hero-centered-section';

/** Fixture copy until the section is placed on a page. The rating and count are placeholders. */
const section = {
  id: 'hero',
  type: 'hero-centered',
  title: 'Launch your next website on LaunchKit',
  titleHighlight: 'LaunchKit',
  description:
    'A reusable Next.js foundation with ready-made sections, two themes, four languages and a full test setup, so every project starts from a finished base instead of a blank page.',
  primaryAction: { label: 'Get started', href: '/docs/getting-started' },
  menu: {
    label: 'Explore',
    items: [
      { label: 'What’s included', href: '/#included' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Customizing LaunchKit', href: '/docs/making-it-yours' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  proof: {
    href: '/#reviews',
    rating: 4.9,
    label: 'Trusted by 200+ teams',
    people: [
      { name: 'Amara Osei' },
      { name: 'Jonas Weber' },
      { name: 'Lucía Romero' },
      { name: 'Théo Martin' },
    ],
  },
} satisfies SectionOf<'hero-centered'>;

const meta = {
  title: 'Sections/Hero/Centered',
  component: HeroCenteredSection,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof HeroCenteredSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The headline, its highlighted phrase, the actions and the line of proof, centred. */
export const Default: Story = {};

/** The second button opens a menu of links. */
export const OpensMenu: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('opens the menu of links', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Explore' }));
      await waitFor(() => expect(screen.getByRole('menu')).toBeVisible());
      await expect(screen.getAllByRole('menuitem')).toHaveLength(4);
      await userEvent.keyboard('{Escape}');
      // Radix hides the rest of the page while the menu is open; wait for it to close.
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    });
  },
};

export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

/** On phones the headline wraps and the actions sit side by side if they fit. */
export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

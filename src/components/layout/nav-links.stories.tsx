import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavLinks } from './nav-links';

const meta = {
  title: 'Layout/Navigation links',
  component: NavLinks,
  args: {
    items: [
      { href: '/', label: 'Home' },
      { href: '/docs', label: 'Docs' },
      { href: '/contact', label: 'Contact' },
    ],
    className: 'flex items-center gap-1',
    linkClassName: 'px-3 text-sm',
  },
  decorators: [
    (Story) => (
      <nav aria-label="Main">
        <Story />
      </nav>
    ),
  ],
} satisfies Meta<typeof NavLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The preview mocks the router at `/`, so Home is the current page. */
export const Default: Story = {};

/** A page below a link's path keeps that link marked as current. */
export const NestedPage: Story = {
  parameters: { nextjs: { navigation: { pathname: '/docs/getting-started' } } },
};

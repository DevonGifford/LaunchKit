import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { MobileNav } from './mobile-nav';

const meta = {
  title: 'Layout/Mobile navigation',
  component: MobileNav,
  globals: { viewport: { value: 'mobile' } },
  args: {
    items: [
      { href: '/', label: 'Home' },
      { href: '/docs', label: 'Docs' },
      { href: '/contact', label: 'Contact' },
    ],
    showLocaleLinks: true,
    showThemeToggle: true,
    labels: {
      openMenu: 'Open menu',
      menuTitle: 'Menu',
      menuDescription: 'Site navigation and preferences',
      mainNavigation: 'Main',
      close: 'Close',
      language: 'Language',
      theme: 'Switch between light and dark mode',
    },
  },
} satisfies Meta<typeof MobileNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

/** Opens as a modal sheet; the current page is marked with aria-current. */
export const Open: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Open menu' }));
    const sheet = await within(document.body).findByRole('dialog', { name: 'Menu' });
    await expect(within(sheet).getByRole('link', { name: 'Home' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  },
};

/** With a call to action under the links, as the wide header passes in. */
export const WithAction: Story = {
  args: {
    items: [
      { href: '/', label: 'Product' },
      { href: '/examples', label: 'Examples' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/docs', label: 'Docs' },
    ],
    action: { href: '/contact', label: 'Get in Contact' },
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Open menu' }));
    const sheet = await within(document.body).findByRole('dialog', { name: 'Menu' });
    await expect(within(sheet).getByRole('link', { name: 'Get in Contact' })).toHaveAttribute(
      'href',
      '/en/contact',
    );
  },
};

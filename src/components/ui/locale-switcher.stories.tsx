import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { LocaleLinks, LocaleSwitcher } from './locale-switcher';

const meta = {
  title: 'UI/Navigation/Locale switcher',
  component: LocaleSwitcher,
  args: { label: 'Language' },
} satisfies Meta<typeof LocaleSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Header menu: the translate mark and the current code; each option is a real link to the same page in another locale. */
export const Menu: Story = {};

/** The menu lists every language by name, each with its flag. */
export const OpensMenu: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('names the current language for screen readers', async () => {
      await expect(canvas.getByRole('button', { name: 'Language: English' })).toBeVisible();
    });

    await step('opens a menu of languages with flags', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Language: English' }));
      await waitFor(() => expect(screen.getByRole('menu')).toBeVisible());
      const options = screen.getAllByRole('menuitem');
      await expect(options.map((option) => option.textContent)).toEqual([
        'English',
        'Español',
        'Français',
        'Deutsch',
      ]);
      for (const option of options) {
        await expect(option.querySelector('[style*="/flags/"]')).not.toBeNull();
      }
    });

    // Radix hides the rest of the page while the menu is open; close it before the axe check.
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  },
};

/** Plain links, used in the footer and the mobile menu: names only, no flags. */
export const Links: Story = {
  render: (args) => <LocaleLinks label={args.label} />,
};

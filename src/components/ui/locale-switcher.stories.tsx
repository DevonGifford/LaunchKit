import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LocaleLinks, LocaleSwitcher } from './locale-switcher';

const meta = {
  title: 'Primitives/Locale switcher',
  component: LocaleSwitcher,
  args: { label: 'Language' },
} satisfies Meta<typeof LocaleSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Header menu: each option is a real link to the same page in another locale. */
export const Menu: Story = {};

/** Plain links, used in the footer and the mobile menu. */
export const Links: Story = {
  render: (args) => <LocaleLinks label={args.label} />,
};

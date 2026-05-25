import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThemeToggle } from './theme-toggle';

const meta = {
  title: 'UI/Actions/Theme toggle',
  component: ThemeToggle,
  args: { label: 'Switch between light and dark mode' },
  decorators: [
    // The real provider, so the button changes the class on <html> as in the app.
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The icon swaps with CSS; this clicks it and checks the class on `<html>`. */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const html = document.documentElement;
    const button = within(canvasElement).getByRole('button', { name: args.label });
    const wasDark = html.classList.contains('dark');

    await userEvent.click(button);
    await waitFor(() => expect(html.classList.contains('dark')).toBe(!wasDark));

    // Put it back so the next story starts from the toolbar's theme.
    await userEvent.click(button);
    await waitFor(() => expect(html.classList.contains('dark')).toBe(wasDark));
    // next-themes remembers the choice; forget it so other stories follow the toolbar.
    localStorage.removeItem('theme');
  },
};

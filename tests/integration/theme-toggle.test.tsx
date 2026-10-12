import { beforeEach, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const root = document.documentElement;

beforeEach(() => {
  localStorage.clear();
  root.className = '';
});

test('switches between light and dark and remembers the choice', async () => {
  const screen = await render(
    <ThemeProvider>
      <ThemeToggle label="Switch between light and dark mode" />
    </ThemeProvider>,
  );
  const toggle = screen.getByRole('button', { name: 'Switch between light and dark mode' });

  await expect.poll(() => root.classList.contains('light')).toBe(true);

  await toggle.click();
  await expect.poll(() => root.classList.contains('dark')).toBe(true);
  expect(localStorage.getItem('theme')).toBe('dark');
  expect(root.style.colorScheme).toBe('dark');

  await toggle.click();
  await expect.poll(() => root.classList.contains('light')).toBe(true);
  expect(localStorage.getItem('theme')).toBe('light');
});

test('starts from a previously stored choice', async () => {
  localStorage.setItem('theme', 'dark');
  await render(
    <ThemeProvider>
      <ThemeToggle label="Switch theme" />
    </ThemeProvider>,
  );
  await expect.poll(() => root.classList.contains('dark')).toBe(true);
});

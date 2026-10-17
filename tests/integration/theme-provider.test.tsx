import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { ThemeProvider } from '@/components/theme/theme-provider';

// Its own file: React reports a script tag only once per page, so an earlier
// render of the provider in the same file would hide a regression.
test('renders in the browser without React’s script tag warning', async () => {
  // Switching language remounts the root layout, so the provider renders on the
  // client as well as the server.
  // Test files share the browser's storage, and another may have stored a theme.
  localStorage.clear();
  const errors: string[] = [];
  const spy = vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    errors.push(args.map(String).join(' '));
  });

  try {
    await render(
      <ThemeProvider>
        <p>Content</p>
      </ThemeProvider>,
    );
    // The theme still applies without the script running.
    await expect.poll(() => document.documentElement.classList.contains('light')).toBe(true);
  } finally {
    spy.mockRestore();
  }

  expect(errors.filter((error) => error.includes('Encountered a script tag'))).toEqual([]);
});

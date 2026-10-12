import { expect, test, type Page } from '@playwright/test';

// The appearance class must be on <html> before the page is first painted —
// recorded at DOMContentLoaded, before React hydrates — or visitors see a flash.
async function classBeforeHydration(page: Page, path: string) {
  await page.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      (window as Window & { classAtLoad?: string }).classAtLoad =
        document.documentElement.className;
    });
  });
  await page.goto(path);
  return page.evaluate(() => (window as Window & { classAtLoad?: string }).classAtLoad);
}

async function toggleTheme(page: Page, isMobile: boolean) {
  const label = 'Switch between light and dark mode';
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('dialog').getByRole('button', { name: label }).click();
    await page.keyboard.press('Escape');
  } else {
    await page.getByRole('banner').getByRole('button', { name: label }).click();
  }
}

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`system preference: ${colorScheme}`, () => {
    test.use({ colorScheme });

    test('is applied before first paint', async ({ page }) => {
      expect(await classBeforeHydration(page, '/en')).toBe(colorScheme);
    });
  });
}

test.describe('a visitor’s choice', () => {
  test.use({ colorScheme: 'light' });

  test('overrides the system preference and survives a reload', async ({ page, isMobile }) => {
    await page.goto('/en/docs');
    await expect(page.locator('html')).toHaveClass('light');

    await toggleTheme(page, isMobile);
    await expect(page.locator('html')).toHaveClass('dark');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(13, 27, 42)');

    expect(await classBeforeHydration(page, '/en/contact')).toBe('dark');
  });
});

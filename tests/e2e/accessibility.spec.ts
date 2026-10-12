import { expect, test } from '@playwright/test';
import { axeViolations, localized, locales, routes } from './helpers';

// Every page in English, plus each other locale's homepage, in both
// appearances — rendered contrast (including opacity variants) is only
// verifiable here.
const pages = [
  ...routes.map((route) => localized('en', route)),
  ...locales.filter((locale) => locale !== 'en').map((locale) => localized(locale, '/')),
  '/en/this-page-does-not-exist',
];

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`${colorScheme} appearance`, () => {
    test.use({ colorScheme });

    for (const path of pages) {
      test(`${path} has no WCAG 2.2 AA violations`, async ({ page }) => {
        await page.goto(path);
        await expect(page.locator('html')).toHaveClass(colorScheme);
        expect(await axeViolations(page)).toEqual([]);
      });
    }
  });
}

test('the skip link moves focus to the main content', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Keyboard navigation is a desktop concern');
  await page.goto('/en');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

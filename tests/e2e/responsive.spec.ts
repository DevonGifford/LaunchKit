import { expect, test } from '@playwright/test';
import { horizontalOverflow, localized, locales, routes } from './helpers';

// The narrowest supported phone width, in every locale: long German or French
// words are the usual cause of sideways scrolling.
test.describe('320px wide screens', () => {
  test.use({ viewport: { width: 320, height: 720 } });

  for (const locale of locales) {
    for (const route of routes) {
      const path = localized(locale, route);
      test(`${path} does not scroll horizontally`, async ({ page, isMobile }) => {
        test.skip(!isMobile, 'Runs once, in the mobile project');
        await page.goto(path);
        expect(await horizontalOverflow(page)).toBe(0);
      });
    }
  }
});

// The header keeps its menu button below 1024px, where its full row would be
// wider than the screen in the longer languages.
for (const { width, inline } of [
  { width: 768, inline: false },
  { width: 1024, inline: true },
]) {
  test.describe(`${width}px wide screens`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const locale of locales) {
      test(`the /${locale} header fits ${inline ? 'inline' : 'behind the menu button'}`, async ({
        page,
        isMobile,
      }) => {
        test.skip(isMobile, 'Runs once, in the desktop project');
        await page.goto(localized(locale, '/'));
        const nav = page.getByRole('banner').getByRole('navigation');
        if (inline) await expect(nav).toBeVisible();
        else await expect(nav).toBeHidden();
        expect(await horizontalOverflow(page)).toBe(0);
      });
    }
  });
}

test('desktop shows inline navigation; mobile uses the menu button', async ({ page, isMobile }) => {
  await page.goto('/en');
  const header = page.getByRole('banner');
  if (isMobile) {
    await expect(header.getByRole('button', { name: 'Open menu' })).toBeVisible();
    await expect(header.getByRole('navigation', { name: 'Main' })).toBeHidden();
  } else {
    await expect(header.getByRole('navigation', { name: 'Main' })).toBeVisible();
    await expect(header.getByRole('button', { name: 'Open menu' })).toBeHidden();
  }
});

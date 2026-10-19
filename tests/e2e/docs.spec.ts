import { expect, test, type Page } from '@playwright/test';
import { axeViolations } from './helpers';

const docsNav = (page: Page, name = 'Documentation') => page.getByRole('navigation', { name });
const article = (page: Page) => page.getByRole('article');

test.describe('desktop', () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(isMobile, 'The navigation column shows from 1024px');
  });

  test('a guide shows the docs navigation beside it, and moves between guides', async ({
    page,
  }) => {
    await page.goto('/en/docs/getting-started');
    const nav = docsNav(page);
    await expect(nav.getByRole('link', { name: 'LaunchKit Quickstart' })).toHaveAttribute(
      'aria-current',
      'page',
    );

    await nav.getByRole('link', { name: 'LaunchKit Design System' }).click();
    await expect(page).toHaveURL(/\/en\/docs\/component-library$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('LaunchKit Design System');
    await expect(nav.getByRole('link', { name: 'LaunchKit Design System' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(page.getByRole('button', { name: 'Browse guides' })).toBeHidden();
  });

  test('the article keeps its reading width beside the navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/docs/getting-started');
    const wide = await article(page).boundingBox();
    const navBox = await docsNav(page).boundingBox();
    if (!wide || !navBox) throw new Error('Missing layout boxes');
    // Full width and centred, as before the navigation existed.
    expect(Math.round(wide.width)).toBe(768);
    expect(Math.abs(wide.x + wide.width / 2 - 720)).toBeLessThanOrEqual(1);
    expect(navBox.x + navBox.width).toBeLessThanOrEqual(wide.x);

    await page.setViewportSize({ width: 1024, height: 768 });
    const narrow = await article(page).boundingBox();
    expect(narrow?.width).toBeGreaterThanOrEqual(704);
  });

  test('the navigation stays in view while the guide scrolls', async ({ page }) => {
    await page.goto('/en/docs/getting-started');
    await page.evaluate(() => window.scrollTo(0, 2000));
    const box = await docsNav(page).boundingBox();
    if (!box) throw new Error('The navigation has no layout box');
    expect(box.y).toBeGreaterThanOrEqual(64); // below the sticky header
    expect(box.y).toBeLessThan(200);
  });

  test('section names follow the language', async ({ page }) => {
    await page.goto('/es/docs/getting-started');
    await expect(docsNav(page, 'Documentación').getByRole('group')).toHaveText([
      /^Primeros pasos/,
      /^Construir/,
      /^Proyecto/,
    ]);
  });
});

test.describe('small screens', () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(!isMobile, 'Below 1024px the navigation opens in a sheet');
  });

  test('the guides open in a sheet that closes once one is chosen', async ({ page }) => {
    await page.goto('/en/docs/getting-started');
    await expect(docsNav(page)).toBeHidden();

    await page.getByRole('button', { name: 'Browse guides' }).click();
    const sheet = page.getByRole('dialog', { name: 'Documentation' });
    await expect(sheet.getByRole('link', { name: 'LaunchKit Quickstart' })).toHaveAttribute(
      'aria-current',
      'page',
    );

    await sheet.getByRole('link', { name: 'Customizing LaunchKit' }).click();
    await expect(page).toHaveURL(/\/en\/docs\/making-it-yours$/);
    await expect(sheet).toBeHidden();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Customizing LaunchKit');
  });

  test('has no WCAG 2.2 AA violations with the sheet open', async ({ page }) => {
    await page.goto('/de/docs/getting-started');
    await page.getByRole('button', { name: 'Anleitungen ansehen' }).click();
    await expect(page.getByRole('dialog', { name: 'Dokumentation' })).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.getAnimations().length)).toBe(0);
    expect(await axeViolations(page)).toEqual([]);
  });
});

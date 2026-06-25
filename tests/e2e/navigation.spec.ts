import { expect, test } from '@playwright/test';

// The previous homepage, kept at /home-v1. The current homepage has no
// content-specific end-to-end tests yet, while its content settles.
test('the previous homepage renders its sections in content order, out of search', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto('/en/home-v1');
  await expect(page).toHaveTitle('A reusable Next.js foundation · LaunchKit');
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Built for what’s next.');

  const sectionIds = await page
    .locator('main > section')
    .evaluateAll((sections) => sections.map((section) => section.id));
  expect(sectionIds).toEqual([
    'hero',
    'philosophy',
    'included',
    'adapt',
    'developer-experience',
    'begin',
  ]);
  expect(errors).toEqual([]);
});

test('the previous homepage’s call to action leads to the getting-started guide', async ({
  page,
}) => {
  await page.goto('/en/home-v1');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page).toHaveURL(/\/en\/docs\/getting-started$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('LaunchKit Quickstart');
});

test('the homepage describes the site in structured data', async ({ page }) => {
  await page.goto('/en');
  const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(structuredData ?? '{}')).toMatchObject({
    '@type': 'WebSite',
    inLanguage: 'en',
  });
});

test('main navigation marks the current page', async ({ page, isMobile }) => {
  await page.goto('/en/docs/making-it-yours');
  const nav = isMobile
    ? (await page.getByRole('button', { name: 'Open menu' }).click(), page.getByRole('dialog'))
    : page.getByRole('banner').getByRole('navigation', { name: 'Main' });

  await expect(nav.getByRole('link', { name: 'Docs' })).toHaveAttribute('aria-current', 'page');
  await expect(nav.getByRole('link', { name: 'Product' })).not.toHaveAttribute('aria-current');
});

test('the header lists the main sections and leads to the contact page', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'The header call to action shows from md up');
  await page.goto('/en');
  const header = page.getByRole('banner');

  await expect(header.getByRole('navigation', { name: 'Main' }).getByRole('link')).toHaveText([
    'Product',
    'Examples',
    'Pricing',
    'Docs',
  ]);
  await header.getByRole('link', { name: 'Get in Contact' }).click();
  await expect(page).toHaveURL(/\/en\/contact$/);
});

test('placeholder social links lead to the coming-soon page in the current language', async ({
  page,
}) => {
  await page.goto('/fr');
  await page.getByRole('contentinfo').getByRole('link', { name: 'GitHub' }).click();
  await expect(page).toHaveURL(/\/fr\/coming-soon$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cette page arrive bientôt');
});

test.describe('mobile menu', () => {
  test.skip(({ isMobile }) => !isMobile, 'Small screens only');

  test('opens with touch, navigates, and closes itself', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('button', { name: 'Open menu' }).tap();

    const menu = page.getByRole('dialog', { name: 'Menu' });
    await expect(menu).toBeVisible();
    await menu.getByRole('link', { name: 'Get in Contact' }).tap();

    await expect(page).toHaveURL(/\/en\/contact$/);
    await expect(menu).toBeHidden();
  });

  test('traps focus while open and returns it on Escape', async ({ page }) => {
    await page.goto('/en');
    const trigger = page.getByRole('button', { name: 'Open menu' });
    await trigger.click();
    const menu = page.getByRole('dialog', { name: 'Menu' });

    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      expect(await menu.evaluate((dialog) => dialog.contains(document.activeElement))).toBe(true);
    }

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('controls meet the 24px minimum target size', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('button', { name: 'Open menu' }).click();
    const controls = page.getByRole('dialog').locator('a, button');
    for (const control of await controls.all()) {
      const box = await control.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(24);
      expect(box?.width ?? 0).toBeGreaterThanOrEqual(24);
    }
  });
});

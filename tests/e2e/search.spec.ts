import { expect, test, type Page } from '@playwright/test';
import { axeViolations } from './helpers';

// The test browsers run on Linux, where the shortcut is Ctrl+K.
const dialog = (page: Page) => page.getByRole('dialog', { name: /^(Search|Buscar|Suche)$/ });
// The dialog's own animations; the homepage has some that never end.
const dialogSettled = (page: Page) =>
  dialog(page).evaluate((element) => element.getAnimations({ subtree: true }).length);
const input = (page: Page) => dialog(page).getByRole('combobox');
const selected = (page: Page) => dialog(page).locator('[cmdk-item][aria-selected="true"]');

/** Where the element with `id` sits from the top of the viewport. */
const topOf = (page: Page, id: string) =>
  page.locator(`[id="${id}"]`).evaluate((element) => element.getBoundingClientRect().top);

test.describe('desktop', () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(isMobile, 'The header field shows on desktop');
  });

  test('Ctrl+K opens search, and Enter opens a guide’s section in view', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByRole('banner').getByRole('button', { name: 'Search…' })).toBeVisible();

    await page.keyboard.press('Control+K');
    await expect(input(page)).toBeFocused();
    await input(page).fill('storybook');
    await expect(selected(page)).toContainText('Storybook, the workbench');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/en\/docs\/component-library#storybook-the-workbench$/);
    await expect(dialog(page)).toBeHidden();
    // Below the sticky header, not behind it.
    await expect.poll(() => topOf(page, 'storybook-the-workbench')).toBeGreaterThanOrEqual(64);
    expect(await topOf(page, 'storybook-the-workbench')).toBeLessThan(300);
  });

  test('a homepage section opens from another page, in view', async ({ page }) => {
    await page.goto('/en/pricing');
    await page.keyboard.press('Control+K');
    await input(page).fill('accessibility');
    await expect(selected(page)).toContainText('Everything a new site needs');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/en#included$/);
    await expect.poll(() => topOf(page, 'included')).toBeGreaterThanOrEqual(64);
    expect(await topOf(page, 'included')).toBeLessThan(300);
  });

  test('a section of the page you’re on scrolls into view', async ({ page }) => {
    await page.goto('/en/pricing');
    await page.getByRole('banner').getByRole('button', { name: 'Search…' }).click();
    await input(page).fill('questions about pricing');
    await expect(selected(page)).toContainText('Questions about pricing');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/en\/pricing#faq$/);
    await expect.poll(() => topOf(page, 'faq')).toBeLessThan(300);
  });

  test('searches the page’s language and stays in it', async ({ page }) => {
    await page.goto('/es');
    await page.keyboard.press('Control+K');
    await expect(input(page)).toHaveAttribute('placeholder', 'Buscar en LaunchKit…');
    await input(page).fill('precios');
    await expect(selected(page)).toContainText('Precios');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/es\/pricing$/);
  });

  test('the search field takes the call to action’s place from 1024px', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/de');
    const banner = page.getByRole('banner');
    await expect(banner.getByRole('link', { name: 'Kontakt aufnehmen' })).toHaveCount(0);
    await banner.getByRole('button', { name: 'Suchen…' }).click();
    await expect(dialog(page)).toBeVisible();
  });

  test('Ctrl+K leaves a form field alone', async ({ page }) => {
    await page.goto('/en/contact');
    await page.getByLabel('Name').click();
    await page.keyboard.press('Control+K');
    await expect(dialog(page)).toBeHidden();
  });

  test('has no WCAG 2.2 AA violations with results showing', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Control+K');
    await input(page).fill('accessibility');
    await expect(selected(page)).toBeVisible();
    await expect.poll(() => dialogSettled(page)).toBe(0);
    expect(await axeViolations(page)).toEqual([]);
  });
});

test.describe('small screens', () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(!isMobile, 'Phones get the icon button');
  });

  test('the search button beside the menu opens the same search', async ({ page }) => {
    await page.goto('/en/docs/getting-started');
    await page.getByRole('banner').getByRole('button', { name: 'Search', exact: true }).click();
    await input(page).fill('pricing');
    await expect(selected(page)).toContainText('Pricing');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/en\/pricing$/);
  });

  test('has no WCAG 2.2 AA violations while open', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('banner').getByRole('button', { name: 'Search', exact: true }).click();
    await input(page).fill('docs');
    await expect.poll(() => dialogSettled(page)).toBe(0);
    expect(await axeViolations(page)).toEqual([]);
  });
});

test('each locale has its own index, built at build time', async ({ request }) => {
  const spanish = await request.get('/es/search-index.json');
  expect(spanish.ok()).toBe(true);
  expect(await spanish.json()).toMatchObject({ locale: 'es' });
  expect((await request.get('/xx/search-index.json')).status()).toBe(404);
});

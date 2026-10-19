import { expect, test, type Page } from '@playwright/test';
import { consentStorageKey, parseConsentRecord } from '../../src/lib/consent/consent';
import { axeViolations, horizontalOverflow } from './helpers';

// Every other spec starts with a saved choice (playwright.config.ts); these are
// first visits.
test.use({ storageState: { cookies: [], origins: [] } });

const prompt = (page: Page) => page.getByRole('region', { name: 'Your privacy' });
const preferences = (page: Page) => page.getByRole('dialog', { name: 'Privacy preferences' });
const settingsButton = (page: Page) =>
  page.getByRole('contentinfo').getByRole('button', { name: 'Privacy settings' });

const stored = (page: Page) =>
  page
    .evaluate((key) => localStorage.getItem(key), consentStorageKey)
    .then((raw) => parseConsentRecord(raw));

test('asks on a first visit and remembers the choice across pages and reloads', async ({
  page,
}) => {
  await page.goto('/en');
  await prompt(page).getByRole('button', { name: 'Reject all' }).click();
  await expect(prompt(page)).toBeHidden();
  expect(await stored(page)).toMatchObject({ analytics: false, marketing: false });

  for (const path of ['/en/docs', '/en/privacy']) {
    await page.goto(path);
    // Opening the preferences proves the page has hydrated, so the prompt
    // would be showing by now if the choice had been forgotten.
    await settingsButton(page).click();
    await expect(preferences(page).getByRole('switch', { name: 'Analytics' })).not.toBeChecked();
    await page.keyboard.press('Escape');
    await expect(prompt(page)).toBeHidden();
  }
});

test('sits at the bottom right on desktop and along the bottom on phones', async ({
  page,
  isMobile,
}) => {
  await page.goto('/en');
  const box = await prompt(page).boundingBox();
  const viewport = page.viewportSize();
  if (!box || !viewport) throw new Error('The prompt has no layout box');

  const gap = isMobile ? 16 : 24;
  expect(Math.round(viewport.height - (box.y + box.height))).toBe(gap);
  expect(Math.round(viewport.width - (box.x + box.width))).toBe(gap);
  if (isMobile) expect(Math.round(box.x)).toBe(gap);
  else expect(Math.round(box.width)).toBe(384);
  expect(await horizontalOverflow(page)).toBe(0);
});

test('never hides the end of the page', async ({ page }) => {
  await page.goto('/en');
  await expect(prompt(page)).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

  const promptBox = await prompt(page).boundingBox();
  const lastControl = await settingsButton(page).boundingBox();
  if (!promptBox || !lastControl) throw new Error('Missing layout boxes');
  expect(lastControl.y + lastControl.height).toBeLessThanOrEqual(promptBox.y);
});

test('saves custom preferences, and reopens them from the footer', async ({ page }) => {
  await page.goto('/en/privacy');
  await prompt(page).getByRole('button', { name: 'Manage preferences' }).click();
  const dialog = preferences(page);
  await expect(dialog.getByRole('switch', { name: 'Necessary' })).toBeDisabled();
  await dialog.getByRole('switch', { name: 'Analytics' }).click();
  await dialog.getByRole('button', { name: 'Save preferences' }).click();

  await expect(dialog).toBeHidden();
  await expect(prompt(page)).toBeHidden();
  expect(await stored(page)).toMatchObject({ analytics: true, marketing: false });

  await settingsButton(page).click();
  await expect(dialog.getByRole('switch', { name: 'Analytics' })).toBeChecked();
});

test('names only the services this build loads', async ({ page }) => {
  await page.goto('/en');
  await prompt(page).getByRole('button', { name: 'Manage preferences' }).click();
  // Local builds aren't on Vercel, so neither Vercel service is listed or loaded.
  await expect(preferences(page).getByText(/Always running/)).toHaveCount(0);
  await expect(preferences(page).getByText('Nothing on this site uses this yet.')).toHaveCount(2);
});

test('loads no Vercel scripts outside Vercel', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/en');
  await expect(prompt(page)).toBeVisible();
  expect(requests.filter((url) => /_vercel|vercel-scripts|vercel-insights/.test(url))).toEqual([]);
});

test('speaks the page’s language', async ({ page }) => {
  await page.goto('/es');
  const spanish = page.getByRole('region', { name: 'Tu privacidad' });
  await expect(spanish.getByRole('button', { name: 'Rechazar todo' })).toBeVisible();
  await expect(
    spanish.getByRole('link', { name: 'Lee la política de privacidad' }),
  ).toHaveAttribute('href', '/es/privacy');
});

test('can be answered from the keyboard', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Keyboard navigation is a desktop concern');
  await page.goto('/en');
  await expect(prompt(page)).toBeVisible();

  // Straight after the skip link, before the header.
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(prompt(page).getByRole('link', { name: 'Read the privacy policy' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(prompt(page).getByRole('button', { name: 'Reject all' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(prompt(page)).toBeHidden();
});

test('has no WCAG 2.2 AA violations while asking or managing preferences', async ({ page }) => {
  await page.goto('/en');
  await expect(prompt(page)).toBeVisible();
  expect(await axeViolations(page)).toEqual([]);

  await prompt(page).getByRole('button', { name: 'Manage preferences' }).click();
  await expect(preferences(page)).toBeVisible();
  expect(await axeViolations(page)).toEqual([]);
});

import { expect, test, type Page } from '@playwright/test';

async function chooseLanguage(page: Page, isMobile: boolean, language: string) {
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('dialog').getByRole('link', { name: language }).click();
  } else {
    await page.getByRole('button', { name: /^Language:/ }).click();
    await page.getByRole('menuitem', { name: language }).click();
  }
}

test.describe('locale detection', () => {
  test.use({ locale: 'de-DE' });

  test('the root URL redirects to the browser’s language', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/de$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gebaut für das, was kommt.');
  });
});

test('switching language keeps the current page and is remembered', async ({ page, isMobile }) => {
  await page.goto('/en/contact');
  await chooseLanguage(page, isMobile, 'Français');

  await expect(page).toHaveURL(/\/fr\/contact$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Parlons de votre prochain lancement.',
  );

  // Without a locale in the URL, the choice wins over the browser default.
  await page.goto('/');
  await expect(page).toHaveURL(/\/fr$/);
});

test('every page declares its language alternates and canonical URL', async ({ page }) => {
  await page.goto('/es/docs/getting-started');
  const alternates = page.locator('head link[rel="alternate"][hreflang]');
  await expect(alternates).toHaveCount(5);
  await expect(page.locator('head link[rel="alternate"][hreflang="de"]')).toHaveAttribute(
    'href',
    /\/de\/docs\/getting-started$/,
  );
  await expect(page.locator('head link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
    'href',
    /\/en\/docs\/getting-started$/,
  );
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/es\/docs\/getting-started$/,
  );
  await expect(page).toHaveTitle('Primeros pasos · LaunchKit');
  await expect(page.locator('head meta[property="og:locale"]')).toHaveAttribute('content', 'es_ES');
});

test('dates and plurals follow the locale', async ({ page }) => {
  await page.goto('/de/docs/getting-started');
  await expect(page.getByText('Aktualisiert am 12. Oktober 2026')).toBeVisible();

  await page.goto('/fr/docs');
  await expect(page.getByText('6 guides', { exact: true })).toBeVisible();

  await page.goto('/es/docs/making-it-yours');
  await expect(page.getByText('Actualizado el 12 de octubre de 2026')).toBeVisible();
});

test('an unknown page returns a localized 404', async ({ page }) => {
  const response = await page.goto('/de/gibt-es-nicht');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Seite nicht gefunden');
  await expect(page.getByRole('link', { name: 'Zurück zur Startseite' })).toHaveAttribute(
    'href',
    '/de',
  );
});

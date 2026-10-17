import { expect, test } from '@playwright/test';

test('/llms.txt is served as plain text and matches the LLM notice exactly', async ({
  page,
  request,
}) => {
  const response = await request.get('/llms.txt');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toBe('text/plain; charset=utf-8');
  const file = await response.text();
  expect(file.startsWith('# LaunchKit\n')).toBe(true);

  await page.goto('/en/llm-notice');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('LLM notice');
  expect(await page.locator('figure pre').textContent()).toBe(file);

  // Translated notices show the same English file.
  await page.goto('/de/llm-notice');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('LLM-Hinweis');
  expect(await page.locator('figure pre').textContent()).toBe(file);
});

test('the footer links reach the terms and the LLM notice', async ({ page }) => {
  await page.goto('/en');
  const legal = page.getByRole('contentinfo').getByRole('navigation', { name: 'Legal' });
  await legal.getByRole('link', { name: 'Terms of Use' }).click();
  await expect(page).toHaveURL(/\/en\/terms$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Terms of use');

  await page
    .getByRole('contentinfo')
    .getByRole('navigation', { name: 'Legal' })
    .getByRole('link', { name: 'LLM Notice' })
    .click();
  await expect(page).toHaveURL(/\/en\/llm-notice$/);
});

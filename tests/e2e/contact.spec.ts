import { expect, test } from '@playwright/test';

test('rejects an incomplete message with clear, linked errors', async ({ page }) => {
  await page.goto('/en/contact');
  await page.getByRole('button', { name: 'Send message' }).click();

  const name = page.getByLabel('Name', { exact: true });
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(name).toHaveAccessibleDescription('Please enter your name.');
  await expect(page.getByText('Please confirm that we may contact you.')).toBeVisible();
});

test('sends a valid message through the server action', async ({ page }) => {
  await page.goto('/es/contact');

  await page.getByLabel('Nombre', { exact: true }).fill('Ada Lovelace');
  await page.getByLabel('Correo electrónico', { exact: true }).fill('ada@example.com');
  await page.getByRole('combobox', { name: 'Tema' }).click();
  await page.getByRole('option', { name: 'Usar LaunchKit' }).click();
  await page
    .getByLabel('Mensaje', { exact: true })
    .fill('Me gustaría empezar un sitio nuevo con LaunchKit.');
  await page.getByRole('checkbox', { name: /Acepto que se me contacte/ }).click();

  const serverAction = page.waitForRequest(
    (request) => request.method() === 'POST' && request.headers()['next-action'] !== undefined,
  );
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();
  await serverAction;

  const confirmation = page.getByRole('status');
  await expect(confirmation).toHaveText('Gracias: hemos recibido tu mensaje.');
  await expect(confirmation).toBeFocused();
  await expect(page.getByLabel('Nombre', { exact: true })).toHaveValue('');
});

import { test, expect } from '@playwright/test';

// Deterministic behavior spec for the German contact page (/de/kontakt).
// Runs against the static `astro preview` output — the ?status banner logic is
// pure client-side JS (reads the query param), so no backend/Resend is needed.
// This locks down the success/error banner behavior that regressed in 9c88240e.

test.describe('/de/kontakt', () => {
  test('renders the form with all fields', async ({ page }) => {
    await page.goto('/de/kontakt');
    await expect(page.getByRole('heading', { name: 'Lass uns sprechen' })).toBeVisible();

    const form = page.locator('#kontakt-form');
    await expect(form).toBeVisible();
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('E-Mail')).toBeVisible();
    await expect(page.getByLabel('Branche')).toBeVisible();
    await expect(page.getByLabel('Nachricht')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Anfrage senden' })).toBeVisible();
  });

  test('honeypot field is present but hidden from users', async ({ page }) => {
    await page.goto('/de/kontakt');
    const honeypot = page.locator('input[name="website"]');
    await expect(honeypot).toBeAttached(); // in the DOM (bots fill it)...
    await expect(honeypot).toBeHidden();   // ...but zero-size/off-screen for humans
  });

  test('blocks submit when required fields are empty', async ({ page }) => {
    await page.goto('/de/kontakt');
    await page.getByRole('button', { name: 'Anfrage senden' }).click();

    // HTML5 validation stops the POST: still on the page, form still shown,
    // and the required fields report themselves invalid.
    await expect(page).toHaveURL(/\/de\/kontakt$/);
    await expect(page.locator('#kontakt-form')).toBeVisible();
    await expect(page.locator('#name:invalid')).toHaveCount(1);
    await expect(page.locator('#email:invalid')).toHaveCount(1);
    await expect(page.locator('#nachricht:invalid')).toHaveCount(1);
  });

  test('?status=ok shows the success banner and hides the form', async ({ page }) => {
    await page.goto('/de/kontakt?status=ok');
    await expect(page.locator('#status-success')).toBeVisible();
    await expect(page.locator('#status-success')).toContainText('Anfrage angekommen');
    await expect(page.locator('#kontakt-form')).toBeHidden();
    await expect(page.locator('#status-error')).toBeHidden();
  });

  test('?status=error shows the error banner and keeps the form', async ({ page }) => {
    await page.goto('/de/kontakt?status=error');
    await expect(page.locator('#status-error')).toBeVisible();
    await expect(page.locator('#status-error')).toContainText('schiefgegangen');
    await expect(page.locator('#kontakt-form')).toBeVisible();
    await expect(page.locator('#status-success')).toBeHidden();
  });

  test('no status param leaves both banners hidden', async ({ page }) => {
    await page.goto('/de/kontakt');
    await expect(page.locator('#status-success')).toBeHidden();
    await expect(page.locator('#status-error')).toBeHidden();
  });
});

import { test, expect } from '@playwright/test';

test('homepage redirects to default locale and shows heading', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/pt-br/);
  await expect(page.locator('h1')).toHaveText('e-manager');
});

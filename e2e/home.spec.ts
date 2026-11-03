import { test, expect } from '@playwright/test';

test('homepage redirects to default locale products page', async ({ page }) => {
  await page.route('http://localhost:8000/products/**', async (route) => {
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.goto('/');
  await expect(page).toHaveURL(/(pt-br|en-us)\/produtos/);
  await expect(page.locator('h1')).toHaveText('Produtos');
});

import { test, expect } from '@playwright/test';

test('Add a product to the cart', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('heading', {name: 'Bolt Cutters'}).click();
  await expect(page.getByRole('heading', {name: 'Bolt Cutters'})).toBeVisible();
  await page.getByRole('button', {name: 'Add to cart'}).click();
  await expect(page.getByRole('alert')).toContainText('Product added to shopping cart');
  await expect(page.getByRole('link', { name: 'cart' })).toHaveText('1');
});
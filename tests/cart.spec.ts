import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { ProductPage } from '../src/pages/ProductPage';

test('Add a product to the cart', async ({ page }) => {
  const productPage = new ProductPage(page);
  const homePage = new HomePage(page);

  await homePage.goto();

  await homePage.openProduct('Bolt Cutters');
  await expect(
    page.getByRole('heading', { name: 'Bolt Cutters' })).toBeVisible();
  await productPage.addToCart();
  await expect(page.getByRole('alert')).toContainText(
    'Product added to shopping cart',
  );
  await expect(page.getByRole('link', { name: 'cart' })).toHaveText('1');
});

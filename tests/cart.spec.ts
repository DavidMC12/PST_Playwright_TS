import { test, expect } from '@playwright/test';
import { Header, HomePage, ProductPage } from '../src/pages';

test('Add a product to the cart', async ({ page }) => {
  const productName = 'Bolt Cutters';
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const header = new Header(page);

  await homePage.goto();
  await homePage.openProduct(productName);
  await expect(page.getByRole('heading', { name: productName })).toBeVisible();
  await productPage.addToCart();
  // The toast is a role="alert"; toContainText ignores the rest of its text.
  await expect(page.getByRole('alert')).toContainText(
    'Product added to shopping cart',
  );
  await expect(header.cartLink()).toHaveText('1');
});

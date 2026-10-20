import { test, expect } from '@playwright/test';
import { customer } from '../src/data/users';
import {
  CheckoutPage,
  Header,
  HomePage,
  LoginPage,
  ProductPage,
} from '../src/pages';

test('Complete a purchase', async ({ page }) => {
  const productName = 'Bolt Cutters';
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const header = new Header(page);
  const checkoutPage = new CheckoutPage(page);

  // Log in first: the login form inside the checkout has the same labels as
  // the one in the header, so `getByLabel` would match two elements there.
  await test.step('Log in', async () => {
    await loginPage.goto();
    await loginPage.login(customer.email, customer.password);
    await expect(
      page.getByRole('heading', { name: 'My account' }),
    ).toBeVisible();
  });

  await test.step('Add a product to the cart', async () => {
    await homePage.goto();
    await homePage.openProduct(productName);
    await productPage.addToCart();
    await expect(page.getByRole('alert')).toContainText(
      'Product added to shopping cart',
    );
    await expect(header.cartLink()).toHaveText('1');
  });

  await test.step('Go to the checkout', async () => {
    await header.openCart();
    await checkoutPage.proceedToCheckout();
    await expect(page.getByText('You can proceed to checkout.')).toBeVisible();
    await checkoutPage.proceedToCheckout();
  });

  await test.step('Fill the billing address', async () => {
    // US + 60601 on purpose: the API rejects (422) a postal code whose
    // format does not match the country.
    await checkoutPage.fillBillingAddress({
      country: 'United States of America (the)',
      postalCode: '60601',
      houseNumber: '476',
      street: 'Main St Test',
      city: 'Chicago',
      state: 'Illinois',
    });
    await checkoutPage.proceedToCheckout();
    await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible();
  });

  await test.step('Pay and confirm the order', async () => {
    await checkoutPage.payWithBankTransfer({
      bankName: 'Bank of America',
      accountName: 'Test User',
      accountNumber: '998877112',
    });
    await expect(
      page.locator('[data-test="payment-success-message"]'),
    ).toBeVisible();
    await checkoutPage.confirm();
    await expect(page.getByText('Thanks for your order!')).toBeVisible();
  });
});

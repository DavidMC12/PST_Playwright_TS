import { test, expect } from '@playwright/test';

test('Complete a purchase', async ({ page }) => {
  await page.goto('/auth/login')

  await page.getByLabel('Email address *').fill('customer2@practicesoftwaretesting.com');
  await page.getByLabel('Password *').fill('welcome01');
  await page.getByRole('button', {name: 'Login'}).click();
  await expect(page.getByRole('heading', {name: 'My account'})).toBeVisible();

  await page.goto('/')

  await page.getByRole('heading', {name: 'Bolt Cutters'}).click();
  await expect(page.getByRole('heading', {name: 'Bolt Cutters'})).toBeVisible();
  await page.getByRole('button', {name: 'Add to cart'}).click();
  await expect(page.getByRole('alert')).toContainText('Product added to shopping cart');
  await expect(page.getByRole('link', { name: 'cart' })).toHaveText('1');

  await page.getByRole('link', { name: 'cart' }).click();
  await page.getByRole('button', {name: 'Proceed to checkout'}).click();
  await expect(page.getByText('You can proceed to checkout.')).toBeVisible();
  await page.getByRole('button', {name: 'Proceed to checkout'}).click();

  // Checkout form
  await page.getByRole('combobox', {name: 'Country'}).selectOption({label: 'United States of America (the)'});
  await page.getByLabel('Postal code').fill('60999');
  await page.getByLabel('House number').fill('476');
  await page.getByLabel('Street').fill('Main St Test');
  await page.getByLabel('City').fill('Chicago');
  await page.getByLabel('State').fill('Ilinois');
  await page.getByRole('button', {name: 'Proceed to checkout'}).click();
  await expect(page.getByRole('heading', {name: 'Payment'})).toBeVisible();

  // Payment
  await page.getByRole('combobox', {name: 'Payment Method'}).selectOption({label: 'Bank Transfer'});
  await page.getByLabel('Bank Name').fill('Bank of America');
  await page.getByLabel('Account Name').fill('Test User');
  await page.getByLabel('Account Number').fill('998877112');
  await page.getByRole('button', {name: 'Check payment'}).click();
  await expect(page.locator('[data-test="payment-success-message"]')).toBeVisible();
  await page.getByRole('button', {name: 'Confirm'}).click();
  await expect(page.getByText('Thanks for your order!')).toBeVisible();
});
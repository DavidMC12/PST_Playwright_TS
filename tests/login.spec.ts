import { test, expect } from '@playwright/test';

test('Shows products on main page', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.getByText('Combination Pliers')).toBeVisible();
});

test('Login with a valid user', async ({ page }) => {
  await page.goto('/auth/login')

  await page.getByLabel('Email address *').fill('customer2@practicesoftwaretesting.com');
  await page.getByLabel('Password *').fill('welcome01');
  await page.getByRole('button', {name: 'Login'}).click();
  await expect(page.getByRole('heading', {name: 'My account'})).toBeVisible();
});

test('Login with an invalid password', async ({ page }) => {
  await page.goto('/auth/login')

  await page.getByLabel('Email address *').fill('non-exist@practicesoftwaretesting.com');
  await page.getByLabel('Password *').fill('welcome99');
  await page.getByRole('button', {name: 'Login'}).click();
  await expect(page.getByText('Invalid email or password')).toBeVisible();
});

test('Add a product to the cart', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('heading', {name: 'Bolt Cutters'}).click();
  await expect(page.getByRole('heading', {name: 'Bolt Cutters'})).toBeVisible();
  await page.getByRole('button', {name: 'Add to cart'}).click();
  await expect(page.getByRole('alert')).toContainText('Product added to shopping cart');
  await expect(page.getByRole('link', { name: 'cart' })).toHaveText('1');
}) 
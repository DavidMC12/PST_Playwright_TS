import { test, expect } from '@playwright/test';

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
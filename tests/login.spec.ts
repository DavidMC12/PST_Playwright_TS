import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test('Login with a valid user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('customer2@practicesoftwaretesting.com', 'welcome01');
  await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
});

test('Login with an invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('no-exist@practicesoftwaretesting.com', 'welcome99');
  await expect(page.getByText('Invalid email or password')).toBeVisible();
});

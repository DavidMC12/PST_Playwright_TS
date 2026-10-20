import { test, expect } from '@playwright/test';
import { customer } from '../src/data/users';
import { LoginPage } from '../src/pages';

test('Login with a valid user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(customer.email, customer.password);
  // By role: the text "My account" also appears in the menu (strict mode violation).
  await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
});

test('Login with unknown credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  // Unknown email on purpose: failing logins on a real demo user lock it.
  await loginPage.login('no-exist@practicesoftwaretesting.com', 'welcome99');
  // The error box is a plain div with no role, so it is matched by text.
  await expect(page.getByText('Invalid email or password')).toBeVisible();
});

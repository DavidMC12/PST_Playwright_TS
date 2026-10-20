import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test('Shows products on main page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await expect(page.getByText('Combination Pliers')).toBeVisible();
});

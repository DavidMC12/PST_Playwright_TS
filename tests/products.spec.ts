import { test, expect } from '@playwright/test';

test('Shows products on main page', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.getByText('Combination Pliers')).toBeVisible();
});
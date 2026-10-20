import { Page } from '@playwright/test';

// Navigation bar, present on every page.
export class Header {
  constructor(private page: Page) {}

  // Returns the locator (no await) so tests can assert on it, e.g. the item count.
  cartLink() {
    return this.page.getByRole('link', { name: 'cart' });
  }

  async openCart() {
    await this.cartLink().click();
  }
}

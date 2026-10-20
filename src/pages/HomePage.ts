import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async openProduct(name: string) {
    await this.page.getByRole('heading', { name }).click();
  }
}

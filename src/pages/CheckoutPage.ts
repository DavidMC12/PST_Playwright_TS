import { Page } from '@playwright/test';

export type BillingAddress = {
  country: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
};

export type BankTransferDetails = {
  bankName: string;
  accountName: string;
  accountNumber: string;
};

// Cart, sign-in, billing address and payment are steps of one wizard,
// all on /checkout, so a single page object covers them.
export class CheckoutPage {
  constructor(private page: Page) {}

  // The same button moves the wizard forward at every step.
  async proceedToCheckout() {
    await this.page
      .getByRole('button', { name: 'Proceed to checkout' })
      .click();
  }

  async fillBillingAddress(address: BillingAddress) {
    await this.page
      .getByRole('combobox', { name: 'Country' })
      .selectOption({ label: address.country });
    await this.page.getByLabel('Postal code').fill(address.postalCode);
    await this.page.getByLabel('House number').fill(address.houseNumber);
    await this.page.getByLabel('Street').fill(address.street);
    await this.page.getByLabel('City').fill(address.city);
    await this.page.getByLabel('State').fill(address.state);
  }

  async payWithBankTransfer(details: BankTransferDetails) {
    await this.page
      .getByRole('combobox', { name: 'Payment Method' })
      .selectOption({ label: 'Bank Transfer' });
    await this.page.getByLabel('Bank Name').fill(details.bankName);
    await this.page.getByLabel('Account Name').fill(details.accountName);
    await this.page.getByLabel('Account Number').fill(details.accountNumber);
    await this.page.getByRole('button', { name: 'Check payment' }).click();
  }

  async confirm() {
    await this.page.getByRole('button', { name: 'Confirm' }).click();
  }
}

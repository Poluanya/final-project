// pages/CheckoutPage.ts
import { Page } from '@playwright/test';
import { generateUser } from '../factories/userFactory';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async fillRandomForm() {
    const user = generateUser(); // Используем фабрику
    await this.page.getByRole('textbox', { name: /first name/i }).fill(user.firstName);
    await this.page.getByRole('textbox', { name: /last name/i }).fill(user.lastName);
    await this.page.getByRole('textbox', { name: /zip\/postal code/i }).fill(user.zipCode);
  }

  async continue() {
    await this.page.getByRole('button', { name: /continue/i }).click();
  }
  async finish() {
    await this.page.getByRole('button', { name: /finish/i }).click();
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }
}

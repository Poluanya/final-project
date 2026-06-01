import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async fillRandomForm() {
    await this.page.getByRole('textbox', { name: /first name/i }).fill(faker.person.firstName());
    await this.page.getByRole('textbox', { name: /last name/i }).fill(faker.person.lastName());
    await this.page
      .getByRole('textbox', { name: /zip\/postal code/i })
      .fill(faker.location.zipCode());
  }

  async fillForm(firstName: string, lastName: string, zipCode: string) {
    const firstNameField = this.page.getByRole('textbox', { name: /first name/i });

    await firstNameField.waitFor({ state: 'visible' });
    await firstNameField.fill(firstName);
    await this.page.getByRole('textbox', { name: /last name/i }).fill(lastName);
    await this.page.getByRole('textbox', { name: /zip\/postal code/i }).fill(zipCode);
  }

  async continue() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finish() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }
}

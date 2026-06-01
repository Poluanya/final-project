import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async fillRandomForm() {
    await this.page.getByTestId('first-name').fill(faker.person.firstName());
    await this.page.getByTestId('last-name').fill(faker.person.lastName());
    await this.page.getByTestId('postal-code').fill(faker.location.zipCode());
  }

  async fillForm(firstName: string, lastName: string, zipCode: string) {
    await this.page.getByTestId('first-name').waitFor({ state: 'visible' });
    await this.page.getByTestId('first-name').fill(firstName);
    await this.page.getByTestId('last-name').fill(lastName);
    await this.page.getByTestId('postal-code').fill(zipCode);
  }

  async continue() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finish() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }
}

import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}
  async navigate() {
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
    if (user) {
      await this.page.getByRole('textbox', { name: /username/i }).fill(user);
    }

    if (pass) {
      await this.page.getByRole('textbox', { name: /password/i }).fill(pass);
    }

    await this.page.getByRole('button', { name: /login/i }).click();
  }
}

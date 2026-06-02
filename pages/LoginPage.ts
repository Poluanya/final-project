import { Page, Locator } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  get loginButton(): Locator {
    return this.page.locator('#login-button');
  }

  // 2. Добавляем метод для проверки страницы
  async isAtLoginPage(): Promise<boolean> {
    // Проверяем наличие кнопки на странице как признак того, что мы там
    return await this.loginButton.isVisible();
  }
  async navigate(path: string = '/') {
    await this.page.goto(path);
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

  async isLoginSuccessful() {
    return await this.page.url().includes('inventory.html');
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async hasRedirectedToHome(): Promise<boolean> {
    return (
      this.page.url() === 'https://www.saucedemo.com/' ||
      this.page.url() === 'https://www.saucedemo.com/index.html'
    );
  }
}

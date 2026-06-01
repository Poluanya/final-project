import { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async checkout() {
    await this.page.click('[data-test="checkout"]');
  }

  async removeItem(name: string) {
    const item = this.page.locator('.cart_item', { hasText: name });
    await item.getByRole('button', { name: /remove/i }).click();
  }
}

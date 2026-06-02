import { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async proceedToCheckout() {
    await this.page.click('[data-test="checkout"]');
  }

  async removeItem(name: string) {
    const item = this.page.locator('.cart_item', { hasText: name });
    await item.getByRole('button', { name: /remove/i }).click();
  }

  async getCartItemsCount() {
    return await this.page.locator('.cart_item').count();
  }
}

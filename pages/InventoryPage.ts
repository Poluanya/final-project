import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  async addItemToCartByName(name: string) {
    const item = this.page.locator('.inventory_item', { hasText: name });
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async logout() {
    await this.page.locator('#react-burger-menu-btn').click();
    await this.page.locator('#logout_sidebar_link').waitFor();
    await this.page.locator('#logout_sidebar_link').click();
  }

  async sortProductsBy(option: string) {
    await this.page.selectOption('.product_sort_container', option);
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map((price) => parseFloat(price.replace('$', '')));
  }

  async clickProductByName(name: string) {
    await this.page.locator('.inventory_item_name', { hasText: name }).click();
  }
}

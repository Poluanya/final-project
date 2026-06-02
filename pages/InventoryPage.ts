import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  // Геттеры позволяют скрыть "магию" локаторов
  private get cartLink() {
    return this.page.locator('.shopping_cart_link');
  }
  private get burgerMenuBtn() {
    return this.page.locator('#react-burger-menu-btn');
  }
  private get logoutLink() {
    return this.page.locator('#logout_sidebar_link');
  }
  private get sortDropdown() {
    return this.page.locator('.product_sort_container');
  }
  private get productPrices() {
    return this.page.locator('.inventory_item_price');
  }

  async addItemToCartByName(name: string) {
    const item = this.page.locator('.inventory_item', { hasText: name });
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.burgerMenuBtn.click();
    await this.logoutLink.waitFor();
    await this.logoutLink.click();
  }

  async sortProductsBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();
    return prices.map((price) => parseFloat(price.replace('$', '')));
  }

  async clickProductByName(name: string) {
    await this.page.locator('.inventory_item_name', { hasText: name }).click();
  }

  async getProductTitle(): Promise<Locator> {
    return this.page.locator('.inventory_details_name');
  }

  async getBackButton(): Promise<Locator> {
    return this.page.locator('#back-to-products');
  }

  async isSortedLowToHigh(prices: number[]): Promise<boolean> {
    for (let i = 0; i < prices.length - 1; i++) {
      if (prices[i] > prices[i + 1]) return false;
    }
    return true;
  }
}

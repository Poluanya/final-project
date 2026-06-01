import { test, expect } from '../fixtures/base';

test('Добавление товара и перход в корзину', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addItemToCartByName('Sauce Labs Onesie');
  await inventoryPage.addItemToCartByName('Sauce Labs Bolt T-Shirt');
  await inventoryPage.goToCart();
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(2);
  await expect(page).toHaveURL(/cart.html/);
});

test('Удаление товара из корзины', async ({ loginPage, inventoryPage, cartPage, page }) => {
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.removeItem('Sauce Labs Backpack');
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(0);
});

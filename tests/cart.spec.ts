import { test, expect } from '../fixtures/base';

test('Добавление товара и переход в корзину', async ({
  loginPage,
  inventoryPage,
  cartPage,
  page,
}) => {
  await test.step('Авторизация', async () => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Добавление товаров в корзину', async () => {
    await inventoryPage.addItemToCartByName('Sauce Labs Onesie');
    await inventoryPage.addItemToCartByName('Sauce Labs Bolt T-Shirt');
  });

  await test.step('Переход в корзину и проверка', async () => {
    await inventoryPage.goToCart();

    const count = await cartPage.getCartItemsCount();
    expect(count).toBe(2);
    await expect(page).toHaveURL(/cart.html/);
  });
});

test('Удаление товара из корзины', async ({ loginPage, inventoryPage, cartPage }) => {
  await test.step('Авторизация и добавление товара', async () => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
  });

  await test.step('Переход в корзину и удаление', async () => {
    await inventoryPage.goToCart();
    await cartPage.removeItem('Sauce Labs Backpack');
  });

  await test.step('Проверка удаления', async () => {
    const count = await cartPage.getCartItemsCount();
    expect(count).toBe(0);
  });
});

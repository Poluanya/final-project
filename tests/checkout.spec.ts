import { test } from '../fixtures/base';
import { expect } from '@playwright/test';

test('Полное оформление заказа', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
  page,
}) => {
  await test.step('Авторизация', async () => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Добавление товара в корзину', async () => {
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
  });

  await test.step('Переход к оформлению', async () => {
    await cartPage.proceedToCheckout();
  });

  await test.step('Заполнение данных и завершение', async () => {
    await checkoutPage.fillRandomForm();
    await checkoutPage.continue();
    await checkoutPage.finish();
  });

  await test.step('Проверка успешности заказа', async () => {
    await expect(page.locator('.complete-header')).toHaveText(/Thank you for your order!/i);
  });
});

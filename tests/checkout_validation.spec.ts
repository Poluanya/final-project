import { test, expect } from '../fixtures/base';

test('Пустые поля при оформлении заказа', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await test.step('Авторизация и переход к оформлению', async () => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  await test.step('Попытка продолжить без заполнения данных', async () => {
    await checkoutPage.continue();
  });

  await test.step('Проверка сообщения об ошибке', async () => {
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
  });
});

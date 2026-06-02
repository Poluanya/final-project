import { test, expect } from '../fixtures/base';

test('Переход к деталям товара и проверка названия', async ({ loginPage, inventoryPage }) => {
  await test.step('Авторизация', async () => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  const productName = 'Sauce Labs Backpack';

  await test.step('Переход к деталям товара', async () => {
    await inventoryPage.clickProductByName(productName);
  });

  await test.step('Проверка информации о товаре', async () => {
    const title = await inventoryPage.getProductTitle();
    const backBtn = await inventoryPage.getBackButton();

    await expect(title).toHaveText(productName);
    await expect(backBtn).toBeVisible();
  });
});

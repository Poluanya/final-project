import { test, expect } from '../fixtures/base';

test('Сортировка товаров по цене: от низкой к высокой', async ({ loginPage, inventoryPage }) => {
  await test.step('Авторизация', async () => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Применение сортировки', async () => {
    await inventoryPage.sortProductsBy('lohi');
  });

  await test.step('Проверка порядка цен', async () => {
    const prices = await inventoryPage.getProductPrices();
    const isSorted = await inventoryPage.isSortedLowToHigh(prices);

    // Используем понятную проверку
    expect(isSorted, 'Цены должны быть отсортированы от низкой к высокой').toBeTruthy();
  });
});

import { test, expect } from '../fixtures/base';

test('Сортировка товаров по цене: от низкой к высокой', async ({ loginPage, inventoryPage }) => {
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.sortProductsBy('lohi');
  const prices = await inventoryPage.getProductPrices();
  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});

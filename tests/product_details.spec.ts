import { test, expect } from '../fixtures/base';

test('Переход к деталям товара и проверка названия', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  const productName = 'Sauce Labs Backpack';
  await inventoryPage.clickProductByName(productName);
  await expect(page).toHaveURL(/inventory-item.html/);

  const detailName = page.locator('.inventory_details_name');
  await expect(detailName).toHaveText(productName);
  await expect(page.locator('#back-to-products')).toBeVisible();
});

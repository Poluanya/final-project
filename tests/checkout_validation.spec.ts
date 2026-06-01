import { test, expect } from '../fixtures/base';

test('Пустые поля при оформлении заказа', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
  page,
}) => {
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.checkout();
  await checkoutPage.continue();

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Error: First Name is required');
});

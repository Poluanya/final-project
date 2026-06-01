import { test, expect } from '../fixtures/base';

test('Полное оформление заказа', async ({ loginPage, inventoryPage, checkoutPage, page }) => {
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await page.click('[data-test="checkout"]');
  await expect(page).toHaveURL(/.*checkout-step-one\.html/);
  await checkoutPage.fillForm('Test', 'User', '12345');
  await checkoutPage.continue();
  await expect(page).toHaveURL(/checkout-step-two.html/);
  await checkoutPage.finish();
  await expect(page.locator('.complete-header')).toHaveText(/Thank you for your order!/i);
});

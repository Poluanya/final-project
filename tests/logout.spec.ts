import { test, expect } from '../fixtures/base';

test('Успешный выход из системы', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory.html/);
  await inventoryPage.logout();
  await expect(page).toHaveURL('/');
  await expect(page.locator('#login-button')).toBeVisible();
});

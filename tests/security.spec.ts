import { test, expect } from '../fixtures/base';

test('Запрет доступа к корзине без авторизации', async ({ page }) => {
  await page.goto('/cart.html');
  await expect(page).toHaveURL('/');
  await expect(page.locator('#login-button')).toBeVisible();
});

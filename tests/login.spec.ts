import { test, expect } from '../fixtures/base';

const loginData = [
  { user: 'wrong_user', pass: 'secret_sauce', expectSuccess: false },
  { user: 'standard_user', pass: 'wrong_pass', expectSuccess: false },
  { user: 'performance_glitch_user', pass: 'secret_sauce', expectSuccess: true },
  { user: 'standard_user', pass: 'secret_sauce', expectSuccess: true },
  { user: '', pass: 'secret_sauce', expectSuccess: false },
  { user: 'standard_user', pass: '', expectSuccess: false },
  { user: '', pass: '', expectSuccess: false },
];

for (const [index, data] of loginData.entries()) {
  test(`Проверка входа: #${index + 1}: ${data.user || 'empty'}`, async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(data.user, data.pass);

    if (data.expectSuccess) {
      await expect(page).toHaveURL(/inventory.html/);
    } else {
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    }
  });
}

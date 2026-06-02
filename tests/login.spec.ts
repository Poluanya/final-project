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
  test(`Проверка входа: #${index + 1}: ${data.user || 'empty'}`, async ({ loginPage }) => {
    await test.step('Переход на страницу логина', async () => {
      await loginPage.navigate();
    });

    await test.step(`Ввод данных: ${data.user || 'empty'}`, async () => {
      await loginPage.login(data.user, data.pass);
    });

    await test.step('Проверка результата', async () => {
      if (data.expectSuccess) {
        expect(await loginPage.isLoginSuccessful()).toBe(true);
      } else {
        await expect(loginPage.errorMessage).toBeVisible();
      }
    });
  });
}

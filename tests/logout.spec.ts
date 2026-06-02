import { test, expect } from '../fixtures/base';

test('Успешный выход из системы', async ({ loginPage, inventoryPage }) => {
  await test.step('Авторизация', async () => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Выполнение выхода', async () => {
    await inventoryPage.logout();
  });

  await test.step('Проверка состояния после выхода', async () => {
    // Исправляем ошибки:
    // 1. Не обращаемся к loginPage.page, а используем метод самой страницы
    // 2. Проверяем состояние через геттер кнопки, что гораздо надежнее проверки URL
    await expect(loginPage.loginButton).toBeVisible();
    expect(await loginPage.isAtLoginPage()).toBeTruthy();
  });
});

import { test, expect } from '../fixtures/base';

test('Запрет доступа к корзине без авторизации', async ({ loginPage }) => {
  await test.step('Попытка прямого перехода в корзину', async () => {
    await loginPage.navigate('/cart.html');
  });

  await test.step('Проверка редиректа на страницу логина', async () => {
    // Теперь мы используем метод класса, который знает, как проверить себя
    const isRedirected = await loginPage.hasRedirectedToHome();
    expect(isRedirected).toBeTruthy();

    // Кнопку логина мы проверяем через геттер, который у нас уже есть
    await expect(loginPage.loginButton).toBeVisible();
  });
});

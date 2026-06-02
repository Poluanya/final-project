import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // Важно: в CI мы хотим параллелизм, но локально будем управлять им вручную
  fullyParallel: !process.env.CI ? false : true,
  workers: process.env.CI ? '100%' : 1, // В CI — на полную, локально — только 1 поток

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
});

import { test, expect } from '@playwright/test';

test('auth flow + create phone (demo)', async ({ page }) => {
  await page.goto('/login');
  await page.goto('/register');
  await page.getByPlaceholder('email@example.com').fill('user@spakp.dev');
  await page.getByPlaceholder('••••••').fill('123456');
  await page.getByRole('button', { name: /реєстрація/i }).click().catch(()=>{});

  await page.goto('/login');
  await page.getByPlaceholder('email@example.com').fill('user@spakp.dev');
  await page.getByPlaceholder('••••••').fill('123456');
  await page.getByRole('button', { name: /увійти/i }).click();

  await page.goto('/create');
  await page.getByPlaceholder('Apple').fill('Apple');
  await page.getByPlaceholder('iPhone 15 Pro').fill('iPhone 15 Pro');
  await page.getByPlaceholder('iOS / Android').fill('iOS');
  await page.getByPlaceholder('2024').fill('2024');
  await page.getByPlaceholder('999').fill('999');
  await page.getByRole('button', { name: /створити|оновити/i }).click();

  await expect(page).toHaveURL('/');
});

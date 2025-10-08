import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  use: { baseURL: 'http://localhost:4200' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});

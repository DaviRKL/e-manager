import { defineConfig, devices } from '@playwright/test';

const port = process.env.PORT || '3000';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    locale: 'pt-BR',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], locale: 'pt-BR' },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
  },
});

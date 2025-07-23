import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/e2e-tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'npm run dev:nextjs',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});

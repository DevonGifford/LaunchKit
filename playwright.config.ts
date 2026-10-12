import { defineConfig, devices } from '@playwright/test';

const port = 3200;
const isCI = Boolean(process.env.CI);

/**
 * End-to-end tests against a production build. Two projects: desktop Chrome,
 * and a real mobile profile (Pixel 7: touch, mobile user agent, small screen),
 * so mobile checks exercise more than a narrow window.
 */
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `pnpm build && pnpm start --port ${port}`,
    url: `http://localhost:${port}/en`,
    reuseExistingServer: !isCI,
    timeout: 240_000,
  },
});

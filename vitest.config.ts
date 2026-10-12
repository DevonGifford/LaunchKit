import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const root = import.meta.dirname;

/**
 * Vitest Browser Mode in real headless Chromium (the same browser Playwright
 * installs). A function, because Vitest names each instance after its project
 * and would otherwise share one object between projects.
 */
const chromium = () => ({
  enabled: true,
  headless: true,
  provider: playwright(),
  instances: [{ browser: 'chromium' as const }],
});

export default defineConfig({
  resolve: { alias: { '@': path.join(root, 'src') } },
  test: {
    projects: [
      {
        // Pure logic: content model, i18n config and checks, validation, SEO helpers.
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['tests/unit/**/*.test.ts'],
          // next-intl imports `next/navigation` without an extension, which only
          // a bundler resolves; let Vite process it instead of Node.
          server: { deps: { inline: ['next-intl'] } },
        },
      },
      {
        // Components rendered in a real browser: theme, navigation, forms.
        extends: true,
        plugins: [react()],
        test: {
          name: 'integration',
          include: ['tests/integration/**/*.test.tsx'],
          setupFiles: ['tests/integration/setup.ts'],
          browser: chromium(),
        },
      },
      {
        // Every Storybook story: renders, runs its play function, passes axe.
        extends: true,
        plugins: [storybookTest({ configDir: path.join(root, '.storybook') })],
        test: { name: 'storybook', browser: chromium() },
      },
    ],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.tsx', 'src/content/**', 'src/app/**/*.{png,ico}'],
      reporter: ['text-summary', 'html'],
    },
  },
});

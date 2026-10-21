import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/nextjs-vite';
import { mergeConfig, type InlineConfig } from 'vite';

const config: StorybookConfig = {
  // The intro page and Foundations live here; component stories sit next to their components.
  stories: ['./*.mdx', './foundations/*.stories.tsx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
  ],
  framework: { name: '@storybook/nextjs-vite', options: {} },
  // The app's public files, logo colourways and the favicon used only by
  // Storybook's own UI, and stand-in logos and screenshots for stories, kept out
  // of public/ so the site never ships them. Storybook picks up a favicon served
  // at /favicon.ico.
  staticDirs: [
    '../public',
    { from: './brand', to: '/storybook-brand' },
    { from: './brand/favicon.ico', to: '/favicon.ico' },
    { from: '../tests/fixtures/logos', to: '/fixtures/logos' },
    { from: '../tests/fixtures/downstream', to: '/fixtures/downstream' },
  ],
  core: { disableTelemetry: true },
  // Lets async Server Components (the site header and footer) render in the preview.
  features: { experimentalRSC: true },
  viteFinal: (viteConfig) => {
    const base: InlineConfig = {
      ...viteConfig,
      build: {
        ...viteConfig.build,
        rolldownOptions: {
          ...viteConfig.build?.rolldownOptions,
          // Libraries mark React Server Component boundaries with "use client";
          // Storybook has no server, so the warning is noise that hides real ones.
          onwarn(warning, defaultHandler) {
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
            defaultHandler(warning);
          },
        },
      },
    };

    // The real next-intl/server needs a Next.js request; see the mock's header.
    return mergeConfig(base, {
      resolve: {
        alias: {
          'next-intl/server': fileURLToPath(new URL('./next-intl-server.mock.ts', import.meta.url)),
        },
      },
    });
  },
};

export default config;

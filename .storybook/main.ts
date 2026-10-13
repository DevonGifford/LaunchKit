import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/nextjs-vite';
import { mergeConfig, type InlineConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-themes', '@storybook/addon-vitest'],
  framework: { name: '@storybook/nextjs-vite', options: {} },
  staticDirs: ['../public'],
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

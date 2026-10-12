import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

// eslint-config-next already registers jsx-a11y. Reuse that instance rather than
// adding the plugin as a direct dependency — the same object, one version.
const jsxA11yRecommendedRules = nextVitals.find((config) => config.plugins?.['jsx-a11y'])?.plugins[
  'jsx-a11y'
].flatConfigs.recommended.rules;
if (!jsxA11yRecommendedRules) {
  throw new Error('eslint-config-next no longer registers jsx-a11y; update eslint.config.mjs.');
}

export default defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'coverage/**',
    'storybook-static/**',
    'playwright-report/**',
    'test-results/**',
    'next-env.d.ts',
  ]),

  js.configs.recommended,
  ...nextVitals,
  ...nextTypescript,

  // Type-aware rules (typescript-eslint caps TypeScript at <6.1 — see docs/toolchain.md).
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // eslint-config-next only enables a handful of jsx-a11y rules; LaunchKit
  // targets WCAG 2.2 AA, so turn on the plugin's full recommended set.
  { rules: jsxA11yRecommendedRules },

  {
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-restricted-syntax': [
        'error',
        {
          // Colours come from semantic tokens (src/app/globals.css), never literals.
          selector: 'Literal[value=/#[0-9a-fA-F]{3,8}\\b/]',
          message: 'Use a semantic design token instead of a hex colour literal.',
        },
      ],
    },
  },

  // Config files and scripts outside the TypeScript program.
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // Must stay last: turns off stylistic rules that Prettier owns.
  prettier,
]);

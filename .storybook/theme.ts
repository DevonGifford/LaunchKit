/* eslint-disable no-restricted-syntax -- Storybook's own UI is themed in JS and cannot
   read CSS variables, so these values copy src/app/theme.css. Keep them in sync. */
import { create } from 'storybook/theming';

/**
 * Storybook's UI (sidebar, toolbar, docs pages) in the LaunchKit brand. When you
 * rebrand, update these alongside src/app/theme.css and recolour the logos in
 * .storybook/brand/ (see docs/theming.md).
 */
const shared = {
  brandTitle: 'LaunchKit',
  brandUrl: 'https://launch-kit-flax.vercel.app/',
  brandTarget: '_blank',
  fontBase:
    "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontCode: "ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas, monospace",
  appBorderRadius: 6,
  inputBorderRadius: 6,
} as const;

/** Sunlight Yacht Club: the light appearance. */
export const lightTheme = create({
  ...shared,
  base: 'light',
  brandImage: './storybook-brand/launchkit-lockup-navy.png',
  colorPrimary: '#142d46',
  colorSecondary: '#203d54',
  appBg: '#f8f7f3',
  appContentBg: '#ffffff',
  appPreviewBg: '#f8f7f3',
  appBorderColor: '#dedad0',
  textColor: '#142d46',
  textInverseColor: '#f8f7f3',
  textMutedColor: '#5b6878',
  barBg: '#ffffff',
  barTextColor: '#5b6878',
  barHoverColor: '#142d46',
  barSelectedColor: '#203d54',
  inputBg: '#ffffff',
  inputBorder: '#7d8896',
  inputTextColor: '#142d46',
});

/** Midnight Yacht Club: the dark appearance. */
export const darkTheme = create({
  ...shared,
  base: 'dark',
  brandImage: './storybook-brand/launchkit-lockup-ivory.png',
  colorPrimary: '#e8e2d5',
  // Antique Gold, deepened: Storybook puts white text on the selected sidebar
  // row, and #bda77b only gives 2.3:1. This keeps 4.65:1.
  colorSecondary: '#86724a',
  appBg: '#0d1b2a',
  appContentBg: '#13243a',
  appPreviewBg: '#0d1b2a',
  appBorderColor: '#243a51',
  textColor: '#e8e2d5',
  textInverseColor: '#0d1b2a',
  textMutedColor: '#8996a3',
  barBg: '#172b40',
  barTextColor: '#8996a3',
  barHoverColor: '#e8e2d5',
  barSelectedColor: '#bda77b',
  inputBg: '#13243a',
  inputBorder: '#6b7b8d',
  inputTextColor: '#e8e2d5',
});

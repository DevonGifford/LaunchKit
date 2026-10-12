import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../messages/en.json';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    // The i18n Link and usePathname need the App Router mocks.
    nextjs: { appDirectory: true, navigation: { pathname: '/' } },
    layout: 'padded',
    controls: { expanded: true },
    // Fail the a11y panel (and any test runner) on violations, not just warn.
    a11y: { test: 'error' },
    viewport: {
      options: {
        mobile: { name: 'Mobile (375)', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet (834)', styles: { width: '834px', height: '1112px' } },
        desktop: { name: 'Desktop (1440)', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
  decorators: [
    // Appearance is the same class on <html> that next-themes sets in the app.
    withThemeByClassName({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;

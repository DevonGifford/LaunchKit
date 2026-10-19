import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import { useEffect, useState, type PropsWithChildren } from 'react';
import messages from '../messages/en.json';
import { ConsentProvider } from '../src/components/layout/consent-provider';
import '../src/app/globals.css';
import { darkTheme, lightTheme } from './theme';

/**
 * Docs pages in the toolbar's appearance. The theme decorator below sets it as a
 * class on <html>; following that class keeps the page and its stories matched.
 */
function ThemedDocsContainer(props: PropsWithChildren<DocsContainerProps>) {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setDark(root.classList.contains('dark')));
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return <DocsContainer {...props} theme={dark ? darkTheme : lightTheme} />;
}

const preview: Preview = {
  // A generated docs page for every component: its stories, props table and comments.
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: [
          'Get started',
          'Foundations',
          ['Colours', 'Typography', 'Radius and spacing'],
          'Sections',
          [
            'Hero',
            ['Basic', 'Centered', 'Cinematic', 'Split'],
            'CTA',
            ['Band', 'Panel', 'Editorial', 'Media', 'Split'],
            'Capabilities',
            'Statement',
            'Showcase',
            'Features',
            'Marquee',
            'Reviews',
            'Lineup',
            'Bento',
            'Stats',
            'FAQ',
            'Pricing',
            'Contact',
            // Sections written for LaunchKit's own site.
            'Marketing',
            [
              'Hero LaunchKit',
              'Developer experience',
              'Deployment pipeline',
              'Technical stack',
              'Setup timeline',
              'Quality gates',
            ],
          ],
          'Layout',
          [
            'Site header',
            'Site footer',
            'Navigation links',
            'Mobile navigation',
            'Consent preferences',
            'Consent prompt',
            'Coming soon',
            'Not found',
            'Error',
          ],
          'UI',
          ['Forms', 'Actions', 'Feedback', 'Content', 'Overlays', 'Navigation'],
          'Forms',
        ],
      },
    },
    // Docs pages follow the toolbar's appearance. Stories that set their own
    // viewport or theme are tagged '!autodocs': a docs page renders every story
    // inline at the page's width, and one <html> class sets the theme for all.
    docs: { theme: lightTheme, container: ThemedDocsContainer },
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
    // The footer's privacy settings button reads consent state. With no
    // services listed, nothing waits on consent; the consent stories add some.
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <ConsentProvider services={[]}>
          <Story />
        </ConsentProvider>
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;

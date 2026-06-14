import { ViewTransition, type ReactNode } from 'react';

/**
 * Cross-fades the page content on navigation. Unlike the layout, a template
 * remounts for each page, so the transition plays; the header and footer stay
 * put. Browsers without view transitions simply swap the page, and reduced
 * motion turns the fade off (see globals.css).
 */
export default function LocaleTemplate({ children }: { children: ReactNode }) {
  return <ViewTransition>{children}</ViewTransition>;
}

import axe from 'axe-core';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import { render } from 'vitest-browser-react';
import messages from '../../messages/en.json';

/** Render inside the same i18n provider the app uses (English catalogue). */
export function renderWithIntl(ui: ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
      {ui}
    </NextIntlClientProvider>,
  );
}

/** WCAG 2.2 A/AA violations inside `element`, as readable strings. */
export async function axeViolations(element: Element) {
  const results = await axe.run(element, {
    runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
  });
  return results.violations.map(
    (violation) =>
      `${violation.id}: ${violation.nodes
        .map((node) => `${node.target.join(' ')} — ${node.failureSummary ?? ''}`)
        .join('; ')}`,
  );
}

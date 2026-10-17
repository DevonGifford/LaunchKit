'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

// Rendered in the browser, the script is marked as data. A script React creates
// on the client never runs anyway, and React 19 logs an error for one that
// looks runnable. That happens when switching language, which remounts the
// root layout. The server's copy stays a real script, so the first paint is
// still right.
const clientScriptProps =
  typeof window === 'undefined' ? undefined : ({ type: 'application/json' } as const);

/**
 * Light/dark appearance. Follows the system preference until the visitor picks
 * one; next-themes injects a blocking script so the right class is on `<html>`
 * before first paint (no flash).
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={clientScriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}

import type { ReactNode } from 'react';

// The real root layout is src/app/[locale]/layout.tsx, which knows the locale
// for <html lang>. This file only exists so that src/app/not-found.tsx can
// render for requests outside any locale.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

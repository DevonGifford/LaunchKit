import type { ReactNode } from 'react';

/**
 * Frames a page state (not found, error, coming soon) between the header and
 * footer: the hero inside sits in the middle of at least 60% of the screen's
 * height, so a short message doesn't leave the footer riding up.
 */
export function PageState({ children }: { children: ReactNode }) {
  return <div className="flex min-h-[60dvh] flex-col justify-center">{children}</div>;
}

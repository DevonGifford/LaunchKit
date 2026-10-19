'use client';

import type { ReactNode } from 'react';
import type { ConsentCategory } from '@/lib/consent/consent';
import { useConsent } from './consent-provider';

/** Renders `children` only once the visitor allows `category`, and removes them if they withdraw it. */
export function ConsentGate({
  category,
  children,
}: {
  category: ConsentCategory;
  children: ReactNode;
}) {
  const { allows } = useConsent();
  return allows(category) ? children : null;
}

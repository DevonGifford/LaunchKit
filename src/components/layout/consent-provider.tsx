'use client';

import { createContext, use, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import {
  allowsCategory,
  createConsentRecord,
  parseConsentRecord,
  type ConsentCategory,
  type ConsentChoices,
  type ConsentRecord,
  type OptionalConsentCategory,
} from '@/lib/consent/consent';
import { readStoredConsent, storeConsent, subscribeToConsent } from '@/lib/consent/storage';

/** A third-party service as the privacy preferences list it. */
export type ConsentService = { name: string; consent: OptionalConsentCategory | null };

type ConsentContextValue = {
  /** False on the server and while hydrating, before the stored decision is read. */
  ready: boolean;
  /** The visitor's decision, or null if they haven't made one. */
  record: ConsentRecord | null;
  /** The services this site loads, for the preferences to list. */
  services: readonly ConsentService[];
  allows: (category: ConsentCategory) => boolean;
  decide: (choices: ConsentChoices) => void;
  preferencesOpen: boolean;
  setPreferencesOpen: (open: boolean) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

// The decision lives in the browser, so it's unknown until hydration finishes.
const getServerSnapshot = () => undefined;

/**
 * The visitor's privacy choices, read from local storage and kept in step
 * across tabs. Integrations ask `allows(category)`; nothing here knows which
 * services exist beyond the list it's given.
 */
export function ConsentProvider({
  services,
  children,
}: {
  services: readonly ConsentService[];
  children: ReactNode;
}) {
  const raw = useSyncExternalStore<string | null | undefined>(
    subscribeToConsent,
    readStoredConsent,
    getServerSnapshot,
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const value = useMemo<ConsentContextValue>(() => {
    const record = raw === undefined ? null : parseConsentRecord(raw);
    return {
      ready: raw !== undefined,
      record,
      services,
      allows: (category) => allowsCategory(record, category),
      decide: (choices) => storeConsent(createConsentRecord(choices)),
      preferencesOpen,
      setPreferencesOpen,
    };
  }, [raw, services, preferencesOpen]);

  return <ConsentContext value={value}>{children}</ConsentContext>;
}

/** The consent state; use inside `ConsentProvider`. */
export function useConsent() {
  const context = use(ConsentContext);
  if (!context) throw new Error('useConsent must be used inside <ConsentProvider>.');
  return context;
}

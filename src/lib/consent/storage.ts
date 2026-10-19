import { consentStorageKey, type ConsentRecord } from './consent';

const listeners = new Set<() => void>();

// The decision, kept for this page view when the browser blocks local storage
// (some private modes), so the prompt still closes once the visitor chooses.
let unsaved: string | null = null;

/** The stored decision, unparsed: a stable value for `useSyncExternalStore`. */
export function readStoredConsent(): string | null {
  try {
    return window.localStorage.getItem(consentStorageKey) ?? unsaved;
  } catch {
    return unsaved;
  }
}

/** Saves a decision and tells every subscriber on the page. */
export function storeConsent(record: ConsentRecord) {
  const value = JSON.stringify(record);
  try {
    window.localStorage.setItem(consentStorageKey, value);
    unsaved = null;
  } catch {
    unsaved = value;
  }
  for (const listener of listeners) listener();
}

/** Calls `listener` when the decision changes, here or in another tab. */
export function subscribeToConsent(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    // A null key means the whole storage was cleared.
    if (event.key === consentStorageKey || event.key === null) listener();
  };
  listeners.add(listener);
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

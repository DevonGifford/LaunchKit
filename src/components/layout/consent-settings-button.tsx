'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useConsent } from './consent-provider';

/** Reopens the privacy preferences; styled to sit among links, as in the footer. */
export function ConsentSettingsButton({ className }: { className?: string }) {
  const t = useTranslations('Consent');
  const { setPreferencesOpen } = useConsent();

  return (
    <button
      type="button"
      onClick={() => setPreferencesOpen(true)}
      className={cn(
        'inline-flex min-h-10 cursor-pointer items-center rounded-md text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
    >
      {t('settings')}
    </button>
  );
}

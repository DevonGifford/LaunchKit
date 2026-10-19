'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { acceptAllChoices, rejectAllChoices } from '@/lib/consent/consent';
import { cn } from '@/lib/utils';
import { useConsent } from './consent-provider';

/**
 * Publishes the prompt's height, from the viewport's bottom edge, as
 * `--consent-prompt-space`. globals.css pads the page and its focus scrolling
 * by it, so nothing ends up permanently behind the prompt (WCAG 2.4.11).
 */
function reserveSpace(element: HTMLElement) {
  const root = document.documentElement;
  const observer = new ResizeObserver(() => {
    // Shown in place, as in a docs page, the prompt covers nothing.
    if (getComputedStyle(element).position !== 'fixed') return;
    const space = window.innerHeight - element.getBoundingClientRect().top;
    root.style.setProperty('--consent-prompt-space', `${Math.max(0, Math.ceil(space))}px`);
  });
  observer.observe(element);
  return () => {
    observer.disconnect();
    root.style.removeProperty('--consent-prompt-space');
  };
}

/**
 * The first-visit privacy prompt: a compact card at the bottom right from
 * 1024px, a bottom panel below that. It never blocks the page, and shows only
 * until the visitor decides.
 */
export function ConsentPrompt({ className }: { className?: string }) {
  const t = useTranslations('Consent');
  const { ready, record, services, decide, setPreferencesOpen } = useConsent();
  const titleId = useId();

  if (!ready || record) return null;
  // The opening sentence describes measurement that runs for everyone, so it
  // shows only when such a service is active.
  const measuring = services.some((service) => service.consent === null) ? 'yes' : 'no';

  return (
    <section
      ref={reserveSpace}
      aria-labelledby={titleId}
      className={cn(
        'fixed inset-x-4 bottom-4 z-40 sm:inset-x-6 sm:bottom-6 lg:left-auto lg:w-96',
        className,
      )}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <h2 id={titleId} className="text-lg leading-snug">
            {t('title')}
          </h2>
          <CardDescription>
            {t.rich('description', {
              measuring,
              link: (chunks) => (
                <Link
                  href="/privacy"
                  className="rounded-sm text-foreground underline underline-offset-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {chunks}
                </Link>
              ),
            })}
          </CardDescription>
        </CardHeader>
        {/* Accepting and rejecting get the same weight; each grows to share its row. */}
        <CardContent className="flex flex-wrap gap-2 *:grow">
          <Button onClick={() => decide(rejectAllChoices)}>{t('rejectAll')}</Button>
          <Button onClick={() => decide(acceptAllChoices)}>{t('acceptAll')}</Button>
          <Button
            variant="outline"
            className="basis-full sm:basis-auto lg:basis-full"
            onClick={() => setPreferencesOpen(true)}
          >
            {t('managePreferences')}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

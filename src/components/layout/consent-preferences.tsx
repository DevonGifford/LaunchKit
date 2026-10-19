'use client';

import { useId, useRef, useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldContent, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import {
  acceptAllChoices,
  consentCategories,
  rejectAllChoices,
  type ConsentCategory,
  type ConsentChoices,
} from '@/lib/consent/consent';
import { useConsent } from './consent-provider';

/**
 * The privacy preferences dialog: a switch per category, with the services
 * that use it. Opened from the prompt or the footer's privacy settings.
 */
export function ConsentPreferences() {
  const t = useTranslations('Common');
  const { preferencesOpen, setPreferencesOpen } = useConsent();
  // The button that opened the dialog. Radix only returns focus to a
  // DialogTrigger, and the prompt and footer buttons aren't one.
  const opener = useRef<HTMLElement | null>(null);

  return (
    <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
      <DialogContent
        closeLabel={t('close')}
        className="sm:max-w-lg"
        onOpenAutoFocus={() => {
          opener.current =
            document.activeElement instanceof HTMLElement ? document.activeElement : null;
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          // Opened from the prompt, a choice closes both, so the opener is gone:
          // continue from the page's main content instead.
          const target = opener.current?.isConnected
            ? opener.current
            : document.getElementById('main');
          target?.focus();
        }}
      >
        {/* Remounts on every opening, so unsaved changes never linger. */}
        <PreferencesForm onDone={() => setPreferencesOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function PreferencesForm({ onDone }: { onDone: () => void }) {
  const t = useTranslations('Consent');
  const format = useFormatter();
  const { record, services, decide } = useConsent();
  const [choices, setChoices] = useState<ConsentChoices>(() =>
    record ? { analytics: record.analytics, marketing: record.marketing } : rejectAllChoices,
  );

  const save = (next: ConsentChoices) => {
    decide(next);
    onDone();
  };
  const alwaysRunning = services
    .filter((service) => service.consent === null)
    .map((service) => service.name);

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('preferences.title')}</DialogTitle>
        <DialogDescription>{t('preferences.description')}</DialogDescription>
      </DialogHeader>
      <ul className="divide-y">
        {consentCategories.map((category) => (
          <CategoryRow
            key={category}
            category={category}
            checked={category === 'necessary' || choices[category]}
            onCheckedChange={(checked) => {
              if (category !== 'necessary') setChoices({ ...choices, [category]: checked });
            }}
            serviceNames={services
              .filter((service) => service.consent === category)
              .map((service) => service.name)}
          />
        ))}
      </ul>
      {alwaysRunning.length > 0 && (
        <p className="text-muted-foreground">
          {t('preferences.alwaysRunning', { services: format.list(alwaysRunning) })}
        </p>
      )}
      <DialogFooter className="sm:flex-wrap">
        <Button variant="outline" onClick={() => save(rejectAllChoices)}>
          {t('rejectAll')}
        </Button>
        <Button variant="outline" onClick={() => save(acceptAllChoices)}>
          {t('acceptAll')}
        </Button>
        <Button onClick={() => save(choices)}>{t('preferences.save')}</Button>
      </DialogFooter>
    </>
  );
}

function CategoryRow({
  category,
  checked,
  onCheckedChange,
  serviceNames,
}: {
  category: ConsentCategory;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  serviceNames: string[];
}) {
  const t = useTranslations('Consent');
  const format = useFormatter();
  const id = useId();
  const necessary = category === 'necessary';

  return (
    <li className="py-3 first:pt-0">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor={id}>{t(`categories.${category}.label`)}</FieldLabel>
          <FieldDescription id={`${id}-description`}>
            {t(`categories.${category}.description`)}{' '}
            {!necessary &&
              (serviceNames.length > 0
                ? t('preferences.usedBy', { services: format.list(serviceNames) })
                : t('preferences.unused'))}
          </FieldDescription>
        </FieldContent>
        <Switch
          id={id}
          checked={checked}
          disabled={necessary}
          onCheckedChange={onCheckedChange}
          aria-describedby={`${id}-description`}
        />
      </Field>
    </li>
  );
}

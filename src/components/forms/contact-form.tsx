'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import { Controller, useForm, type FieldError } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { submitContact } from '@/lib/forms/contact-action';
import {
  contactSchema,
  contactTopics,
  MESSAGE_MIN_LENGTH,
  type ContactErrorKey,
  type ContactField,
  type ContactFormInput,
  type ContactMessage,
} from '@/lib/forms/contact-schema';

type Outcome = 'idle' | 'success' | 'error';

/**
 * Reference form: React Hook Form + Zod, validated in the browser and again by
 * a server action. Errors are linked to their fields with aria-describedby,
 * focus moves to the first invalid field on submit, and the outcome is
 * announced through live regions.
 *
 * After a successful send the fields remount empty (a new `key`) instead of
 * calling `form.reset()`: Radix's controlled Select and Checkbox echo a reset
 * back through their change handlers, which re-validates the emptied fields.
 */
export function ContactForm() {
  const t = useTranslations('ContactForm');
  const [outcome, setOutcome] = useState<Outcome>('idle');
  const [instance, setInstance] = useState(0);
  const confirmationRef = useRef<HTMLParagraphElement>(null);

  // The submit button is replaced on remount; keep focus somewhere meaningful.
  useEffect(() => {
    if (outcome === 'success') confirmationRef.current?.focus();
  }, [outcome, instance]);

  return (
    <div className="space-y-4">
      <ContactFields
        key={instance}
        onSubmitStart={() => setOutcome('idle')}
        onSuccess={() => {
          setOutcome('success');
          setInstance((current) => current + 1);
        }}
        onFailure={() => setOutcome('error')}
      />
      {/* Live regions stay mounted so screen readers announce what changes in them. */}
      <p ref={confirmationRef} tabIndex={-1} role="status" className="text-sm outline-none">
        {outcome === 'success' && t('success')}
      </p>
      <p role="alert" className="text-sm text-destructive">
        {outcome === 'error' && t('errors.server')}
      </p>
    </div>
  );
}

function ContactFields({
  onSubmitStart,
  onSuccess,
  onFailure,
}: {
  onSubmitStart: () => void;
  onSuccess: () => void;
  onFailure: () => void;
}) {
  const t = useTranslations('ContactForm');
  const baseId = useId();

  const form = useForm<ContactFormInput, unknown, ContactMessage>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', topic: undefined, message: '', consent: false },
  });
  const { errors, isSubmitting } = form.formState;

  const fieldId = (field: ContactField) => `${baseId}-${field}`;
  const errorId = (field: ContactField) => `${baseId}-${field}-error`;
  const errorText = (error: FieldError | undefined) =>
    error?.message
      ? t(`errors.${error.message as ContactErrorKey}`, { min: MESSAGE_MIN_LENGTH })
      : undefined;
  const describedBy = (field: ContactField) => (errors[field] ? errorId(field) : undefined);

  const onSubmit = form.handleSubmit(async (values) => {
    onSubmitStart();
    try {
      const result = await submitContact(values);
      if (result.ok) {
        onSuccess();
        return;
      }
      for (const [field, key] of Object.entries(result.fieldErrors)) {
        form.setError(field as ContactField, { message: key }, { shouldFocus: true });
      }
    } catch {
      onFailure();
    }
  });

  return (
    <form noValidate onSubmit={(event) => void onSubmit(event)} className="space-y-6">
      <p className="text-sm text-muted-foreground">{t('requiredNote')}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label={t('name')}
          id={fieldId('name')}
          error={errorText(errors.name)}
          errorId={errorId('name')}
        >
          <Input
            id={fieldId('name')}
            autoComplete="name"
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            {...form.register('name')}
          />
        </Field>
        <Field
          label={t('email')}
          id={fieldId('email')}
          error={errorText(errors.email)}
          errorId={errorId('email')}
        >
          <Input
            id={fieldId('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            {...form.register('email')}
          />
        </Field>
      </div>

      <Field
        label={t('topic')}
        id={fieldId('topic')}
        error={errorText(errors.topic)}
        errorId={errorId('topic')}
      >
        <Controller
          control={form.control}
          name="topic"
          render={({ field }) => (
            <Select value={field.value ?? ''} onValueChange={field.onChange}>
              <SelectTrigger
                ref={field.ref}
                id={fieldId('topic')}
                onBlur={field.onBlur}
                aria-required="true"
                aria-invalid={Boolean(errors.topic)}
                aria-describedby={describedBy('topic')}
                className="w-full"
              >
                <SelectValue placeholder={t('topicPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {contactTopics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {t(`topics.${topic}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field
        label={t('message')}
        id={fieldId('message')}
        error={errorText(errors.message)}
        errorId={errorId('message')}
      >
        <Textarea
          id={fieldId('message')}
          rows={6}
          className="min-h-36"
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          {...form.register('message')}
        />
      </Field>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Controller
            control={form.control}
            name="consent"
            render={({ field }) => (
              <Checkbox
                ref={field.ref}
                id={fieldId('consent')}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                onBlur={field.onBlur}
                aria-required="true"
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={describedBy('consent')}
                className="mt-0.5"
              />
            )}
          />
          <Label htmlFor={fieldId('consent')} className="leading-snug font-normal">
            {t('consent')}
          </Label>
        </div>
        <FieldError id={errorId('consent')} message={errorText(errors.consent)} />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  errorId,
  children,
}: {
  label: string;
  id: string;
  error: string | undefined;
  errorId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}

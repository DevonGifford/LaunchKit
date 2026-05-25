import { LayersIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { PricingCards } from './pricing-cards';
import { ActionButton, Eyebrow, SectionHeading } from './section-parts';

type Section = SectionOf<'pricing'>;

/** Plans with a currency selector, then a callout for larger work and an optional row of figures. */
export function PricingSection({
  id,
  eyebrow,
  title,
  description,
  currencies,
  currencyNote,
  plans,
  callout,
  proof,
}: Section) {
  // Translated here, so the client part needs no message catalogue of its own.
  const t = useTranslations('Pricing');
  const locale = useLocale();
  const labels = {
    currency: t('currency'),
    recommended: t('recommended'),
    plans: t('plans'),
    carousel: t('carousel'),
    slide: t('slide'),
    previous: t('previous'),
    next: t('next'),
    slides: plans.map((plan, index) =>
      t('slideLabel', { name: plan.name, index: index + 1, total: plans.length }),
    ),
  };

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t">
      <Container className="py-20 lg:py-28">
        <SectionHeading
          id={id}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
        <PricingCards
          plans={plans}
          currencies={currencies}
          currencyNote={currencyNote}
          labels={labels}
          locale={locale}
        />
        {callout && (
          <Card className="mt-12 gap-6 px-6 py-6 text-base sm:flex-row sm:items-center sm:px-8">
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-accent/50 bg-accent/15"
            >
              <LayersIcon className="size-6" />
            </span>
            <div className="flex-1 space-y-1">
              <h3 className="text-2xl">{callout.title}</h3>
              <p className="text-muted-foreground">{callout.description}</p>
            </div>
            <div className="max-sm:*:w-full">
              <ActionButton action={callout.action} variant="outline" />
            </div>
          </Card>
        )}
        {proof && (
          <div className="mt-16">
            <Eyebrow align="center">{proof.title}</Eyebrow>
            <dl className="mt-8 grid grid-cols-2 gap-y-8 sm:flex sm:justify-center">
              {proof.items.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col-reverse items-center gap-1 text-center sm:flex-1 sm:border-l sm:first:border-l-0"
                >
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="font-serif text-3xl">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </Container>
    </section>
  );
}

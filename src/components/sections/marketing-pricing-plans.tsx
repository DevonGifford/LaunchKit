'use client';

import { CircleCheckIcon, GlobeIcon } from 'lucide-react';
import { useId, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import type { SectionOf } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { ActionButton } from './section-parts';

type Section = SectionOf<'marketing-pricing'>;
type Plan = Section['plans'][number];
type Currency = Section['currencies'][number];

/** Interface text, translated on the server and passed in. */
export type PricingLabels = {
  currency: string;
  recommended: string;
  plans: string;
  carousel: string;
  slide: string;
  previous: string;
  next: string;
  /** One accessible name per plan, e.g. "Built For You, 2 of 3". */
  slides: string[];
};

// The `lg` breakpoint: from here the carousel switches off and the cards sit in a row.
const wideScreen = '(min-width: 64rem)';

// The active card's edge sits half a gutter (8px) inside its slide; a 40px arrow
// centred on that edge starts 12px outside it.
const arrow =
  'z-10 bg-background [--arrow:calc((100%_-_var(--slide))/2_-_12px)] lg:hidden dark:bg-background dark:hover:bg-muted';

/**
 * The currency selector and the plans. One set of cards serves every width: a
 * carousel on phones and tablets that starts on the recommended plan, and a
 * three-column row from `lg`.
 */
export function PricingPlans({
  plans,
  currencies,
  currencyNote,
  labels,
  locale,
}: Pick<Section, 'plans' | 'currencies' | 'currencyNote'> & {
  labels: PricingLabels;
  locale: string;
}) {
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const noteId = useId();
  const currencyNames = new Intl.DisplayNames([locale], { type: 'currency' });
  const recommended = plans.findIndex((plan) => plan.recommended);

  return (
    <>
      <div className="mt-10 flex flex-col items-center gap-2">
        <Select
          value={currency}
          onValueChange={(value) => {
            const next = currencies.find((code) => code === value);
            if (next) setCurrency(next);
          }}
        >
          <SelectTrigger
            aria-label={labels.currency}
            aria-describedby={currencyNote ? noteId : undefined}
            className="min-w-64 *:data-[slot=select-value]:flex-1"
          >
            <GlobeIcon aria-hidden="true" className="text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((code) => (
              <SelectItem key={code} value={code}>
                {code} — {currencyNames.of(code)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {currencyNote && (
          <p id={noteId} className="text-xs text-muted-foreground">
            {currencyNote}
          </p>
        )}
      </div>

      <Carousel
        opts={{
          align: 'center',
          // Every plan, the first and last included, snaps to the centre. The
          // default ('trimSnaps') pins the end slides to the viewport's edges.
          containScroll: false,
          startIndex: Math.max(recommended, 0),
          breakpoints: { [wideScreen]: { active: false } },
        }}
        aria-label={labels.plans}
        aria-roledescription={labels.carousel}
        // Edge to edge below `lg`, so the neighbouring plans peek in from the screen's
        // sides. `--slide` is one slide's width, which also places the arrows.
        className="-mx-5 mt-10 [--slide:82%] sm:-mx-8 sm:[--slide:70%] md:[--slide:60%] lg:mx-0"
      >
        {/*
          Each slide's gutter is split evenly either side of its card, so the card is
          exactly centred. Vertical padding keeps the recommended card's ring and
          label clear of the clipping edge.
        */}
        <CarouselContent className="ml-0 py-3 lg:-mx-3">
          {plans.map((plan, index) => (
            <CarouselItem
              key={plan.name}
              aria-label={labels.slides[index]}
              aria-roledescription={labels.slide}
              className="basis-(--slide) px-2 lg:basis-1/3 lg:px-3"
            >
              <PlanCard
                plan={plan}
                currency={currency}
                locale={locale}
                recommendedLabel={labels.recommended}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Centred on the active card's edges: half over the card, half over the gutter. */}
        <CarouselPrevious
          label={labels.previous}
          size="icon"
          className={cn(arrow, 'left-(--arrow)')}
        />
        <CarouselNext label={labels.next} size="icon" className={cn(arrow, 'right-(--arrow)')} />
      </Carousel>
    </>
  );
}

function PlanCard({
  plan,
  currency,
  locale,
  recommendedLabel,
}: {
  plan: Plan;
  currency: Currency;
  locale: string;
  recommendedLabel: string;
}) {
  return (
    <Card
      className={cn(
        'relative h-full gap-6 overflow-visible px-6 py-8 text-base sm:px-8',
        plan.recommended && 'ring-2 ring-accent',
      )}
    >
      {plan.recommended && (
        <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
          {recommendedLabel}
        </Badge>
      )}
      <div className="space-y-2">
        <h3 className="text-3xl">{plan.name}</h3>
        <p className="text-muted-foreground">{plan.description}</p>
      </div>
      <Separator />
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-serif text-5xl">{formatPrice(plan.price, currency, locale)}</span>
        {plan.priceNote && <span className="text-muted-foreground">{plan.priceNote}</span>}
      </p>
      <ul className="flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <CircleCheckIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="*:w-full">
        <ActionButton action={plan.action} variant={plan.recommended ? 'default' : 'outline'} />
      </div>
    </Card>
  );
}

function formatPrice(price: Plan['price'], currency: Currency, locale: string) {
  if ('label' in price) return price.label;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price.amounts[currency]);
}

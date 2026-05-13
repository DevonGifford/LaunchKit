'use client';

/*
 * Adapted from shadcn-ui-kit, components/sections/dashboard-section.tsx
 * (https://github.com/bundui/shadcn-ui-kit). Copyright (c) 2024 Mohd. Nisab, MIT License.
 */
import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Link } from '@/i18n/navigation';
import type { SectionOf } from '@/lib/content/types';

type Item = SectionOf<'marketing-dashboard'>['items'][number];

/** Interface text, translated on the server and passed in. */
export type DashboardLabels = {
  /** The carousel's accessible name, distinct from the section's. */
  label: string;
  carousel: string;
  slide: string;
  previous: string;
  next: string;
  /** One accessible name per screen, e.g. "Pricing, 2 of 8". */
  slides: string[];
};

/**
 * Screens in a row, each narrower than the container so the next one peeks in.
 * It doesn't loop or move by itself; the buttons below step through it.
 */
export function DashboardCarousel({ items, labels }: { items: Item[]; labels: DashboardLabels }) {
  return (
    <Carousel
      opts={{ align: 'start' }}
      aria-label={labels.label}
      aria-roledescription={labels.carousel}
      className="mt-12 lg:mt-16"
    >
      <CarouselContent className="-ml-4 lg:-ml-6">
        {items.map((item, index) => (
          <CarouselItem
            key={item.href}
            aria-label={labels.slides[index]}
            aria-roledescription={labels.slide}
            className="basis-[85%] pl-4 sm:basis-[60%] md:basis-[45%] lg:basis-[36%] lg:pl-6"
          >
            <Screen item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-6 flex justify-center gap-2">
        <CarouselPrevious label={labels.previous} size="icon" className="static my-0" />
        <CarouselNext label={labels.next} size="icon" className="static my-0" />
      </div>
    </Carousel>
  );
}

/** A screenshot under its name, the whole card linking to the demo. */
function Screen({ item }: { item: Item }) {
  const image = {
    width: 1200,
    height: 750,
    sizes: '(min-width: 64rem) 26rem, (min-width: 48rem) 45vw, 82vw',
    className: 'aspect-[16/10] w-full object-cover object-top',
  };

  return (
    <CardLink
      href={item.href}
      className="group block overflow-hidden rounded-xl border bg-card transition-colors outline-none hover:border-accent focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <span className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium">
        {item.name}
        <ArrowUpRightIcon
          aria-hidden="true"
          className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
        />
      </span>
      <span className="block border-t">
        <Image {...image} alt="" src={item.light} className={`${image.className} dark:hidden`} />
        <Image
          {...image}
          alt=""
          src={item.dark}
          className={`hidden ${image.className} dark:block`}
        />
      </span>
    </CardLink>
  );
}

function CardLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  return href.startsWith('/') ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

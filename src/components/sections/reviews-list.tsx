'use client';

/*
 * Adapted from shadcn-ui-kit, components/sections/reviews-carousel.tsx and review-card.tsx
 * (https://github.com/bundui/shadcn-ui-kit). Copyright (c) 2024 Mohd. Nisab, MIT License.
 */
import { ArrowUpRightIcon } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Link } from '@/i18n/navigation';
import type { SectionOf } from '@/lib/content/types';
import { PersonAvatar } from './section-parts';

type Review = SectionOf<'reviews'>['reviews'][number];

/** Interface text, translated on the server and passed in. */
export type ReviewsLabels = {
  /** The carousel's accessible name, distinct from the section's. */
  label: string;
  carousel: string;
  slide: string;
  previous: string;
  next: string;
  /** One accessible name per review, e.g. "Amara Osei, 2 of 6". */
  slides: string[];
};

// The `sm` breakpoint: from here the carousel switches off and the reviews form a grid.
const grid = '(min-width: 40rem)';

/**
 * One set of cards for every width: a swipeable row on phones, with the next
 * review peeking in, and a grid of two, then three, columns from 640px. The
 * frame draws the outer edge; each card draws its own right and bottom rules,
 * and the outermost ones tuck under the frame.
 */
export function ReviewsList({ reviews, labels }: { reviews: Review[]; labels: ReviewsLabels }) {
  return (
    <Carousel
      opts={{ align: 'start', breakpoints: { [grid]: { active: false } } }}
      aria-label={labels.label}
      aria-roledescription={labels.carousel}
      className="mt-12 lg:mt-16"
    >
      <div className="overflow-hidden rounded-xl border">
        <CarouselContent className="-me-px -mb-px ml-0 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <CarouselItem
              key={review.name}
              aria-label={labels.slides[index]}
              aria-roledescription={labels.slide}
              className="basis-[85%] border-e border-b pl-0 sm:basis-auto"
            >
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
      <div className="mt-4 flex justify-end gap-2 sm:hidden">
        <CarouselPrevious label={labels.previous} size="icon" className="static my-0" />
        <CarouselNext label={labels.next} size="icon" className="static my-0" />
      </div>
    </Carousel>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const { name, role, quote, image, href } = review;

  return (
    <figure className="flex h-full flex-col gap-5 p-6 lg:p-8">
      <figcaption className="flex items-center gap-3">
        <PersonAvatar name={name} image={image} size="lg" />
        <div className="min-w-0">
          {href ? <ReviewLink href={href} name={name} /> : <p className="font-medium">{name}</p>}
          {role && <p className="text-sm text-muted-foreground">{role}</p>}
        </div>
      </figcaption>
      <blockquote className="text-lg leading-relaxed text-pretty">{quote}</blockquote>
    </figure>
  );
}

/** The reviewer's name, linking to where the review was first published. */
function ReviewLink({ href, name }: { href: string; name: string }) {
  const className =
    'group/link inline-flex items-center gap-1 rounded-sm font-medium underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50';
  const icon = (
    <ArrowUpRightIcon
      aria-hidden="true"
      className="size-4 text-muted-foreground group-hover/link:text-foreground"
    />
  );

  return href.startsWith('/') ? (
    <Link href={href} className={className}>
      {name}
      {icon}
    </Link>
  ) : (
    <a href={href} className={className}>
      {name}
      {icon}
    </a>
  );
}

/*
 * Adapted from shadcn-ui-kit, components/sections/reviews.tsx and review-card.tsx
 * (https://github.com/bundui/shadcn-ui-kit). Copyright (c) 2024 Mohd. Nisab, MIT License.
 */
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { ReviewsList } from './marketing-reviews-list';
import { SectionHeading } from './section-parts';

/** A centred heading over the reviews: a bordered grid, or a carousel on phones. */
export function MarketingReviews({
  id,
  eyebrow,
  title,
  description,
  reviews,
}: SectionOf<'marketing-reviews'>) {
  // Translated here, so the client part needs no message catalogue of its own.
  const t = useTranslations('MarketingReviews');
  const labels = {
    label: t('label'),
    carousel: t('carousel'),
    slide: t('slide'),
    previous: t('previous'),
    next: t('next'),
    slides: reviews.map((review, index) =>
      t('slideLabel', { name: review.name, index: index + 1, total: reviews.length }),
    ),
  };

  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <Container className="py-20 lg:py-28">
        <SectionHeading
          id={id}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
        <ReviewsList reviews={reviews} labels={labels} />
      </Container>
    </section>
  );
}

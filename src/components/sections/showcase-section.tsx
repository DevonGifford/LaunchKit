/*
 * Adapted from shadcn-ui-kit, components/sections/dashboard-section.tsx
 * (https://github.com/bundui/shadcn-ui-kit). Copyright (c) 2024 Mohd. Nisab, MIT License.
 */
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { ShowcaseSlides } from './showcase-slides';
import { ActionButton, SectionHeading } from './section-parts';

/** A centred heading and actions over a carousel of screenshots, each linking to its demo. */
export function ShowcaseSection({
  id,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  items,
}: SectionOf<'showcase'>) {
  // Translated here, so the client part needs no message catalogue of its own.
  const t = useTranslations('Showcase');
  const labels = {
    label: t('label'),
    carousel: t('carousel'),
    slide: t('slide'),
    previous: t('previous'),
    next: t('next'),
    slides: items.map((item, index) =>
      t('slideLabel', { name: item.name, index: index + 1, total: items.length }),
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
        {(primaryAction ?? secondaryAction) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {primaryAction && <ActionButton action={primaryAction} />}
            {secondaryAction && <ActionButton action={secondaryAction} variant="outline" />}
          </div>
        )}
        <ShowcaseSlides items={items} labels={labels} />
      </Container>
    </section>
  );
}

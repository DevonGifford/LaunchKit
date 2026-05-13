/*
 * Adapted from shadcn-ui-kit, components/sections/cta-section.tsx
 * (https://github.com/bundui/shadcn-ui-kit). Copyright (c) 2024 Mohd. Nisab, MIT License.
 */
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { ActionButton } from './section-parts';

/**
 * A closing invitation in a contained panel on the muted surface: quieter than
 * the full-width `cta` band, for pages that end more softly.
 */
export function MarketingCta({
  id,
  title,
  description,
  primaryAction,
  secondaryAction,
}: SectionOf<'marketing-cta'>) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col items-center gap-6 rounded-2xl border bg-muted px-6 py-14 text-center sm:px-10 lg:py-20">
          <h2 id={`${id}-title`} className="max-w-2xl text-headline">
            {title}
          </h2>
          {description && (
            <p className="max-w-2xl text-lede text-pretty text-muted-foreground">{description}</p>
          )}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <ActionButton action={primaryAction} />
            {secondaryAction && <ActionButton action={secondaryAction} variant="outline" />}
          </div>
        </div>
      </Container>
    </section>
  );
}

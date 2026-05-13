/*
 * The panel appearance is adapted from shadcn-ui-kit, components/sections/cta-section.tsx
 * (https://github.com/bundui/shadcn-ui-kit). Copyright (c) 2024 Mohd. Nisab, MIT License.
 */
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { ActionButton } from './section-parts';

/**
 * A closing invitation. As a `band` (the default) it is restrained and runs full
 * width on the high-emphasis surface; as a `panel` it sits in a contained panel
 * on the muted surface, for pages that end more softly.
 */
export function CtaSection({
  id,
  appearance = 'band',
  title,
  description,
  primaryAction,
  secondaryAction,
}: SectionOf<'cta'>) {
  if (appearance === 'panel') {
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

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-emphasis text-emphasis-foreground"
    >
      <Container className="flex flex-col items-center gap-6 py-20 text-center lg:py-28">
        <span aria-hidden="true" className="h-px w-12 bg-accent" />
        <h2 id={`${id}-title`} className="max-w-2xl text-headline">
          {title}
        </h2>
        {description && (
          <p className="max-w-xl text-lede text-emphasis-foreground/80">{description}</p>
        )}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <ActionButton action={primaryAction} variant="inverse" />
          {secondaryAction && <ActionButton action={secondaryAction} variant="inverse-outline" />}
        </div>
      </Container>
    </section>
  );
}

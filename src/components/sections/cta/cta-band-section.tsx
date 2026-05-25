import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { ActionButton } from '@/components/sections/section-parts';

/** A restrained closing invitation that runs full width on the high-emphasis surface. */
export function CtaBandSection({
  id,
  title,
  description,
  primaryAction,
  secondaryAction,
}: SectionOf<'cta-band'>) {
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

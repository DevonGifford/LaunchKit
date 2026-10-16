import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { Eyebrow } from '@/components/sections/section-parts';
import { CtaActions } from './cta-parts';

/**
 * A compact band on the high-emphasis surface: an eyebrow and large heading,
 * with the actions opposite them from 1024px and under them before then.
 */
export function CtaEditorialSection({
  id,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: SectionOf<'cta-editorial'>) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-emphasis text-emphasis-foreground"
    >
      <Container className="flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-14">
        <div className="max-w-3xl space-y-4">
          {eyebrow && <Eyebrow className="text-emphasis-foreground/75">{eyebrow}</Eyebrow>}
          <h2 id={`${id}-title`} className="text-headline">
            {title}
          </h2>
          {description && (
            <p className="max-w-xl text-pretty text-emphasis-foreground/80">{description}</p>
          )}
        </div>
        <CtaActions
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          className="lg:shrink-0"
        />
      </Container>
    </section>
  );
}

import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { ActionButton, Eyebrow } from './section-parts';

/** Page-opening section: the page's only h1, plus optional actions and code preview. */
export function HeroSection({
  id,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  preview,
}: SectionOf<'hero'>) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <Container
        className={cn(
          'grid gap-12 py-16 sm:py-20 lg:py-28',
          preview && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16',
        )}
      >
        <div className="space-y-6">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 id={`${id}-title`} className="max-w-3xl text-display">
            {title}
          </h1>
          <p className="max-w-xl text-lede text-muted-foreground">{description}</p>
          {(primaryAction ?? secondaryAction) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {primaryAction && <ActionButton action={primaryAction} />}
              {secondaryAction && <ActionButton action={secondaryAction} variant="outline" />}
            </div>
          )}
        </div>

        {preview && (
          <figure className="min-w-0 overflow-hidden rounded-xl border bg-surface text-surface-foreground shadow-[0_24px_60px_-30px_var(--overlay)] max-sm:hidden">
            <figcaption className="flex items-center gap-3 border-b px-5 py-3 font-mono text-xs text-muted-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {preview.filename}
            </figcaption>
            <pre className="p-5 font-mono text-[0.8125rem] leading-6 [overflow-wrap:anywhere] whitespace-pre-wrap">
              <code>{preview.code}</code>
            </pre>
          </figure>
        )}
      </Container>
    </section>
  );
}

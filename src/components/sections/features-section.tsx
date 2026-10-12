import { Container } from '@/components/layout/container';
import type { SectionOf } from '@/lib/content/types';
import { SectionHeading } from './section-parts';

/** A short, numbered set of capabilities — three reads best. */
export function FeaturesSection({ id, eyebrow, title, description, items }: SectionOf<'features'>) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t">
      <Container className="py-20 lg:py-28">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} description={description} />
        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="relative space-y-4 border-t pt-6 before:absolute before:-top-px before:left-0 before:h-px before:w-12 before:bg-accent"
            >
              <span aria-hidden="true" className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-2xl">{item.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{item.description}</p>
              {item.points && (
                <ul className="space-y-2 pt-1 text-sm">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-border" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

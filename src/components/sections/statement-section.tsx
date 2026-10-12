import { Container } from '@/components/layout/container';
import type { SectionOf } from '@/lib/content/types';
import { Eyebrow } from './section-parts';

/** An editorial argument: heading on one side, a few paragraphs on the other. */
export function StatementSection({ id, eyebrow, title, paragraphs }: SectionOf<'statement'>) {
  const [lead, ...rest] = paragraphs;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t">
      <Container className="grid gap-8 py-20 md:grid-cols-12 md:gap-12 lg:py-28">
        <div className="space-y-5 md:col-span-5">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 id={`${id}-title`} className="text-headline">
            {title}
          </h2>
        </div>
        <div className="space-y-5 md:col-span-7 md:pt-9">
          <p className="font-serif text-2xl leading-snug">{lead}</p>
          {rest.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}

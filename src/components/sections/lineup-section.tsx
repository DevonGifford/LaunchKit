import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { SectionHeading } from './section-parts';

/** An index of the kinds of project that can grow from the same foundation. */
export function LineupSection({ id, eyebrow, title, description, items }: SectionOf<'lineup'>) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t">
      <Container className="py-20 lg:py-28">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} description={description} />
        <ul className="mt-14 border-t">
          {items.map((item) => (
            <li
              key={item.name}
              className="grid gap-2 border-b py-6 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <h3 className="font-serif text-2xl md:col-span-4">{item.name}</h3>
              <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase md:col-span-3">
                {item.kind}
              </p>
              <p className="text-muted-foreground md:col-span-5">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/*
 * Adapted from shadcn-ui-kit, components/sections/stat-section.tsx
 * (https://github.com/bundui/shadcn-ui-kit). Copyright (c) 2024 Mohd. Nisab, MIT License.
 */
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { SectionHeading } from './section-parts';

/** A centred heading over a row of large figures, ruled off above and below. */
export function MarketingStats({
  id,
  eyebrow,
  title,
  description,
  stats,
}: SectionOf<'marketing-stats'>) {
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
        {/* Stacked on phones; from 640px one row, however many figures there are. */}
        <dl className="mt-12 grid divide-y border-y text-center sm:auto-cols-fr sm:grid-flow-col sm:divide-x sm:divide-y-0 lg:mt-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2 px-4 py-10 sm:py-12">
              <dt className="text-muted-foreground">{stat.label}</dt>
              <dd className="order-first font-serif text-5xl leading-none lg:text-6xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { TechIcon } from '@/components/sections/tech-icons';
import { SectionHeading } from '@/components/sections/section-parts';

/** The technologies a project is built on: main ones as cards, supporting tools in a denser grid. */
export function MarketingTechStack({
  id,
  eyebrow,
  title,
  description,
  featured,
  tools,
}: SectionOf<'marketing-tech-stack'>) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      // A faint dot grid behind the content, drawn in the border colour.
      className="border-t bg-muted/50 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] bg-size-[24px_24px]"
    >
      <Container className="py-20 lg:py-28">
        <SectionHeading
          id={id}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <li key={item.name}>
              <Card className="h-full flex-row items-center gap-4 px-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <TechIcon name={item.icon} />
                </span>
                <span className="min-w-0">
                  <span className="block text-base font-medium">{item.name}</span>
                  <span className="block text-muted-foreground">{item.description}</span>
                </span>
              </Card>
            </li>
          ))}
        </ul>
        {tools && (
          // Flex rather than grid, so an incomplete last row sits in the centre.
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {tools.map((item) => (
              <li
                key={item.name}
                className="flex basis-[calc((100%-0.5rem)/2)] items-center gap-2.5 rounded-lg border border-border/60 bg-surface/50 px-3 py-2 md:basis-[calc((100%-1.5rem)/4)] xl:basis-[calc((100%-2.5rem)/6)]"
              >
                <TechIcon name={item.icon} className="text-muted-foreground" />
                <span className="min-w-0">
                  <span className="block text-sm leading-snug font-medium">{item.name}</span>
                  <span className="block text-xs text-muted-foreground">{item.description}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

import Image from 'next/image';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/sections/section-parts';
import { CtaActions } from './cta-parts';

/**
 * Copy beside a short list of principles on the high-emphasis surface. A
 * decorative photo, when there is one, runs as a strip above them until 1024px
 * and as a column reaching the left edge from then.
 */
export function CtaSplitSection({
  id,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
  items,
}: SectionOf<'cta-split'>) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative bg-emphasis text-emphasis-foreground"
    >
      {image && (
        // From 1024px the column ends 12rem left of centre and the copy starts
        // 8rem left of it (below), so a 4rem gap separates them at every width.
        <div
          aria-hidden="true"
          className="relative h-56 sm:h-72 lg:absolute lg:inset-y-0 lg:start-0 lg:h-auto lg:w-[calc(50%-12rem)]"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 64rem) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <Container className="py-14 sm:py-16 lg:py-24">
        <div
          className={cn(
            'grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-12',
            image && 'lg:ps-[calc(50%-8rem)]',
          )}
        >
          {/* Without a photo there is room for the heading and the text side by side from 1024px. */}
          <div className={cn('grid content-start gap-5', !image && 'lg:grid-cols-2 lg:gap-x-12')}>
            <div className="space-y-5">
              {eyebrow && <Eyebrow className="text-emphasis-foreground/75">{eyebrow}</Eyebrow>}
              <h2 id={`${id}-title`} className="max-w-xl text-headline">
                {title}
              </h2>
            </div>
            {(description ?? primaryAction ?? secondaryAction) && (
              <div className="space-y-5">
                {description && (
                  <p className="max-w-xl text-lede text-pretty text-emphasis-foreground/80">
                    {description}
                  </p>
                )}
                <CtaActions
                  primaryAction={primaryAction}
                  secondaryAction={secondaryAction}
                  className="pt-3"
                />
              </div>
            )}
          </div>
          {items && <Principles items={items} />}
        </div>
      </Container>
    </section>
  );
}

/** The short list, set off by a hairline: above it on phones, before it from 640px. */
function Principles({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col justify-center gap-4 border-t border-emphasis-foreground/20 pt-8 text-xs font-medium tracking-[0.16em] text-emphasis-foreground/75 uppercase sm:border-s sm:border-t-0 sm:ps-10 sm:pt-0">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

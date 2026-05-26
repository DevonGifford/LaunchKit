import type { CSSProperties, ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import { Link } from '@/i18n/navigation';
import type { SectionOf } from '@/lib/content/types';
import { cn } from '@/lib/utils';

type Section = SectionOf<'marquee'>;
type Item = Section['items'][number];

// Seconds each logo adds to one loop, so a longer row drifts no faster than a short one.
// A short row stretches to the strip's width, so it is timed as if it had six logos.
const secondsPerLogo = { slow: 6, normal: 4, fast: 2.5 } as const;
const minimumLogos = 6;

/**
 * Logos drifting sideways for ever: three copies of the row, each at least as
 * wide as the strip, moved by one copy's width and then reset. Two would loop,
 * but focusing a logo scrolls the strip, and the third keeps that from opening a
 * gap at the end of the loop. It pauses under the pointer and on focus; with
 * reduced motion it stands still as a centred, wrapping row.
 *
 * There is deliberately no pause button (a project decision that departs from
 * WCAG 2.2.2), so don't add one without asking.
 */
export function MarqueeSection({
  id,
  title,
  items,
  direction = 'left',
  speed = 'normal',
}: Section) {
  return (
    <section id={id} aria-labelledby={title ? `${id}-title` : undefined}>
      <Container className="py-12 lg:py-16">
        {title && (
          <h2 id={`${id}-title`} className="mb-8 text-center text-sm text-muted-foreground">
            {title}
          </h2>
        )}
        {/* The vertical padding keeps focus rings clear of the clipped edges. */}
        <div className="@container overflow-hidden mask-x-from-85% mask-x-to-100% py-2 motion-reduce:mask-none">
          <div
            className="flex w-max [--marquee-shift:calc(-100%/3)] focus-within:[animation-play-state:paused] hover:[animation-play-state:paused] motion-safe:animate-marquee motion-reduce:w-full"
            // Inline, because the animation shorthand would reset a direction set by class.
            style={{
              animationDuration: `${Math.max(items.length, minimumLogos) * secondsPerLogo[speed]}s`,
              animationDirection: direction === 'right' ? 'reverse' : 'normal',
            }}
          >
            <LogoRow items={items} />
            <LogoRow items={items} copy />
            <LogoRow items={items} copy />
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * One copy of the row. Its end padding matches the gap, so the seam between
 * copies looks like any other gap. The extra copies are inert and, with reduced
 * motion, hidden.
 */
function LogoRow({ items, copy = false }: { items: Item[]; copy?: boolean }) {
  return (
    <ul
      aria-hidden={copy || undefined}
      inert={copy}
      className={cn(
        'flex min-w-[100cqw] shrink-0 items-center justify-around gap-x-12 pe-12 text-muted-foreground sm:gap-x-16 sm:pe-16',
        'motion-reduce:w-full motion-reduce:min-w-0 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-8 motion-reduce:pe-0',
        copy && 'motion-reduce:hidden',
      )}
    >
      {items.map((item) => (
        <li key={item.name} className="shrink-0">
          <LogoLink item={item}>
            <LogoMark item={item} />
          </LogoLink>
        </li>
      ))}
    </ul>
  );
}

/** The logo's silhouette in the current text colour, named for assistive tech. */
function LogoMark({ item }: { item: Item }) {
  const style: CSSProperties = {
    aspectRatio: `${item.width} / ${item.height}`,
    maskImage: `url("${item.src}")`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
  };

  return (
    <span
      role="img"
      aria-label={item.name}
      style={style}
      className="block h-7 max-w-32 bg-current forced-color-adjust-none sm:h-8 sm:max-w-40 forced-colors:bg-[CanvasText]"
    />
  );
}

/** Wraps the logo in a link when it has one: locale-aware for internal paths. */
function LogoLink({ item, children }: { item: Item; children: ReactNode }) {
  if (!item.href) return children;

  const className =
    'block rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50';

  return item.href.startsWith('/') ? (
    <Link href={item.href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={item.href} className={className}>
      {children}
    </a>
  );
}

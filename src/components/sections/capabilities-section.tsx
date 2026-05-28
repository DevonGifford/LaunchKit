import {
  AppWindowIcon,
  ChartLineIcon,
  CloudIcon,
  CodeIcon,
  CompassIcon,
  MegaphoneIcon,
  PaletteIcon,
  RocketIcon,
  ServerIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
  type LucideIcon,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { ActionLink, SectionHeading } from './section-parts';

type Capabilities = SectionOf<'capabilities'>;
type Capability = Capabilities['items'][number];

/** How each variant lays out the items; the heading above them is shared. */
const variants = {
  cards: CapabilityCards,
  numbered: NumberedCapabilities,
  detailed: DetailedCapabilities,
} satisfies Record<NonNullable<Capabilities['variant']>, ComponentType<{ items: Capability[] }>>;

const icons = {
  'app-window': AppWindowIcon,
  cloud: CloudIcon,
  sparkles: SparklesIcon,
  users: UsersIcon,
  code: CodeIcon,
  server: ServerIcon,
  'shield-check': ShieldCheckIcon,
  'chart-line': ChartLineIcon,
  palette: PaletteIcon,
  megaphone: MegaphoneIcon,
  compass: CompassIcon,
  rocket: RocketIcon,
} satisfies Record<NonNullable<Capability['icon']>, LucideIcon>;

/**
 * Services or areas of expertise as cards, numbered columns or detailed columns,
 * under a heading with the intro and its link beside it from 1024px.
 */
export function CapabilitiesSection({
  id,
  variant = 'cards',
  eyebrow,
  title,
  description,
  action,
  items,
}: Capabilities) {
  const Items = variants[variant];

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <SectionHeading id={id} eyebrow={eyebrow} title={title} />
          {(description ?? action) && (
            <div className="max-w-xl space-y-4">
              {description && (
                <p className="text-lede text-pretty text-muted-foreground">{description}</p>
              )}
              {action && <ActionLink action={action} />}
            </div>
          )}
        </div>
        <Items items={items} />
      </Container>
    </section>
  );
}

/** Bordered cards, two to a row from 640px and four from 1024px. */
function CapabilityCards({ items }: { items: Capability[] }) {
  return (
    <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.title} className="flex">
          <CapabilityCard item={item} />
        </li>
      ))}
    </ul>
  );
}

/** One card; its link sits at the foot, so links line up across a row. */
function CapabilityCard({ item }: { item: Capability }) {
  const Icon = item.icon && icons[item.icon];

  return (
    <Card className="flex-1 gap-4 p-6 text-base">
      {Icon && (
        <span
          aria-hidden="true"
          className="mb-2 flex size-12 items-center justify-center rounded-lg border border-accent/50 bg-accent/15"
        >
          <Icon className="size-6" />
        </span>
      )}
      <h3 className="text-2xl">{item.title}</h3>
      <p className="leading-relaxed text-pretty text-muted-foreground">{item.description}</p>
      {item.action && (
        <div className="mt-auto pt-2">
          <ActionLink action={item.action} />
        </div>
      )}
    </Card>
  );
}

/** Numbered columns without cards, two to a row from 640px and four from 1024px. */
function NumberedCapabilities({ items }: { items: Capability[] }) {
  return (
    <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <li key={item.title} className="flex flex-col gap-4">
          <ItemNumber index={index} />
          <h3 className="mt-2 text-2xl">{item.title}</h3>
          <p className="leading-relaxed text-pretty text-muted-foreground">{item.description}</p>
          {item.action && (
            <div className="mt-auto">
              <ActionLink action={item.action} />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

/**
 * Larger titles with tags under them. Stacked between horizontal rules on phones
 * and tablets; from 1024px, three to a row with a vertical rule between neighbours.
 */
function DetailedCapabilities({ items }: { items: Capability[] }) {
  return (
    <ol className="mt-14 grid lg:grid-cols-3 lg:gap-y-14">
      {items.map((item, index) => (
        // From 1024px each row's first item has no rule before it.
        <li
          key={item.title}
          className="flex flex-col gap-4 border-t py-8 last:pb-0 lg:border-t-0 lg:px-10 lg:py-0 lg:not-nth-[3n+1]:border-s lg:nth-[3n]:pe-0 lg:nth-[3n+1]:ps-0"
        >
          <ItemNumber index={index} />
          <h3 className="mt-2 text-3xl">{item.title}</h3>
          <p className="max-w-md leading-relaxed text-pretty text-muted-foreground">
            {item.description}
          </p>
          {item.tags && <Tags tags={item.tags} />}
        </li>
      ))}
    </ol>
  );
}

/** The item's position as two digits, followed by a short champagne rule. */
function ItemNumber({ index }: { index: number }) {
  return (
    // Hidden from assistive tech: the ordered list already announces the position.
    <p
      aria-hidden="true"
      className="flex items-center gap-4 text-xs font-medium tracking-[0.16em] text-muted-foreground after:h-px after:w-12 after:bg-accent"
    >
      {String(index + 1).padStart(2, '0')}
    </p>
  );
}

/**
 * Small uppercase labels separated by dots. Each label carries the dot before it;
 * the list is pulled left inside a clipping box, so the dot that would start each
 * line is hidden.
 */
function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-2 overflow-hidden">
      <ul className="-ms-5 flex flex-wrap gap-y-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">
        {tags.map((tag) => (
          <li key={tag} className="relative ps-5">
            <span aria-hidden="true" className="absolute start-2">
              ·
            </span>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

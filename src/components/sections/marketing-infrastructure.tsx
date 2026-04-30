import {
  CheckIcon,
  CoinsIcon,
  FileCodeIcon,
  GlobeIcon,
  TrendingUpIcon,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { SectionHeading } from './section-parts';

type Section = SectionOf<'marketing-infrastructure'>;

const itemIcons = {
  globe: GlobeIcon,
  'trending-up': TrendingUpIcon,
  coins: CoinsIcon,
  'file-code': FileCodeIcon,
} satisfies Record<Section['items'][number]['icon'], LucideIcon>;

/** Infrastructure promises beside the main proof: a push travelling to production. */
export function MarketingInfrastructure({
  id,
  eyebrow,
  title,
  description,
  items,
  pipeline,
  badges,
}: Section) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t bg-muted/50">
      <Container className="py-20 lg:py-28">
        <SectionHeading
          id={id}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
        {/*
          Side by side from 1024px, the pipeline taking about 57% of the width. On
          tablets the list takes two columns above it.
        */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)] lg:items-center lg:gap-16">
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
            {items.map((item) => {
              const Icon = itemIcons[item.icon];
              return (
                <li key={item.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-accent/50 bg-accent/15"
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xl">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="min-w-0 space-y-6">
            <PipelinePanel pipeline={pipeline} />
            {badges && (
              <ul className="flex flex-wrap justify-center gap-2">
                {badges.map((badge) => (
                  <li
                    key={badge}
                    className="rounded-full border bg-background px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

const row = 'relative flex items-start gap-4';
// A rail from each node down to the next, across the gap between rows.
const rail =
  'before:absolute before:top-6 before:-bottom-6 before:left-3 lg:before:-bottom-8 before:w-px before:bg-emphasis-foreground/15';

// The Workflow section's terminal panel, with a caption bar like the hero's code preview.
// The command leads through each stage; the last stage is filled as the destination.
function PipelinePanel({ pipeline }: { pipeline: Section['pipeline'] }) {
  const last = pipeline.steps.length - 1;

  return (
    <figure className="overflow-hidden rounded-xl bg-emphasis text-emphasis-foreground shadow-[0_24px_60px_-30px_var(--overlay)]">
      <figcaption className="flex items-center gap-3 border-b border-emphasis-foreground/10 px-6 py-3 font-mono text-xs text-emphasis-foreground/70 sm:px-10">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
        {pipeline.caption}
      </figcaption>
      <div className="space-y-6 p-6 font-mono text-sm leading-6 sm:p-10 lg:space-y-8">
        <p className={cn(row, rail)}>
          <Node>
            <span aria-hidden="true" className="text-accent">
              $
            </span>
          </Node>
          <code className="min-w-0 [overflow-wrap:anywhere]">{pipeline.command}</code>
        </p>
        <ol className="space-y-6 lg:space-y-8">
          {pipeline.steps.map((step, index) => (
            <li key={step.label} className={cn(row, rail, 'last:before:hidden')}>
              <Node final={index === last}>
                <CheckIcon aria-hidden="true" className="size-3.5" />
              </Node>
              <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:justify-between sm:gap-6">
                <span className="font-medium">{step.label}</span>
                {step.detail && (
                  <span className="text-emphasis-foreground/70 sm:text-right">{step.detail}</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

function Node({ final = false, children }: { final?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'relative flex size-6 shrink-0 items-center justify-center rounded-full border text-xs',
        final
          ? 'border-accent bg-accent text-accent-foreground'
          : 'border-emphasis-foreground/20 bg-emphasis text-accent',
      )}
    >
      {children}
    </span>
  );
}

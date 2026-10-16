import {
  CheckIcon,
  FlaskConicalIcon,
  PackageCheckIcon,
  ShieldCheckIcon,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { SectionHeading } from '@/components/sections/section-parts';

type Stage = SectionOf<'marketing-quality-gates'>['stages'][number];

const stageIcons = {
  'shield-check': ShieldCheckIcon,
  'flask-conical': FlaskConicalIcon,
  'package-check': PackageCheckIcon,
} satisfies Record<Stage['icon'], LucideIcon>;

/** The automated checks a change passes, stage by stage, with the outcomes they guarantee. */
export function MarketingQualityGates({
  id,
  eyebrow,
  title,
  description,
  stages,
  highlights,
}: SectionOf<'marketing-quality-gates'>) {
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
        <ol className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-start">
          {stages.map((stage) => (
            <li
              key={stage.title}
              // Side by side, a hairline joins each stage to the next across the gap,
              // level with the icons.
              className="relative lg:not-last:after:absolute lg:not-last:after:top-12 lg:not-last:after:left-full lg:not-last:after:h-px lg:not-last:after:w-6 lg:not-last:after:bg-accent"
            >
              <StageCard stage={stage} />
            </li>
          ))}
        </ol>
        {highlights && (
          <ul className="mt-10 flex flex-col items-center gap-6 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:justify-center">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <CheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

function StageCard({ stage }: { stage: Stage }) {
  const Icon = stageIcons[stage.icon];

  return (
    <Card className="gap-5 text-base [--card-spacing:--spacing(6)]">
      <CardHeader className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-accent/50 bg-accent/15"
        >
          <Icon className="size-6" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            {stage.label}
          </p>
          <h3 className="text-xl">{stage.title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {stage.items.map((item) => (
            <li key={item.name} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-accent" />
              <span className="min-w-0">
                <span className="font-medium">{item.name}</span>{' '}
                <span className="ms-1 text-sm text-muted-foreground">{item.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

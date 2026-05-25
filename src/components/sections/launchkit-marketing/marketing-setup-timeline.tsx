import { CircleCheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { SectionOf } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/sections/section-parts';

type Timeline = SectionOf<'marketing-setup-timeline'>['timeline'];
type TimelineRow = Timeline['rows'][number];

/** The problem a foundation solves: a timeline table beside the argument and its conclusion. */
export function MarketingSetupTimeline({
  id,
  title,
  titleMuted,
  paragraphs,
  callout,
  timeline,
}: SectionOf<'marketing-setup-timeline'>) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t">
      <Container className="grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <TimelineCard id={id} timeline={timeline} />
        <div>
          <h2 id={`${id}-title`} className="text-headline">
            {title}
            {titleMuted && <span className="block text-muted-foreground">{titleMuted}</span>}
          </h2>
          <div className="mt-6 space-y-5 text-lede">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph.text}
                className={paragraph.emphasis ? 'font-medium' : 'text-muted-foreground'}
              >
                {paragraph.text}
              </p>
            ))}
          </div>
          {callout && (
            <div className="mt-8 space-y-2 rounded-xl border border-accent/50 bg-accent/10 p-6">
              {callout.eyebrow && <Eyebrow>{callout.eyebrow}</Eyebrow>}
              <p className="font-serif text-2xl sm:text-3xl">{callout.title}</p>
              {callout.description && (
                <p className="text-muted-foreground">{callout.description}</p>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

// One gutter for the card's header, cells and note. On phones the item names and
// column headings wrap while the short values don't, so the table fits without scrolling.
const gutter = 'px-3 sm:px-6';
const headingWrap = 'whitespace-normal sm:whitespace-nowrap';

function TimelineCard({ id, timeline }: { id: string; timeline: Timeline }) {
  const titleId = `${id}-timeline-title`;

  return (
    <Card className="gap-0 py-0 shadow-[0_24px_60px_-30px_var(--overlay)]">
      <CardHeader
        className={cn(
          gutter,
          'flex flex-wrap items-center justify-between gap-2 border-b bg-muted/50 py-4',
        )}
      >
        <CardTitle id={titleId} className="font-semibold">
          {timeline.title}
        </CardTitle>
        {timeline.badge && <Badge variant="outline">{timeline.badge}</Badge>}
      </CardHeader>
      <Table aria-labelledby={titleId}>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead scope="col" className={cn(gutter, 'h-auto py-3 text-muted-foreground')}>
              {timeline.columns.item}
            </TableHead>
            <TableHead
              scope="col"
              className={cn(gutter, headingWrap, 'h-auto py-3 text-muted-foreground')}
            >
              {timeline.columns.before}
            </TableHead>
            <TableHead scope="col" className={cn(gutter, headingWrap, 'h-auto py-3')}>
              {timeline.columns.after}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeline.rows.map((row) => (
            <TimelineTableRow key={row.item} row={row} />
          ))}
        </TableBody>
        {timeline.total && (
          <TableFooter>
            <TimelineTableRow row={timeline.total} total />
          </TableFooter>
        )}
      </Table>
      {timeline.note && (
        <CardFooter className={cn(gutter, 'py-4 text-muted-foreground')}>
          {timeline.note}
        </CardFooter>
      )}
    </Card>
  );
}

function TimelineTableRow({ row, total = false }: { row: TimelineRow; total?: boolean }) {
  return (
    <TableRow className={cn('hover:bg-transparent', total && 'font-semibold')}>
      <TableHead scope="row" className={cn(gutter, 'h-auto py-3 whitespace-normal sm:py-4')}>
        {row.item}
      </TableHead>
      <TableCell className={cn(gutter, 'py-3 sm:py-4', !total && 'text-muted-foreground')}>
        {row.before}
      </TableCell>
      <TableCell className={cn(gutter, 'py-3 font-semibold sm:py-4')}>
        <span className="flex items-center gap-2">
          <CircleCheckIcon aria-hidden="true" className="size-4 shrink-0 text-accent" />
          {row.after}
        </span>
      </TableCell>
    </TableRow>
  );
}

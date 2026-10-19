'use client';

import { useMemo, useRef, useState, type ComponentType, type SVGProps } from 'react';
import {
  ArrowRightIcon,
  FileTextIcon,
  LayoutTemplateIcon,
  ScaleIcon,
  SearchXIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  prepareIndex,
  search,
  suggestions,
  type SearchEntry,
  type SearchIndex,
  type SearchKind,
  type Segment,
} from '@/lib/search/search';
import { contactLink } from '@/config/navigation';
import { cn } from '@/lib/utils';

/** Whether the index has arrived: search waits for it on the first opening. */
export type SearchStatus = 'loading' | 'ready' | 'error';

const icons: Record<SearchKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  page: LayoutTemplateIcon,
  doc: FileTextIcon,
  legal: ScaleIcon,
};

/** A row in the list: a result, or a suggestion before anything is typed. */
type Row = { entry: SearchEntry; title: Segment[]; context?: string; excerpt?: Segment[] };

/**
 * A whole website page (not one of its sections): a destination, shown by
 * name alone. Guides, legal pages and sections keep their text, which is how
 * readers tell long-form results apart.
 */
const isDestination = (entry: SearchEntry) => entry.kind === 'page' && !entry.heading;

/**
 * The search dialog: a command menu (cmdk) over the site's search index.
 * cmdk handles the input, the list and keyboard selection; matching and
 * ranking are LaunchKit's own (src/lib/search/search.ts), so cmdk's filter is
 * off. Results are grouped by kind, best group first.
 */
export function SearchDialog({
  open,
  onOpenChange,
  index,
  status,
  siteName,
  onNavigate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  index: SearchIndex | null;
  status: SearchStatus;
  /** For the input's placeholder: "Search LaunchKit…". */
  siteName: string;
  /**
   * Called with a chosen result's locale-free href once the dialog has closed:
   * while it's open the page can't scroll, so an anchor would go nowhere.
   */
  onNavigate: (href: string) => void;
}) {
  const t = useTranslations('Search');
  const [query, setQuery] = useState('');
  const prepared = useMemo(() => (index ? prepareIndex(index) : []), [index]);

  const rows: Row[] = useMemo(() => {
    if (!index) return [];
    if (!query.trim()) {
      return suggestions(index).map((entry) => ({
        entry,
        title: [{ text: entry.title, match: false }],
        excerpt:
          entry.description && !isDestination(entry)
            ? [{ text: entry.description, match: false }]
            : undefined,
      }));
    }
    return search(prepared, query).map((result) => ({
      entry: result.entry,
      title: result.heading ?? result.title,
      context: result.heading ? result.entry.title : undefined,
      excerpt: isDestination(result.entry) ? undefined : result.excerpt,
    }));
  }, [index, prepared, query]);

  // Groups in the order their best row ranks.
  const groups = useMemo(() => {
    const byKind = new Map<SearchKind, Row[]>();
    for (const row of rows)
      byKind.set(row.entry.kind, [...(byKind.get(row.entry.kind) ?? []), row]);
    return [...byKind];
  }, [rows]);

  // cmdk keeps its selection by value; with filtering off, the top row has to
  // be selected again whenever the rows change, so Enter opens the best match.
  const [selected, setSelected] = useState('');
  const [selectedFor, setSelectedFor] = useState<Row[] | null>(null);
  if (selectedFor !== rows) {
    setSelectedFor(rows);
    setSelected(rows[0]?.entry.href ?? '');
  }

  // Radix returns focus only to a DialogTrigger; the shortcut has none.
  const opener = useRef<HTMLElement | null>(null);
  const chosen = useRef<string | null>(null);
  const choose = (href: string) => {
    chosen.current = href;
    onOpenChange(false);
    setQuery('');
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setQuery('');
      }}
      title={t('title')}
      description={t('description')}
      // Near the top on phones, so the on-screen keyboard leaves the results in view.
      className="top-4 ring-3 ring-accent/40 sm:top-[12dvh] sm:max-w-xl"
      onOpenAutoFocus={() => {
        opener.current =
          document.activeElement instanceof HTMLElement ? document.activeElement : null;
      }}
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        if (opener.current?.isConnected) opener.current.focus();
        if (chosen.current) onNavigate(chosen.current);
        chosen.current = null;
      }}
    >
      <Command
        shouldFilter={false}
        loop
        value={selected}
        onValueChange={setSelected}
        label={t('title')}
      >
        <CommandInput
          placeholder={t('placeholder', { site: siteName })}
          value={query}
          onValueChange={setQuery}
        />
        {/* An empty listbox isn't valid, so it hides while the message below speaks instead. */}
        <CommandList
          label={t('results')}
          hidden={rows.length === 0}
          className="max-h-[min(28rem,60dvh)]"
        >
          {groups.map(([kind, groupRows]) => (
            <CommandGroup key={kind} heading={t(`groups.${kind}`)}>
              {groupRows.map((row) => (
                <SearchRow key={row.entry.href} row={row} onSelect={() => choose(row.entry.href)} />
              ))}
            </CommandGroup>
          ))}
        </CommandList>
        {status === 'loading' && (
          <p
            role="status"
            className="-mx-1 mt-1 border-t py-8 text-center text-sm text-muted-foreground"
          >
            {t('loading')}
          </p>
        )}
        {(status === 'error' || (status === 'ready' && rows.length === 0 && query.trim())) && (
          <SearchMiss
            message={status === 'error' ? t('error') : t('empty', { query: query.trim() })}
            hint={status === 'error' ? undefined : t('emptyHint')}
            onContact={() => choose(contactLink.href)}
          />
        )}
      </Command>
    </CommandDialog>
  );
}

/**
 * Nothing to show: what happened, and a way forward, the contact page, below a
 * line that separates it from the search box.
 */
function SearchMiss({
  message,
  hint,
  onContact,
}: {
  message: string;
  hint?: string;
  onContact: () => void;
}) {
  const t = useTranslations('Search');
  return (
    <div className="-mx-1 mt-1 -mb-1 border-t">
      <div role="status" className="flex flex-col items-center gap-1.5 px-6 py-10 text-center">
        <span className="mb-2 flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <SearchXIcon aria-hidden="true" className="size-5" />
        </span>
        <p className="text-sm font-medium text-foreground">{message}</p>
        {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/40 px-4 py-3">
        <p className="text-sm text-muted-foreground">{t('contactPrompt')}</p>
        <Button variant="outline" size="sm" onClick={onContact}>
          {t('contactAction')}
          <ArrowRightIcon aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

function SearchRow({ row, onSelect }: { row: Row; onSelect: () => void }) {
  const Icon = icons[row.entry.kind];
  // A single line centres its icon; longer rows align it with their first line.
  const singleLine = !row.context && !row.excerpt;
  return (
    <CommandItem
      value={row.entry.href}
      onSelect={onSelect}
      className={cn('gap-3', singleLine ? 'items-center py-2' : 'items-start py-2.5')}
    >
      <Icon aria-hidden="true" className={cn('text-muted-foreground', !singleLine && 'mt-0.5')} />
      <span className="min-w-0 flex-1 space-y-0.5" lang={row.entry.lang}>
        <span className="block font-medium text-foreground">
          <Highlighted segments={row.title} />
        </span>
        {row.context && <span className="block text-xs text-muted-foreground">{row.context}</span>}
        {row.excerpt && (
          <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            <Highlighted segments={row.excerpt} />
          </span>
        )}
      </span>
    </CommandItem>
  );
}

/** Text with its matching parts marked. */
function Highlighted({ segments }: { segments: Segment[] }) {
  return segments.map((segment, index) =>
    segment.match ? (
      <mark key={index} className="bg-transparent font-semibold text-foreground">
        {segment.text}
      </mark>
    ) : (
      segment.text
    ),
  );
}

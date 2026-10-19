'use client';

import { useMemo, useRef, useState, type ComponentType, type SVGProps } from 'react';
import { FileTextIcon, LayoutTemplateIcon, ScaleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
        excerpt: entry.description ? [{ text: entry.description, match: false }] : undefined,
      }));
    }
    return search(prepared, query).map((result) => ({
      entry: result.entry,
      title: result.heading ?? result.title,
      context: result.heading ? result.entry.title : undefined,
      excerpt: result.excerpt,
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
        <p role="status" className="text-center text-sm text-muted-foreground empty:hidden">
          {status === 'loading'
            ? t('loading')
            : status === 'error'
              ? t('error')
              : rows.length === 0 && query.trim()
                ? t('empty', { query: query.trim() })
                : null}
        </p>
      </Command>
    </CommandDialog>
  );
}

function SearchRow({ row, onSelect }: { row: Row; onSelect: () => void }) {
  const Icon = icons[row.entry.kind];
  return (
    <CommandItem value={row.entry.href} onSelect={onSelect} className="items-start gap-3 py-2.5">
      <Icon aria-hidden="true" className="mt-0.5 text-muted-foreground" />
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

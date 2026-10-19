'use client';

import {
  createContext,
  lazy,
  Suspense,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { SearchIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { useRouter } from '@/i18n/navigation';
import type { SearchIndex } from '@/lib/search/search';
import { cn } from '@/lib/utils';
import type { SearchStatus } from './search-dialog';

// The dialog (and cmdk) load the first time search is wanted, not with every page.
const loadDialog = () => import('./search-dialog');
const SearchDialog = lazy(() => loadDialog().then((module) => ({ default: module.SearchDialog })));

// One request per locale per page load, shared by every trigger.
const indexes = new Map<string, Promise<SearchIndex>>();
function loadIndex(locale: string) {
  let request = indexes.get(locale);
  if (!request) {
    request = fetch(`/${locale}/search-index.json`).then((response) => {
      if (!response.ok) throw new Error(`Search index: HTTP ${response.status}`);
      return response.json() as Promise<SearchIndex>;
    });
    // A failed request can be retried on the next opening.
    request.catch(() => indexes.delete(locale));
    indexes.set(locale, request);
  }
  return request;
}

/** Apple platforms use ⌘K; everyone else Ctrl+K. Unknown until hydrated. */
function isApplePlatform() {
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ??
    navigator.platform;
  return /mac|iphone|ipad|ipod/i.test(platform);
}
const noSubscription = () => () => {};

/** Typing in a field: the shortcut shouldn't take the keys away from it. */
function isEditable(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  );
}

type SiteSearchContext = {
  openSearch: () => void;
  /** Starts loading the dialog and index early, on hover or focus. */
  prepare: () => void;
  /** `true` on Apple platforms, `false` elsewhere, `null` before hydration. */
  apple: boolean | null;
};

const SiteSearchContext = createContext<SiteSearchContext | null>(null);

/**
 * Site search: the shared state behind every search button, the ⌘K / Ctrl+K
 * shortcut and the dialog, rendered once. The index for the current locale
 * comes from /<locale>/search-index.json unless one is passed in (as stories
 * and tests do).
 */
export function SiteSearch({
  siteName,
  index: givenIndex,
  children,
}: {
  siteName: string;
  index?: SearchIndex;
  children: ReactNode;
}) {
  const locale = useLocale();
  const router = useRouter();
  const apple = useSyncExternalStore(noSubscription, isApplePlatform, () => null);
  const [open, setOpen] = useState(false);
  const [wanted, setWanted] = useState(false);
  const [loaded, setLoaded] = useState<{ index: SearchIndex | null; status: SearchStatus }>(
    givenIndex ? { index: givenIndex, status: 'ready' } : { index: null, status: 'loading' },
  );

  const prepare = useCallback(() => {
    setWanted(true);
    void loadDialog();
    if (givenIndex) return;
    loadIndex(locale).then(
      (index) => setLoaded({ index, status: 'ready' }),
      () => setLoaded({ index: null, status: 'error' }),
    );
  }, [givenIndex, locale]);

  const openSearch = useCallback(() => {
    prepare();
    setOpen(true);
  }, [prepare]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'k' || event.repeat || event.isComposing) return;
      if (!(isApplePlatform() ? event.metaKey : event.ctrlKey) || event.altKey || event.shiftKey)
        return;
      if (isEditable(event.target)) return;
      // Ctrl+K would otherwise focus the browser's own search on Windows and Linux.
      event.preventDefault();
      openSearch();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openSearch]);

  const context = useMemo(() => ({ openSearch, prepare, apple }), [openSearch, prepare, apple]);

  return (
    <SiteSearchContext value={context}>
      {children}
      {wanted && (
        <Suspense fallback={null}>
          <SearchDialog
            open={open}
            onOpenChange={setOpen}
            index={loaded.index}
            status={loaded.status}
            siteName={siteName}
            onNavigate={(href) => router.push(href)}
          />
        </Suspense>
      )}
    </SiteSearchContext>
  );
}

function useSiteSearch() {
  const context = use(SiteSearchContext);
  if (!context) throw new Error('Search buttons must be used inside <SiteSearch>.');
  return context;
}

/**
 * A button that opens site search: `field` looks like a search box with the
 * shortcut, for wide headers; `icon` is a compact square for tighter rows.
 */
export function SearchTrigger({
  variant = 'field',
  className,
}: {
  variant?: 'field' | 'icon';
  className?: string;
}) {
  const t = useTranslations('Search');
  const { openSearch, prepare, apple } = useSiteSearch();
  const shortcut = apple === null ? undefined : apple ? 'Meta+K' : 'Control+K';
  const events = { onClick: openSearch, onPointerEnter: prepare, onFocus: prepare };

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label={t('open')}
        aria-keyshortcuts={shortcut}
        className={className}
        {...events}
      >
        <SearchIcon aria-hidden="true" />
      </Button>
    );
  }

  return (
    <button
      type="button"
      aria-keyshortcuts={shortcut}
      className={cn(
        'flex h-9 w-52 items-center gap-1.5 rounded-lg border border-border px-2.5 text-[0.8125rem] text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
      {...events}
    >
      <SearchIcon aria-hidden="true" className="size-4 shrink-0" />
      <span className="flex-1 text-left">{t('trigger')}</span>
      {apple !== null && (
        <KbdGroup aria-hidden="true">
          <Kbd>{apple ? '⌘' : t('controlKey')}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      )}
    </button>
  );
}

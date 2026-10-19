'use client';

import { useId, useState } from 'react';
import { ListIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NavLinks, type NavItem } from './nav-links';

/** A titled group of guides in the docs navigation. */
export type DocsNavSection = { title: string; items: NavItem[] };

/**
 * Links between the guides, grouped by section, with the current guide marked
 * (`aria-current`, from the URL). Takes translated text, so the same list
 * serves the desktop column and the small-screen sheet.
 */
export function DocsNav({
  sections,
  label,
  onNavigate,
  className,
}: {
  sections: readonly DocsNavSection[];
  /** The landmark's name, such as "Documentation". */
  label: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={cn('space-y-8', className)}>
      {sections.map((section) => (
        <DocsNavGroup key={section.title} section={section} onNavigate={onNavigate} />
      ))}
    </nav>
  );
}

function DocsNavGroup({
  section,
  onNavigate,
}: {
  section: DocsNavSection;
  onNavigate?: () => void;
}) {
  // Not a heading: the navigation comes before the page's h1.
  const titleId = useId();

  return (
    <div role="group" aria-labelledby={titleId}>
      <p
        id={titleId}
        className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
      >
        {section.title}
      </p>
      <NavLinks
        items={section.items}
        onNavigate={onNavigate}
        className="mt-3 border-l"
        linkClassName="-ml-px flex w-full rounded-none rounded-r-md border-l border-transparent py-2 pl-4 text-sm leading-snug hover:border-foreground/30 aria-[current=page]:border-accent aria-[current=page]:font-medium aria-[current=page]:no-underline"
      />
    </div>
  );
}

/**
 * The docs navigation for small screens: a button that opens it in a sheet,
 * which closes again when a guide is chosen.
 */
export function DocsNavSheet({
  sections,
  labels,
  className,
}: {
  sections: readonly DocsNavSection[];
  labels: { browse: string; title: string; description: string; close: string };
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className={className}>
          <ListIcon aria-hidden="true" />
          {labels.browse}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" closeLabel={labels.close} className="gap-0 p-0">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="font-serif text-xl font-normal">{labels.title}</SheetTitle>
          <SheetDescription className="sr-only">{labels.description}</SheetDescription>
        </SheetHeader>
        <DocsNav
          sections={sections}
          label={labels.title}
          onNavigate={() => setOpen(false)}
          className="overflow-y-auto px-6 py-6"
        />
      </SheetContent>
    </Sheet>
  );
}

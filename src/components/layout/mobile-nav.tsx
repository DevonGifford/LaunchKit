'use client';

import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LocaleLinks } from '@/components/ui/locale-switcher';
import { NavLinks, type NavItem } from './nav-links';

/**
 * Small-screen navigation in a modal sheet: focus is trapped while open,
 * Escape closes it, and focus returns to the menu button afterwards.
 */
export function MobileNav({
  items,
  labels,
  showLocaleLinks,
  showThemeToggle,
}: {
  items: readonly NavItem[];
  labels: {
    openMenu: string;
    menuTitle: string;
    menuDescription: string;
    mainNavigation: string;
    close: string;
    language: string;
    theme: string;
  };
  showLocaleLinks: boolean;
  showThemeToggle: boolean;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={labels.openMenu}>
          <MenuIcon aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" closeLabel={labels.close} className="gap-0 p-0">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="font-serif text-xl font-normal">{labels.menuTitle}</SheetTitle>
          <SheetDescription className="sr-only">{labels.menuDescription}</SheetDescription>
        </SheetHeader>
        <nav aria-label={labels.mainNavigation} className="px-6 py-4">
          <NavLinks
            items={items}
            onNavigate={close}
            className="flex flex-col"
            linkClassName="min-h-12 w-full font-serif text-2xl"
          />
        </nav>
        <div className="mt-auto space-y-4 border-t px-6 py-6">
          {showLocaleLinks && <LocaleLinks label={labels.language} onNavigate={close} />}
          {showThemeToggle && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span aria-hidden="true">{labels.theme}</span>
              <ThemeToggle label={labels.theme} />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

'use client';

import { ArrowRightIcon, MenuIcon } from 'lucide-react';
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
import { Link } from '@/i18n/navigation';
import { NavLinks, type NavItem } from './nav-links';

/**
 * Small-screen navigation in a modal sheet: focus is trapped while open,
 * Escape closes it, and focus returns to the menu button afterwards. An
 * `action`, such as the wide header's call to action, sits under the links.
 */
export function MobileNav({
  items,
  action,
  labels,
  showLocaleLinks,
  showThemeToggle,
}: {
  items: readonly NavItem[];
  action?: NavItem;
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
        {action && (
          <div className="px-6 pt-2 pb-6">
            <Button asChild size="lg" className="w-full">
              <Link href={action.href} onClick={close}>
                {action.label}
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}
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

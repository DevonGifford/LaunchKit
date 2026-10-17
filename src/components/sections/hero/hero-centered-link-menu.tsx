'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@/i18n/navigation';
import type { SectionOf } from '@/lib/content/types';

/**
 * An outline button that opens a menu of links. Choosing a link moves focus on
 * with it: to the section a same-page anchor scrolls to, rather than back to
 * the button, which would scroll the page back up. Escape still returns focus
 * to the button.
 */
export function LinkMenu({ menu }: { menu: NonNullable<SectionOf<'hero-centered'>['menu']> }) {
  const chosen = useRef<string | null>(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg">
          {menu.label}
          <ChevronDownIcon aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="min-w-48"
        onCloseAutoFocus={(event) => {
          if (chosen.current === null) return;
          event.preventDefault();
          const target = chosen.current && document.getElementById(chosen.current);
          chosen.current = null;
          if (target) {
            target.tabIndex = -1;
            target.focus({ preventScroll: true });
          }
        }}
      >
        {menu.items.map((item) => (
          <DropdownMenuItem
            key={item.href}
            asChild
            onSelect={() => {
              chosen.current = item.href.split('#')[1] ?? '';
            }}
          >
            {item.href.startsWith('/') ? (
              <Link href={item.href} className="min-h-10">
                {item.label}
              </Link>
            ) : (
              <a href={item.href} className="min-h-10">
                {item.label}
              </a>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

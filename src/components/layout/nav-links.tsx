'use client';

import type { ReactNode } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export type NavItem = { href: string; label: string };

/** True when `href` is the current page or one of its ancestors (except home). */
export function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Navigation links with `aria-current` on the active page. `children` are extra
 * list items after the links, such as a button that belongs among them.
 */
export function NavLinks({
  items,
  className,
  linkClassName,
  onNavigate,
  children,
}: {
  items: readonly NavItem[];
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
  children?: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {items.map((item) => (
        // Placeholder links can share an href, such as the coming-soon page.
        <li key={`${item.href} ${item.label}`}>
          <Link
            href={item.href}
            aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            onClick={onNavigate}
            className={cn(
              'inline-flex min-h-10 items-center rounded-md text-muted-foreground decoration-accent underline-offset-8 transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:text-foreground aria-[current=page]:underline',
              linkClassName,
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
      {children}
    </ul>
  );
}

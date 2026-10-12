'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export type NavItem = { href: string; label: string };

/** True when `href` is the current page or one of its ancestors (except home). */
export function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

/** Navigation links with `aria-current` on the active page. */
export function NavLinks({
  items,
  className,
  linkClassName,
  onNavigate,
}: {
  items: readonly NavItem[];
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.href}>
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
    </ul>
  );
}

'use client';

import { CheckIcon, GlobeIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Link, usePathname } from '@/i18n/navigation';
import { localeNames, routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/**
 * Compact language menu for the header. Each option is a real link to the same
 * page in another locale, so it works for crawlers and keyboard users alike.
 */
export function LocaleSwitcher({ label }: { label: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 px-3 text-muted-foreground hover:text-foreground">
          <GlobeIcon aria-hidden="true" />
          <span className="sr-only">{label}: </span>
          {localeNames[locale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {routing.locales.map((option) => (
          <DropdownMenuItem key={option} asChild>
            <Link
              href={pathname}
              locale={option}
              hrefLang={option}
              lang={option}
              aria-current={option === locale ? 'true' : undefined}
              className="min-h-10 justify-between"
            >
              {localeNames[option]}
              <CheckIcon aria-hidden="true" className={cn(option !== locale && 'invisible')} />
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Plain list of language links, for the footer and mobile menu. */
export function LocaleLinks({
  label,
  className,
  onNavigate,
}: {
  label: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {routing.locales.map((option) => (
          <li key={option}>
            <Link
              href={pathname}
              locale={option}
              hrefLang={option}
              lang={option}
              aria-current={option === locale ? 'true' : undefined}
              onClick={onNavigate}
              className="inline-flex min-h-10 items-center rounded-md text-muted-foreground decoration-accent underline-offset-8 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=true]:text-foreground aria-[current=true]:underline"
            >
              {localeNames[option]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

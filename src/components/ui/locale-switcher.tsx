'use client';

import { CheckIcon, LanguagesIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Link, usePathname } from '@/i18n/navigation';
import { localeFlags, localeNames, routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/**
 * Compact language menu for the header: the translate mark and the current
 * language's code (EN, ES, …), opening a menu of languages with their flags.
 * Each option is a real link to the same page in another locale, so it works
 * for crawlers and keyboard users alike.
 */
export function LocaleSwitcher({ label }: { label: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="gap-1.5 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <LanguagesIcon aria-hidden="true" />
          {/* Screen readers hear the language's name rather than its code spelled out. */}
          <span aria-hidden="true" className="text-xs font-medium tracking-wider">
            {locale.toUpperCase()}
          </span>
          <span className="sr-only">
            {label}: {localeNames[locale]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {routing.locales.map((option) => (
          <DropdownMenuItem key={option} asChild>
            <Link
              href={pathname}
              locale={option}
              hrefLang={option}
              lang={option}
              aria-current={option === locale ? 'true' : undefined}
              className="min-h-10 gap-3"
            >
              {/* Decorative, like the Logo: the name beside it is the option's label. */}
              <span
                aria-hidden="true"
                style={{ backgroundImage: `url(/flags/${localeFlags[option]}.svg)` }}
                className="h-3.75 w-5 shrink-0 rounded-[2px] bg-cover bg-center ring-1 ring-foreground/10"
              />
              {localeNames[option]}
              <CheckIcon
                aria-hidden="true"
                className={cn('ml-auto', option !== locale && 'invisible')}
              />
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

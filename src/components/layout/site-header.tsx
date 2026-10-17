import { ArrowRightIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { features } from '@/config/features';
import { headerAction, mainNavigation } from '@/config/navigation';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/container';
import { LocaleSwitcher } from '@/components/ui/locale-switcher';
import { cn } from '@/lib/utils';
import { MobileNav } from './mobile-nav';
import { NavLinks, type NavItem } from './nav-links';

const bar =
  'sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/75';

/**
 * The site header. `default` sits within the page container. `wide` spans
 * nearly the full width: the logo on the left, the navigation centred, and the
 * theme, language and a call to action on the right. Both collapse into the same
 * menu button: `default` below md, `wide` below lg, with its call to action
 * inside the menu.
 */
export async function SiteHeader({ variant = 'default' }: { variant?: 'default' | 'wide' }) {
  const t = await getTranslations();
  const items = mainNavigation.map(({ key, href }) => ({ href, label: t(`Navigation.${key}`) }));
  const action = { href: headerAction.href, label: t(`Navigation.${headerAction.key}`) };

  const home = (className?: string) => (
    <Link
      href="/"
      aria-label={t('Layout.homeLink')}
      className={cn(
        '-mx-1 flex min-h-10 items-center rounded-md px-1 text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
    >
      <Logo className="h-6 sm:h-7" />
    </Link>
  );

  const nav = (
    <nav aria-label={t('Layout.mainNavigation')}>
      <NavLinks items={items} className="flex items-center gap-1" linkClassName="px-3 text-sm" />
    </nav>
  );

  const mobile = (className: string, menuAction?: NavItem) => (
    <div className={className}>
      <MobileNav
        items={items}
        action={menuAction}
        showLocaleLinks={features.localeSwitcher}
        showThemeToggle={features.themeSwitcher}
        labels={{
          openMenu: t('Layout.openMenu'),
          menuTitle: t('Layout.menuTitle'),
          menuDescription: t('Layout.menuDescription'),
          mainNavigation: t('Layout.mainNavigation'),
          close: t('Common.close'),
          language: t('LocaleSwitcher.label'),
          theme: t('Theme.toggle'),
        }}
      />
    </div>
  );

  if (variant === 'wide') {
    return (
      <header className={bar}>
        {/*
          Its own frame rather than the page container: slim gutters (the
          container's on phones) and a cap at 120rem. Inline only from lg: below
          it, the row runs wider than the screen in the longer languages. The
          side columns share the leftover width, so the navigation sits at the
          centre; if one side needs more room, it nudges over rather than overlap.
        */}
        <div className="mx-auto flex h-16 w-full max-w-[120rem] items-center justify-between gap-6 px-5 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {home('lg:justify-self-start')}
          <div className="hidden lg:block">{nav}</div>
          <div className="hidden items-center gap-1 justify-self-end lg:flex">
            {features.themeSwitcher && <ThemeToggle label={t('Theme.toggle')} />}
            {features.localeSwitcher && <LocaleSwitcher label={t('LocaleSwitcher.label')} />}
            <Button asChild className="ml-3">
              <Link href={action.href}>
                {action.label}
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            </Button>
          </div>
          {mobile('lg:hidden', action)}
        </div>
      </header>
    );
  }

  return (
    <header className={bar}>
      <Container className="flex h-16 items-center justify-between gap-6">
        {home()}

        <div className="hidden items-center gap-2 md:flex">
          {nav}
          <span aria-hidden="true" className="mx-2 h-5 w-px bg-border" />
          {features.themeSwitcher && <ThemeToggle label={t('Theme.toggle')} />}
          {features.localeSwitcher && <LocaleSwitcher label={t('LocaleSwitcher.label')} />}
        </div>

        {mobile('md:hidden')}
      </Container>
    </header>
  );
}

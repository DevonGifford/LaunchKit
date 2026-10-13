import { getTranslations } from 'next-intl/server';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { features } from '@/config/features';
import { mainNavigation } from '@/config/navigation';
import { Link } from '@/i18n/navigation';
import { Container } from './container';
import { LocaleSwitcher } from './locale-switcher';
import { MobileNav } from './mobile-nav';
import { NavLinks } from './nav-links';

export async function SiteHeader() {
  const t = await getTranslations();
  const items = mainNavigation.map(({ key, href }) => ({ href, label: t(`Navigation.${key}`) }));

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/75">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={t('Layout.homeLink')}
          className="-mx-1 flex min-h-10 items-center rounded-md px-1 text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Logo className="h-6 sm:h-7" />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <nav aria-label={t('Layout.mainNavigation')}>
            <NavLinks
              items={items}
              className="flex items-center gap-1"
              linkClassName="px-3 text-sm"
            />
          </nav>
          <span aria-hidden="true" className="mx-2 h-5 w-px bg-border" />
          {features.localeSwitcher && <LocaleSwitcher label={t('LocaleSwitcher.label')} />}
          {features.themeSwitcher && <ThemeToggle label={t('Theme.toggle')} />}
        </div>

        <div className="md:hidden">
          <MobileNav
            items={items}
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
      </Container>
    </header>
  );
}

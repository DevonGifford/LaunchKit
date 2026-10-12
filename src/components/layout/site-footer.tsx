import { getTranslations } from 'next-intl/server';
import { Logo } from '@/components/brand/logo';
import { features } from '@/config/features';
import { mainNavigation } from '@/config/navigation';
import { Container } from './container';
import { LocaleLinks } from './locale-switcher';
import { NavLinks } from './nav-links';

export async function SiteFooter() {
  const t = await getTranslations();
  const items = mainNavigation.map(({ key, href }) => ({ href, label: t(`Navigation.${key}`) }));

  return (
    <footer className="border-t">
      <Container className="grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-start md:py-16">
        <div className="space-y-4">
          <Logo variant="emblem" className="h-10 text-foreground" />
          <p className="max-w-xs font-serif text-lg text-muted-foreground italic">
            {t('Footer.tagline')}
          </p>
        </div>
        <div className="space-y-3 md:text-right">
          <nav aria-label={t('Footer.navigation')}>
            <NavLinks
              items={items}
              className="flex flex-wrap gap-x-5 md:justify-end"
              linkClassName="text-sm"
            />
          </nav>
          {features.localeSwitcher && (
            <LocaleLinks
              label={t('LocaleSwitcher.label')}
              className="text-sm md:[&_ul]:justify-end"
            />
          )}
        </div>
      </Container>
      <div className="border-t">
        <Container className="py-6 text-xs text-muted-foreground">
          {t('Footer.copyright', { year: String(new Date().getFullYear()) })}
        </Container>
      </div>
    </footer>
  );
}

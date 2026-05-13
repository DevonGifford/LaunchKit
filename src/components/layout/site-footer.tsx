import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { Logo } from '@/components/ui/logo';
import { features } from '@/config/features';
import { footerNavigation, legalNavigation, mainNavigation } from '@/config/navigation';
import { Container } from '@/components/ui/container';
import { LocaleLinks } from '@/components/ui/locale-switcher';
import { cn } from '@/lib/utils';
import { NavLinks, type NavItem } from './nav-links';

type FooterVariant = 'simple' | 'full' | 'compact' | 'mobile';

/** The footer's text and links, translated once and laid out by each variant. */
type FooterContent = {
  tagline: string;
  description: string;
  copyright: string;
  labels: { navigation: string; legal: string; language: string };
  main: NavItem[];
  groups: { key: string; heading: string; compact: boolean; links: NavItem[] }[];
  legal: NavItem[];
};

/**
 * The site footer. `simple` is the one the site layout uses today; `full`,
 * `compact` and `mobile` lay out the same footer navigation in more detail.
 */
export async function SiteFooter({ variant = 'simple' }: { variant?: FooterVariant }) {
  const t = await getTranslations();
  const content: FooterContent = {
    tagline: t('Footer.tagline'),
    description: t('Footer.description'),
    copyright: t('Footer.copyright', { year: String(new Date().getFullYear()) }),
    labels: {
      navigation: t('Footer.navigation'),
      legal: t('Footer.legal'),
      language: t('LocaleSwitcher.label'),
    },
    main: mainNavigation.map(({ key, href }) => ({ href, label: t(`Navigation.${key}`) })),
    groups: footerNavigation.map((group) => ({
      key: group.key,
      heading: t(`Footer.groups.${group.key}`),
      compact: group.compact,
      links: group.links.map(({ key, href }) => ({ href, label: t(`Navigation.${key}`) })),
    })),
    legal: legalNavigation.map(({ key, href }) => ({ href, label: t(`Navigation.${key}`) })),
  };

  switch (variant) {
    case 'full':
      return <FullFooter {...content} />;
    case 'compact':
      return <CompactFooter {...content} />;
    case 'mobile':
      return <MobileFooter {...content} />;
    default:
      return <SimpleFooter {...content} />;
  }
}

/** The emblem and tagline beside the main navigation and languages. */
function SimpleFooter({ tagline, copyright, labels, main }: FooterContent) {
  return (
    <footer className="border-t">
      <Container className="grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-start md:py-16">
        <div className="space-y-4">
          <Logo variant="emblem" className="h-10 text-foreground" />
          <p className="max-w-xs font-serif text-lg text-muted-foreground italic">{tagline}</p>
        </div>
        <div className="space-y-3 md:text-right">
          <nav aria-label={labels.navigation}>
            <NavLinks
              items={main}
              className="flex flex-wrap gap-x-5 md:justify-end"
              linkClassName="text-sm"
            />
          </nav>
          {features.localeSwitcher && (
            <LocaleLinks label={labels.language} className="text-sm md:[&_ul]:justify-end" />
          )}
        </div>
      </Container>
      <div className="border-t">
        <Container className="py-6 text-xs text-muted-foreground">{copyright}</Container>
      </div>
    </footer>
  );
}

/**
 * Desktop first: the brand beside a column for each group and one for the
 * languages. Below 1024px the columns move under the brand, and on phones they
 * pair up.
 */
function FullFooter({ tagline, description, copyright, labels, groups, legal }: FooterContent) {
  return (
    <footer className="border-t">
      <Container className="grid gap-14 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:py-24">
        <FooterBrand tagline={tagline} description={description} />
        <ColumnNav
          groups={groups}
          labels={labels}
          className="md:grid-cols-4 md:gap-x-10 xl:gap-x-14"
        />
      </Container>
      <FooterBottom copyright={copyright} label={labels.legal} links={legal} />
    </footer>
  );
}

/**
 * Pared down to one band: the brand beside a row for each essential group and
 * one for the languages, so it is short as well as narrow.
 */
function CompactFooter({ tagline, copyright, labels, groups, legal }: FooterContent) {
  return (
    <footer className="border-t">
      <Container className="grid gap-10 py-12 md:py-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        <FooterBrand tagline={tagline} size="sm" />
        {/* From 640px each row is a heading and its links, the headings in one column. */}
        <nav
          aria-label={labels.navigation}
          className="grid gap-y-5 sm:grid-cols-[auto_1fr] sm:gap-x-10 sm:gap-y-1"
        >
          {groups
            .filter((group) => group.compact)
            .map((group) => (
              <Row key={group.key} heading={group.heading}>
                <NavLinks
                  items={group.links}
                  className="flex flex-wrap gap-x-6"
                  linkClassName={link}
                />
              </Row>
            ))}
          {features.localeSwitcher && (
            <Row heading={labels.language}>
              <LocaleLinks
                label={labels.language}
                className="[&_a]:text-foreground/80 [&_ul]:gap-x-6 [&_ul]:gap-y-0"
              />
            </Row>
          )}
        </nav>
      </Container>
      <FooterBottom copyright={copyright} label={labels.legal} links={legal} />
    </footer>
  );
}

/**
 * For phones: the brand, then the groups and languages two to a row, and the
 * legal links last.
 */
function MobileFooter({ tagline, copyright, labels, groups, legal }: FooterContent) {
  return (
    <footer className="border-t">
      <Container className="space-y-10 py-10">
        <FooterBrand tagline={tagline} size="sm" />
        <ColumnNav groups={groups} labels={labels} />
      </Container>
      <FooterBottom copyright={copyright} label={labels.legal} links={legal} />
    </footer>
  );
}

// Footer links read a step brighter than the muted text around them.
const link = 'text-foreground/80';

function FooterBrand({
  tagline,
  description,
  size = 'md',
}: {
  tagline: string;
  description?: string;
  size?: 'sm' | 'md';
}) {
  return (
    <div className="flex flex-col items-start gap-6">
      <Logo className={cn('text-foreground', size === 'md' ? 'h-11 sm:h-12 lg:h-14' : 'h-10')} />
      <div className="space-y-3">
        <p
          className={cn(
            'max-w-md font-serif leading-snug text-foreground italic',
            size === 'md' ? 'text-2xl' : 'text-lg sm:text-xl',
          )}
        >
          {tagline}
        </p>
        {description && (
          <p className="max-w-md leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

/**
 * A column per group, plus the languages, two to a row unless `className` adds
 * more. Each link fills its column's width, so it is easy to tap.
 */
function ColumnNav({
  groups,
  labels,
  className,
}: {
  groups: FooterContent['groups'];
  labels: FooterContent['labels'];
  className?: string;
}) {
  return (
    // Long single words, such as German ones, hyphenate instead of overflowing a column.
    <nav
      aria-label={labels.navigation}
      className={cn('grid grid-cols-2 gap-x-6 gap-y-8 wrap-break-word hyphens-auto', className)}
    >
      {groups.map((group) => (
        <Column key={group.key} heading={group.heading}>
          <NavLinks
            items={group.links}
            className="flex flex-col sm:gap-1"
            linkClassName={cn(link, 'flex')}
          />
        </Column>
      ))}
      {features.localeSwitcher && (
        <Column heading={labels.language}>
          <LocaleLinks
            label={labels.language}
            className="[&_a]:flex [&_a]:text-foreground/80 [&_ul]:flex-col [&_ul]:gap-0 sm:[&_ul]:gap-1"
          />
        </Column>
      )}
    </nav>
  );
}

/** A heading underlined with a short champagne bar, above its links. */
function Column({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="space-y-5">
      <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-foreground uppercase after:mt-3 after:block after:h-0.5 after:w-8 after:bg-accent">
        {heading}
      </h2>
      {children}
    </div>
  );
}

/** A heading led by a champagne hairline, beside its links from 640px. */
function Row({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="sm:col-span-2 sm:grid sm:grid-cols-subgrid sm:items-center">
      <h2 className="flex items-center gap-3 font-sans text-xs font-medium tracking-[0.2em] text-foreground uppercase before:h-px before:w-6 before:bg-accent">
        {heading}
      </h2>
      {children}
    </div>
  );
}

/** The copyright line and legal links under a full-width rule; on phones the links come last. */
function FooterBottom({
  copyright,
  label,
  links,
}: {
  copyright: string;
  label: string;
  links: NavItem[];
}) {
  return (
    <div className="border-t">
      <Container className="flex flex-col gap-3 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:gap-8">
        <p>{copyright}</p>
        <nav aria-label={label}>
          {/* Hairlines between the links from 640px, where they always fit on one line. */}
          <NavLinks
            items={links}
            className="flex flex-wrap items-center gap-x-6 sm:gap-x-0 sm:[&>li]:flex sm:[&>li]:items-center sm:[&>li+li]:before:mx-5 sm:[&>li+li]:before:h-5 sm:[&>li+li]:before:w-px sm:[&>li+li]:before:bg-muted-foreground/40"
            linkClassName="text-sm"
          />
        </nav>
      </Container>
    </div>
  );
}

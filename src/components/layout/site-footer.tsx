import type { ReactNode } from 'react';
import { MapPinIcon, PhoneIcon, SendIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Logo } from '@/components/ui/logo';
import { features } from '@/config/features';
import { footerNavigation, legalNavigation } from '@/config/navigation';
import { siteConfig, type SiteContact, type SocialLink } from '@/config/site';
import { Container } from '@/components/ui/container';
import { LocaleLinks } from '@/components/ui/locale-switcher';
import { cn } from '@/lib/utils';
import { BrandMark, brandName } from './brand-marks';
import { NavLinks, type NavItem } from './nav-links';

type FooterVariant = 'full' | 'mobile';

type ContactLabels = Record<keyof SiteContact, string>;

/** The footer's text and links, translated once and laid out by each variant. */
type FooterContent = {
  tagline: string;
  description: string;
  copyright: string;
  labels: {
    navigation: string;
    legal: string;
    language: string;
    social: string;
    contactHeading: string;
    contact: ContactLabels;
  };
  groups: { key: string; heading: string; wide: boolean; links: NavItem[] }[];
  legal: NavItem[];
  contact: SiteContact;
  social: SocialLink[];
};

/**
 * The site footer. `full`, the one the site layout uses, shows the brand, the
 * link groups, the contact details and the social links; `mobile` is a pared-down
 * version for phones. The contact details and social links come from
 * src/config/site.ts unless passed in (as the stories do).
 */
export async function SiteFooter({
  variant = 'full',
  contact = siteConfig.contact,
  social = siteConfig.social,
}: {
  variant?: FooterVariant;
  contact?: SiteContact;
  social?: SocialLink[];
}) {
  const t = await getTranslations();
  const content: FooterContent = {
    tagline: t('Footer.tagline'),
    description: t('Footer.description'),
    copyright: t('Footer.copyright', { year: String(new Date().getFullYear()) }),
    labels: {
      navigation: t('Footer.navigation'),
      legal: t('Footer.legal'),
      language: t('LocaleSwitcher.label'),
      social: t('Footer.social'),
      contactHeading: t('Footer.contact.heading'),
      contact: {
        email: t('Footer.contact.email'),
        phone: t('Footer.contact.phone'),
        whatsapp: t('Footer.contact.whatsapp'),
        address: t('Footer.contact.address'),
      },
    },
    groups: footerNavigation.map((group) => ({
      key: group.key,
      heading: t(`Footer.groups.${group.key}`),
      wide: group.wide ?? false,
      links: group.links.map(({ key, href }) => ({ href, label: t(`Navigation.${key}`) })),
    })),
    legal: legalNavigation.map(({ key, href }) => ({ href, label: t(`Navigation.${key}`) })),
    contact,
    social,
  };

  return variant === 'mobile' ? <MobileFooter {...content} /> : <FullFooter {...content} />;
}

/**
 * The brand, a column per group, then the contact details and social links: in
 * that order on phones, with the groups paired. From 768px the contact details
 * and social links sit beside the brand, in line with the last group's column
 * below. From 1024px the brand, groups and contact details share one row, with a
 * hairline before the details, and the social links move under the brand.
 */
function FullFooter({
  tagline,
  description,
  copyright,
  labels,
  groups,
  legal,
  contact,
  social,
}: FooterContent) {
  const reachable = hasDetails(contact) || social.length > 0;

  return (
    <footer className="border-t">
      <Container
        className={cn(
          'grid gap-y-12 py-14 md:grid-cols-3 md:gap-x-10 md:py-16 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-6',
          reachable
            ? 'lg:grid-cols-[minmax(0,1fr)_auto_auto]'
            : 'lg:grid-cols-[minmax(0,1fr)_auto]',
        )}
      >
        <FooterBrand
          tagline={tagline}
          description={description}
          className="md:col-span-2 lg:col-start-1 lg:col-end-2 lg:row-start-1"
        />
        <ColumnNav
          groups={groups}
          labels={labels}
          languages={false}
          className={cn(
            'md:col-span-3 md:grid-cols-subgrid md:gap-x-10 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3 lg:grid-cols-[repeat(3,auto)] lg:content-start lg:gap-x-10',
            reachable && 'lg:border-e lg:pe-10',
          )}
        />
        {reachable && (
          // From 1024px the wrapper steps aside, so the details and links can part.
          <div className="space-y-4 md:col-start-3 md:row-start-1 md:self-center lg:contents">
            {/* From 1024px the details sit under a heading, spread down the rest of the column. */}
            {hasDetails(contact) && (
              <div className="lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3 lg:flex lg:flex-col lg:gap-5">
                <ColumnHeading className="hidden lg:block">{labels.contactHeading}</ColumnHeading>
                {/* The top padding lines the email up with the first links, which sit in taller targets. */}
                <FooterContact
                  contact={contact}
                  labels={labels.contact}
                  className="lg:flex-1 lg:content-between lg:pt-2"
                />
              </div>
            )}
            <SocialLinks
              links={social}
              label={labels.social}
              className="lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:self-start"
            />
          </div>
        )}
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
  className,
}: {
  tagline: string;
  description?: string;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-start gap-6', className)}>
      <Logo className={cn('text-foreground', size === 'md' ? 'h-11 sm:h-12 lg:h-13' : 'h-10')} />
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

/** True when at least one contact detail is set. */
function hasDetails({ email, phone, whatsapp, address }: SiteContact) {
  return Boolean(email || phone || whatsapp || address);
}

/**
 * The contact details in one compact column: email, phone, WhatsApp, then the
 * address on three lines. Smaller than the text around them, and a step larger
 * from 1024px, where they have a column of their own. Only the details that are
 * set appear.
 */
function FooterContact({
  contact,
  labels,
  className,
}: {
  contact: SiteContact;
  labels: ContactLabels;
  className?: string;
}) {
  if (!hasDetails(contact)) return null;
  const { email, phone, whatsapp, address } = contact;

  return (
    <dl className={cn('grid gap-y-2.5 text-sm lg:gap-y-3 lg:text-base', className)}>
      {email && (
        <ContactItem icon={<SendIcon />} label={labels.email}>
          <ContactLink href={`mailto:${email}`}>{email}</ContactLink>
        </ContactItem>
      )}
      {phone && (
        <ContactItem icon={<PhoneIcon />} label={labels.phone}>
          <ContactLink href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</ContactLink>
        </ContactItem>
      )}
      {whatsapp && (
        <ContactItem icon={<BrandMark brand="whatsapp" />} label={labels.whatsapp}>
          <ContactLink href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}>
            {whatsapp}
          </ContactLink>
        </ContactItem>
      )}
      {address && (
        <ContactItem icon={<MapPinIcon />} label={labels.address}>
          <span className="block">{address.street}</span>
          <span className="block">{address.city}</span>
          <span className="block">{address.postcode}</span>
        </ContactItem>
      )}
    </dl>
  );
}

/** One detail: a champagne icon carrying a hidden label, then the value. */
function ContactItem({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 leading-normal text-foreground/80">
      <dt className="flex h-[1lh] items-center text-accent [&_svg]:size-4 lg:[&_svg]:size-5">
        {icon}
        <span className="sr-only">{label}</span>
      </dt>
      <dd className="wrap-anywhere">{children}</dd>
    </div>
  );
}

function ContactLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-sm transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {children}
    </a>
  );
}

/** The project's social profiles as a row of marks, each named for assistive tech. */
function SocialLinks({
  links,
  label,
  className,
}: {
  links: SocialLink[];
  label: string;
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    // Pulled left so the first mark lines up with the text above it.
    <ul aria-label={label} className={cn('-ms-2 flex flex-wrap gap-2', className)}>
      {links.map(({ network, href }) => (
        <li key={network}>
          <a
            href={href}
            aria-label={brandName(network)}
            className="flex size-10 items-center justify-center rounded-md text-foreground/80 transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <BrandMark brand={network} className="size-6" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * A group per row, plus the languages unless `languages` is false, each with its
 * links running down two columns, so short and long groups stay balanced.
 * `className` can lay the groups out side by side from 768px: each then takes
 * one column with its links in one, except a wide group, which spans two and
 * keeps two. Each link fills its column's width, so it is easy to tap.
 */
function ColumnNav({
  groups,
  labels,
  languages = true,
  className,
}: {
  groups: FooterContent['groups'];
  labels: FooterContent['labels'];
  languages?: boolean;
  className?: string;
}) {
  return (
    // Long single words, such as German ones, hyphenate instead of overflowing a column.
    <nav
      aria-label={labels.navigation}
      className={cn('grid gap-x-6 gap-y-8 wrap-break-word hyphens-auto', className)}
    >
      {groups.map((group) => (
        <Column
          key={group.key}
          heading={group.heading}
          className={cn(group.wide && 'md:col-span-2')}
        >
          <NavLinks
            items={group.links}
            className={cn(linkColumns, group.wide ? 'md:gap-x-10' : 'md:columns-1')}
            linkClassName={cn(link, 'flex')}
          />
        </Column>
      ))}
      {languages && features.localeSwitcher && (
        <Column heading={labels.language}>
          <LocaleLinks
            label={labels.language}
            className="[&_a]:flex [&_a]:text-foreground/80 [&_li]:break-inside-avoid sm:[&_li:not(:last-child)]:mb-1 [&_ul]:block [&_ul]:columns-2 [&_ul]:gap-x-6"
          />
        </Column>
      )}
    </nav>
  );
}

// Links run down two columns, the first filled before the second.
const linkColumns = 'columns-2 gap-x-6 sm:space-y-1 [&>li]:break-inside-avoid';

/** A heading above its links, 20px clear of them. */
function Column({
  heading,
  className,
  children,
}: {
  heading: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('space-y-5', className)}>
      <ColumnHeading>{heading}</ColumnHeading>
      {children}
    </div>
  );
}

/** A small uppercase heading underlined with a short champagne bar. */
function ColumnHeading({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h2
      className={cn(
        'font-sans text-xs font-medium tracking-[0.2em] text-foreground uppercase after:mt-3 after:block after:h-0.5 after:w-8 after:bg-accent',
        className,
      )}
    >
      {children}
    </h2>
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

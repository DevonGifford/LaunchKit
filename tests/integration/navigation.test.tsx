import { beforeEach, describe, expect, test, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { MobileNav } from '@/components/layout/mobile-nav';
import { NavLinks } from '@/components/layout/nav-links';
import { axeViolations, renderWithIntl } from './utils';

const navigation = vi.hoisted(() => ({ pathname: '/docs' }));

// next-intl's own navigation is exercised end to end (tests/e2e). Here, a
// minimal stand-in for src/i18n/navigation isolates the components' behaviour.
vi.mock('@/i18n/navigation', async () => {
  const { forwardRef } = await import('react');
  type LinkProps = React.ComponentProps<'a'> & { href: string; locale?: string };
  return {
    usePathname: () => navigation.pathname,
    Link: forwardRef<HTMLAnchorElement, LinkProps>(function Link(
      { href, locale, children, ...props },
      ref,
    ) {
      return (
        <a
          ref={ref}
          href={`/${locale ?? 'en'}${href === '/' ? '' : href}`}
          {...props}
          onClick={(event) => {
            props.onClick?.(event);
            event.preventDefault(); // client-side navigation, like next/link
          }}
        >
          {children}
        </a>
      );
    }),
  };
});

const items = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/contact', label: 'Contact' },
];

beforeEach(() => {
  navigation.pathname = '/docs';
});

describe('navigation links', () => {
  test('mark the current section, including nested pages, with aria-current', async () => {
    navigation.pathname = '/docs/getting-started';
    await renderWithIntl(<NavLinks items={items} />);

    await expect
      .element(page.getByRole('link', { name: 'Docs' }))
      .toHaveAttribute('aria-current', 'page');
    await expect
      .element(page.getByRole('link', { name: 'Home' }))
      .not.toHaveAttribute('aria-current');
    await expect
      .element(page.getByRole('link', { name: 'Docs' }))
      .toHaveAttribute('href', '/en/docs');
  });
});

describe('mobile navigation', () => {
  const labels = {
    openMenu: 'Open menu',
    menuTitle: 'Menu',
    menuDescription: 'Site navigation and preferences',
    mainNavigation: 'Main',
    close: 'Close',
    language: 'Language',
    theme: 'Switch between light and dark mode',
  };

  test('opens as an accessible dialog and returns focus when closed with Escape', async () => {
    await page.viewport(375, 800);
    const screen = await renderWithIntl(
      <MobileNav items={items} labels={labels} showLocaleLinks showThemeToggle />,
    );
    const trigger = page.getByRole('button', { name: 'Open menu' });

    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Menu' });
    await expect.element(dialog).toBeVisible();
    await expect
      .element(dialog.getByRole('link', { name: 'Docs' }))
      .toHaveAttribute('aria-current', 'page');
    await expect
      .element(dialog.getByRole('link', { name: 'Español' }))
      .toHaveAttribute('hreflang', 'es');
    // Mid fade-in, the sheet's colours blend with the overlay; check contrast once it has settled.
    await Promise.all(
      dialog
        .element()
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished),
    );
    expect(await axeViolations(document.body)).toEqual([]);

    await userEvent.keyboard('{Escape}');
    await expect.element(dialog).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
    await screen.unmount();
  });

  test('closes after choosing a destination', async () => {
    await renderWithIntl(
      <MobileNav items={items} labels={labels} showLocaleLinks showThemeToggle />,
    );
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('dialog').getByRole('link', { name: 'Contact' }).click();
    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
  });
});

import { beforeEach, describe, expect, test, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { DocsNav, DocsNavSheet } from '@/components/layout/docs-nav';
import { sampleNavSections } from '../fixtures/docs';
import { axeViolations, renderWithIntl } from './utils';

const navigation = vi.hoisted(() => ({ pathname: '/docs/getting-started' }));

// next-intl's navigation is exercised end to end (tests/e2e/docs.spec.ts); a
// stand-in for src/i18n/navigation isolates the components, as in navigation.test.tsx.
vi.mock('@/i18n/navigation', async () => {
  const { forwardRef } = await import('react');
  type LinkProps = React.ComponentProps<'a'> & { href: string };
  return {
    usePathname: () => navigation.pathname,
    Link: forwardRef<HTMLAnchorElement, LinkProps>(function Link(
      { href, children, ...props },
      ref,
    ) {
      return (
        <a
          ref={ref}
          href={`/en${href}`}
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

const labels = {
  browse: 'Browse guides',
  title: 'Documentation',
  description: 'Every guide, grouped by topic.',
  close: 'Close',
};

beforeEach(() => {
  navigation.pathname = '/docs/getting-started';
});

describe('DocsNav', () => {
  test('groups the guides under their sections, in order', async () => {
    await renderWithIntl(<DocsNav sections={sampleNavSections} label="Documentation" />);
    const nav = page.getByRole('navigation', { name: 'Documentation' });

    const building = nav.getByRole('group', { name: 'Building' });
    await expect.element(building).toBeVisible();
    expect(
      building
        .getByRole('link')
        .elements()
        .map((link) => link.textContent),
    ).toEqual(['LaunchKit Design System', 'LaunchKit AI Integrations']);
    await expect
      .element(nav.getByRole('link', { name: 'What’s Next for LaunchKit' }))
      .toHaveAttribute('href', '/en/docs/roadmap');
  });

  test('marks the guide being read', async () => {
    navigation.pathname = '/docs/building-with-ai';
    await renderWithIntl(<DocsNav sections={sampleNavSections} label="Documentation" />);

    await expect
      .element(page.getByRole('link', { name: 'LaunchKit AI Integrations' }))
      .toHaveAttribute('aria-current', 'page');
    await expect
      .element(page.getByRole('link', { name: 'LaunchKit Quickstart' }))
      .not.toHaveAttribute('aria-current');
  });

  test('marks a title shown in another language', async () => {
    const [first, ...rest] = sampleNavSections;
    const sections = [
      {
        title: first?.title ?? '',
        items: [{ href: '/docs/roadmap', label: 'What’s Next for LaunchKit', lang: 'en' }],
      },
      ...rest,
    ];
    await renderWithIntl(<DocsNav sections={sections} label="Documentación" />);

    await expect
      .element(page.getByRole('link', { name: 'What’s Next for LaunchKit' }).first())
      .toHaveAttribute('lang', 'en');
  });

  test('has no accessibility violations', async () => {
    const screen = await renderWithIntl(
      <DocsNav sections={sampleNavSections} label="Documentation" />,
    );
    expect(await axeViolations(screen.container)).toEqual([]);
  });
});

describe('DocsNavSheet', () => {
  test('opens the guides in a sheet, and Escape closes it back to the button', async () => {
    await renderWithIntl(<DocsNavSheet sections={sampleNavSections} labels={labels} />);
    const button = page.getByRole('button', { name: 'Browse guides' });

    await button.click();
    const sheet = page.getByRole('dialog', { name: 'Documentation' });
    await expect.element(sheet.getByRole('navigation', { name: 'Documentation' })).toBeVisible();
    await expect
      .element(sheet.getByRole('link', { name: 'LaunchKit Quickstart' }))
      .toHaveAttribute('aria-current', 'page');

    await userEvent.keyboard('{Escape}');
    await expect.element(sheet).not.toBeInTheDocument();
    await expect.element(button).toHaveFocus();
  });

  test('closes once a guide is chosen', async () => {
    await renderWithIntl(<DocsNavSheet sections={sampleNavSections} labels={labels} />);
    await page.getByRole('button', { name: 'Browse guides' }).click();
    const sheet = page.getByRole('dialog', { name: 'Documentation' });

    await sheet.getByRole('link', { name: 'Customizing LaunchKit' }).click();
    await expect.element(sheet).not.toBeInTheDocument();
  });

  test('has no accessibility violations while open', async () => {
    await renderWithIntl(<DocsNavSheet sections={sampleNavSections} labels={labels} />);
    await page.getByRole('button', { name: 'Browse guides' }).click();
    await expect.element(page.getByRole('dialog', { name: 'Documentation' })).toBeVisible();
    // Contrast is only meaningful once the sheet has finished sliding in.
    await expect.poll(() => document.getAnimations().length).toBe(0);
    expect(await axeViolations(document.body)).toEqual([]);
  });
});

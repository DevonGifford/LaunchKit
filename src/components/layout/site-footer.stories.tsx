import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import type { SiteContact, SocialLink } from '@/config/site';
import { SiteFooter } from './site-footer';

/**
 * Sample details for the full footer: a reserved example.com address and UK
 * numbers Ofcom sets aside for drama, so none of them reach anyone real.
 */
const street = 'Calle de Ejemplo 123';

const contact = {
  email: 'hello@example.com',
  phone: '+44 7700 900123',
  whatsapp: '+44 7700 900456',
  address: { street, city: 'Madrid, Spain', postcode: '28001' },
} satisfies SiteContact;

const social = [
  { network: 'github', href: 'https://example.com/github' },
  { network: 'x', href: 'https://example.com/x' },
  { network: 'youtube', href: 'https://example.com/youtube' },
  { network: 'discord', href: 'https://example.com/discord' },
] satisfies SocialLink[];

const meta = {
  title: 'Layout/Site footer',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
  args: { contact, social },
  argTypes: {
    variant: { control: 'inline-radio', options: ['full', 'mobile'] },
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Where an element sits on the page. */
const box = (element: Element) => element.getBoundingClientRect();

/** Where the copyright line and each legal link sit, the links in reading order. */
function legalBar(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const legal = within(canvas.getByRole('navigation', { name: 'Legal' }));
  return {
    copyright: box(canvas.getByText(/Released under the MIT licence/)),
    links: ['Privacy Policy', 'Terms of Use', 'LLM Notice'].map((name) =>
      box(legal.getByRole('link', { name })),
    ),
  };
}

/**
 * The brand, the link groups, the contact details with working links, and the
 * social links. Each layout has a story of its own below.
 */
export const Full: Story = {
  args: { variant: 'full' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const email = canvas.getByRole('link', { name: contact.email });
    const phone = canvas.getByRole('link', { name: contact.phone });
    const whatsapp = canvas.getByRole('link', { name: contact.whatsapp });
    await expect(email).toHaveAttribute('href', 'mailto:hello@example.com');
    await expect(phone).toHaveAttribute('href', 'tel:+447700900123');
    await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/447700900456');
    await expect(canvas.getByText('28001')).toBeVisible();

    // Email, phone, WhatsApp, then the address.
    await expect(box(phone).top).toBeGreaterThan(box(email).bottom);
    await expect(box(whatsapp).top).toBeGreaterThan(box(phone).bottom);
    await expect(box(canvas.getByText(street)).top).toBeGreaterThan(box(whatsapp).bottom);
  },
};

/**
 * From 1280px, one row: the brand with the social links under it, the Company
 * links, the Resources links in two columns under one heading, then after a
 * hairline the contact details under their own heading, with the address last.
 * There is no language column. The copyright and legal links share the row below.
 */
export const FullOnDesktop: Story = {
  tags: ['!autodocs'],
  args: { variant: 'full' },
  globals: { viewport: { value: 'desktop' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const email = canvas.getByRole('link', { name: contact.email });
    await expect(canvas.getAllByRole('heading').map((heading) => heading.textContent)).toEqual([
      'Company',
      'Resources',
      'Contact',
    ]);
    await expect(box(canvas.getByRole('heading', { name: 'Contact' })).top).toBeCloseTo(
      box(canvas.getByRole('heading', { name: 'Company' })).top,
      0,
    );

    // Resources runs down two columns: Features to Examples, then Docs to FAQ.
    const features = box(canvas.getByRole('link', { name: 'Features' }));
    const docs = box(canvas.getByRole('link', { name: 'Docs' }));
    await expect(docs.left).toBeGreaterThan(features.right);
    await expect(docs.top).toBeCloseTo(features.top, 0);

    // The details beside the groups, level with the first links; the social links under the brand.
    const nav = box(canvas.getByRole('navigation', { name: 'Footer' }));
    const description = box(canvas.getByText(/reusable foundation/));
    const links = box(canvas.getByRole('list', { name: 'Social links' }));
    await expect(box(email).left).toBeGreaterThan(nav.right);
    await expect(
      Math.abs(box(email).top - box(canvas.getByRole('link', { name: 'About' })).top),
    ).toBeLessThan(12);
    await expect(links.top).toBeGreaterThan(description.bottom);
    await expect(links.right).toBeLessThan(nav.left);

    // The four details 16px apart, however tall the brand beside them grows.
    const rows = [...(canvasElement.querySelector('dl')?.children ?? [])].map(box);
    const gaps = rows.slice(1).map((row, index) => row.top - (rows[index]?.bottom ?? 0));
    await expect(gaps).toHaveLength(3);
    for (const gap of gaps) await expect(gap).toBeCloseTo(16, 0);

    // The copyright on the left, the legal links on the right, in one row.
    const legal = legalBar(canvasElement);
    const middle = (rect: DOMRect) => rect.top + rect.height / 2;
    for (const link of legal.links) {
      await expect(link.left).toBeGreaterThan(legal.copyright.right);
      await expect(Math.abs(middle(link) - middle(legal.copyright))).toBeLessThan(2);
    }
  },
};

/**
 * Below 1280px the contact details and social links move beside the brand, and
 * the groups run underneath, Resources' second column in line with the details.
 * The legal links take a row of their own under the copyright.
 */
export const FullOnTablet: Story = {
  tags: ['!autodocs'],
  args: { variant: 'full' },
  globals: { viewport: { value: 'tablet' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const email = box(canvas.getByRole('link', { name: contact.email }));
    const company = box(canvas.getByRole('heading', { name: 'Company' }));
    const links = box(canvas.getByRole('list', { name: 'Social links' }));
    await expect(email.left).toBeGreaterThan(box(canvas.getByText(/reusable foundation/)).right);
    // The text starts after a 16px icon and a 12px gap.
    await expect(email.left - 28).toBeCloseTo(
      box(canvas.getByRole('link', { name: 'Docs' })).left,
      0,
    );
    await expect(links.top).toBeGreaterThan(box(canvas.getByText(street)).bottom);
    await expect(company.top).toBeGreaterThan(links.bottom);
    await expect(canvas.queryByRole('heading', { name: 'Contact' })).toBeNull();

    const legal = legalBar(canvasElement);
    const [privacy, ...rest] = legal.links;
    await expect(privacy?.top).toBeGreaterThan(legal.copyright.bottom);
    await expect(privacy?.left).toBeCloseTo(legal.copyright.left, 0);
    for (const link of rest) await expect(link.top).toBeCloseTo(privacy?.top ?? 0, 0);
  },
};

/**
 * On phones each group takes the full width with its links in two columns, and
 * the groups come before the contact details. The legal links follow the
 * copyright one per line, so no translation leaves one stranded.
 */
export const FullOnMobile: Story = {
  tags: ['!autodocs'],
  args: { variant: 'full' },
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const email = box(canvas.getByRole('link', { name: contact.email }));
    const address = box(canvas.getByText(street));
    // The legal row repeats some links, so look inside the groups.
    const nav = within(canvas.getByRole('navigation', { name: 'Footer' }));
    await expect(box(nav.getByRole('heading', { name: 'Resources' })).top).toBeGreaterThan(
      box(nav.getByRole('link', { name: 'Terms of Use' })).bottom,
    );
    await expect(box(nav.getByRole('link', { name: 'Privacy Policy' })).left).toBeGreaterThan(
      box(nav.getByRole('link', { name: 'About' })).right,
    );
    await expect(email.top).toBeGreaterThan(box(canvas.getByRole('link', { name: 'FAQ' })).bottom);
    await expect(address.top).toBeGreaterThan(
      box(canvas.getByRole('link', { name: contact.whatsapp })).bottom,
    );
    await expect(box(canvas.getByRole('list', { name: 'Social links' })).top).toBeGreaterThan(
      address.bottom,
    );
    await expect(canvas.queryByRole('heading', { name: 'Contact' })).toBeNull();

    const legal = legalBar(canvasElement);
    let above = legal.copyright;
    for (const link of legal.links) {
      await expect(link.top).toBeGreaterThanOrEqual(above.bottom);
      await expect(link.left).toBeCloseTo(legal.copyright.left, 0);
      above = link;
    }

    const page = canvasElement.ownerDocument.documentElement;
    await expect(page.scrollWidth).toBeLessThanOrEqual(page.clientWidth);
  },
};

/** With nothing set in src/config/site.ts, the brand stands alone. */
export const FullNoContact: Story = {
  args: { variant: 'full', contact: {}, social: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('list', { name: 'Social links' })).toBeNull();
    await expect(canvasElement.querySelector('dl')).toBeNull();
  },
};

/** The Midnight appearance. */
export const FullDark: Story = {
  tags: ['!autodocs'],
  args: { variant: 'full' },
  globals: { theme: 'dark' },
};

/** For phones: the groups and languages two to a row, the legal links last. */
export const Mobile: Story = {
  tags: ['!autodocs'],
  args: { variant: 'mobile' },
  globals: { viewport: { value: 'mobile' } },
};

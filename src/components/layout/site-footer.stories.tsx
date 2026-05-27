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

/**
 * One row: the brand with the social links under it, a column per link group,
 * then after a hairline the contact details, with the address last. There is no
 * language column.
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
    await expect(canvas.queryByRole('heading', { name: 'Language' })).toBeNull();

    // Email, phone, WhatsApp, then the address.
    const address = box(canvas.getByText(street));
    await expect(box(phone).top).toBeGreaterThan(box(email).bottom);
    await expect(box(whatsapp).top).toBeGreaterThan(box(phone).bottom);
    await expect(address.top).toBeGreaterThan(box(whatsapp).bottom);

    // The details beside the groups, aligned at the top; the social links under the brand.
    const product = box(canvas.getByRole('heading', { name: 'Product' }));
    const company = box(canvas.getByRole('heading', { name: 'Company' }));
    const description = box(canvas.getByText(/reusable foundation/));
    const links = box(canvas.getByRole('list', { name: 'Social links' }));
    await expect(box(email).left).toBeGreaterThan(company.right);
    await expect(Math.abs(box(email).top - product.top)).toBeLessThan(12);
    await expect(links.top).toBeGreaterThan(description.bottom);
    await expect(links.right).toBeLessThan(product.left);
  },
};

/** With nothing set in src/config/site.ts, the brand stands alone, as on the site until then. */
export const FullWithoutContact: Story = {
  args: { variant: 'full', contact: {}, social: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('list', { name: 'Social links' })).toBeNull();
    await expect(canvasElement.querySelector('dl')).toBeNull();
  },
};

/**
 * Below 1024px the contact details and social links move beside the brand, in
 * line with the last group's column, and the groups run underneath.
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
    await expect(email.left - 28).toBeCloseTo(company.left, 0);
    await expect(links.top).toBeGreaterThan(box(canvas.getByText(street)).bottom);
    await expect(company.top).toBeGreaterThan(links.bottom);
  },
};

/** On phones the link groups pair up and come before the contact details. */
export const FullOnMobile: Story = {
  tags: ['!autodocs'],
  args: { variant: 'full' },
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const email = box(canvas.getByRole('link', { name: contact.email }));
    const address = box(canvas.getByText(street));
    await expect(email.top).toBeGreaterThan(
      box(canvas.getByRole('heading', { name: 'Company' })).bottom,
    );
    await expect(address.top).toBeGreaterThan(
      box(canvas.getByRole('link', { name: contact.whatsapp })).bottom,
    );
    await expect(box(canvas.getByRole('list', { name: 'Social links' })).top).toBeGreaterThan(
      address.bottom,
    );
    const page = canvasElement.ownerDocument.documentElement;
    await expect(page.scrollWidth).toBeLessThanOrEqual(page.clientWidth);
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

/** The Midnight appearance. */
export const MobileDark: Story = {
  tags: ['!autodocs'],
  args: { variant: 'mobile' },
  globals: { viewport: { value: 'mobile' }, theme: 'dark' },
};

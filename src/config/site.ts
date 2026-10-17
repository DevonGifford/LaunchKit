import { env } from '@/env';

/**
 * Ways to reach the project, in the order the footer lists them; each one shows
 * only when it is set.
 */
export type SiteContact = {
  email?: string;
  /** In international format, e.g. "+44 7700 900123". */
  phone?: string;
  /** The WhatsApp number, in international format. */
  whatsapp?: string;
  /** The postal address, shown on three lines. */
  address?: {
    street: string;
    /** The town or city, with the country if it helps, e.g. "Madrid, Spain". */
    city: string;
    postcode: string;
  };
};

/** Networks the footer has a mark for. */
export type SocialNetwork = 'github' | 'x' | 'youtube' | 'discord';

export type SocialLink = { network: SocialNetwork; href: string };

/** Project identity (spec §9: brand is build-time configuration). */
export const siteConfig: { name: string; contact: SiteContact; social: SocialLink[] } = {
  name: 'LaunchKit',
  // Placeholders until the real details exist: the full footer shows whatever is
  // set here. A reserved example.com address and UK numbers Ofcom sets aside for
  // drama, so none of them reach anyone real.
  contact: {
    email: 'hello@example.com',
    phone: '+44 7700 900123',
    whatsapp: '+44 7700 900456',
    address: { street: 'Calle de Ejemplo 123', city: 'Madrid, Spain', postcode: '28001' },
  },
  // Placeholders: each profile points at the coming-soon page until it exists.
  social: [
    { network: 'github', href: '/coming-soon' },
    { network: 'x', href: '/coming-soon' },
    { network: 'youtube', href: '/coming-soon' },
    { network: 'discord', href: '/coming-soon' },
  ],
};

/**
 * Canonical origin for absolute URLs (metadata, sitemap, hreflang).
 * Server-only: reads a server environment variable.
 */
export function getSiteUrl(): URL {
  if (env.NEXT_PUBLIC_SITE_URL) return new URL(env.NEXT_PUBLIC_SITE_URL);
  if (env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  return new URL('http://localhost:3000');
}

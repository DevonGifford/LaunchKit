import type { PageDefinition } from '@/lib/content/types';

/**
 * A placeholder until the English Pricing page (src/content/en/pages/pricing.ts)
 * is translated, in the coming-soon state's words (`ComingSoon` in messages).
 */
export const pricing = {
  meta: {
    title: 'Preise',
    description:
      'Wir arbeiten noch daran. Schauen Sie bald wieder vorbei, oder schreiben Sie uns, wenn Sie benachrichtigt werden möchten.',
  },
  sections: [
    {
      id: 'coming-soon',
      type: 'hero',
      eyebrow: 'Demnächst',
      title: 'Diese Seite ist in Arbeit',
      description:
        'Wir arbeiten noch daran. Schauen Sie bald wieder vorbei, oder schreiben Sie uns, wenn Sie benachrichtigt werden möchten.',
      primaryAction: { label: 'Zurück zur Startseite', href: '/' },
      secondaryAction: { label: 'Kontakt aufnehmen', href: '/contact' },
    },
  ],
} satisfies PageDefinition;

import type { PageDefinition } from '@/lib/content/types';

export const contact = {
  meta: {
    title: 'Kontakt',
    description:
      'Fragen zu LaunchKit oder ein Projekt, das Sie darauf aufbauen möchten? Schreiben Sie uns.',
  },
  sections: [
    {
      id: 'intro',
      type: 'hero',
      eyebrow: 'Kontakt',
      title: 'Sprechen wir über Ihren nächsten Launch.',
      description:
        'Sie starten eine neue Website mit LaunchKit oder möchten das Fundament selbst verbessern? Wir freuen uns auf Ihre Nachricht.',
    },
    {
      id: 'message',
      type: 'contact',
      title: 'Nachricht senden',
      description:
        'Dieses Formular ist das Referenzmuster von LaunchKit: Es wird während der Eingabe geprüft und vor der Annahme noch einmal auf dem Server.',
      details: [
        { label: 'Validierung', value: 'Im Browser und auf dem Server' },
        { label: 'Zustellung', value: 'Legt jedes Projekt selbst fest' },
      ],
    },
  ],
} satisfies PageDefinition;

/*
 * Adapted from shadcn-ui-kit, components/sections/hero-section.tsx
 * (https://github.com/bundui/shadcn-ui-kit). Copyright (c) 2024 Mohd. Nisab, MIT License.
 */
import { StarIcon } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { AvatarGroup } from '@/components/ui/avatar';
import { Container } from '@/components/ui/container';
import { Link } from '@/i18n/navigation';
import type { SectionOf } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { ActionButton, PersonAvatar } from '@/components/sections/section-parts';
import { LinkMenu } from './hero-centered-link-menu';

type Section = SectionOf<'hero-centered'>;

/**
 * A centred page opener on the muted surface: the h1 with a highlighted phrase,
 * the description, a primary action beside a menu of links, and a line of
 * social proof that links to the evidence.
 */
export function HeroCenteredSection({
  id,
  title,
  titleHighlight,
  description,
  primaryAction,
  menu,
  proof,
}: Section) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-b bg-muted/60">
      <Container className="flex flex-col items-center py-20 text-center sm:py-24 lg:py-32">
        <h1 id={`${id}-title`} className="max-w-4xl text-display">
          <Highlighted text={title} highlight={titleHighlight} />
        </h1>
        <p className="mt-6 max-w-2xl text-lede text-pretty text-muted-foreground">{description}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ActionButton action={primaryAction} />
          {menu && <LinkMenu menu={menu} />}
        </div>
        {proof && <Proof proof={proof} />}
      </Container>
    </section>
  );
}

// A champagne band across the lower part of the line, like a highlighter pen,
// drawn in once on load. Each line of a wrapped phrase gets its own stroke. On
// Midnight it narrows to a stronger stroke under the words: a wide band of gold
// over navy turns grey.
const marker =
  'box-decoration-clone bg-[linear-gradient(transparent_var(--marker-from),var(--marker)_var(--marker-from)_92%,transparent_92%)] bg-size-[100%_100%] bg-no-repeat px-1 [--marker-from:50%] [--marker:color-mix(in_oklab,var(--color-accent)_50%,transparent)] motion-safe:animate-marker dark:[--marker-from:76%] dark:[--marker:color-mix(in_oklab,var(--color-accent)_75%,transparent)]';

function Highlighted({ text, highlight }: { text: string; highlight?: string }) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || at === -1) return text;

  return (
    <>
      {text.slice(0, at)}
      <span className={marker}>{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  );
}

/** Faces, the star rating and a short claim in one pill, linking to the evidence. */
function Proof({ proof }: { proof: NonNullable<Section['proof']> }) {
  const t = useTranslations('HeroCentered');
  const format = useFormatter();
  const stars = Math.round(proof.rating);

  return (
    <Link
      href={proof.href}
      className="mt-12 inline-flex items-center gap-3 rounded-full border bg-background/70 p-1.5 pe-5 text-start transition-colors outline-none hover:bg-background focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <AvatarGroup>
        {proof.people.map((person) => (
          <PersonAvatar
            key={person.name}
            name={person.name}
            image={person.image}
            className="*:data-[slot=avatar-fallback]:text-[0.625rem]"
          />
        ))}
      </AvatarGroup>
      <span className="flex flex-col text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, index) => (
              <StarIcon
                key={index}
                className={cn(
                  'size-3.5',
                  index < stars ? 'fill-accent text-accent' : 'text-muted-foreground/50',
                )}
              />
            ))}
          </span>
          <span aria-hidden="true" className="font-medium text-foreground">
            {format.number(proof.rating)}
          </span>
          <span className="sr-only">{t('rating', { rating: proof.rating })}</span>
        </span>
        {proof.label}
      </span>
    </Link>
  );
}

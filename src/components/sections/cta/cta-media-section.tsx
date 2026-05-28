import Image from 'next/image';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { CtaActions } from './cta-parts';

/**
 * A band on the high-emphasis surface with the heading on one side and the
 * actions on the other from 1024px. A decorative photo sits behind it, faded
 * under the copy; without one, a faint dot grid takes its place.
 */
export function CtaMediaSection({
  id,
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
}: SectionOf<'cta-media'>) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative isolate overflow-hidden bg-emphasis text-emphasis-foreground"
    >
      {image ? <Backdrop image={image} /> : <DotGrid />}
      <Container className="flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-20">
        <div className="max-w-xl">
          <span aria-hidden="true" className="block h-px w-12 bg-accent" />
          <h2 id={`${id}-title`} className="mt-6 text-headline">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-lede text-pretty text-emphasis-foreground/80">{description}</p>
          )}
        </div>
        {/* A gap of the surface colour inside the focus ring keeps it visible over a bright photo. */}
        <CtaActions
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          className="lg:shrink-0 [&_a]:focus-visible:ring-offset-2 [&_a]:focus-visible:ring-offset-emphasis"
        />
      </Container>
    </section>
  );
}

/**
 * The photo, cropped to the band, under a wash of the surface colour that keeps
 * the copy at AA contrast even over a white photo. Narrow screens get it evenly,
 * since the copy spans the band. From 1024px the copy (at most 36rem) never
 * passes 60% of the band's width, so the wash stays at least 85% opaque up to
 * there and only thins towards the actions.
 */
function Backdrop({ image }: { image: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-emphasis/85 lg:bg-transparent lg:bg-linear-to-r lg:from-emphasis lg:from-35% lg:via-emphasis/85 lg:via-60% lg:to-emphasis/20" />
    </div>
  );
}

/** Bento's masked dot grid, drawn in the band's text colour and fading towards the copy. */
function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-y-0 end-0 -z-10 w-full bg-[radial-gradient(var(--color-emphasis-foreground)_1px,transparent_1px)] mask-radial-from-10% mask-radial-to-70% mask-radial-at-right bg-size-[16px_16px] opacity-20 lg:w-2/3"
    />
  );
}

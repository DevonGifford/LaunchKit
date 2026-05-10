import Image from 'next/image';
import { Fragment } from 'react';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { HeroAudiences } from './marketing-hero-audiences';
import { ActionButton, Eyebrow } from './section-parts';

type Section = SectionOf<'marketing-hero'>;

/** Page-opening hero: the h1, a rotating audience line, actions and showcase artwork. */
export function MarketingHero({
  id,
  eyebrow,
  title,
  titleHighlight,
  audiences,
  description,
  primaryAction,
  secondaryAction,
  showcase,
}: Section) {
  return (
    // The artwork bleeds past the edges; the section clips it at the screen's edge.
    <section id={id} aria-labelledby={`${id}-title`} className="relative overflow-hidden">
      {/*
        The copy and the artwork share the container, so they stay one composition
        at every width: on laptops the artwork runs off the screen's right edge, and
        on wider screens the two stay together, centred. From `md` the artwork is a
        layer behind the copy.
      */}
      <Container className="relative flex flex-col justify-center pt-16 pb-(--art-band) [--art-band:min(18rem,62vw)] sm:pt-20 md:min-h-[clamp(40rem,52vw,50rem)] md:pb-20 lg:py-24">
        <div className="relative z-10 max-w-xl space-y-8 lg:max-w-[42rem]">
          <div className="space-y-6">
            {eyebrow && <Eyebrow className="text-accent-text">{eyebrow}</Eyebrow>}
            <h1 id={`${id}-title`} className="text-display">
              {title.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && ' '}
                  <span className="block">
                    <HighlightedLine line={line} highlight={titleHighlight} />
                  </span>
                </Fragment>
              ))}
            </h1>
          </div>
          {audiences && <HeroAudiences audiences={audiences} />}
          {/* Hidden on phones, where the headline, audience line and actions carry the hero. */}
          <p className="hidden max-w-md text-lede text-muted-foreground md:block">{description}</p>
          {(primaryAction ?? secondaryAction) && (
            // In dark mode the outline button is translucent; here it gets the same colour,
            // opaque, so the artwork behind it on phones can't show through.
            <div className="flex flex-wrap gap-3 dark:[&>[data-variant=outline]]:bg-[color-mix(in_srgb,var(--input)_30%,var(--background))] dark:[&>[data-variant=outline]:hover]:bg-[color-mix(in_srgb,var(--input)_50%,var(--background))]">
              {primaryAction && <ActionButton action={primaryAction} />}
              {secondaryAction && <ActionButton action={secondaryAction} variant="outline" />}
            </div>
          )}
        </div>
        <Showcase showcase={showcase} />
      </Container>
    </section>
  );
}

function HighlightedLine({ line, highlight }: { line: string; highlight?: string }) {
  const at = highlight ? line.indexOf(highlight) : -1;
  if (!highlight || at === -1) return line;

  return (
    <>
      {line.slice(0, at)}
      <span className="text-accent-text">{highlight}</span>
      {line.slice(at + highlight.length)}
    </>
  );
}

// Sizes and offsets are shares of the container. On phones it is a little wider
// than the screen, and the top of its windows sits a fixed 6rem above the band
// (the 13% lift skips the image's transparent top edge), tucked behind the actions, showing most of the Capsule
// window with the others beside it; a radial mask on the image itself fades its
// edges, so nothing is cut off in a straight line. From `md` it starts halfway across and
// runs off the right: behind the lower copy on tablets, and beside the headline,
// reaching back behind it, from `lg`. From `xl` it is larger and starts sooner.
const artwork = cn(
  'absolute top-[-6rem] left-[-14%] h-auto w-[135%] max-w-none -translate-y-[13%] [mask-image:radial-gradient(70%_70%_at_50%_50%,black_60%,transparent_100%)] sm:left-0 sm:w-full',
  'md:top-auto md:bottom-[3%] md:left-1/2 md:w-[66%] md:translate-y-0 md:[mask-image:none]',
  'lg:top-1/2 lg:bottom-auto lg:w-[58%] lg:-translate-y-1/2 xl:left-[42.5%] xl:w-[72.5%]',
);

/** The same artwork drawn for each appearance; only the visible one loads. */
function Showcase({ showcase }: { showcase: Section['showcase'] }) {
  const image = {
    width: showcase.width,
    height: showcase.height,
    sizes: '(min-width: 80rem) 52rem, (min-width: 48rem) 66vw, 135vw',
  };

  return (
    // On phones the layer is the band the container reserves below the actions. From
    // `md` it fills the container, and a fade in the page colour keeps the copy
    // readable where the artwork reaches behind it.
    <div className="absolute inset-x-0 bottom-0 z-0 h-(--art-band) md:inset-0 md:h-auto md:before:absolute md:before:inset-0 md:before:z-10 md:before:bg-linear-to-r md:before:from-background md:before:from-25% md:before:to-transparent md:before:to-55%">
      <Image
        {...image}
        src={showcase.light}
        alt={showcase.alt}
        className={cn(artwork, 'dark:hidden')}
      />
      <Image
        {...image}
        src={showcase.dark}
        alt={showcase.alt}
        className={cn(artwork, 'hidden dark:block')}
      />
    </div>
  );
}

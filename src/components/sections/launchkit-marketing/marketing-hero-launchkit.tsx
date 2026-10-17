import Image from 'next/image';
import { Fragment } from 'react';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { HeroAudiences } from './marketing-hero-launchkit-audiences';
import { ActionButton, Eyebrow } from '@/components/sections/section-parts';

type Section = SectionOf<'marketing-hero-launchkit'>;

/** Page-opening hero: the h1, a rotating audience line, actions and showcase artwork. */
export function MarketingHeroLaunchKit({
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
      <Container className="relative flex flex-col justify-center pt-16 sm:pt-20 md:min-h-[clamp(34rem,52vw,50rem)] md:pb-20 lg:min-h-[max(40rem,calc(min(100vw,72rem)*0.57))] lg:py-24 xl:min-h-[clamp(41.625rem,calc(25.625rem_+_20vw),44rem)]">
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

// Sizes and offsets are shares of the container.
//
// Phones: in the flow under the copy, so the hero always makes room for the whole
// artwork, reflection included. It is 135% of the screen's width up to 480px, easing
// to 105% by 767px, and pulled up so the top of its windows sits 6rem above the
// bottom of the actions (the image's own negative margin skips its transparent top
// edge: 13% of its height, which is 9.75% of its width).
//
// From `md` it is a layer anchored to the bottom right, its faint reflection
// reaching the hero's lower edge. Between `md` and `lg` it grows from 66% to
// 72.5% of the container and moves from halfway across to 42.5%, so it eases
// closer to the copy instead of jumping at a breakpoint. From `xl` it is centred
// beside the copy, where the two positions all but coincide.
const artwork = cn(
  'relative left-[clamp(-14%,calc(-14%_+_(100vw_-_30rem)_*_0.33),-2%)] mt-[calc(var(--art-w)_*_-0.0975)] block h-auto w-(--art-w) max-w-none [--art-w:clamp(105%,calc(135%_-_(100vw_-_30rem)_*_0.8),135%)]',
  'md:absolute md:top-auto md:bottom-0 md:mt-0',
  'md:left-[clamp(42.5%,calc(50%_-_(100vw_-_48rem)_*_0.3),50%)] md:w-[clamp(66%,calc(66%_+_(100vw_-_48rem)_*_0.26),72.5%)]',
  'xl:top-1/2 xl:bottom-auto xl:-translate-y-1/2',
);

/** The same artwork drawn for each appearance; only the visible one loads. */
function Showcase({ showcase }: { showcase: Section['showcase'] }) {
  const image = {
    width: showcase.width,
    height: showcase.height,
    sizes: '(min-width: 80rem) 52rem, (min-width: 48rem) 66vw, 135vw',
  };

  return (
    // On phones it runs edge to edge, pulled up 6rem behind the actions. From `md` it
    // fills the container behind the copy, and a fade in the page colour keeps the
    // copy readable where the artwork reaches behind it.
    <div className="relative z-0 -mx-5 -mt-24 sm:-mx-8 md:absolute md:inset-0 md:m-0 md:before:absolute md:before:inset-0 md:before:z-10 md:before:bg-linear-to-r md:before:from-background md:before:from-25% md:before:to-transparent md:before:to-55%">
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

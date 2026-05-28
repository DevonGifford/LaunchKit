import Image, { getImageProps } from 'next/image';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { ActionButton, ActionLink, DotList, Eyebrow } from '@/components/sections/section-parts';

/**
 * Below 1024px the copy sits on the photo, so the section swaps the theme's text,
 * button and focus colours for their versions on the high-emphasis surface; the
 * buttons, links and lists inside follow without changes of their own. Muted text
 * is 90% of the text colour, enough for AA on the photo's wash.
 */
const onPhoto =
  'max-lg:text-foreground max-lg:[--foreground:var(--emphasis-foreground)] max-lg:[--muted-foreground:color-mix(in_oklab,var(--emphasis-foreground)_90%,transparent)] max-lg:[--primary:var(--emphasis-foreground)] max-lg:[--primary-foreground:var(--emphasis)] max-lg:[--ring:var(--emphasis-foreground)]';

/**
 * A page opener with a photo. From 1024px it comes in two halves: the copy on the
 * left and the photo on the right, from the top of the section to the bottom and
 * out to the screen's edge. Before then the photo fills the section behind the
 * copy, so the hero stays one screen tall.
 */
export function HeroSplitSection({
  id,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  details,
  image,
  desktopImage,
  highlights,
}: SectionOf<'hero-split'>) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative isolate ${onPhoto}`}>
      <Container className="py-20 sm:py-24 lg:flex lg:min-h-[42rem] lg:items-center">
        {/*
          From 1024px the photo starts 3rem right of centre and the copy ends 1rem
          left of it, so a 4rem gap separates them at every width. min-w-0 lets a
          long word break rather than widen the copy under the photo. On the photo,
          a gap of the surface colour inside each focus ring keeps it visible.
        */}
        <div className="min-w-0 space-y-6 lg:pe-[calc(50%+1rem)] max-lg:[&_a]:focus-visible:ring-offset-2 max-lg:[&_a]:focus-visible:ring-offset-emphasis">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {/* Long words hyphenate in the page's language, or break if it has no rule for them. */}
          <h1 id={`${id}-title`} className="max-w-xl text-display wrap-break-word hyphens-auto">
            {title}
          </h1>
          <p className="max-w-xl text-lede text-pretty text-muted-foreground">{description}</p>
          {(primaryAction ?? secondaryAction) && (
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
              {primaryAction && <ActionButton action={primaryAction} />}
              {secondaryAction && <ActionLink action={secondaryAction} />}
            </div>
          )}
          {details && <DotList items={details} className="pt-2" />}
        </div>
      </Container>
      <div className="absolute inset-y-0 end-0 -z-10 w-full lg:w-[calc(50%-3rem)]">
        <Photo image={image} desktopImage={desktopImage} />
        {/* Behind the copy, a wash keeps it at AA contrast even over a white photo. */}
        <div aria-hidden="true" className="absolute inset-0 bg-emphasis/75 lg:hidden" />
        {highlights && <Highlights items={highlights} />}
      </div>
    </section>
  );
}

/**
 * The photo, cropped to fill its box. From 1024px a source in the picture swaps in
 * the desktop framing, when there is one, so each screen downloads only the
 * version it shows.
 */
function Photo({ image, desktopImage }: { image: string; desktopImage?: string }) {
  const desktop =
    desktopImage && getImageProps({ src: desktopImage, alt: '', fill: true, sizes: '50vw' }).props;

  return (
    // Positioned, as the image's `fill` requires of its parent.
    <picture className="absolute inset-0">
      {desktop && (
        <source media="(min-width: 64rem)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
      )}
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 64rem) 50vw, 100vw"
        loading="eager"
        fetchPriority="high"
        className="object-cover"
      />
    </picture>
  );
}

/**
 * A few words over the photo's lower corner, from 1024px: before then the copy
 * covers the photo. A hairline runs up from them, well past the first word.
 * There's no backdrop: a soft halo of the surface colour lifts each letter off
 * brighter patches, but the photo still needs to be dark in that corner.
 */
function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="absolute end-10 bottom-12 space-y-4 border-s border-emphasis-foreground/40 ps-6 pt-24 pb-1 text-sm font-medium tracking-[0.2em] text-emphasis-foreground uppercase [text-shadow:0_0_2px_var(--color-emphasis),0_0_4px_var(--color-emphasis),0_0_12px_var(--color-emphasis)] max-lg:hidden">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

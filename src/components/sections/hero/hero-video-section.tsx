import { useTranslations } from 'next-intl';
import { BackgroundVideo } from '@/components/sections/background-video';
import { ActionButton, ActionLink, Eyebrow } from '@/components/sections/section-parts';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';

type Section = SectionOf<'hero-video'>;
type Copy = Pick<
  Section,
  'id' | 'eyebrow' | 'title' | 'description' | 'primaryAction' | 'secondaryAction'
>;

/**
 * A page opener over a background video. With the 4rem sticky header it fills
 * the first screen, and it grows when the copy needs more room. The copy sits
 * at the bottom: straight on the video over a wash (`overlay`), or in a panel
 * on the surface colour (`card`), which lets more of the video show.
 */
export function HeroVideoSection({
  id,
  variant = 'overlay',
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  video,
}: Section) {
  const t = useTranslations('BackgroundVideo');
  const copy = { id, eyebrow, title, description, primaryAction, secondaryAction };
  const card = variant === 'card';

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-emphasis text-emphasis-foreground"
    >
      <BackgroundVideo
        {...video}
        eager
        labels={{ play: t('play'), pause: t('pause') }}
        className="absolute inset-0"
      >
        {card ? (
          // Only for mood: the panel carries its own background.
          <div aria-hidden="true" className="absolute inset-0 bg-emphasis/25" />
        ) : (
          <Wash />
        )}
      </BackgroundVideo>
      {/* At least 4rem under the copy keeps it clear of the pause button in the corner. */}
      <Container className="relative pt-24 pb-20 sm:pb-24">
        {card ? <CardCopy {...copy} /> : <OverlayCopy {...copy} />}
      </Container>
    </section>
  );
}

/**
 * A wash of the surface colour that keeps the copy at AA contrast even over a
 * white frame: 75% under 1024px, where the copy spans the screen. From then the
 * copy keeps to the left: the text (at most 36rem) never passes 61% of the
 * width and the heading (42rem) 70%, so the wash holds 75% to 60%, is still 64%
 * (3:1 for large text) at 70%, and thins towards the right edge.
 */
function Wash() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-emphasis/75 lg:bg-transparent lg:bg-linear-to-r lg:from-emphasis/80 lg:via-emphasis/75 lg:via-60% lg:to-emphasis/30"
    />
  );
}

/** The copy straight on the video, in the high-emphasis surface's colours. */
function OverlayCopy({ id, eyebrow, title, description, primaryAction, secondaryAction }: Copy) {
  return (
    <div className="max-w-2xl space-y-6">
      {eyebrow && <Eyebrow className="max-w-xl text-emphasis-foreground/90">{eyebrow}</Eyebrow>}
      {/* Long words hyphenate in the page's language, or break if it has no rule for them. */}
      <h1 id={`${id}-title`} className="text-display wrap-break-word hyphens-auto">
        {title}
      </h1>
      {description && (
        <p className="max-w-xl text-lede text-pretty text-emphasis-foreground/90">{description}</p>
      )}
      {(primaryAction ?? secondaryAction) && (
        // A gap of the surface colour inside each focus ring keeps it visible over the video.
        <div className="flex flex-wrap gap-3 pt-2 [&_a]:focus-visible:ring-offset-2 [&_a]:focus-visible:ring-offset-emphasis">
          {primaryAction && <ActionButton action={primaryAction} variant="inverse" />}
          {secondaryAction && <ActionButton action={secondaryAction} variant="inverse-outline" />}
        </div>
      )}
    </div>
  );
}

/** The copy in a panel on the surface colour, in the theme's usual text and button colours. */
function CardCopy({ id, eyebrow, title, description, primaryAction, secondaryAction }: Copy) {
  return (
    <Card className="max-w-xl gap-6 p-7 text-base sm:p-10">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 id={`${id}-title`} className="text-headline wrap-break-word hyphens-auto">
        {title}
      </h1>
      {description && <p className="text-lede text-pretty text-muted-foreground">{description}</p>}
      {(primaryAction ?? secondaryAction) && (
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
          {primaryAction && <ActionButton action={primaryAction} />}
          {secondaryAction && <ActionLink action={secondaryAction} />}
        </div>
      )}
    </Card>
  );
}

import type { CSSProperties, ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { ActionButton, Eyebrow } from '@/components/sections/section-parts';

/**
 * Page-opening section: the page's only h1, plus optional actions and code
 * preview. Two slots serve uses content can't describe, such as the page
 * states: `actions` adds controls after the content's own links (a button that
 * runs code), and `media` fills the preview's column when there is no preview.
 * On phones that media sits beside the heading at `mediaSize`, a CSS length, so
 * a shorter heading can take a smaller illustration.
 */
export function HeroSection({
  id,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  preview,
  actions,
  media,
  mediaSize = cornerSize,
}: SectionOf<'hero'> & { actions?: ReactNode; media?: ReactNode; mediaSize?: string }) {
  // Media without a preview has two layouts: see `corner` and `columns` below.
  const corner = !preview && media;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(corner && 'max-sm:overflow-x-clip')}
    >
      <Container
        style={
          corner ? ({ '--art': mediaSize, '--corner': cornerSize } as CSSProperties) : undefined
        }
        className={cn(
          'grid gap-12 py-16 sm:py-20 lg:py-28',
          preview && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16',
          corner && cn('relative', columns),
        )}
      >
        <div className={cn('space-y-6', corner && 'relative z-10')}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 id={`${id}-title`} className={cn('max-w-3xl text-display', corner && cornerTitle)}>
            {title}
          </h1>
          <p className="max-w-xl text-lede text-muted-foreground">{description}</p>
          {(primaryAction ?? secondaryAction ?? actions) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {primaryAction && <ActionButton action={primaryAction} />}
              {secondaryAction && <ActionButton action={secondaryAction} variant="outline" />}
              {actions}
            </div>
          )}
        </div>

        {preview ? (
          <figure className="min-w-0 overflow-hidden rounded-xl border bg-surface text-surface-foreground shadow-[0_24px_60px_-30px_var(--overlay)] max-sm:hidden">
            <figcaption className="flex items-center gap-3 border-b px-5 py-3 font-mono text-xs text-muted-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {preview.filename}
            </figcaption>
            <pre className="p-5 font-mono text-[0.8125rem] leading-6 [overflow-wrap:anywhere] whitespace-pre-wrap">
              <code>{preview.code}</code>
            </pre>
          </figure>
        ) : (
          media && <div className={cornerMedia}>{media}</div>
        )}
      </Container>
    </section>
  );
}

// Media without a preview has exactly two layouts, switched at sm (640px), so no
// width falls between them with the media stacked under the copy:
//
// - Corner, on phones: the media sits in the top-right corner beside the heading,
//   level with the eyebrow and bleeding a little off the screen's edge; it's never
//   part of the copy's flow. Its size, --art, is `mediaSize`; an illustration's
//   disc is 84% of it, inset 8%, and the bleed is a share of it, so the disc's
//   outer details stay on screen at any size. The title always keeps the room the
//   default size (--corner) needs, after the 1.25rem gutter, so it wraps the same
//   way in every state; a smaller illustration then ends with a shorter heading
//   rather than handing it a wider line. The title's block is at least as tall as
//   the disc, so the description and actions always start below the artwork.
// - Columns, from sm: the copy and the media side by side, centred on each other,
//   the gap and the media growing at lg.
const cornerSize = 'clamp(14.5rem, 60vw, 17rem)';
const columns =
  'sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] sm:items-center sm:gap-x-10 lg:gap-x-16';
const cornerMedia =
  'pointer-events-none max-sm:absolute max-sm:top-9 max-sm:right-[calc(var(--art)*-0.172)] max-sm:w-(--art)';
// Long single words, such as German ones, hyphenate rather than run into the media
// while the heading's measure is narrow.
const cornerTitle =
  'max-lg:hyphens-auto max-sm:min-h-[calc(var(--art)*0.92-5.75rem)] max-sm:pr-[calc(var(--corner)*0.748-1.25rem)]';

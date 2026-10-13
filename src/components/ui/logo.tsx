import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

const marks = {
  lockup: { src: '/brand/launchkit-lockup.png', aspectRatio: '1214 / 260' },
  emblem: { src: '/brand/launchkit-emblem.png', aspectRatio: '311 / 260' },
} as const;

/**
 * The LaunchKit mark, drawn in `currentColor` so it follows the active theme.
 * The PNGs in public/brand are alpha masks, not coloured artwork — no brand
 * colour is baked in. Size it with a height class (e.g. `h-7`).
 *
 * Decorative: give the surrounding link or heading the accessible name.
 */
export function Logo({
  variant = 'lockup',
  className,
}: {
  variant?: keyof typeof marks;
  className?: string;
}) {
  const { src, aspectRatio } = marks[variant];
  const style: CSSProperties = {
    aspectRatio,
    maskImage: `url(${src})`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
  };

  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn(
        'inline-block shrink-0 bg-current forced-color-adjust-none forced-colors:bg-[CanvasText]',
        className,
      )}
    />
  );
}

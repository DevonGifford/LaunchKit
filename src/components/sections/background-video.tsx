'use client';

import { PauseIcon, PlayIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const reducedMotion = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(reducedMotion);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/**
 * A decorative video that fills its box, which the caller sizes and positions:
 * muted, looping and inline, with no controls but a pause button in the corner
 * (WCAG 2.2.2). It plays only while on screen, so one further down the page
 * loads when it's reached. The poster shows until it plays, and instead of it
 * when the visitor prefers reduced motion or the browser blocks autoplay; the
 * button then offers to play it.
 */
export function BackgroundVideo({
  src,
  mobileSrc,
  poster,
  sizes = '100vw',
  eager = false,
  labels,
  className,
  children,
}: {
  src: string;
  /** Played instead below 768px. */
  mobileSrc?: string;
  poster?: string;
  /** The poster's `sizes`, as for next/image. */
  sizes?: string;
  /** For a video at the top of the page: its poster loads first, as the largest paint. */
  eager?: boolean;
  /** The button's names, from the `BackgroundVideo` messages. */
  labels: { play: string; pause: string };
  className?: string;
  /** Layers between the video and the button, such as a wash that keeps copy readable. */
  children?: ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // Null on the server and while hydrating, so nothing plays and there's no
  // button until the setting is known; without JavaScript the poster stays.
  const prefersStill = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(reducedMotion).matches,
    () => null,
  );
  // Once the visitor presses the button, their choice outranks the setting.
  const [choice, setChoice] = useState<boolean>();
  const [started, setStarted] = useState(false);
  const playing = choice ?? prefersStill === false;

  useEffect(() => {
    const video = ref.current;
    if (!video || !playing) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) {
        video.pause();
        return;
      }
      video.play().catch((error: unknown) => {
        // Blocked, as in iOS Low Power Mode: the poster stays and the button offers to play.
        if (error instanceof DOMException && error.name === 'NotAllowedError') setChoice(false);
      });
    });
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [playing]);

  const toggle = () => {
    if (playing) {
      setChoice(false);
      return;
    }
    setChoice(true);
    // Started within the click, which lets a browser that blocked autoplay play it.
    ref.current?.play().catch(() => setChoice(false));
  };

  return (
    <div className={cn('relative', className)}>
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          sizes={sizes}
          loading={eager ? 'eager' : undefined}
          fetchPriority={eager ? 'high' : undefined}
          className="object-cover"
        />
      )}
      {/* Hidden over the poster until it plays: a slow or blocked start shows no blank or play glyph. */}
      <video
        ref={ref}
        aria-hidden="true"
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        data-started={started || undefined}
        onPlaying={() => setStarted(true)}
        className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700 data-started:opacity-100 motion-reduce:transition-none"
      >
        {mobileSrc && <source src={src} media="(min-width: 48rem)" />}
        <source src={mobileSrc ?? src} />
      </video>
      {children}
      {prefersStill !== null && (
        // On a chip of the surface colour, with a gap of it inside the focus
        // ring, so the icon and ring stay visible over a white frame.
        <Button
          type="button"
          variant="inverse-outline"
          size="icon"
          onClick={toggle}
          aria-label={playing ? labels.pause : labels.play}
          className="absolute end-4 bottom-4 z-10 rounded-full bg-emphasis/80 hover:bg-emphasis focus-visible:ring-offset-2 focus-visible:ring-offset-emphasis"
        >
          {playing ? <PauseIcon aria-hidden="true" /> : <PlayIcon aria-hidden="true" />}
        </Button>
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import type { SectionOf } from '@/lib/content/types';

type Section = SectionOf<'marketing-cinematic-hero'>;

// The headline fades in over this stretch of the scroll, as in the reference.
const fadeStart = 0.72;
const fadeEnd = 0.86;
// How much of the remaining distance the drawn position covers each animation
// frame: a stand-in for the reference's smooth scrolling (Lenis).
const easing = 0.15;
// Sharper canvases cost memory and fill rate for little visible gain.
const maxPixelRatio = 2;
const reducedMotion = '(prefers-reduced-motion: reduce)';

function frameUrl(
  { directory, frames, extension }: Pick<Section['sequence'], 'directory' | 'frames' | 'extension'>,
  frame: number,
) {
  const digits = Math.max(3, String(frames).length);
  return `${directory}/frame-${String(frame).padStart(digits, '0')}.${extension}`;
}

/**
 * A scroll-driven image sequence: the section is four screens tall, a sticky
 * full-screen canvas draws the frame that matches how far it has been scrolled,
 * and the headline fades in near the end. Scrolling never re-renders React: one
 * animation-frame loop draws to the canvas and styles the overlay directly. With
 * reduced motion it is one screen tall and shows the last frame and the headline.
 */
export function MarketingCinematicHero({
  id,
  title,
  description,
  action,
  loadingLabel,
  sequence,
}: Section) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { directory, frames, extension } = sequence;

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    const context = canvas?.getContext('2d');
    if (!section || !canvas || !overlay || !context) return;

    const still = window.matchMedia(reducedMotion).matches;
    const images: (HTMLImageElement | undefined)[] = [];
    let width = 0;
    let height = 0;
    let target = still ? 1 : 0;
    let current = target;
    let wanted = still ? frames : 1;
    let drawn = 0;
    let raf = 0;
    let exitTimer = 0;

    // Draws the requested frame, or the nearest earlier one that has loaded.
    const draw = (frame: number) => {
      let image: HTMLImageElement | undefined;
      let shown = 0;
      for (let index = frame; index >= 1; index -= 1) {
        const candidate = images[index - 1];
        if (candidate?.complete && candidate.naturalWidth > 0) {
          image = candidate;
          shown = index;
          break;
        }
      }
      if (!image || !width || !height) return;

      // Cover the canvas, cropping the frame's overflow evenly.
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.clearRect(0, 0, width, height);
      context.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
      drawn = shown;
      canvas.dataset.frame = String(shown);
    };

    const render = (progress: number) => {
      wanted = Math.max(1, Math.min(frames, Math.floor(progress * frames)));
      if (wanted !== drawn) draw(wanted);
      const opacity = Math.min(1, Math.max(0, (progress - fadeStart) / (fadeEnd - fadeStart)));
      overlay.style.opacity = String(opacity);
      overlay.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
    };

    // Progress runs from the section's top meeting the viewport's top (0) to its
    // bottom meeting the viewport's bottom (1).
    const measure = () => {
      const rect = section.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      target = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 1;
    };

    const tick = () => {
      raf = 0;
      current += (target - current) * easing;
      if (Math.abs(target - current) < 0.0005) current = target;
      render(current);
      if (current !== target) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // Size the canvas in device pixels, but draw in CSS pixels.
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const ratio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawn = 0;
      draw(wanted);
    });
    observer.observe(canvas);

    // Frame 1 first, then the rest in order; with reduced motion only the last.
    const order = still ? [frames] : Array.from({ length: frames }, (_, index) => index + 1);
    let settled = 0;
    const onSettled = () => {
      settled += 1;
      const percent = Math.round((settled / order.length) * 100);
      if (percentRef.current) percentRef.current.textContent = `${percent}%`;
      if (barRef.current) barRef.current.style.width = `${percent}%`;
      if (drawn !== wanted) draw(wanted);
      if (settled === order.length) {
        exitTimer = window.setTimeout(() => {
          if (loaderRef.current) loaderRef.current.dataset.state = 'done';
        }, 500);
      }
    };
    for (const frame of order) {
      const image = new Image();
      image.decoding = 'async';
      image.onload = onSettled;
      image.onerror = onSettled;
      image.src = frameUrl({ directory, frames, extension }, frame);
      images[frame - 1] = image;
    }

    if (still) {
      render(1);
    } else {
      measure();
      current = target;
      render(current);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
      // Stop any frames still downloading.
      for (const image of images) {
        if (!image) continue;
        image.onload = null;
        image.onerror = null;
        image.src = '';
      }
    };
  }, [directory, frames, extension]);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative h-[400vh] w-full bg-background motion-reduce:h-svh"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={sequence.alt}
          className="absolute inset-0 block size-full"
        />
        {/* Darkens the frames slightly so the white copy reads. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/20" />
        {/*
          Always in the document, so the headline and action reach assistive tech
          and the keyboard; focusing the action brings the copy into view.
        */}
        <div
          ref={overlayRef}
          style={{ opacity: 0, pointerEvents: 'none' }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white drop-shadow-md focus-within:opacity-100! motion-reduce:pointer-events-auto! motion-reduce:opacity-100! md:px-12 lg:px-24"
        >
          <h1
            id={`${id}-title`}
            className="mb-4 font-sans text-5xl leading-none font-medium tracking-tight md:text-7xl"
          >
            {title}
          </h1>
          {description && (
            <p className="mb-8 max-w-lg text-lg text-white/90 md:text-xl">{description}</p>
          )}
          {action && (
            <Magnetic>
              <Button
                asChild
                className="h-auto rounded-full bg-white px-8 py-4 text-base font-medium tracking-wide text-black hover:bg-white/90"
              >
                {action.href.startsWith('/') ? (
                  <Link href={action.href}>{action.label}</Link>
                ) : (
                  <a href={action.href}>{action.label}</a>
                )}
              </Button>
            </Magnetic>
          )}
        </div>
        {/* Covers the stage until every frame has loaded, then slides away. */}
        <div
          ref={loaderRef}
          aria-hidden="true"
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-background text-foreground transition-[translate,opacity] duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] data-[state=done]:pointer-events-none data-[state=done]:-translate-y-full data-[state=done]:opacity-0"
        >
          <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            {loadingLabel}
          </span>
          <span ref={percentRef} className="text-8xl font-light tracking-tighter">
            0%
          </span>
          <div className="mt-4 h-0.5 w-48 overflow-hidden rounded-full bg-border">
            <div ref={barRef} className="h-full w-0 bg-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Nudges its child towards the pointer, as the reference's button does. */
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element || window.matchMedia(reducedMotion).matches) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.2;
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.2;
    element.style.translate = `${x}px ${y}px`;
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => ref.current?.style.removeProperty('translate')}
      className="transition-[translate] duration-300 ease-out"
    >
      {children}
    </div>
  );
}

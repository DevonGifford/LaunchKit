'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';

const reducedMotion = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(reducedMotion);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

// Milliseconds per typed character, and how long each audience stays written.
const typeDelay = 55;
const holdDelay = 2200;

/**
 * The audiences, one at a time written out as if typed, looping. It has no pause
 * control by design (WCAG 2.2.2 would ask for one) and stands still when the
 * system asks for reduced motion. Screen readers read the plain list.
 */
export function HeroAudiences({ audiences }: { audiences: string[] }) {
  // The server renders it still, and so does the first client render.
  const still = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(reducedMotion).matches,
    () => true,
  );
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(audiences[0]?.length ?? 0);
  const current = audiences[active] ?? '';

  useEffect(() => {
    if (still || audiences.length < 2) return;
    const timer =
      typed < current.length
        ? setTimeout(() => setTyped(typed + 1), typeDelay)
        : setTimeout(() => {
            setActive((active + 1) % audiences.length);
            setTyped(0);
          }, holdDelay);
    return () => clearTimeout(timer);
  }, [still, audiences.length, active, typed, current.length]);

  return (
    // A champagne rail runs down the list; a dot on it marks the current audience.
    <ul className="relative space-y-1 pl-6 font-serif text-2xl leading-snug before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-accent/60 sm:text-3xl">
      {audiences.map((audience, index) => {
        const isActive = index === active;
        return (
          <li
            key={audience}
            className={cn(
              'relative transition-colors',
              isActive ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute top-1/2 -left-6 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
              />
            )}
            <span className="sr-only">{audience}</span>
            <span aria-hidden="true">
              {isActive && !still ? audience.slice(0, typed) : audience}
              {isActive && <span className="animate-caret-blink">_</span>}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

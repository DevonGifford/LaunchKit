'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

const reducedMotion = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(reducedMotion);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

// Milliseconds per typed and per deleted character, and how long a phrase stays written.
const typeDelay = 70;
const deleteDelay = 40;
const holdDelay = 1800;

/** How many leading characters two phrases share, such as "For " in "For founders" and "For startups". */
function sharedPrefix(a: string, b: string) {
  let length = 0;
  while (length < a.length && a[length] === b[length]) length += 1;
  return length;
}

/**
 * One audience at a time, typed out, held, then deleted back to the start it shares
 * with the next, looping. It has no pause control by design (WCAG 2.2.2 would ask
 * for one) and shows the first audience still when the system asks for reduced
 * motion. Screen readers read the plain list instead.
 */
export function HeroAudiences({ audiences }: { audiences: string[] }) {
  // The server renders it still, and so does the first client render.
  const still = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(reducedMotion).matches,
    () => true,
  );
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(audiences[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);

  const current = audiences[index] ?? '';
  const next = audiences[(index + 1) % audiences.length] ?? '';
  const keep = sharedPrefix(current, next);
  // Reserves the longest phrase's space, so the hero doesn't move as the text changes.
  const longest = audiences.reduce((a, b) => (b.length > a.length ? b : a), '');

  useEffect(() => {
    if (still || audiences.length < 2) return;
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting) {
      timer =
        typed < current.length
          ? setTimeout(() => setTyped(typed + 1), typeDelay)
          : setTimeout(() => setDeleting(true), holdDelay);
    } else {
      timer =
        typed > keep
          ? setTimeout(() => setTyped(typed - 1), deleteDelay)
          : setTimeout(() => {
              setIndex((index + 1) % audiences.length);
              setDeleting(false);
            }, typeDelay);
    }
    return () => clearTimeout(timer);
  }, [still, audiences.length, index, typed, deleting, current.length, keep]);

  const shown = still ? (audiences[0] ?? '') : current.slice(0, typed);

  return (
    // A champagne rail beside the line, with a dot marking it.
    <div className="relative pl-6 font-serif text-2xl leading-snug before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-accent/60 sm:text-3xl">
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
      <ul className="sr-only">
        {audiences.map((audience) => (
          <li key={audience}>{audience}</li>
        ))}
      </ul>
      <p aria-hidden="true" className="grid">
        <span className="invisible col-start-1 row-start-1">{longest}_</span>
        <span className="col-start-1 row-start-1">
          {shown}
          {!still && <span className="animate-caret-blink">_</span>}
        </span>
      </p>
    </div>
  );
}

import type { CSSProperties, ReactNode } from 'react';

/*
 * Line drawings for the page states, built from one rocket, after the LaunchKit
 * mark: lost on a looping path (not found), sputtering smoke (error) and waiting
 * on its pad (coming soon). Colours are theme tokens, so they follow Sunlight and
 * Midnight; the motion is a slow bob and twinkle, off with reduced motion. All
 * are decorative: the heading beside them says what happened.
 */

// One weight and rounded ends for every line, so the set reads as one hand.
const line = { strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

// Beside the copy from sm, it grows with the screen and reaches its desktop size,
// 24rem, exactly at lg (1024px), so resizing never makes it jump.
function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="w-full sm:ml-auto sm:max-w-[calc(4rem+31.25vw)] lg:max-w-sm"
    >
      <circle cx="200" cy="200" r="168" strokeWidth="1.5" className="fill-muted stroke-border" />
      <circle
        cx="200"
        cy="200"
        r="128"
        strokeWidth="1.5"
        strokeDasharray="2 8"
        strokeLinecap="round"
        className="stroke-border"
      />
      {children}
    </svg>
  );
}

/** A four-pointed champagne star that twinkles. */
function Sparkle({
  x,
  y,
  size,
  delay = 0,
}: {
  x: number;
  y: number;
  size: number;
  delay?: number;
}) {
  const style: CSSProperties = { animationDelay: `${delay}s` };
  return (
    <path
      d={`M${x} ${y - size}Q${x} ${y} ${x + size} ${y}Q${x} ${y} ${x} ${y + size}Q${x} ${y} ${x - size} ${y}Q${x} ${y} ${x} ${y - size}Z`}
      style={style}
      className="fill-accent motion-safe:animate-pulse"
    />
  );
}

function Dot({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="2.5" className="fill-foreground/25" />;
}

/** The rocket, nose up, centred on its body. */
function Rocket({ flame = true }: { flame?: boolean }) {
  return (
    <g {...line} className="stroke-foreground">
      <path d="M-24 16C-40 24-48 40-48 58L-24 47Z" className="fill-accent" />
      <path d="M24 16C40 24 48 40 48 58L24 47Z" className="fill-accent" />
      <path
        d="M0-78C20-58 28-28 26 12L24 50H-24L-26 12C-28-28-20-58 0-78Z"
        className="fill-background"
      />
      <circle cx="0" cy="-20" r="11" className="fill-muted" />
      <path d="M-5-24a7 7 0 0 1 6-4" className="stroke-foreground/50" />
      <path d="M-25 20H25" className="stroke-accent" />
      <path d="M-13 50-16 61H16L13 50" className="fill-background" />
      {flame && (
        <path d="M-9 64C-9 78 0 88 0 98 0 88 9 78 9 64Z" className="fill-accent stroke-accent" />
      )}
    </g>
  );
}

/** Lost: the rocket loops the loop on its way past a ringed planet. */
export function NotFoundIllustration() {
  return (
    <Frame>
      <g {...line}>
        <ellipse
          cx="292"
          cy="108"
          rx="40"
          ry="11"
          transform="rotate(-20 292 108)"
          className="stroke-accent"
        />
        <circle cx="292" cy="108" r="22" className="fill-background stroke-foreground" />
        <path d="M254.4 121.7A40 11-20 0 0 329.6 94.3" className="stroke-accent" />
      </g>
      {/* The trail: in from the lower left, once around a loop, into the flame. */}
      <path
        d="M84 300C104 298 120 290 138 282A20 20 0 0 0 138 242A20 20 0 0 0 138 282C158 282 170 266 180 252"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
        className="stroke-foreground/45"
      />
      <g className="motion-safe:animate-float">
        <g transform="translate(232 200) rotate(45) scale(0.74)">
          <Rocket />
        </g>
      </g>
      <Sparkle x={110} y={126} size={9} />
      <Sparkle x={322} y={250} size={7} delay={1.2} />
      <Sparkle x={176} y={84} size={5} delay={0.6} />
      <Dot x={88} y={208} />
      <Dot x={262} y={318} />
      <Dot x={336} y={178} />
    </Frame>
  );
}

/** Something broke: the rocket has nosedived into the ground and sees stars. */
export function ErrorIllustration() {
  return (
    <Frame>
      <g transform="translate(196 234) rotate(150) scale(0.76)">
        <Rocket flame={false} />
      </g>
      {/*
        The ground hides the buried nose: an opaque layer in the disc's colour under a
        light tint, its lower edge following the disc.
      */}
      <path d="M59.4 292Q200 262 340.6 292A168 168 0 0 1 59.4 292Z" className="fill-muted" />
      <path d="M59.4 292Q200 262 340.6 292A168 168 0 0 1 59.4 292Z" className="fill-border/60" />
      <path d="M59.4 292Q200 262 340.6 292" {...line} className="stroke-foreground" />
      {/* Impact marks either side of where the nose went in. */}
      <g {...line} className="stroke-accent">
        <path d="M250 268l9-9M256 279l12-4M200 281l-12-3M203 271l-8-7" />
      </g>
      {/* Stars circling the tail, as in a cartoon daze. */}
      <g className="motion-safe:animate-float">
        <ellipse
          cx="168"
          cy="166"
          rx="32"
          ry="9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 7"
          className="stroke-foreground/40"
        />
        <Sparkle x={137} y={168} size={6} />
        <Sparkle x={199} y={164} size={6} delay={0.7} />
        <Sparkle x={170} y={175} size={4} delay={1.4} />
      </g>
      <Sparkle x={300} y={122} size={7} delay={0.4} />
      <Dot x={104} y={140} />
      <Dot x={292} y={208} />
      <Dot x={238} y={92} />
    </Frame>
  );
}

/** On its way: the rocket waits on the pad, the moon already in its sights. */
export function ComingSoonIllustration() {
  return (
    <Frame>
      <path
        d="M208 150Q236 108 272 114"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
        className="stroke-foreground/45"
      />
      <g className="motion-safe:animate-float">
        <circle cx="300" cy="108" r="24" className="fill-accent" />
        <circle cx="311" cy="100" r="20" className="fill-muted" />
      </g>
      <g {...line} className="stroke-foreground">
        <path d="M126 140V284M144 140V284M126 140H144" />
        <path d="M126 160L144 180L126 200L144 220L126 240L144 260L126 280" />
        <path d="M144 194H180" />
        <path d="M116 300H284L270 284H130Z" className="fill-background" />
      </g>
      <g transform="translate(200 232) scale(0.85)">
        <Rocket flame={false} />
      </g>
      <Sparkle x={96} y={124} size={8} />
      <Sparkle x={324} y={232} size={6} delay={1} />
      <Sparkle x={240} y={68} size={5} delay={0.5} />
      <Dot x={90} y={236} />
      <Dot x={330} y={300} />
      <Dot x={178} y={88} />
    </Frame>
  );
}

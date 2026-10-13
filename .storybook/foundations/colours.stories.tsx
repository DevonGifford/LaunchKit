import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { contrastRatio, useCssVariables } from './tokens';

/** Background tokens and the text token meant to sit on each. */
const pairs = [
  { name: 'background', text: 'foreground', use: 'The page' },
  { name: 'surface', text: 'surface-foreground', use: 'Cards, menus and dialogs' },
  { name: 'muted', text: 'muted-foreground', use: 'Quiet areas and secondary text' },
  {
    name: 'emphasis',
    text: 'emphasis-foreground',
    use: 'High-emphasis bands, such as the call to action',
  },
  { name: 'primary', text: 'primary-foreground', use: 'Primary buttons' },
  {
    name: 'accent',
    text: 'accent-foreground',
    use: 'Hairlines and small details, never body text',
  },
] as const;

/** Single tokens, each checked against the page background where it matters. */
const singles = [
  { name: 'muted-foreground', use: 'Secondary text on the page', minimum: 4.5 },
  { name: 'destructive', use: 'Errors and destructive actions', minimum: 4.5 },
  { name: 'input', use: 'Form control borders', minimum: 3 },
  { name: 'ring', use: 'Focus rings', minimum: 3 },
  { name: 'border', use: 'Dividers and card edges (decorative)', minimum: undefined },
  { name: 'overlay', use: 'Behind dialogs and sheets', minimum: undefined },
] as const;

const variables = [
  ...pairs.flatMap(({ name, text }) => [`--${name}`, `--${text}`]),
  ...singles.map(({ name }) => `--${name}`),
];

function Ratio({ value, minimum }: { value: number | undefined; minimum: number | undefined }) {
  if (value === undefined || minimum === undefined) return null;
  const passes = value >= minimum;
  return (
    <span className="text-xs text-muted-foreground">
      {value.toFixed(2)}:1{' '}
      <span className={passes ? 'text-foreground' : 'font-medium text-destructive'}>
        {passes ? `meets ${minimum}:1` : `below ${minimum}:1`}
      </span>
    </span>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-xs">{children}</code>;
}

function Colours() {
  const values = useCssVariables(variables);
  const page = values['--background'] ?? '';

  return (
    <div className="max-w-5xl space-y-14">
      <header className="max-w-2xl space-y-3">
        <h1 className="text-headline">Colours</h1>
        <p className="text-muted-foreground">
          Every colour comes from a token in <Code>src/app/theme.css</Code>. Components use the
          Tailwind class, never the value. Switch the toolbar theme to see the other appearance; the
          values and contrast ratios below are read from the page.
        </p>
      </header>

      <section aria-labelledby="pairs" className="space-y-6">
        <h2 id="pairs" className="text-2xl">
          Backgrounds and their text
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pairs.map(({ name, text, use }) => {
            const background = values[`--${name}`] ?? '';
            const foreground = values[`--${text}`] ?? '';
            return (
              <li key={name} className="overflow-hidden rounded-lg border bg-surface">
                <div
                  className="flex h-28 items-end justify-between p-4"
                  style={{ background: `var(--${name})`, color: `var(--${text})` }}
                >
                  <span className="font-serif text-4xl leading-none">Aa</span>
                  <span className="text-sm">{name}</span>
                </div>
                <div className="space-y-2 p-4 text-sm text-surface-foreground">
                  <p className="text-muted-foreground">{use}</p>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                    <dt>
                      <Code>bg-{name}</Code>
                    </dt>
                    <dd className="text-right font-mono text-xs text-muted-foreground">
                      {background}
                    </dd>
                    <dt>
                      <Code>text-{text}</Code>
                    </dt>
                    <dd className="text-right font-mono text-xs text-muted-foreground">
                      {foreground}
                    </dd>
                  </dl>
                  <Ratio value={contrastRatio(background, foreground)} minimum={4.5} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="singles" className="space-y-6">
        <h2 id="singles" className="text-2xl">
          Text, lines and states
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Ratios are against the page background: 4.5:1 for text, 3:1 for borders and focus rings
          (WCAG 2.2 AA).
        </p>
        <ul className="divide-y border-y">
          {singles.map(({ name, use, minimum }) => {
            const value = values[`--${name}`] ?? '';
            return (
              <li
                key={name}
                className="grid gap-3 py-4 sm:grid-cols-[3rem_14rem_1fr_auto] sm:items-center"
              >
                <span
                  aria-hidden="true"
                  className="size-12 rounded-md border"
                  style={{ background: `var(--${name})` }}
                />
                <span>
                  <Code>--{name}</Code>
                  <span className="block font-mono text-xs text-muted-foreground">{value}</span>
                </span>
                <span className="text-sm text-muted-foreground">{use}</span>
                <Ratio value={contrastRatio(value, page)} minimum={minimum} />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

const meta = {
  title: 'Foundations/Colours',
  tags: ['!autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ColoursStory: Story = { name: 'Colours', render: () => <Colours /> };

import { z } from 'zod';

/*
 * The content model. A page is an ordered list of typed sections; each section
 * `type` maps to exactly one component in ./registry.tsx.
 *
 * These Zod schemas are the single source of truth: the TypeScript types below
 * are inferred from them, content files are checked against the types at
 * compile time (`satisfies PageDefinition`), and the schemas themselves run
 * only in tests (tests/unit/content.test.ts) to enforce the rules TypeScript
 * cannot express — URL formats, unique section ids. Nothing is re-parsed per
 * request.
 *
 * To add a section type: add its schema here, add it to `sectionSchema`, build
 * the component in src/components/sections/, and register it.
 */

const text = z.string().trim().min(1);

/** Internal paths are locale-less (`/docs`); the i18n Link adds the prefix. */
const href = z.union([
  z.string().regex(/^\/(?!\/)/, 'Internal links start with a single "/"'),
  z.url({ protocol: /^https$/ }),
  z.string().regex(/^mailto:/),
]);

export const actionSchema = z.object({ label: text, href });

const sectionBase = {
  /** Stable, unique within the page; becomes the element id (anchor links). */
  id: z.string().regex(/^[a-z][a-z0-9-]*$/, 'Use lowercase kebab-case ids'),
};

export const heroSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('hero'),
  eyebrow: text.optional(),
  title: text,
  description: text,
  primaryAction: actionSchema.optional(),
  secondaryAction: actionSchema.optional(),
  /** Optional code preview shown beside the copy on wide screens. */
  preview: z.object({ filename: text, code: text }).optional(),
});

export const statementSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('statement'),
  eyebrow: text.optional(),
  title: text,
  paragraphs: z.array(text).min(1),
});

export const featuresSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('features'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  items: z
    .array(
      z.object({
        title: text,
        description: text,
        points: z.array(text).optional(),
      }),
    )
    .min(1),
});

export const useCasesSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('use-cases'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  items: z.array(z.object({ name: text, kind: text, description: text })).min(1),
});

export const marketingDeveloperExperienceSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-developer-experience'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  /** Shell commands shown in the terminal panel, each with a short comment. */
  steps: z.array(z.object({ command: text, comment: text })).min(1),
  stack: z.array(text).optional(),
});

export const marketingQualityAndAutomationSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-quality-and-automation'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  /** The stages a change passes through, in order; at most three, side by side on wide screens. */
  stages: z
    .array(
      z.object({
        /** Short position label above the title, e.g. "Stage 1". */
        label: text,
        title: text,
        icon: z.enum(['shield-check', 'flask-conical', 'package-check']),
        items: z.array(z.object({ name: text, description: text })).min(1),
      }),
    )
    .min(1)
    .max(3),
  /** Short outcomes shown with a check mark below the stages. */
  highlights: z.array(text).optional(),
});

/** Brand marks and icons for tools; the set is drawn in marketing-tech-stack-icons.tsx. */
const techIconSchema = z.enum([
  'nextjs',
  'react',
  'typescript',
  'tailwindcss',
  'shadcn-ui',
  'next-intl',
  'zod',
  'react-hook-form',
  'radix-ui',
  'lucide',
  'next-themes',
  'sonner',
  'date-fns',
  'marked',
  't3-env',
  'vitest',
  'playwright',
  'storybook',
  'axe-core',
  'eslint',
  'prettier',
  'lefthook',
  'commitlint',
  'pnpm',
  'github-actions',
  'dependabot',
]);

const techStackItemSchema = z.object({
  name: text,
  description: text,
  icon: techIconSchema,
});

export const marketingTechStackSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-tech-stack'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  /** The main technologies, as larger cards; four per row on wide screens. */
  featured: z.array(techStackItemSchema).min(1),
  /** Supporting tools in a denser grid below; an incomplete last row is centred. */
  tools: z.array(techStackItemSchema).optional(),
});

const timelineRowSchema = z.object({ item: text, before: text, after: text });

export const marketingTimelineSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-timeline'),
  title: text,
  /** A second line of the heading, shown muted. */
  titleMuted: text.optional(),
  /** Body copy; an `emphasis` paragraph stands out in the text colour. */
  paragraphs: z.array(z.object({ text, emphasis: z.boolean().optional() })).min(1),
  /** A highlighted conclusion below the copy. */
  callout: z
    .object({ eyebrow: text.optional(), title: text, description: text.optional() })
    .optional(),
  /** The table beside the copy: how long each item takes without and with the foundation. */
  timeline: z.object({
    title: text,
    badge: text.optional(),
    /** Column headings, in the same order as each row. */
    columns: timelineRowSchema,
    rows: z.array(timelineRowSchema).min(1),
    total: timelineRowSchema.optional(),
    note: text.optional(),
  }),
});

export const marketingInfrastructureSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-infrastructure'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  /** Short promises beside the pipeline; four read best. */
  items: z
    .array(
      z.object({
        icon: z.enum(['globe', 'trending-up', 'coins', 'file-code']),
        title: text,
        description: text,
      }),
    )
    .min(1)
    .max(4),
  /** A push travelling through each stage; the last step is the destination. */
  pipeline: z.object({
    caption: text,
    command: text,
    steps: z.array(z.object({ label: text, detail: text.optional() })).min(1),
  }),
  /** Short platform and tool labels under the pipeline. */
  badges: z.array(text).optional(),
});

/** A path to a file in public/, such as `/marketing/hero-showcase-light.webp`. */
const publicPath = z.string().regex(/^\/(?!\/)/, 'Public files start with a single "/"');

export const marketingHeroSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-hero'),
  eyebrow: text.optional(),
  /** The page's h1, one entry per line. */
  title: z.array(text).min(1).max(3),
  /** Words within the title shown in gold, e.g. "matters.". */
  titleHighlight: text.optional(),
  /** Audiences the line under the title cycles through, e.g. "For founders". */
  audiences: z.array(text).min(1).optional(),
  description: text,
  primaryAction: actionSchema.optional(),
  secondaryAction: actionSchema.optional(),
  /** Artwork for each appearance; it's shared by every locale. */
  showcase: z.object({
    light: publicPath,
    dark: publicPath,
    alt: text,
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }),
});

export const marketingCinematicHeroSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-cinematic-hero'),
  title: text,
  description: text.optional(),
  action: actionSchema.optional(),
  /** Shown with a percentage while the frames load. */
  loadingLabel: text,
  /**
   * The frames played as the section scrolls: `frame-001.jpg` and onwards in
   * `directory`, zero-padded to at least three digits.
   */
  sequence: z.object({
    directory: publicPath,
    frames: z.number().int().min(2),
    extension: z.enum(['jpg', 'webp', 'avif', 'png']),
    alt: text,
  }),
});

/**
 * A centred page opener: the h1 with a highlighted phrase, a primary action, an
 * optional menu of links and a line of social proof. Adapted from shadcn-ui-kit.
 */
export const marketingCenteredHeroSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-centered-hero'),
  title: text,
  /** Words within the title marked as if with a highlighter, e.g. "LaunchKit". */
  titleHighlight: text.optional(),
  description: text,
  primaryAction: actionSchema,
  /** A second button that opens a menu of links. */
  menu: z.object({ label: text, items: z.array(actionSchema).min(1) }).optional(),
  /** Faces, a star rating and a short claim, linking to the evidence. */
  proof: z
    .object({
      href,
      rating: z.number().min(0).max(5),
      label: text,
      people: z
        .array(z.object({ name: text, image: publicPath.optional() }))
        .min(1)
        .max(5),
    })
    .optional(),
});

/** An image with a version for each appearance. */
const themedImageSchema = z.object({ light: publicPath, dark: publicPath });

/** Four tiles of different kinds in a 2×2 grid. Adapted from shadcn-ui-kit. */
export const marketingBentoSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-bento'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  /** The tall tile: a figure, copy and screenshots that take turns. */
  showcase: z.object({
    stat: text,
    title: text,
    description: text,
    action: actionSchema.optional(),
    images: z.array(themedImageSchema).min(1),
    alt: text,
  }),
  /** A figure and copy over up to three rows of names, drifting in alternate directions. */
  marquee: z.object({
    stat: text,
    title: text,
    description: text,
    action: actionSchema.optional(),
    rows: z.array(z.array(text).min(3)).min(1).max(3),
  }),
  /** Six tools wired to the centre mark. */
  integrations: z.object({
    title: text,
    description: text,
    tools: z.array(z.object({ name: text, icon: techIconSchema })).length(6),
  }),
  /** Three screenshots fanned out like prints. */
  gallery: z.object({
    title: text,
    description: text,
    action: actionSchema.optional(),
    images: z.array(themedImageSchema.extend({ alt: text })).length(3),
  }),
});

/** A heading and actions over a carousel of screenshots. Adapted from shadcn-ui-kit. */
export const marketingDashboardSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-dashboard'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  primaryAction: actionSchema.optional(),
  secondaryAction: actionSchema.optional(),
  /** Each screenshot links to its demo; the name labels the link, so the image needs no alt. */
  items: z.array(themedImageSchema.extend({ name: text, href })).min(1),
});

/** Quotes in a bordered grid; a carousel on phones. Adapted from shadcn-ui-kit. */
export const marketingReviewsSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-reviews'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  reviews: z
    .array(
      z.object({
        name: text,
        /** Role and organisation, e.g. "Founder, Northwind". */
        role: text.optional(),
        quote: text,
        /** A square photo; initials are shown without one. */
        image: publicPath.optional(),
        /** Where the review was first published. */
        href: href.optional(),
      }),
    )
    .min(1),
});

/** Two to four figures in a row under a heading. Adapted from shadcn-ui-kit. */
export const marketingStatsSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-stats'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  stats: z
    .array(z.object({ value: text, label: text }))
    .min(2)
    .max(4),
});

/** Questions in accordions, grouped by topic, beside the heading. Adapted from shadcn-ui-kit. */
export const marketingFaqSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-faq'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  groups: z
    .array(
      z.object({
        title: text,
        items: z.array(z.object({ question: text, answer: text })).min(1),
      }),
    )
    .min(1)
    .max(2),
});

/** A closing invitation in a contained, quiet panel. Adapted from shadcn-ui-kit. */
export const marketingCtaSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-cta'),
  title: text,
  description: text.optional(),
  primaryAction: actionSchema,
  secondaryAction: actionSchema.optional(),
});

/** Currencies the pricing section can show; each plan sets its own amount in every one. */
export const currencyCodeSchema = z.enum(['GBP', 'EUR', 'USD', 'ZAR']);

export const marketingPricingSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('marketing-pricing'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  /** Currencies offered in the selector, in order; the first (required) is the default. */
  currencies: z.tuple([currencyCodeSchema], currencyCodeSchema),
  /** A short note under the currency selector. */
  currencyNote: text.optional(),
  plans: z
    .array(
      z.object({
        name: text,
        description: text,
        /**
         * Fixed amounts per currency, set by hand rather than converted live, or a
         * label such as "Custom" that stays the same in every currency.
         */
        price: z.union([
          z.object({ amounts: z.record(currencyCodeSchema, z.number().nonnegative()) }),
          z.object({ label: text }),
        ]),
        /** Beside the price, e.g. "starting price". */
        priceNote: text.optional(),
        features: z.array(text).min(1),
        action: actionSchema,
        /** Highlighted, and where the carousel starts on small screens. */
        recommended: z.boolean().optional(),
      }),
    )
    .min(1)
    .max(3),
  /** A smaller invitation below the plans, for work they don't cover. */
  callout: z.object({ title: text, description: text, action: actionSchema }).optional(),
  /** A restrained row of figures below the plans. Use only real, verifiable ones. */
  proof: z
    .object({
      title: text,
      items: z
        .array(z.object({ value: text, label: text }))
        .min(1)
        .max(4),
    })
    .optional(),
});

export const ctaSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('cta'),
  title: text,
  description: text.optional(),
  primaryAction: actionSchema,
  secondaryAction: actionSchema.optional(),
});

export const contactSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('contact'),
  title: text,
  description: text.optional(),
  /** Supporting details beside the form, e.g. response times. */
  details: z.array(z.object({ label: text, value: text })).optional(),
});

export const sectionSchema = z.discriminatedUnion('type', [
  heroSectionSchema,
  statementSectionSchema,
  featuresSectionSchema,
  useCasesSectionSchema,
  marketingDeveloperExperienceSectionSchema,
  marketingQualityAndAutomationSectionSchema,
  marketingTechStackSectionSchema,
  marketingTimelineSectionSchema,
  marketingInfrastructureSectionSchema,
  marketingPricingSectionSchema,
  marketingHeroSectionSchema,
  marketingCinematicHeroSectionSchema,
  marketingCenteredHeroSectionSchema,
  marketingBentoSectionSchema,
  marketingDashboardSectionSchema,
  marketingReviewsSectionSchema,
  marketingStatsSectionSchema,
  marketingFaqSectionSchema,
  marketingCtaSectionSchema,
  ctaSectionSchema,
  contactSectionSchema,
]);

export const pageDefinitionSchema = z
  .object({
    meta: z.object({ title: text, description: text }),
    sections: z.array(sectionSchema).min(1),
  })
  .refine(
    (page) => new Set(page.sections.map((section) => section.id)).size === page.sections.length,
    { message: 'Section ids must be unique within a page', path: ['sections'] },
  );

export type Action = z.infer<typeof actionSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type SectionType = Section['type'];
export type SectionOf<T extends SectionType> = Extract<Section, { type: T }>;
export type PageDefinition = z.infer<typeof pageDefinitionSchema>;

/** Frontmatter of Markdown documents in src/content/<locale>/docs/. */
export const docFrontmatterSchema = z.object({
  title: text,
  description: text,
  /** ISO date (YYYY-MM-DD) of the last meaningful update. */
  updated: z.iso.date(),
  /** Position in the docs index; lower comes first. */
  order: z.coerce.number().int().nonnegative(),
});

export type DocFrontmatter = z.infer<typeof docFrontmatterSchema>;

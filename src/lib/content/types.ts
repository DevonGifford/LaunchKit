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

export const workflowSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('workflow'),
  eyebrow: text.optional(),
  title: text,
  description: text.optional(),
  /** Shell commands shown in the terminal panel, each with a short comment. */
  steps: z.array(z.object({ command: text, comment: text })).min(1),
  stack: z.array(text).optional(),
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
  workflowSectionSchema,
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

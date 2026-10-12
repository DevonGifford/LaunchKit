import type { ComponentType } from 'react';
import { ContactSection } from '@/components/sections/contact-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { HeroSection } from '@/components/sections/hero-section';
import { StatementSection } from '@/components/sections/statement-section';
import { UseCasesSection } from '@/components/sections/use-cases-section';
import { WorkflowSection } from '@/components/sections/workflow-section';
import type { SectionOf, SectionType } from './types';

/**
 * The one map from section `type` to component. The mapped type makes it
 * exhaustive: adding a section schema without registering a component here is
 * a type error.
 */
export const sectionComponents: { [T in SectionType]: ComponentType<SectionOf<T>> } = {
  hero: HeroSection,
  statement: StatementSection,
  features: FeaturesSection,
  'use-cases': UseCasesSection,
  workflow: WorkflowSection,
  cta: CtaSection,
  contact: ContactSection,
};

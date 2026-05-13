import type { ComponentType } from 'react';
import { ContactSection } from '@/components/sections/contact-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { HeroSection } from '@/components/sections/hero-section';
import { MarketingBento } from '@/components/sections/marketing-bento';
import { MarketingCenteredHero } from '@/components/sections/marketing-centered-hero';
import { MarketingCinematicHero } from '@/components/sections/marketing-cinematic-hero';
import { MarketingCta } from '@/components/sections/marketing-cta';
import { MarketingDashboard } from '@/components/sections/marketing-dashboard';
import { MarketingDeveloperExperience } from '@/components/sections/marketing-developer-experience';
import { MarketingFaq } from '@/components/sections/marketing-faq';
import { MarketingHero } from '@/components/sections/marketing-hero';
import { MarketingInfrastructure } from '@/components/sections/marketing-infrastructure';
import { MarketingPricing } from '@/components/sections/marketing-pricing';
import { MarketingQualityAndAutomation } from '@/components/sections/marketing-quality-and-automation';
import { MarketingReviews } from '@/components/sections/marketing-reviews';
import { MarketingStats } from '@/components/sections/marketing-stats';
import { MarketingTechStack } from '@/components/sections/marketing-tech-stack';
import { MarketingTimeline } from '@/components/sections/marketing-timeline';
import { StatementSection } from '@/components/sections/statement-section';
import { UseCasesSection } from '@/components/sections/use-cases-section';
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
  'marketing-developer-experience': MarketingDeveloperExperience,
  'marketing-quality-and-automation': MarketingQualityAndAutomation,
  'marketing-tech-stack': MarketingTechStack,
  'marketing-timeline': MarketingTimeline,
  'marketing-infrastructure': MarketingInfrastructure,
  'marketing-pricing': MarketingPricing,
  'marketing-hero': MarketingHero,
  'marketing-cinematic-hero': MarketingCinematicHero,
  'marketing-centered-hero': MarketingCenteredHero,
  'marketing-bento': MarketingBento,
  'marketing-dashboard': MarketingDashboard,
  'marketing-reviews': MarketingReviews,
  'marketing-stats': MarketingStats,
  'marketing-faq': MarketingFaq,
  'marketing-cta': MarketingCta,
  cta: CtaSection,
  contact: ContactSection,
};

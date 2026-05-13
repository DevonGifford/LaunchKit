import type { ComponentType } from 'react';
import { BentoSection } from '@/components/sections/bento-section';
import { ContactSection } from '@/components/sections/contact-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FaqSection } from '@/components/sections/faq-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { HeroCenteredSection } from '@/components/sections/hero-centered-section';
import { HeroCinematicSection } from '@/components/sections/hero-cinematic-section';
import { HeroSection } from '@/components/sections/hero-section';
import { MarketingShowcaseCarousel } from '@/components/sections/marketing/marketing-showcase-carousel';
import { MarketingDeveloperExperience } from '@/components/sections/marketing/marketing-developer-experience';
import { MarketingHeroLaunchKit } from '@/components/sections/marketing/marketing-hero-launchkit';
import { MarketingDeploymentPipeline } from '@/components/sections/marketing/marketing-deployment-pipeline';
import { MarketingPricingPlans } from '@/components/sections/marketing/marketing-pricing-plans';
import { MarketingQualityGates } from '@/components/sections/marketing/marketing-quality-gates';
import { MarketingTechStack } from '@/components/sections/marketing/marketing-tech-stack';
import { MarketingSetupTimeline } from '@/components/sections/marketing/marketing-setup-timeline';
import { ReviewsSection } from '@/components/sections/reviews-section';
import { StatementSection } from '@/components/sections/statement-section';
import { StatsSection } from '@/components/sections/stats-section';
import { UseCasesSection } from '@/components/sections/use-cases-section';
import type { SectionOf, SectionType } from './types';

/**
 * The one map from section `type` to component. The mapped type makes it
 * exhaustive: adding a section schema without registering a component here is
 * a type error.
 */
export const sectionComponents: { [T in SectionType]: ComponentType<SectionOf<T>> } = {
  hero: HeroSection,
  'hero-centered': HeroCenteredSection,
  'hero-cinematic': HeroCinematicSection,
  cta: CtaSection,
  contact: ContactSection,
  features: FeaturesSection,
  stats: StatsSection,
  reviews: ReviewsSection,
  faq: FaqSection,
  bento: BentoSection,
  statement: StatementSection,
  'use-cases': UseCasesSection,
  // LaunchKit's own marketing site.
  'marketing-hero-launchkit': MarketingHeroLaunchKit,
  'marketing-developer-experience': MarketingDeveloperExperience,
  'marketing-deployment-pipeline': MarketingDeploymentPipeline,
  'marketing-pricing-plans': MarketingPricingPlans,
  'marketing-quality-gates': MarketingQualityGates,
  'marketing-tech-stack': MarketingTechStack,
  'marketing-setup-timeline': MarketingSetupTimeline,
  'marketing-showcase-carousel': MarketingShowcaseCarousel,
};

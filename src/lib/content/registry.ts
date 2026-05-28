import type { ComponentType } from 'react';
import { BentoSection } from '@/components/sections/bento-section';
import { CapabilitiesSection } from '@/components/sections/capabilities-section';
import { ContactSection } from '@/components/sections/contact-section';
import { CtaBandSection } from '@/components/sections/cta/cta-band-section';
import { CtaEditorialSection } from '@/components/sections/cta/cta-editorial-section';
import { CtaMediaSection } from '@/components/sections/cta/cta-media-section';
import { CtaPanelSection } from '@/components/sections/cta/cta-panel-section';
import { CtaSplitSection } from '@/components/sections/cta/cta-split-section';
import { FaqSection } from '@/components/sections/faq-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { HeroCenteredSection } from '@/components/sections/hero/hero-centered-section';
import { HeroCinematicSection } from '@/components/sections/hero/hero-cinematic-section';
import { HeroSection } from '@/components/sections/hero/hero-section';
import { MarketingDeveloperExperience } from '@/components/sections/launchkit-marketing/marketing-developer-experience';
import { MarketingHeroLaunchKit } from '@/components/sections/launchkit-marketing/marketing-hero-launchkit';
import { MarketingDeploymentPipeline } from '@/components/sections/launchkit-marketing/marketing-deployment-pipeline';
import { MarketingQualityGates } from '@/components/sections/launchkit-marketing/marketing-quality-gates';
import { MarketingTechnicalStack } from '@/components/sections/launchkit-marketing/marketing-technical-stack';
import { MarketingSetupTimeline } from '@/components/sections/launchkit-marketing/marketing-setup-timeline';
import { LineupSection } from '@/components/sections/lineup-section';
import { MarqueeSection } from '@/components/sections/marquee-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { ReviewsSection } from '@/components/sections/reviews-section';
import { ShowcaseSection } from '@/components/sections/showcase-section';
import { StatementSection } from '@/components/sections/statement-section';
import { StatsSection } from '@/components/sections/stats-section';
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
  'cta-band': CtaBandSection,
  'cta-panel': CtaPanelSection,
  'cta-editorial': CtaEditorialSection,
  'cta-media': CtaMediaSection,
  'cta-split': CtaSplitSection,
  contact: ContactSection,
  features: FeaturesSection,
  capabilities: CapabilitiesSection,
  stats: StatsSection,
  reviews: ReviewsSection,
  faq: FaqSection,
  bento: BentoSection,
  statement: StatementSection,
  lineup: LineupSection,
  marquee: MarqueeSection,
  pricing: PricingSection,
  showcase: ShowcaseSection,
  // LaunchKit's own marketing site.
  'marketing-hero-launchkit': MarketingHeroLaunchKit,
  'marketing-developer-experience': MarketingDeveloperExperience,
  'marketing-deployment-pipeline': MarketingDeploymentPipeline,
  'marketing-quality-gates': MarketingQualityGates,
  'marketing-technical-stack': MarketingTechnicalStack,
  'marketing-setup-timeline': MarketingSetupTimeline,
};

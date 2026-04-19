'use client';

import { LandingNav } from '../components/LandingNav';
import { Hero } from './_landing/Hero';
import { ThreeLayers } from './_landing/ThreeLayers';
import { DashboardPreview } from './_landing/DashboardPreview';
import { ComponentsShowcase } from './_landing/ComponentsShowcase';
import { Playground } from './_landing/Playground';
import { FeaturesStrip } from './_landing/FeaturesStrip';
import { FinalCTA } from './_landing/FinalCTA';
import { Footer } from './_landing/Footer';
export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font-geist), -apple-system, sans-serif' }}
    >
      <LandingNav />
      <div className="pt-14">
        <Hero />
        <ThreeLayers />
        <DashboardPreview />
        <ComponentsShowcase />
        <Playground />
        <FeaturesStrip />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PlatformsMarquee from '@/components/PlatformsMarquee';
import DistributionSection from '@/components/DistributionSection';
import ToolsProductSection from '@/components/ToolsProductSection';
import ExampleCaseSection from '@/components/ExampleCaseSection';
import LeadDeliverySection from '@/components/LeadDeliverySection';
import ServicesSection from '@/components/ServicesSection';
import ToolsSection from '@/components/ToolsSection';
import VenturesSection from '@/components/VenturesSection';
import ArubaSection from '@/components/ArubaSection';
import StatsSection from '@/components/StatsSection';
import IndustriesSection from '@/components/IndustriesSection';
import AboutSection from '@/components/AboutSection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function HomePage({ schema }) {
  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <Navbar />
      <HeroSection />
      <PlatformsMarquee />
      <DistributionSection />
      <ToolsProductSection />
      <ExampleCaseSection />
      <LeadDeliverySection />
      <ServicesSection />
      <ToolsSection />
      <VenturesSection />
      <ArubaSection />
      <StatsSection />
      <IndustriesSection />
      <PricingSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}

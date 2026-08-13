'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PlatformsMarquee from '@/components/PlatformsMarquee';
import PhilosophySection from '@/components/PhilosophySection';
import DistributionSection from '@/components/DistributionSection';
import ServicesSection from '@/components/ServicesSection';
import ToolsSection from '@/components/ToolsSection';
import VenturesSection from '@/components/VenturesSection';
import StatsSection from '@/components/StatsSection';
import IndustriesSection from '@/components/IndustriesSection';
import AboutSection from '@/components/AboutSection';
import LeadEngineSection from '@/components/LeadEngineSection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '2xGen',
  alternateName: '2xGen LLC',
  url: 'https://2xgen.com',
  logo: 'https://2xgen.com/logo.png',
  description:
    '2xGen builds digital acquisition systems that help companies find new customers structurally.',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Albuquerque',
    addressRegion: 'New Mexico',
    addressCountry: 'USA',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'matthijs@2xgen.com',
    contactType: 'business',
    areaServed: 'NL',
    availableLanguage: ['Dutch', 'English'],
  },
  sameAs: ['https://www.linkedin.com/company/2xgen-com/'],
  knowsAbout: [
    'B2B Lead Generation',
    'Lead generation tools',
    'Sales automation',
    'Marketing automation',
    'Online acquisition',
  ],
};

export default function EnglishHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />
      <HeroSection />
      <PlatformsMarquee />
      <PhilosophySection />
      <DistributionSection />
      <ServicesSection />
      <ToolsSection />
      <VenturesSection />
      <StatsSection />
      <IndustriesSection />
      <AboutSection />
      <LeadEngineSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </>
  );
}

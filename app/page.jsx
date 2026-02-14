'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
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
  description: '2xGen is a digital venture studio. We partner with founders and operators to design scalable digital models and build the systems that allow them to grow.',
  foundingDate: '2024',
  address: { '@type': 'PostalAddress', addressLocality: 'Albuquerque', addressRegion: 'New Mexico', addressCountry: 'USA' },
  contactPoint: { '@type': 'ContactPoint', email: 'matthijs@2xgen.com', contactType: 'business' },
  sameAs: ['https://www.linkedin.com/company/2xgen-com/'],
  subOrganization: [
    { '@type': 'Organization', name: 'MyGoProfile', url: 'https://mygoprofile.com', description: 'AI-powered Google Business Profile management platform.' },
    { '@type': 'Organization', name: 'ArubaBuddies', url: 'https://arubabuddies.com', description: 'AI-powered travel planning and booking platform for Aruba.' },
    { '@type': 'Organization', name: 'TopTours.ai', url: 'https://toptours.ai', description: 'AI-powered tour and activity discovery platform.' },
    { '@type': 'Organization', name: 'FactuurBaas', url: 'https://factuurbaas.nl', description: 'AI-powered invoicing platform for freelancers and small businesses.' },
  ],
  knowsAbout: ['Venture Architecture', 'SaaS Development', 'Digital Platforms', 'Growth Systems', 'Marketplaces', 'AI-Powered Applications'],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </>
  );
}

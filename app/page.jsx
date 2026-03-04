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
    { '@type': 'Organization', name: 'Tyo365', url: 'https://tyo365.com', description: 'Best tours and experiences in Tokyo – compare, browse, and book.' },
    { '@type': 'Organization', name: 'Prg365', url: 'https://prg365.com', description: 'Best tours and experiences in Prague – compare, browse, and book.' },
    { '@type': 'Organization', name: 'Aru365', url: 'https://aru365.com', description: 'Best tours and experiences in Aruba – compare, browse, and book.' },
    { '@type': 'Organization', name: 'Lon365', url: 'https://lon365.com', description: 'Best tours and experiences in London – compare, browse, and book.' },
    { '@type': 'Organization', name: 'Cur365', url: 'https://cur365.com', description: 'Best tours and experiences in Curaçao – compare, browse, and book.' },
    { '@type': 'Organization', name: 'TopTours.ai', url: 'https://toptours.ai', description: 'AI-powered discovery for global travel experiences.' },
    { '@type': 'Organization', name: 'ArubaBuddies', url: 'https://arubabuddies.com', description: 'Curated local trip planning and itineraries.' },
    { '@type': 'Organization', name: 'FactuurBaas', url: 'https://factuurbaas.nl', description: 'Streamlined invoicing for freelancers and small businesses.' },
    { '@type': 'Organization', name: 'OneHappyFinance', url: 'https://onehappyfinance.com', description: 'Transparent, actionable financial information for Aruba.' },
    { '@type': 'Organization', name: 'AruList', url: 'https://arulist.com', description: 'Community-driven marketplace supporting sustainable second-hand commerce.' },
    { '@type': 'Organization', name: 'TOF Sports', url: 'https://tofsports.nl', description: 'Digital and physical ecosystem for youth tennis and padel development.' },
    { '@type': 'Organization', name: 'MyGoProfile', url: 'https://mygoprofile.com', description: 'AI-driven local profile management for businesses.' },
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

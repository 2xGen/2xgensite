'use client';

import React from 'react';
import HomePage from '@/components/HomePage';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '2xGen',
  alternateName: '2xGen LLC',
  url: 'https://2xgen.com',
  logo: 'https://2xgen.com/logo.png',
  description:
    '2xGen bouwt acquisitiesystemen waarmee bedrijven zoekvraag omzetten in gekwalificeerde leads en klanten.',
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
    areaServed: ['NL', 'US'],
    availableLanguage: ['Dutch', 'English'],
  },
  sameAs: ['https://www.linkedin.com/company/2xgen-com/'],
  knowsAbout: [
    'Acquisitiesystemen',
    'Leadgeneratie tools',
    'B2B Leadgeneratie',
    'Sales automation',
    'SEO',
  ],
};

export default function DutchHome() {
  return <HomePage schema={organizationSchema} />;
}

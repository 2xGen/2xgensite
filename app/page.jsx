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
    '2xGen builds and manages Google acquisition sites for tour operators — SEO sites that send travelers into live Viator or GetYourGuide booking.',
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
    availableLanguage: ['English'],
  },
  sameAs: ['https://www.linkedin.com/company/2xgen-com/'],
  knowsAbout: [
    'Tour operator SEO',
    'Google acquisition for tours',
    'Travel SEO',
    'Tour booking websites',
    'Viator and GetYourGuide',
  ],
};

export default function EnglishHome() {
  return <HomePage schema={organizationSchema} />;
}

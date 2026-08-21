'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import TourLanding from '@/components/TourLanding';
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
      <TourLanding />
      <Footer />
    </>
  );
}

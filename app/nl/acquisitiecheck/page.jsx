'use client';

import React from 'react';
import PageShell from '@/components/PageShell';
import AcquisitieCheck from '@/components/AcquisitieCheck';

export default function AcquisitiecheckPage() {
  return (
    <PageShell className="pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="space-y-5">
            <div className="accent-bar" />
            <p className="xgen-pill">Acquisitiecheck · Gratis · 2 min</p>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
              Waar loopt je acquisitie nu vast?
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Drie korte vragen. Je krijgt een eerste blik op wat we zouden bouwen — geen generieke marketing-score.
            </p>
            <ul className="space-y-2 text-[#09294c]/75">
              <li>→ Het probleem — wat doet pijn?</li>
              <li>→ Huidige acquisitie — wat doe je nu?</li>
              <li>→ Business context — wat voor bedrijf ben je?</li>
            </ul>
          </div>
          <AcquisitieCheck />
        </div>
      </div>
    </PageShell>
  );
}

'use client';

import React from 'react';
import PageShell from '@/components/PageShell';
import AcquisitieCheck from '@/components/AcquisitieCheck';

export default function EnAcquisitionCheckPage() {
  return (
    <PageShell className="pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="space-y-5">
            <div className="accent-bar" />
            <p className="xgen-pill">Acquisition Check · Free · 2 min</p>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
              Where is your acquisition stuck today?
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Three short questions. You get a first look at what we&apos;d build — not a generic marketing score.
            </p>
            <ul className="space-y-2 text-[#09294c]/75">
              <li>→ The problem — what&apos;s hurting?</li>
              <li>→ Current acquisition — what are you doing?</li>
              <li>→ Business context — what kind of business are you?</li>
            </ul>
          </div>
          <AcquisitieCheck />
        </div>
      </div>
    </PageShell>
  );
}

'use client';

import React from 'react';
import { liveBrands } from '@/data/siteContent';
import { useLocale } from '@/i18n/LocaleContext';

const PlatformsMarquee = () => {
  const { t } = useLocale();
  const items = [...liveBrands, ...liveBrands];

  return (
    <section className="bg-white border-b border-[#09294c]/08 py-8 overflow-hidden" aria-label={t.brands}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <p className="text-sm font-semibold text-[#09294c]/55 tracking-wide">{t.brands}</p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" aria-hidden />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" aria-hidden />
        <div className="flex w-max gap-3 ventures-marquee-track py-1">
          {items.map((brand, index) => (
            <a
              key={`${brand.name}-${index}`}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-5 py-3 rounded-2xl border border-[#09294c]/10 bg-[#f3f7fb] hover:bg-[#e8f1f8] hover:border-[#09294c]/25 transition-colors"
            >
              <span className="text-sm font-semibold text-[#09294c] whitespace-nowrap">{brand.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformsMarquee;

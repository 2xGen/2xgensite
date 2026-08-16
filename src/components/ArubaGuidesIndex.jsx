'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import { getArubaGuides, getArubaGuidesIndex } from '@/data/arubaGuides';
import { useLocale } from '@/i18n/LocaleContext';

export default function ArubaGuidesIndex() {
  const { href, locale } = useLocale();
  const index = getArubaGuidesIndex(locale);
  const guides = getArubaGuides(locale);
  const isNl = locale === 'nl';

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <Link href={href('/aruba')} className="text-sm font-medium text-[#1a5f9e] hover:underline">
            ← 2xGen Aruba
          </Link>
          <div className="accent-bar mt-6 mb-4" />
          <p className="xgen-pill mb-4">Aruba Growth Guides</p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">{index.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{index.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {guides.map((guide, i) => (
            <Link
              key={guide.slug}
              href={href(`/aruba/guides/${guide.slug}`)}
              className="xgen-card p-6 sm:p-7 group h-full"
            >
              <span className="text-sm font-bold text-[#3d8fd1]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="text-xl font-semibold tracking-tight mt-2 mb-2 group-hover:text-[#1a5f9e] transition-colors">
                {guide.title}
              </h2>
              <p className="text-sm font-medium text-[#09294c]/70 mb-3">{guide.subtitle}</p>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{guide.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a5f9e]">
                {isNl ? 'Lees gids' : 'Read guide'}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="rounded-3xl bg-[#09294c] text-white p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-white mb-3">
            {isNl
              ? 'Hoe zichtbaar is jouw bedrijf op Aruba?'
              : 'How visible is your business in Aruba?'}
          </h2>
          <p className="text-white/65 mb-6 max-w-xl">
            {isNl
              ? 'Haal je gratis Aruba Visibility Score — en fix de gaten die klanten tegenhouden om je te vinden.'
              : 'Get your free Aruba Visibility Score — then fix the gaps that block customers from finding you.'}
          </p>
          <Link href={href('/aruba')} className="xgen-btn bg-white text-[#09294c] hover:bg-[#e8f1f8] inline-flex">
            {isNl ? 'Gratis Aruba SEO Audit' : 'Free Aruba SEO Audit'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

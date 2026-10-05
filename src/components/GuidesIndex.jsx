'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import {
  GUIDE_CLUSTERS,
  GUIDES_HUB,
  getGuidesByCluster,
  getTourOperatorGuide,
} from '@/data/tourOperatorGuides';

function renderInline(text) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={`b-${i}`} className="font-semibold text-white">
          {bold[1]}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export default function GuidesIndex() {
  const pillar = getTourOperatorGuide('seo-for-tour-operators');

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="accent-bar mb-4" />
          <p className="xgen-pill mb-4">Guides</p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">{GUIDES_HUB.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">{GUIDES_HUB.subtitle}</p>
          {GUIDES_HUB.intro.map((p) => (
            <p key={p.slice(0, 40)} className="text-base text-gray-600 leading-relaxed mb-3">
              {p}
            </p>
          ))}
        </div>

        {pillar && (
          <Link
            href={`/guides/${pillar.slug}`}
            className="block rounded-3xl border border-[#09294c]/10 bg-[#09294c] text-white p-7 sm:p-9 mb-12 hover:bg-[#0c3558] transition-colors"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-2">
              Start here
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
              {pillar.title}
            </h2>
            <p className="text-white/65 leading-relaxed mb-4 max-w-2xl">{pillar.excerpt}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              Read the pillar guide
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        )}

        <div className="space-y-12 mb-16">
          {GUIDE_CLUSTERS.filter((c) => c.id !== 'pillar').map((cluster) => {
            const guides = getGuidesByCluster(cluster.id);
            return (
              <section key={cluster.id}>
                <div className="mb-4">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#09294c]">
                    {cluster.label}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{cluster.description}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {guides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="rounded-2xl border border-[#09294c]/10 bg-white p-5 sm:p-6 hover:border-[#3d8fd1]/40 transition-colors h-full"
                    >
                      <h3 className="font-semibold text-[#09294c] mb-2 leading-snug">{guide.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-3">{guide.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a5f9e]">
                        Read guide
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="rounded-3xl pattern-navy text-white p-8 sm:p-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white mb-4">
              {GUIDES_HUB.ctaTitle}
            </h2>
            <div className="space-y-3 mb-6">
              {GUIDES_HUB.ctaBody.map((p) => {
                const plain = String(p).replace(/\*\*/g, '').trim();
                const isFlow = plain.includes('→');
                if (isFlow) {
                  return (
                    <p
                      key={p.slice(0, 40)}
                      className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm sm:text-base font-medium text-white leading-snug"
                    >
                      {renderInline(p)}
                    </p>
                  );
                }
                return (
                  <p key={p.slice(0, 40)} className="text-white/70 leading-relaxed text-base">
                    {renderInline(p)}
                  </p>
                );
              })}
            </div>
            <Link href="/get-a-site" className="xgen-btn bg-white text-[#09294c] hover:bg-[#e8f1f8] inline-flex">
              Get a Site for Your Tours
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import ArubaVisibilityAudit from '@/components/ArubaVisibilityAudit';
import { useLocale } from '@/i18n/LocaleContext';

export default function ArubaPage() {
  const { t, href } = useLocale();
  const page = t.pages.aruba;

  return (
    <PageShell className="pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-20">
          <div className="space-y-5 pt-2">
            <div className="accent-bar" />
            <p className="xgen-pill">{page.pill}</p>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08]">
              {page.h1a} <span className="text-[#1a5f9e]">{page.h1b}</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">{page.lead}</p>
            <p className="text-sm font-semibold text-[#09294c]/70">{page.subbrand}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {page.sectors.map((s) => (
                <span
                  key={s}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-[#09294c]/10 text-[#09294c]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <ArubaVisibilityAudit />
        </div>

        {/* Problem */}
        <section className="mb-20">
          <div className="max-w-2xl mb-8">
            <div className="accent-bar mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">{page.problemH2}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{page.problemBody}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {page.searchChannels.map((item) => (
              <div key={item} className="rounded-2xl bg-white border border-[#09294c]/10 px-4 py-4">
                <p className="text-sm font-semibold text-[#09294c]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What we build */}
        <section className="mb-20 rounded-3xl pattern-navy text-white p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">
            {page.buildH2}
          </h2>
          <p className="text-white/65 mb-6 max-w-2xl">{page.buildBody}</p>
          <p className="text-lg sm:text-xl font-semibold text-[#9ec9ee] leading-relaxed">
            {page.buildFlow}
          </p>
        </section>

        {/* Use cases */}
        <section className="mb-20">
          <div className="max-w-2xl mb-8">
            <div className="accent-bar mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">{page.casesH2}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {page.cases.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white border border-[#09294c]/10 p-6">
                <h3 className="text-lg font-semibold text-[#09294c] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Growth guides */}
        <section className="mb-20">
          <div className="max-w-2xl mb-8">
            <div className="accent-bar mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">{page.guidesH2}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{page.guidesBody}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {page.guides.map((guide) => (
              <Link
                key={guide.href}
                href={href(guide.href)}
                className="rounded-2xl bg-white border border-[#09294c]/10 px-5 py-4 hover:border-[#09294c]/25 transition-colors"
              >
                <p className="font-semibold text-[#09294c] mb-1">{guide.title}</p>
                <p className="text-sm text-gray-500">{guide.subtitle}</p>
              </Link>
            ))}
          </div>
          <Link
            href={href('/aruba/guides')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a5f9e] hover:underline"
          >
            {page.guidesAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Proof / platforms */}
        <section className="mb-20">
          <div className="max-w-2xl mb-8">
            <div className="accent-bar mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">{page.proofH2}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{page.proofBody}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {page.platforms.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="xgen-card p-5 group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-[#09294c]">{item.name}</h3>
                    {item.status && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md bg-[#e8f1f8] text-[#1a5f9e]">
                        {item.status}
                      </span>
                    )}
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#09294c]/25 group-hover:text-[#3d8fd1] shrink-0 mt-1" />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{item.blurb}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Bottom audit CTA */}
        <section className="grid lg:grid-cols-2 gap-8 items-center rounded-3xl bg-[#09294c] text-white p-8 sm:p-10 mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">
              {page.ctaH2}
            </h2>
            <p className="text-white/65 mb-6 max-w-xl leading-relaxed">{page.ctaBody}</p>
            <a href="#aruba-audit" className="xgen-btn bg-white text-[#09294c] hover:bg-[#e8f1f8] inline-flex">
              {page.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="text-sm text-white/55 leading-relaxed space-y-2">
            {page.wedge.map((line) => (
              <p key={line}>→ {line}</p>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

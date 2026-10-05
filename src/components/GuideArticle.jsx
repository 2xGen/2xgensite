'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import {
  getRelatedGuides,
  getTourOperatorGuide,
} from '@/data/tourOperatorGuides';

function renderInline(text, { strongClass = 'font-semibold text-[#09294c]' } = {}) {
  const parts = String(text).split(/(\[\[[^\]]+\]\]|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const link = part.match(/^\[\[([^\]|]+)\|([^\]]+)\]\]$/);
    if (link) {
      const [, slug, label] = link;
      return (
        <Link
          key={`${slug}-${i}`}
          href={`/guides/${slug}`}
          className="text-[#1a5f9e] font-semibold underline decoration-[#1a5f9e]/30 underline-offset-4 hover:decoration-[#1a5f9e]"
        >
          {label}
        </Link>
      );
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={`b-${i}`} className={strongClass}>
          {bold[1]}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function GuideArticle({ slug }) {
  const guide = getTourOperatorGuide(slug);

  if (!guide) {
    return (
      <PageShell className="pattern-dots">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Guide not found</h1>
          <Link href="/guides" className="text-[#1a5f9e] font-semibold hover:underline">
            ← All guides
          </Link>
        </div>
      </PageShell>
    );
  }

  const related = getRelatedGuides(guide);
  const pillarHref = '/guides/seo-for-tour-operators';

  return (
    <PageShell className="!pt-0 !pb-0 pattern-diagonal overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-[28rem] bg-gradient-to-b from-[#e8f1f8] via-[#f3f7fb]/80 to-transparent"
        aria-hidden
      />

      <article className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm mb-8">
          <Link href="/guides" className="font-medium text-[#1a5f9e] hover:underline">
            ← Guides
          </Link>
          {!guide.isPillar && (
            <>
              <span className="text-[#09294c]/25">·</span>
              <Link href={pillarHref} className="font-medium text-[#1a5f9e] hover:underline">
                SEO for Tour Operators
              </Link>
            </>
          )}
        </div>

        <header className="mb-12 sm:mb-14">
          <div className="accent-bar mb-5" />
          <p className="xgen-pill mb-5">{guide.isPillar ? 'Pillar guide' : 'Tour operator guide'}</p>
          <h1
            className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] text-[#09294c] mb-5"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {guide.title}
          </h1>
          <p className="text-xl sm:text-2xl text-[#1a5f9e]/90 font-medium leading-snug mb-6 max-w-2xl">
            {guide.subtitle}
          </p>
          <p className="text-sm text-[#09294c]/45">
            {formatDate(guide.date)}
            <span className="mx-2 text-[#09294c]/20">·</span>
            {guide.readTime} read
          </p>
        </header>

        <div className="space-y-6 mb-12">
          {guide.intro?.map((p, idx) => (
            <p
              key={p.slice(0, 48)}
              className={`leading-[1.75] text-[#3d4f63] ${
                idx === 0 ? 'text-xl sm:text-[1.35rem]' : 'text-lg'
              }`}
            >
              {renderInline(p)}
            </p>
          ))}
        </div>

        <div className="space-y-12 sm:space-y-14 mb-16">
          {guide.sections.map((section) => (
            <section key={section.h2} className="relative">
              <div className="h-px w-16 bg-[#3d8fd1]/35 mb-6" aria-hidden />
              <h2
                className="text-2xl sm:text-[1.75rem] font-semibold tracking-tight text-[#09294c] mb-4 leading-snug"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {section.h2}
              </h2>
              {section.paragraphs?.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="text-lg text-[#3d4f63] leading-[1.75] mb-4 last:mb-0"
                >
                  {renderInline(p)}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-5 space-y-3 rounded-2xl bg-white/70 border border-[#09294c]/08 px-5 py-5 shadow-sm">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3 text-[#3d4f63] leading-relaxed text-[1.05rem]">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#3d8fd1] shrink-0" />
                      <span>{renderInline(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="mt-6 overflow-x-auto rounded-2xl border border-[#09294c]/08 bg-white/80 shadow-sm">
                  <table className="w-full min-w-[32rem] text-left text-sm sm:text-base">
                    <thead>
                      <tr className="border-b border-[#09294c]/10 bg-[#e8f1f8]/60">
                        {section.table.headers.map((h, hi) => (
                          <th
                            key={`h-${hi}`}
                            className="px-4 py-3 font-semibold text-[#09294c]"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row.join('|')} className="border-b border-[#09294c]/06 last:border-0">
                          {row.map((cell, ci) => (
                            <td
                              key={`${cell}-${ci}`}
                              className={`px-4 py-3 text-[#3d4f63] leading-relaxed ${
                                ci === 0 ? 'font-semibold text-[#09294c]' : ''
                              }`}
                            >
                              {renderInline(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="rounded-[1.75rem] pattern-navy text-white px-6 py-7 sm:px-9 sm:py-9 mb-14 shadow-[0_20px_50px_rgba(9,41,76,0.18)]">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-3">
              Next step
            </p>
            <h2
              className="text-2xl sm:text-[1.75rem] font-semibold text-white mb-5 leading-snug text-balance"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {guide.ctaTitle || 'Get a Site for Your Tours'}
            </h2>

            <div className="space-y-4">
              {(guide.ctaBody || [
                'If you want a managed Google-facing site that sends travelers into your Viator or GetYourGuide listing — without building and maintaining it yourself — 2xGen runs that channel for $249/year.',
              ]).map((p) => {
                const plain = String(p).replace(/\*\*/g, '').trim();
                const isFlow = plain.includes('→');
                const isTagline =
                  !isFlow &&
                  /^\*\*[^*]+\*\*$/.test(String(p).trim()) &&
                  plain.length < 80;
                const ctaInline = { strongClass: 'font-semibold text-white' };

                if (isFlow) {
                  return (
                    <p
                      key={p.slice(0, 40)}
                      className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm sm:text-base font-medium text-white leading-snug tracking-tight"
                    >
                      {renderInline(p, ctaInline)}
                    </p>
                  );
                }

                if (isTagline) {
                  return (
                    <p
                      key={p.slice(0, 40)}
                      className="text-white font-semibold text-base sm:text-lg leading-snug"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {plain}
                    </p>
                  );
                }

                return (
                  <p
                    key={p.slice(0, 40)}
                    className="text-white/75 leading-relaxed text-[0.95rem] sm:text-base text-pretty"
                  >
                    {renderInline(p, ctaInline)}
                  </p>
                );
              })}
            </div>

            {(guide.ctaPrice || guide.ctaDisclaimer) && (
              <div className="mt-5 rounded-xl border border-white/12 bg-black/20 px-4 py-3.5">
                {guide.ctaPrice && (
                  <p className="text-white font-semibold text-base leading-snug mb-1.5">
                    {guide.ctaPrice}
                  </p>
                )}
                {guide.ctaDisclaimer && (
                  <p className="text-white/55 text-sm leading-relaxed text-pretty">
                    {guide.ctaDisclaimer}
                  </p>
                )}
              </div>
            )}

            <Link
              href="/get-a-site"
              className="xgen-btn bg-white text-[#09294c] hover:bg-[#e8f1f8] inline-flex mt-6"
            >
              Get a Site for Your Tours
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2
              className="text-xl font-semibold mb-5 text-[#09294c]"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Continue reading
            </h2>
            <div className="grid sm:grid-cols-1 gap-3">
              {related.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="group block rounded-2xl border border-[#09294c]/08 bg-white/80 px-5 py-5 hover:border-[#3d8fd1]/40 hover:bg-white transition-colors shadow-sm"
                >
                  <p className="font-semibold text-[#09294c] group-hover:text-[#1a5f9e] transition-colors">
                    {g.title}
                  </p>
                  <p className="text-sm text-[#3d4f63]/80 mt-1.5 leading-relaxed">{g.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageShell>
  );
}

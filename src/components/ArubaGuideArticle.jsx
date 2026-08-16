'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import { getArubaGuide, getArubaGuides } from '@/data/arubaGuides';
import { useLocale } from '@/i18n/LocaleContext';

function linkifyText(text) {
  const parts = String(text).split(/(https?:\/\/[^\s]+|arubabuddies\.com)/gi);
  return parts.map((part, i) => {
    if (/^arubabuddies\.com$/i.test(part)) {
      return (
        <a
          key={`${part}-${i}`}
          href="https://arubabuddies.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1a5f9e] font-medium underline underline-offset-2 hover:text-[#09294c]"
        >
          {part}
        </a>
      );
    }
    if (/^https?:\/\//i.test(part)) {
      return (
        <a
          key={`${part}-${i}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1a5f9e] font-medium underline underline-offset-2 hover:text-[#09294c]"
        >
          {part.replace(/^https?:\/\//i, '')}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export default function ArubaGuideArticle({ slug }) {
  const { href, locale } = useLocale();
  const guide = getArubaGuide(slug, locale);
  const isNl = locale === 'nl';

  if (!guide) {
    return (
      <PageShell>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">
            {isNl ? 'Gids niet gevonden' : 'Guide not found'}
          </h1>
          <Link href={href('/aruba/guides')} className="text-[#1a5f9e] font-semibold hover:underline">
            {isNl ? '← Alle Aruba Growth Guides' : '← All Aruba Growth Guides'}
          </Link>
        </div>
      </PageShell>
    );
  }

  const others = getArubaGuides(locale).filter((g) => g.slug !== slug).slice(0, 3);

  return (
    <PageShell className="bg-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={href('/aruba/guides')} className="text-sm font-medium text-[#1a5f9e] hover:underline">
          {isNl ? '← Aruba Growth Guides' : '← Aruba Growth Guides'}
        </Link>

        <header className="mt-6 mb-10">
          <div className="accent-bar mb-4" />
          <p className="xgen-pill mb-4">Aruba Growth Guides</p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight mb-4">
            {guide.title}
          </h1>
          <p className="text-xl text-[#1a5f9e] font-medium mb-4">{guide.subtitle}</p>
          <p className="text-sm text-gray-500">
            {guide.date} · {guide.readTime}
            {isNl ? ' lezen' : ' read'}
          </p>
        </header>

        <div className="space-y-10 mb-14">
          {guide.intro?.map((p) => (
            <p key={p.slice(0, 48)} className="text-lg text-gray-600 leading-relaxed">
              {linkifyText(p)}
            </p>
          ))}
          {guide.sections.map((section) => (
            <section key={section.h2}>
              <h2 className="text-2xl font-semibold tracking-tight text-[#09294c] mb-3">
                {section.h2}
              </h2>
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="text-lg text-gray-600 leading-relaxed mb-4">
                  {linkifyText(p)}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-2 mt-2">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3 text-gray-600 leading-relaxed">
                      <span className="text-[#3d8fd1] font-bold shrink-0">·</span>
                      <span>{linkifyText(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="rounded-3xl pattern-navy text-white p-7 sm:p-8 mb-14">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
            {isNl
              ? 'Wil je dit toepassen op jouw bedrijf?'
              : 'Want this applied to your business?'}
          </h2>
          <p className="text-white/65 mb-5 leading-relaxed">
            {isNl
              ? 'Haal je gratis Aruba Visibility Score — daarna bouwen we het acquisitiesysteem rond je grootste gaten.'
              : 'Get your free Aruba Visibility Score — then we can build the acquisition system around your biggest gaps.'}
          </p>
          <Link href={href('/aruba')} className="xgen-btn bg-white text-[#09294c] hover:bg-[#e8f1f8] inline-flex">
            {isNl ? 'Gratis Aruba SEO Audit' : 'Free Aruba SEO Audit'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {others.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {isNl ? 'Meer Aruba Growth Guides' : 'More Aruba Growth Guides'}
            </h2>
            <div className="space-y-3">
              {others.map((g) => (
                <Link
                  key={g.slug}
                  href={href(`/aruba/guides/${g.slug}`)}
                  className="block rounded-2xl border border-[#09294c]/10 px-5 py-4 hover:bg-[#f3f7fb] transition-colors"
                >
                  <p className="font-semibold text-[#09294c]">{g.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{g.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageShell>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { computeArubaVisibility } from '@/lib/arubaVisibility';
import { useLocale } from '@/i18n/LocaleContext';

export default function ArubaVisibilityAudit({ compact = false }) {
  const { t, href } = useLocale();
  const a = t.arubaAudit;

  const [form, setForm] = useState({ businessName: '', website: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const canSubmit = form.businessName.trim() && form.website.trim() && form.email.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setError('');

    const visibility = computeArubaVisibility({
      businessName: form.businessName.trim(),
      website: form.website.trim(),
    });

    const payload = {
      business_name: form.businessName.trim(),
      website: form.website.trim(),
      email: form.email.trim(),
      overall_score: visibility.overall,
      gbp_score: visibility.scores.gbp,
      local_seo_score: visibility.scores.localSeo,
      website_score: visibility.scores.website,
      reviews_score: visibility.scores.reviews,
      conversion_score: visibility.scores.conversion,
      opportunity_ids: visibility.opportunityIds.join(','),
      source: typeof window !== 'undefined' ? window.location.pathname : 'website',
    };

    const { error: insertError } = await supabase.from('aruba_visibility_audits').insert(payload);

    if (insertError) {
      // Still show results if storage fails — don't block the sales machine
      console.error('Aruba visibility audit save failed:', insertError);
    }

    setResult(visibility);
    setSubmitting(false);
  };

  if (result) {
    const scoreRows = [
      { id: 'gbp', label: a.dims.gbp, score: result.scores.gbp },
      { id: 'localSeo', label: a.dims.localSeo, score: result.scores.localSeo },
      { id: 'website', label: a.dims.website, score: result.scores.website },
      { id: 'reviews', label: a.dims.reviews, score: result.scores.reviews },
      { id: 'conversion', label: a.dims.conversion, score: result.scores.conversion },
    ];

    return (
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#09294c]/12 p-6 sm:p-8 shadow-[0_24px_60px_rgba(9,41,76,0.14)]">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3d8fd1]" />
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <Check className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#3d8fd1]">{a.scoreLabel}</p>
            <p className="text-3xl font-semibold tracking-tight text-[#09294c]">
              {result.overall}
              <span className="text-lg text-[#09294c]/40">/100</span>
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {scoreRows.map((row) => (
            <div key={row.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-[#09294c]">{row.label}</span>
                <span className="font-semibold text-[#1a5f9e]">{row.score}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#09294c]/08 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#3d8fd1]"
                  style={{ width: `${row.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm font-semibold text-[#09294c] mb-3">{a.opportunitiesTitle}</p>
        <ol className="space-y-4 mb-6">
          {result.opportunityIds.map((id, i) => {
            const opp = a.opportunities[id];
            if (!opp) return null;
            return (
              <li key={id} className="rounded-2xl bg-[#f3f7fb] border border-[#09294c]/08 px-4 py-3">
                <p className="text-xs font-bold text-[#3d8fd1] mb-1">
                  {String(i + 1).padStart(2, '0')} — {opp.title}
                </p>
                <p className="text-sm text-[#09294c]/75 leading-relaxed">{opp.body}</p>
              </li>
            );
          })}
        </ol>

        <div className="rounded-2xl pattern-navy text-white p-5">
          <p className="font-semibold mb-2">{a.fixTitle}</p>
          <p className="text-sm text-white/65 mb-4 leading-relaxed">{a.fixBody}</p>
          <Link href={href('/contact')} className="xgen-btn bg-white text-[#09294c] hover:bg-[#e8f1f8] w-full justify-center">
            {a.fixCta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      id="aruba-audit"
      className={`relative overflow-hidden rounded-3xl bg-white border border-[#09294c]/12 shadow-[0_24px_60px_rgba(9,41,76,0.14)] scroll-mt-28 ${
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3d8fd1]" />
      <p className="xgen-pill mb-3">{a.pill}</p>
      <h3 className={`font-semibold tracking-tight text-[#09294c] mb-1 ${compact ? 'text-xl' : 'text-2xl'}`}>
        {a.title}
      </h3>
      <p className="text-sm text-gray-500 mb-5 leading-relaxed">{a.subtitle}</p>

      <AnimatePresence mode="wait">
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-2.5"
        >
          <input
            type="text"
            required
            placeholder={a.businessName}
            value={form.businessName}
            onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
            className="w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc] text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1] focus:bg-white"
          />
          <input
            type="text"
            required
            placeholder={a.website}
            value={form.website}
            onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
            className="w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc] text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1] focus:bg-white"
          />
          <input
            type="email"
            required
            placeholder={a.email}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc] text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1] focus:bg-white"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="xgen-btn xgen-btn-primary w-full disabled:opacity-50"
          >
            {submitting ? a.submitting : a.submit}
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </button>
          <p className="text-xs text-gray-400 pt-1">{a.note}</p>
        </motion.form>
      </AnimatePresence>
    </div>
  );
}

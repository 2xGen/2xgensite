'use client';

import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { supabase } from '@/lib/supabase';
import { useLocale } from '@/i18n/LocaleContext';

function OptionGrid({ options, value, onChange, name }) {
  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`text-left px-4 py-3 rounded-2xl border transition-colors text-sm font-medium ${
              selected
                ? 'border-[#3d8fd1] bg-[#e8f1f8] text-[#09294c]'
                : 'border-[#09294c]/10 bg-[#f7fafc] text-[#09294c] hover:border-[#09294c]/25'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <span
                className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 ${
                  selected ? 'border-[#3d8fd1] bg-[#3d8fd1]' : 'border-[#09294c]/25'
                }`}
                aria-hidden
              />
              {opt.label}
            </span>
            <input type="radio" name={name} value={opt.id} checked={selected} readOnly className="sr-only" />
          </button>
        );
      })}
    </div>
  );
}

function MultiSelect({ options, values, onToggle }) {
  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const selected = values.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onToggle(opt.id)}
            className={`w-full text-left px-4 py-3 rounded-2xl border transition-colors text-sm font-medium ${
              selected
                ? 'border-[#3d8fd1] bg-[#e8f1f8] text-[#09294c]'
                : 'border-[#09294c]/10 bg-[#f7fafc] text-[#09294c] hover:border-[#09294c]/25'
            }`}
          >
            <span className="inline-flex items-start gap-3">
              <span
                className={`mt-0.5 w-4 h-4 rounded-md border-2 shrink-0 flex items-center justify-center ${
                  selected ? 'border-[#3d8fd1] bg-[#3d8fd1]' : 'border-[#09294c]/25'
                }`}
                aria-hidden
              >
                {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </span>
              <span>{opt.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function ArubaBusinessSurvey() {
  const { t, href, locale } = useLocale();
  const s = t.arubaSurvey;

  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    email: '',
    businessType: '',
    problems: [],
    problemOther: '',
    bookingMethod: '',
    touristShare: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const toggleProblem = (id) => {
    setForm((f) => ({
      ...f,
      problems: f.problems.includes(id) ? f.problems.filter((p) => p !== id) : [...f.problems, id],
    }));
  };

  const canSubmit =
    form.businessName.trim() &&
    form.contactName.trim() &&
    form.email.trim() &&
    form.businessType &&
    form.problems.length > 0 &&
    form.touristShare &&
    (!form.problems.includes('other') || form.problemOther.trim().length >= 3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setError('');

    const businessLabel = s.businessTypes.find((b) => b.id === form.businessType)?.label || form.businessType;
    const bookingLabel = form.bookingMethod
      ? s.bookingMethods.find((b) => b.id === form.bookingMethod)?.label || form.bookingMethod
      : null;
    const touristLabel =
      s.touristShares.find((b) => b.id === form.touristShare)?.label || form.touristShare;

    const problemLabels = form.problems.map((id) => {
      if (id === 'other') {
        return form.problemOther.trim() ? `Other: ${form.problemOther.trim()}` : 'Other';
      }
      return s.problems.find((p) => p.id === id)?.label || id;
    });

    const payload = {
      business_name: form.businessName.trim(),
      contact_name: form.contactName.trim(),
      email: form.email.trim(),
      business_type: businessLabel,
      biggest_problem: problemLabels.join(' | '),
      booking_method: bookingLabel,
      tourist_share: touristLabel,
      source: typeof window !== 'undefined' ? window.location.pathname : 'website',
      locale,
    };

    const { error: insertError } = await supabase.from('aruba_business_surveys').insert(payload);

    setSubmitting(false);

    if (insertError) {
      console.error('Aruba business survey save failed:', insertError);
      setError(s.error);
      return;
    }

    setDone(true);
  };

  if (done) {
    return (
      <PageShell className="bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#09294c]/12 bg-white p-7 sm:p-10 shadow-[0_20px_50px_rgba(9,41,76,0.08)]">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
              <Check className="w-5 h-5 text-emerald-700" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">{s.thanksTitle}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{s.thanksBody}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={href('/aruba')} className="xgen-btn xgen-btn-primary inline-flex">
                {s.thanksCta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`${href('/aruba')}#aruba-audit`} className="xgen-btn xgen-btn-secondary inline-flex">
                {s.thanksSecondary}
              </Link>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell className="bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={href('/aruba')} className="text-sm font-medium text-[#1a5f9e] hover:underline">
          ← 2xGen Aruba
        </Link>

        <div className="mt-6 mb-8">
          <div className="accent-bar mb-4" />
          <p className="xgen-pill mb-4">{s.pill}</p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-3">{s.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-2">{s.lead}</p>
          <p className="text-sm text-[#09294c]/70 font-medium">{s.time}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-2.5">
            <label className="text-sm font-semibold text-[#09294c]">{s.businessName}</label>
            <input
              type="text"
              required
              value={form.businessName}
              onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
              className="w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc] text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1] focus:bg-white"
              placeholder={s.businessNamePh}
            />
          </div>

          <div className="space-y-2.5">
            <label className="text-sm font-semibold text-[#09294c]">{s.contactName}</label>
            <input
              type="text"
              required
              value={form.contactName}
              onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
              className="w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc] text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1] focus:bg-white"
              placeholder={s.contactNamePh}
            />
          </div>

          <div className="space-y-2.5">
            <label className="text-sm font-semibold text-[#09294c]">{s.email}</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc] text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1] focus:bg-white"
              placeholder={s.emailPh}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-[#09294c]">{s.businessType}</label>
            <OptionGrid
              name="businessType"
              options={s.businessTypes}
              value={form.businessType}
              onChange={(id) => setForm((f) => ({ ...f, businessType: id }))}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-[#09294c]">{s.problem}</label>
            <p className="text-sm text-gray-500 leading-relaxed">{s.problemHint}</p>
            <MultiSelect options={s.problems} values={form.problems} onToggle={toggleProblem} />
            {form.problems.includes('other') && (
              <input
                type="text"
                value={form.problemOther}
                onChange={(e) => setForm((f) => ({ ...f, problemOther: e.target.value }))}
                className="w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc] text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1] focus:bg-white"
                placeholder={s.problemOtherPh}
              />
            )}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-[#09294c]">
              {s.booking} <span className="font-normal text-gray-400">({s.optional})</span>
            </label>
            <OptionGrid
              name="bookingMethod"
              options={s.bookingMethods}
              value={form.bookingMethod}
              onChange={(id) => setForm((f) => ({ ...f, bookingMethod: id }))}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-[#09294c]">{s.touristShare}</label>
            <OptionGrid
              name="touristShare"
              options={s.touristShares}
              value={form.touristShare}
              onChange={(id) => setForm((f) => ({ ...f, touristShare: id }))}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <p className="text-xs text-gray-500 leading-relaxed">
            {s.privacyBefore}{' '}
            <Link href={href('/privacy')} className="text-[#1a5f9e] font-medium underline underline-offset-2 hover:text-[#09294c]">
              {s.privacyLink}
            </Link>
            {s.privacyAfter}
          </p>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="xgen-btn xgen-btn-primary w-full sm:w-auto disabled:opacity-50"
          >
            {submitting ? s.submitting : s.submit}
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-xs text-gray-500 leading-relaxed">{s.note}</p>
        </form>
      </div>
    </PageShell>
  );
}

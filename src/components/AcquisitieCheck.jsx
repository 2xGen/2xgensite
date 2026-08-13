'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLocale } from '@/i18n/LocaleContext';

const AcquisitieCheck = () => {
  const { t } = useLocale();
  const c = t.check;
  const challenges = c.challenges;
  const situations = c.situations;

  const [step, setStep] = useState(0);
  const [challenge, setChallenge] = useState(null);
  const [situation, setSituation] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = form.name.trim() && form.email.trim() && form.company.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setError('');

    const challengeLabel = challenges.find((item) => item.id === challenge)?.label || '';
    const situationLabel = situations.find((item) => item.id === situation)?.label || '';

    const { error: insertError } = await supabase.from('acquisitiechecks').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      challenge_id: challenge,
      challenge: challengeLabel,
      situation_id: situation,
      situation: situationLabel,
      source: typeof window !== 'undefined' ? window.location.pathname : 'website',
    });

    setSubmitting(false);

    if (insertError) {
      console.error('Acquisitiecheck save failed:', insertError);
      setError(c.error);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    const first = form.name ? `, ${form.name.split(' ')[0]}` : '';
    return (
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#09294c]/12 p-7 sm:p-8 shadow-[0_20px_50px_rgba(9,41,76,0.12)]">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3d8fd1]" />
        <div className="relative w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
          <Check className="w-5 h-5 text-emerald-700" />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight mb-2">{c.doneTitle}</h3>
        <p className="text-gray-600 leading-relaxed">{c.doneBody.replace('{name}', first)}</p>
      </div>
    );
  }

  const placeholders = { name: c.name, company: c.company, email: c.email };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-[#09294c]/12 shadow-[0_24px_60px_rgba(9,41,76,0.14)]">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3d8fd1]" />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-center justify-between gap-2 mb-5">
          <span className="xgen-pill">{c.pill}</span>
          <span className="text-xs font-semibold text-[#09294c]/45">
            {c.step} {Math.min(step + 1, 3)}/3
          </span>
        </div>

        <div className="flex gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-[#09294c]' : 'bg-[#09294c]/10'}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <h3 className="text-xl font-semibold tracking-tight mb-1">{c.q1}</h3>
              <p className="text-sm text-gray-500 mb-4">{c.q1hint}</p>
              <div className="space-y-2">
                {challenges.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setChallenge(item.id);
                      setStep(1);
                    }}
                    className="w-full text-left px-4 py-3.5 rounded-2xl border border-[#09294c]/10 bg-[#f7fafc] hover:bg-[#e8f1f8] hover:border-[#09294c]/25 transition-colors flex items-center justify-between gap-3"
                  >
                    <span className="font-medium text-[#09294c] text-sm">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#3d8fd1] shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <h3 className="text-xl font-semibold tracking-tight mb-1">{c.q2}</h3>
              <p className="text-sm text-gray-500 mb-4">{c.q2hint}</p>
              <div className="space-y-2">
                {situations.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSituation(item.id);
                      setStep(2);
                    }}
                    className="w-full text-left px-4 py-3.5 rounded-2xl border border-[#09294c]/10 bg-[#f7fafc] hover:bg-[#e8f1f8] hover:border-[#09294c]/25 transition-colors flex items-center justify-between gap-3"
                  >
                    <span className="font-medium text-[#09294c] text-sm">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#3d8fd1] shrink-0" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="mt-4 text-sm font-medium text-[#09294c]/50 hover:text-[#09294c]"
              >
                {c.back}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <h3 className="text-xl font-semibold tracking-tight mb-1">{c.q3}</h3>
              <p className="text-sm text-gray-500 mb-4">{c.q3hint}</p>
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {['name', 'company', 'email'].map((field) => (
                  <input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
                    required
                    placeholder={placeholders[field]}
                    value={form[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc] text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1] focus:bg-white"
                  />
                ))}
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="xgen-btn xgen-btn-primary w-full disabled:opacity-50"
                >
                  {submitting ? c.submitting : c.submit}
                  {!submitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-3">{c.note}</p>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-3 text-sm font-medium text-[#09294c]/50 hover:text-[#09294c]"
              >
                {c.back}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AcquisitieCheck;

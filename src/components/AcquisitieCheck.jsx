'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLocale } from '@/i18n/LocaleContext';

function getOpportunityId(challenge, situation) {
  if (challenge === 'website') return 'conversion';
  if (challenge === 'followup') return 'followup';
  if (challenge === 'system') return 'system';
  if (challenge === 'leads' && situation === 'ads') return 'owned';
  if (challenge === 'leads') return 'demand';
  return 'system';
}

const AcquisitieCheck = () => {
  const { t } = useLocale();
  const c = t.check;
  const challenges = c.challenges;
  const situations = c.situations;
  const businessTypes = c.businessTypes;

  const [step, setStep] = useState(0);
  const [challenge, setChallenge] = useState(null);
  const [situation, setSituation] = useState(null);
  const [businessType, setBusinessType] = useState(null);
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [opportunityId, setOpportunityId] = useState(null);

  const canSubmit = businessType && website.trim() && email.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setError('');

    const challengeLabel = challenges.find((item) => item.id === challenge)?.label || '';
    const situationLabel = situations.find((item) => item.id === situation)?.label || '';
    const businessLabel = businessTypes.find((item) => item.id === businessType)?.label || '';
    const oppId = getOpportunityId(challenge, situation);

    const { error: insertError } = await supabase.from('acquisitiechecks').insert({
      name: businessLabel || 'Acquisition check',
      email: email.trim(),
      company: website.trim(),
      challenge_id: challenge,
      challenge: challengeLabel,
      situation_id: situation,
      situation: situationLabel,
      business_type: businessLabel,
      website: website.trim(),
      source: typeof window !== 'undefined' ? window.location.pathname : 'website',
    });

    setSubmitting(false);

    if (insertError) {
      // Fallback without newer columns if schema isn't migrated yet
      const { error: fallbackError } = await supabase.from('acquisitiechecks').insert({
        name: businessLabel || 'Acquisition check',
        email: email.trim(),
        company: website.trim(),
        challenge_id: challenge,
        challenge: challengeLabel,
        situation_id: situation,
        situation: `${situationLabel} · ${businessLabel}`,
        source: typeof window !== 'undefined' ? window.location.pathname : 'website',
      });

      if (fallbackError) {
        console.error('Acquisitiecheck save failed:', insertError, fallbackError);
        setError(c.error);
        return;
      }
    }

    setOpportunityId(oppId);
    setSubmitted(true);
  };

  if (submitted) {
    const analysis = c.analysis?.[opportunityId] || c.analysis?.system;
    return (
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#09294c]/12 p-7 sm:p-8 shadow-[0_20px_50px_rgba(9,41,76,0.12)]">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3d8fd1]" />
        <div className="relative w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
          <Check className="w-5 h-5 text-emerald-700" />
        </div>
        <p className="text-sm font-semibold text-[#3d8fd1] mb-2">{c.resultEyebrow}</p>
        <h3 className="text-2xl font-semibold tracking-tight mb-3">
          {c.resultTitle} {analysis.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">{analysis.body}</p>

        <p className="text-sm font-semibold text-[#09294c] mb-3">{c.lookAtLabel}</p>
        <ol className="space-y-2 mb-6">
          {analysis.lookAt.map((item, i) => (
            <li key={item} className="flex gap-3 text-sm text-[#09294c]/80">
              <span className="font-bold text-[#3d8fd1] shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>

        <div className="rounded-2xl bg-[#f3f7fb] border border-[#09294c]/08 px-4 py-4 mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-2">
            {c.systemLabel}
          </p>
          <p className="text-sm font-medium text-[#09294c] leading-relaxed">{c.systemFlow}</p>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">{c.doneBody}</p>
      </div>
    );
  }

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
              <p className="text-xs font-semibold text-[#3d8fd1] mb-2">{c.step1Label}</p>
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
              <p className="text-xs font-semibold text-[#3d8fd1] mb-2">{c.step2Label}</p>
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
              <p className="text-xs font-semibold text-[#3d8fd1] mb-2">{c.step3Label}</p>
              <h3 className="text-xl font-semibold tracking-tight mb-1">{c.q3}</h3>
              <p className="text-sm text-gray-500 mb-4">{c.q3hint}</p>

              <p className="text-sm font-semibold text-[#09294c] mb-2">{c.businessLabel}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {businessTypes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBusinessType(item.id)}
                    className={`text-left px-3.5 py-3 rounded-2xl border text-sm font-medium transition-colors ${
                      businessType === item.id
                        ? 'border-[#09294c] bg-[#09294c] text-white'
                        : 'border-[#09294c]/10 bg-[#f7fafc] text-[#09294c] hover:bg-[#e8f1f8]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div>
                  <label className="text-sm font-semibold text-[#09294c] mb-2 block">{c.websiteLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder={c.websitePlaceholder}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc] text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#09294c] mb-2 block">{c.emailLabel}</label>
                  <input
                    type="email"
                    required
                    placeholder={c.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc] text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1] focus:bg-white"
                  />
                </div>
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

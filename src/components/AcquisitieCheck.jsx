'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const challenges = [
  { id: 'leads', label: 'Te weinig relevante leads' },
  { id: 'website', label: 'Mijn website levert te weinig op' },
  { id: 'followup', label: 'Opvolging kost te veel tijd' },
  { id: 'system', label: 'Geen voorspelbaar acquisitiesysteem' },
];

const situations = [
  { id: 'none', label: 'Nog geen structurele leadgeneratie' },
  { id: 'ads', label: 'Vooral afhankelijk van advertenties' },
  { id: 'seo', label: 'SEO/content, maar weinig conversie' },
  { id: 'mix', label: 'Meerdere kanalen, weinig overzicht' },
];

const AcquisitieCheck = () => {
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

    const challengeLabel = challenges.find((c) => c.id === challenge)?.label || '';
    const situationLabel = situations.find((s) => s.id === situation)?.label || '';

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
      setError('Opslaan mislukt. Probeer het opnieuw of mail matthijs@2xgen.com.');
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#09294c]/12 p-7 sm:p-8 shadow-[0_20px_50px_rgba(9,41,76,0.12)]">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3d8fd1]" />
        <div className="relative w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
          <Check className="w-5 h-5 text-emerald-700" />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight mb-2">Binnen!</h3>
        <p className="text-gray-600 leading-relaxed">
          Bedankt{form.name ? `, ${form.name.split(' ')[0]}` : ''}. We kijken naar je antwoorden en sturen snel aanknopingspunten.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-[#09294c]/12 shadow-[0_24px_60px_rgba(9,41,76,0.14)]">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3d8fd1]" />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-center justify-between gap-2 mb-5">
          <span className="xgen-pill">Gratis · 2 min</span>
          <span className="text-xs font-semibold text-[#09294c]/45">Stap {Math.min(step + 1, 3)}/3</span>
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
              <h3 className="text-xl font-semibold tracking-tight mb-1">Waar loopt je acquisitie nu vast?</h3>
              <p className="text-sm text-gray-500 mb-4">Kies wat het meest speelt.</p>
              <div className="space-y-2">
                {challenges.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setChallenge(item.id); setStep(1); }}
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
              <h3 className="text-xl font-semibold tracking-tight mb-1">Hoe ziet het er nu uit?</h3>
              <p className="text-sm text-gray-500 mb-4">Zo sluit de check beter aan.</p>
              <div className="space-y-2">
                {situations.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setSituation(item.id); setStep(2); }}
                    className="w-full text-left px-4 py-3.5 rounded-2xl border border-[#09294c]/10 bg-[#f7fafc] hover:bg-[#e8f1f8] hover:border-[#09294c]/25 transition-colors flex items-center justify-between gap-3"
                  >
                    <span className="font-medium text-[#09294c] text-sm">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#3d8fd1] shrink-0" />
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => setStep(0)} className="mt-4 text-sm font-medium text-[#09294c]/50 hover:text-[#09294c]">← Terug</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <h3 className="text-xl font-semibold tracking-tight mb-1">Ontvang je eerste inzichten</h3>
              <p className="text-sm text-gray-500 mb-4">Concrete aanknopingspunten op basis van je antwoorden.</p>
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {['name', 'company', 'email'].map((field) => (
                  <input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
                    required
                    placeholder={field === 'name' ? 'Naam' : field === 'company' ? 'Bedrijf' : 'Zakelijk e-mailadres'}
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
                  {submitting ? 'Bezig…' : 'Ontvang mijn analyse'}
                  {!submitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-3">Geen nieuwsbrief. Geen funnel. Gewoon een eerste blik.</p>
              <button type="button" onClick={() => setStep(1)} className="mt-3 text-sm font-medium text-[#09294c]/50 hover:text-[#09294c]">← Terug</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AcquisitieCheck;

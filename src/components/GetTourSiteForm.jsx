'use client';

import React, { useState } from 'react';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const inputClass =
  'w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-white text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1]';

export default function GetTourSiteForm({ source = 'get-a-site' }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    destination: '',
    email: '',
  });
  const [links, setLinks] = useState(['']);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const filledLinks = links.map((l) => l.trim()).filter(Boolean);
  const canSubmit =
    form.name.trim() &&
    form.company.trim() &&
    form.destination.trim() &&
    filledLinks.length > 0 &&
    form.email.trim();

  const setLinkAt = (index, value) => {
    setLinks((prev) => prev.map((link, i) => (i === index ? value : link)));
  };

  const addLink = () => {
    setLinks((prev) => [...prev, '']);
  };

  const removeLink = (index) => {
    setLinks((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError('');

    const { error: insertError } = await supabase.from('tour_microsite_leads').insert({
      name: form.name.trim(),
      company: form.company.trim(),
      destination: form.destination.trim(),
      viator_link: filledLinks.join('\n'),
      email: form.email.trim(),
      source:
        typeof window !== 'undefined'
          ? `${source}:${window.location.pathname}`
          : source,
    });

    setSubmitting(false);
    if (insertError) {
      console.error(insertError);
      setError('Could not send. Email matthijs@2xgen.com or try again.');
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div>
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
          <Check className="w-5 h-5 text-emerald-700" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Thanks — we got it.</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          We&apos;ll review your destination and listing{filledLinks.length > 1 ? 's' : ''} and
          follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        required
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className={inputClass}
      />
      <input
        required
        placeholder="Company / tour brand"
        value={form.company}
        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
        className={inputClass}
      />
      <input
        required
        placeholder="Destination"
        value={form.destination}
        onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
        className={inputClass}
      />

      <div className="space-y-2">
        {links.map((link, index) => (
          <div key={index} className="flex gap-2">
            <input
              required={index === 0}
              placeholder={
                index === 0
                  ? 'Viator or GetYourGuide listing URL'
                  : `Another listing URL (${index + 1})`
              }
              value={link}
              onChange={(e) => setLinkAt(index, e.target.value)}
              className={inputClass}
            />
            {links.length > 1 && (
              <button
                type="button"
                onClick={() => removeLink(index)}
                aria-label="Remove listing URL"
                className="h-[3.25rem] w-11 shrink-0 rounded-2xl border border-[#09294c]/12 text-[#09294c]/45 hover:text-[#09294c] hover:border-[#09294c]/25 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addLink}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a5f9e] hover:text-[#09294c] transition-colors pt-0.5"
        >
          <Plus className="w-4 h-4" />
          Add another listing
        </button>
      </div>

      <input
        required
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        className={inputClass}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-gray-500">
        By submitting, you agree to our{' '}
        <a href="/privacy" className="text-[#1a5f9e] underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>
      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className="xgen-btn xgen-btn-primary w-full disabled:opacity-50"
      >
        {submitting ? 'Sending…' : 'Request my site'}
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

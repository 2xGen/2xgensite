'use client';

import React, { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, MessageCircle, X } from 'lucide-react';

const inputClass =
  'w-full px-4 py-3 rounded-2xl border border-[#09294c]/12 bg-white text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1] text-sm';

export default function AccountManagerAsk({
  variant = 'button',
  source = 'site',
  className = '',
}) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    website: '',
  });

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const reset = () => {
    setSent(false);
    setError('');
    setForm({ name: '', email: '', company: '', message: '', website: '' });
  };

  const openDialog = () => {
    reset();
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source:
            typeof window !== 'undefined'
              ? `${source}:${window.location.pathname}`
              : source,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Could not send.');
      setSent(true);
    } catch (err) {
      setError(err.message || 'Could not send.');
    } finally {
      setSubmitting(false);
    }
  };

  const trigger =
    variant === 'inline' ? (
      <button
        type="button"
        onClick={openDialog}
        className={`w-full text-left rounded-3xl border border-[#09294c]/10 bg-white px-5 py-4 shadow-sm hover:border-[#3d8fd1]/40 transition-colors ${className}`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-1">
          Account manager
        </p>
        <p className="text-sm font-semibold text-[#09294c]">Have questions before you order?</p>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          Message us — we&apos;ll help you decide if a managed Google site is the right fit.
        </p>
      </button>
    ) : variant === 'ghost' ? (
      <button
        type="button"
        onClick={openDialog}
        className={`inline-flex items-center gap-2 text-sm font-semibold text-[#1a5f9e] hover:underline ${className}`}
      >
        <MessageCircle className="w-4 h-4" />
        Have questions? Ask your account manager
      </button>
    ) : variant === 'footer' ? (
      <button
        type="button"
        onClick={openDialog}
        className={`w-full text-left rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 hover:bg-white/10 hover:border-white/20 transition-colors ${className}`}
      >
        <p className="text-sm font-semibold text-white">Have a question?</p>
        <p className="text-xs text-white/50 mt-1 leading-relaxed">
          Ask an account manager — we&apos;ll get back to you.
        </p>
      </button>
    ) : (
      <button
        type="button"
        onClick={openDialog}
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#09294c]/15 bg-white/95 px-4 py-2.5 text-sm font-semibold text-[#09294c] shadow-md hover:border-[#3d8fd1]/50 transition-colors ${className}`}
      >
        <MessageCircle className="w-4 h-4 text-[#1a5f9e]" />
        Have questions?
      </button>
    );

  return (
    <>
      {trigger}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute inset-0 bg-[#09294c]/45"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.22 }}
              className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-[#09294c]/10 max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 flex items-start justify-between gap-3 px-5 pt-5 pb-3 bg-white/95 backdrop-blur-sm border-b border-[#09294c]/06">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-1">
                    Account manager
                  </p>
                  <h2 id={titleId} className="text-xl font-semibold text-[#09294c]">
                    Have questions?
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-[#09294c] hover:bg-[#f3f7fb]"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-5 pb-6 pt-4">
                {sent ? (
                  <div className="py-2">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                      <Check className="w-5 h-5 text-emerald-700" />
                    </div>
                    <p className="text-lg font-semibold text-[#09294c] mb-2">Message sent</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5">
                      Thanks — we&apos;ll reply to your email shortly. No obligation to subscribe.
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="xgen-btn xgen-btn-primary w-full"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Contact your account manager with anything you want to know before placing an
                      order — destinations, listings, timeline, or whether this is a fit.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        name="website"
                        value={form.website}
                        onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden
                      />
                      <label className="block text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                        Name
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          className={`${inputClass} mt-1.5 font-normal normal-case`}
                          placeholder="Your name"
                        />
                      </label>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                        Email
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className={`${inputClass} mt-1.5 font-normal normal-case`}
                          placeholder="you@company.com"
                        />
                      </label>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                        Company <span className="normal-case font-normal">(optional)</span>
                        <input
                          value={form.company}
                          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                          className={`${inputClass} mt-1.5 font-normal normal-case`}
                          placeholder="Tour brand"
                        />
                      </label>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                        Message
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                          className={`${inputClass} mt-1.5 font-normal normal-case resize-y min-h-[100px]`}
                          placeholder="What would you like to know?"
                        />
                      </label>
                      {error && <p className="text-sm text-red-600">{error}</p>}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="xgen-btn xgen-btn-primary w-full disabled:opacity-50"
                      >
                        {submitting ? 'Sending…' : 'Send message'}
                      </button>
                      <p className="text-[11px] text-gray-500 text-center leading-relaxed">
                        Goes to hello@2xgen.com. We usually reply within one business day.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

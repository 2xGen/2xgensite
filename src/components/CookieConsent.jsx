'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleContext';

const STORAGE_KEY = '2xgen-cookie-consent';
const CONSENT_VERSION = 2;
export const OPEN_COOKIE_SETTINGS_EVENT = '2xgen-open-cookie-settings';

/**
 * @returns {{ version: number, necessary: true, analytics: boolean, updatedAt: string } | null}
 */
export function getCookieConsentRecord() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    if (raw === 'all') {
      return { version: 1, necessary: true, analytics: true, updatedAt: '' };
    }
    if (raw === 'necessary') {
      return { version: 1, necessary: true, analytics: false, updatedAt: '' };
    }

    const parsed = JSON.parse(raw);
    if (typeof parsed?.analytics === 'boolean') {
      return {
        version: parsed.version || CONSENT_VERSION,
        necessary: true,
        analytics: parsed.analytics,
        updatedAt: parsed.updatedAt || '',
      };
    }
    return null;
  } catch {
    return null;
  }
}

/** @returns {'all' | 'necessary' | null} — for analytics gating */
export function getCookieConsent() {
  const record = getCookieConsentRecord();
  if (!record) return null;
  return record.analytics ? 'all' : 'necessary';
}

export function openCookieSettings() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}

export default function CookieConsent({ onConsentChange }) {
  const { t, href } = useLocale();
  const c = t.cookie;
  const [visible, setVisible] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);
  const [hasPriorChoice, setHasPriorChoice] = useState(false);

  useEffect(() => {
    const existing = getCookieConsentRecord();
    if (!existing) {
      setVisible(true);
      setAnalyticsOn(false);
      setHasPriorChoice(false);
      return;
    }
    setAnalyticsOn(existing.analytics);
    setHasPriorChoice(true);
    onConsentChange?.(existing.analytics ? 'all' : 'necessary');
  }, [onConsentChange]);

  useEffect(() => {
    const open = () => {
      const existing = getCookieConsentRecord();
      setAnalyticsOn(existing?.analytics ?? false);
      setHasPriorChoice(Boolean(existing));
      setVisible(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  const persist = (analytics) => {
    const previous = getCookieConsent();
    const record = {
      version: CONSENT_VERSION,
      necessary: true,
      analytics,
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      /* ignore */
    }

    const next = analytics ? 'all' : 'necessary';
    onConsentChange?.(next);
    setVisible(false);

    // Revoking analytics: reload so third-party scripts stop running
    if (previous === 'all' && !analytics) {
      window.location.reload();
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-[#09294c]/55 backdrop-blur-[2px]" aria-hidden />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        className="relative w-full sm:max-w-xl bg-white sm:rounded-3xl rounded-t-3xl border border-[#09294c]/12 shadow-[0_24px_80px_rgba(9,41,76,0.35)] overflow-hidden"
      >
        <div className="h-1.5 bg-[#3d8fd1]" />
        <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          <p className="text-xs font-semibold tracking-wide uppercase text-[#3d8fd1] mb-2">{c.badge}</p>
          <h2 id="cookie-consent-title" className="text-2xl font-semibold tracking-tight text-[#09294c] mb-3">
            {c.title}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{c.text}</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            {c.legal}{' '}
            <Link href={href('/privacy')} className="text-[#1a5f9e] hover:underline font-medium">
              {c.more}
            </Link>
            .
          </p>

          <div className="space-y-3 mb-6">
            <div className="rounded-2xl border border-[#09294c]/10 bg-[#f7fafc] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[#09294c] text-sm">{c.necessaryTitle}</p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{c.necessaryDesc}</p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-[#09294c]/50 bg-white border border-[#09294c]/10 px-2.5 py-1 rounded-lg">
                  {c.alwaysOn}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#09294c]/10 bg-[#f7fafc] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-[#09294c] text-sm">{c.analyticsTitle}</p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{c.analyticsDesc}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analyticsOn}
                  aria-label={c.analyticsTitle}
                  onClick={() => setAnalyticsOn((v) => !v)}
                  className={`relative shrink-0 w-12 h-7 rounded-full transition-colors ${
                    analyticsOn ? 'bg-[#09294c]' : 'bg-[#09294c]/20'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                      analyticsOn ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed mb-5">{c.ccpa}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            <button
              type="button"
              onClick={() => persist(false)}
              className="xgen-btn xgen-btn-secondary !py-3 !px-4 text-sm order-2 sm:order-1"
            >
              {c.reject}
            </button>
            <button
              type="button"
              onClick={() => persist(true)}
              className="xgen-btn xgen-btn-primary !py-3 !px-4 text-sm order-1 sm:order-2"
            >
              {c.acceptAll}
            </button>
          </div>

          <button
            type="button"
            onClick={() => persist(analyticsOn)}
            className="w-full text-sm font-semibold text-[#1a5f9e] hover:underline py-2"
          >
            {c.savePreferences}
          </button>

          {hasPriorChoice && (
            <p className="text-xs text-center text-gray-400 mt-1">{c.changeHint}</p>
          )}
        </div>
      </div>
    </div>
  );
}

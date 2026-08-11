'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = '2xgen-cookie-consent';

export function getCookieConsent() {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export default function CookieConsent({ onConsentChange }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      setVisible(true);
      return;
    }
    onConsentChange?.(existing);
  }, [onConsentChange]);

  const save = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
    onConsentChange?.(value);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-[60]">
      <div className="rounded-2xl bg-white border border-[#09294c]/12 shadow-[0_16px_40px_rgba(9,41,76,0.18)] p-5">
        <p className="text-sm font-semibold text-[#09294c] mb-2">Cookies</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          We gebruiken noodzakelijke cookies om de site te laten werken, en optionele analytics-cookies om te zien hoe bezoekers de site gebruiken.{' '}
          <Link href="/privacy" className="text-[#1a5f9e] hover:underline font-medium">
            Meer info
          </Link>
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => save('all')}
            className="xgen-btn xgen-btn-primary !py-2.5 !px-4 text-sm flex-1"
          >
            Alles accepteren
          </button>
          <button
            type="button"
            onClick={() => save('necessary')}
            className="xgen-btn xgen-btn-secondary !py-2.5 !px-4 text-sm flex-1"
          >
            Alleen noodzakelijk
          </button>
        </div>
      </div>
    </div>
  );
}

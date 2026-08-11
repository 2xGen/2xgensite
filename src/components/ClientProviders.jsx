'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import StickyAcquisitieButton from '@/components/StickyAcquisitieButton';
import CookieConsent, { getCookieConsent } from '@/components/CookieConsent';

function loadMetricool() {
  if (typeof window === 'undefined' || window.__metricoolLoaded) return;
  window.__metricoolLoaded = true;
  const script = document.createElement('script');
  script.src = 'https://tracker.metricool.com/resources/be.js';
  script.onload = () => {
    if (window.beTracker?.t) {
      window.beTracker.t({ hash: '1b10e4e8bf2cb6621bc9e5b26bca03be' });
    }
  };
  document.head.appendChild(script);
}

export default function ClientProviders({ children }) {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    setConsent(getCookieConsent());
  }, []);

  const handleConsentChange = useCallback((value) => {
    setConsent(value);
  }, []);

  useEffect(() => {
    if (consent === 'all') loadMetricool();
  }, [consent]);

  return (
    <AuthProvider>
      {children}
      <StickyAcquisitieButton />
      <CookieConsent onConsentChange={handleConsentChange} />
      {consent === 'all' && <Analytics />}
      <Toaster />
    </AuthProvider>
  );
}

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ANNUAL_PRICE_USD } from '@/lib/saas';

export default function DashboardBilling() {
  const { supabase, user } = useAuth();
  const searchParams = useSearchParams();
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [sub, setSub] = useState(null);
  const [live, setLive] = useState(null); // latest from Stripe sync
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const loadSub = useCallback(async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('profile_id', user.id)
      .maybeSingle();
    setSub(data);
  }, [supabase, user?.id]);

  const syncFromStripe = useCallback(
    async ({ sessionId, quiet } = {}) => {
      if (!user?.id) return null;
      if (!quiet) setSyncing(true);
      try {
        const res = await fetch('/api/stripe/sync-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sessionId || undefined }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Sync failed');
        setLive({
          status: json.status,
          cancelAtPeriodEnd: Boolean(json.cancelAtPeriodEnd),
          currentPeriodEnd: json.currentPeriodEnd || null,
        });
        await loadSub();
        return json;
      } finally {
        if (!quiet) setSyncing(false);
      }
    },
    [user?.id, loadSub]
  );

  useEffect(() => {
    loadSub();
  }, [loadSub]);

  // Sync after checkout success, or whenever billing opens (picks up portal cancellations)
  useEffect(() => {
    if (!user?.id) return;
    const checkout = searchParams.get('checkout');
    let cancelled = false;

    async function run() {
      try {
        if (checkout === 'success') {
          const sessionId = searchParams.get('session_id') || '';
          await syncFromStripe({ sessionId });
          if (!cancelled) setMessage('Payment confirmed. You’re in the build queue.');
        } else {
          await syncFromStripe({ quiet: true });
        }
      } catch (e) {
        if (!cancelled && checkout === 'success') setError(e.message);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [user?.id, searchParams, syncFromStripe]);

  const startCheckout = async () => {
    if (!acceptedTerms) {
      setError('Please agree to the Terms of Service to continue.');
      return;
    }
    setBusy('checkout');
    setError('');
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Checkout failed');
      window.location.href = json.url;
    } catch (e) {
      setError(e.message);
      setBusy('');
    }
  };

  const openPortal = async () => {
    setBusy('portal');
    setError('');
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Portal failed');
      window.location.href = json.url;
    } catch (e) {
      setError(e.message);
      setBusy('');
    }
  };

  const refreshStatus = async () => {
    setBusy('sync');
    setError('');
    try {
      await syncFromStripe({});
      setMessage('Subscription status updated.');
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy('');
    }
  };

  const status = live?.status || sub?.status || 'inactive';
  const cancelAtPeriodEnd =
    live?.cancelAtPeriodEnd ?? Boolean(sub?.cancel_at_period_end);
  const periodEnd = live?.currentPeriodEnd || sub?.current_period_end || null;
  const isActive = status === 'active';
  const isCanceled = status === 'canceled';
  const hasAccess = isActive; // still active until period ends when cancel_at_period_end

  const renewsInDays = (() => {
    if (!periodEnd) return null;
    const end = new Date(periodEnd).getTime();
    if (Number.isNaN(end)) return null;
    return Math.ceil((end - Date.now()) / (24 * 60 * 60 * 1000));
  })();

  const periodDate = periodEnd ? new Date(periodEnd).toLocaleDateString() : null;

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">Billing</h1>
        <p className="text-gray-600">Annual subscription for your managed SEO site.</p>
      </div>

      {(syncing || message) && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {syncing ? 'Updating subscription status…' : message}
          {!syncing && hasAccess && (
            <span>
              {' '}
              <Link href="/dashboard" className="font-semibold underline">
                Back to overview →
              </Link>
            </span>
          )}
        </div>
      )}

      <div className="rounded-3xl border border-[#09294c]/10 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-2">
          Dedicated managed SEO site
        </p>
        <p className="text-4xl font-semibold text-[#09294c] mb-1">
          ${ANNUAL_PRICE_USD}
          <span className="text-lg text-[#09294c]/45 font-medium"> / year</span>
        </p>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          Annual managed SEO site for your tours. We build and manage the Google-facing site;
          bookings remain on Viator or GetYourGuide.
        </p>
        <p className="text-sm text-[#09294c]/75 leading-relaxed mb-4 border-t border-[#09294c]/08 pt-3">
          <span className="font-semibold text-[#09294c]">Important:</span> This is a managed
          service, not a website purchase. 2xGen owns the domain and website and may modify,
          redirect, or take down the site in accordance with the{' '}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a5f9e] hover:underline"
          >
            Terms of Service
          </a>
          .
        </p>
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        {hasAccess ? (
          <div className="space-y-3">
            {cancelAtPeriodEnd ? (
              <>
                <p className="text-sm font-medium text-amber-800">
                  Cancellation scheduled
                </p>
                <p className="text-sm text-[#09294c]">
                  Your plan cancels on{periodDate ? ` ${periodDate}` : ' the end of the paid period'}
                  {renewsInDays != null && renewsInDays > 0
                    ? ` (${renewsInDays} day${renewsInDays === 1 ? '' : 's'} left)`
                    : ''}
                  . You keep access until then; it will not renew.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-emerald-700 font-medium">Subscription active</p>
                {renewsInDays != null && (
                  <p className="text-sm text-[#09294c]">
                    {renewsInDays <= 0
                      ? 'Renews today'
                      : renewsInDays === 1
                        ? 'Plan renews in 1 day'
                        : `Plan renews in ${renewsInDays} days`}
                    {periodDate && (
                      <span className="text-gray-500"> · {periodDate}</span>
                    )}
                  </p>
                )}
              </>
            )}
            <Link href="/dashboard" className="text-sm font-semibold text-[#1a5f9e] hover:underline block">
              Open dashboard overview →
            </Link>
            <button
              type="button"
              onClick={openPortal}
              disabled={!!busy}
              className="xgen-btn xgen-btn-secondary w-full disabled:opacity-50"
            >
              {busy === 'portal' ? 'Opening…' : 'Manage billing in Stripe'}
            </button>
            <button
              type="button"
              onClick={refreshStatus}
              disabled={!!busy || syncing}
              className="w-full text-sm font-semibold text-[#1a5f9e] hover:underline disabled:opacity-50"
            >
              {busy === 'sync' ? 'Checking…' : 'Refresh status'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {isCanceled && (
              <p className="text-sm text-gray-600">
                Your subscription has ended. Subscribe again to rejoin the build queue / keep the
                managed site active for a new term.
              </p>
            )}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  if (e.target.checked) setError('');
                }}
                className="mt-1 h-4 w-4 rounded border-[#09294c]/30 text-[#1a5f9e] focus:ring-[#3d8fd1]"
              />
              <span className="text-sm text-gray-600 leading-relaxed">
                I agree to the{' '}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#1a5f9e] hover:underline"
                >
                  Terms of Service
                </a>{' '}
                and understand that 2xGen owns and operates the website and domain.
              </span>
            </label>
            <button
              type="button"
              onClick={startCheckout}
              disabled={!!busy || !acceptedTerms}
              className="xgen-btn xgen-btn-primary w-full disabled:opacity-50"
            >
              {busy === 'checkout' ? 'Redirecting…' : `Subscribe · $${ANNUAL_PRICE_USD}/year`}
            </button>
            <button
              type="button"
              onClick={refreshStatus}
              disabled={!!busy || syncing}
              className="w-full text-sm font-semibold text-[#1a5f9e] hover:underline disabled:opacity-50"
            >
              {busy === 'sync' ? 'Checking…' : 'Refresh subscription status'}
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">
        Billing questions:{' '}
        <a href="mailto:billing@2xgen.com" className="text-[#1a5f9e] hover:underline">
          billing@2xgen.com
        </a>
        . Product support:{' '}
        <a href="mailto:support@2xgen.com" className="text-[#1a5f9e] hover:underline">
          support@2xgen.com
        </a>
        .
      </p>
    </div>
  );
}

'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Plus, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { statusHint, statusLabel, ANNUAL_PRICE_USD, trackingLinkUrl } from '@/lib/saas';

const inputClass =
  'w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-white text-[#09294c] placeholder:text-gray-400 focus:outline-none focus:border-[#3d8fd1] text-base';

const STEPS = [
  { id: 'name', label: 'Name' },
  { id: 'company', label: 'Company' },
  { id: 'listings', label: 'Listings' },
  { id: 'ideas', label: 'Ideas' },
  { id: 'pay', label: 'Subscribe' },
];

function countInRange(clicks, days) {
  if (!clicks?.length) return 0;
  if (!days) return clicks.length;
  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  return clicks.filter((c) => new Date(c.clicked_at).getTime() >= since).length;
}

function parseListingUrls(text) {
  if (!text?.trim()) return [''];
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  return lines.length ? lines : [''];
}

function parseMarketplace(notes) {
  const m = String(notes || '').match(/marketplace:(viator|getyourguide)/i);
  return m ? m[1].toLowerCase() : '';
}

function marketplaceLabel(value) {
  if (value === 'getyourguide') return 'GetYourGuide';
  if (value === 'viator') return 'Viator';
  return '—';
}

function urlsMatchMarketplace(urls, marketplace) {
  if (!marketplace) return false;
  const needle = marketplace === 'viator' ? 'viator.com' : 'getyourguide.com';
  return urls.every((u) => u.toLowerCase().includes(needle));
}

function inferStep(profile, site) {
  if (!profile?.full_name?.trim()) return 0;
  if (!profile?.company?.trim() || !site?.destination?.trim()) return 1;
  if (!site?.listing_urls?.trim() || !parseMarketplace(site?.notes)) return 2;
  // Optional ideas step — land here after listings; subscribe is last
  return 3;
}

export default function DashboardOverview() {
  const { supabase, user, profile, refreshProfile } = useAuth();
  const [site, setSite] = useState(null);
  const [sub, setSub] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [stepReady, setStepReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    full_name: '',
    company: '',
    destination: '',
  });
  const [listingLinks, setListingLinks] = useState(['']);
  const [marketplace, setMarketplace] = useState(''); // 'viator' | 'getyourguide'
  const [operatorIdeas, setOperatorIdeas] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    const [{ data: siteRow }, { data: subRow }] = await Promise.all([
      supabase.from('sites').select('*').eq('profile_id', user.id).maybeSingle(),
      supabase.from('subscriptions').select('*').eq('profile_id', user.id).maybeSingle(),
    ]);
    setSite(siteRow);
    setSub(subRow);

    if (siteRow?.id && siteRow.status === 'live') {
      const { data: linkRows } = await supabase
        .from('tracking_links')
        .select('id, code, label, destination_url, active, created_at')
        .eq('site_id', siteRow.id)
        .order('created_at', { ascending: true });

      const withStats = await Promise.all(
        (linkRows || []).map(async (link) => {
          const { data: clicks } = await supabase
            .from('link_clicks')
            .select('clicked_at')
            .eq('tracking_link_id', link.id);
          return { ...link, clicks: clicks || [] };
        })
      );
      setLinks(withStats);
    } else {
      setLinks([]);
    }

    setLoading(false);
  }, [supabase, user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setForm({
      full_name: profile?.full_name || '',
      company: profile?.company || '',
      destination: site?.destination || '',
    });
    setListingLinks(parseListingUrls(site?.listing_urls));
    setMarketplace(parseMarketplace(site?.notes));
    setOperatorIdeas(site?.operator_ideas || '');
    if (!stepReady && profile && site !== undefined && !loading) {
      setStep(inferStep(profile, site));
      setStepReady(true);
    }
  }, [profile, site, loading, stepReady]);

  const filledListings = useMemo(
    () => listingLinks.map((l) => l.trim()).filter(Boolean),
    [listingLinks]
  );

  const persistPartial = async (patchProfile = null, patchSite = null) => {
    if (!user?.id || !site?.id) throw new Error('Account not ready yet. Refresh and try again.');

    if (patchProfile) {
      const { error: profileErr } = await supabase
        .from('profiles')
        .update({ ...patchProfile, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      if (profileErr) throw profileErr;
    }

    if (patchSite) {
      const { error: siteErr } = await supabase
        .from('sites')
        .update({ ...patchSite, updated_at: new Date().toISOString() })
        .eq('id', site.id);
      if (siteErr) throw siteErr;
    }

    await refreshProfile(user);
    await load();
  };

  const goNext = async () => {
    setError('');
    setSaving(true);
    try {
      if (step === 0) {
        if (!form.full_name.trim()) throw new Error('Enter your name to continue.');
        await persistPartial({ full_name: form.full_name.trim() });
      } else if (step === 1) {
        if (!form.company.trim()) throw new Error('Enter your company or tour brand.');
        if (!form.destination.trim()) throw new Error('Enter your destination.');
        await persistPartial(
          { company: form.company.trim() },
          { destination: form.destination.trim() }
        );
      } else if (step === 2) {
        if (!marketplace) {
          throw new Error('Choose Viator or GetYourGuide.');
        }
        if (filledListings.length === 0) {
          throw new Error(`Add at least one ${marketplaceLabel(marketplace)} listing URL.`);
        }
        if (!urlsMatchMarketplace(filledListings, marketplace)) {
          throw new Error(
            marketplace === 'viator'
              ? 'Use Viator listing URLs only (viator.com).'
              : 'Use GetYourGuide listing URLs only (getyourguide.com).'
          );
        }
        await persistPartial(null, {
          listing_urls: filledListings.join('\n'),
          notes: `marketplace:${marketplace}`,
        });
      } else if (step === 3) {
        await persistPartial(null, {
          operator_ideas: operatorIdeas.trim() || null,
        });
      }
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    } catch (e) {
      setError(e.message || 'Could not save.');
    } finally {
      setSaving(false);
    }
  };

  const startCheckout = async () => {
    if (!acceptedTerms) {
      setError('Please agree to the Terms of Service to continue.');
      return;
    }
    setCheckoutBusy(true);
    setError('');
    try {
      // Ensure latest details are saved before pay
      await persistPartial(
        {
          full_name: form.full_name.trim(),
          company: form.company.trim(),
        },
        {
          destination: form.destination.trim(),
          listing_urls: filledListings.join('\n'),
          notes: marketplace ? `marketplace:${marketplace}` : site?.notes || null,
          operator_ideas: operatorIdeas.trim() || null,
        }
      );
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Checkout failed');
      window.location.href = json.url;
    } catch (e) {
      setError(e.message);
      setCheckoutBusy(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading…</p>;
  }

  const status =
    site?.status === 'waitlist' && sub?.status === 'active'
      ? 'queued'
      : site?.status || 'waitlist';
  const isLive = status === 'live';
  const siteHref = site?.public_url || (site?.domain ? `https://${site.domain}` : null);

  if (isLive) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">
            Hello{profile?.full_name ? `, ${profile.full_name}` : ''}
          </h1>
          <p className="text-gray-600">Your live site and booking-link performance.</p>
        </div>

        {sub?.status === 'active' && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Subscription active
            {sub.current_period_end
              ? ` · renews/ends ${new Date(sub.current_period_end).toLocaleDateString()}`
              : ''}
          </div>
        )}

        <div className="rounded-3xl border border-[#09294c]/10 bg-white overflow-hidden shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 pt-5 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-1">
                Your site
              </p>
              <p className="text-lg font-semibold text-[#09294c]">
                {site.domain || site.destination || 'Live site'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          </div>

          {site.screenshot_url ? (
            <div className="relative mx-5 sm:mx-6 mb-4 rounded-2xl overflow-hidden border border-[#09294c]/10 bg-[#f3f7fb] aspect-[16/10]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.screenshot_url}
                alt={site.domain ? `Preview of ${site.domain}` : 'Your live site preview'}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          ) : (
            <div className="mx-5 sm:mx-6 mb-4 rounded-2xl border border-dashed border-[#09294c]/15 bg-[#f8fafc] aspect-[16/10] flex items-center justify-center px-6 text-center">
              <p className="text-sm text-gray-500">
                Site preview will appear here once we add your screenshot.
              </p>
            </div>
          )}

          <div className="px-5 sm:px-6 pb-5">
            {siteHref ? (
              <a
                href={siteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a5f9e] hover:underline break-all"
              >
                {site.public_url || site.domain}
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            ) : (
              <p className="text-sm text-gray-500">Website link coming soon.</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-2 mb-3">
            <div>
              <h2 className="text-lg font-semibold text-[#09294c]">Link clicks</h2>
              <p className="text-sm text-gray-600">Clicks on tracked booking links on your site.</p>
            </div>
            <Link href="/dashboard/links" className="text-sm font-semibold text-[#1a5f9e] hover:underline">
              Full links page →
            </Link>
          </div>

          {links.length === 0 ? (
            <p className="text-sm text-gray-500 rounded-2xl border border-[#09294c]/10 bg-white px-4 py-5">
              No tracking links yet — we&apos;ll add them with your live site.
            </p>
          ) : (
            <div className="space-y-4">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="rounded-3xl border border-[#09294c]/10 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4">
                    <p className="font-semibold text-[#09294c]">{link.label}</p>
                    <p className="text-xs text-gray-500 break-all mt-1">{trackingLinkUrl(link.code)}</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: '7 days', days: 7 },
                      { label: '30 days', days: 30 },
                      { label: '90 days', days: 90 },
                      { label: 'All time', days: null },
                    ].map((r) => (
                      <div key={r.label} className="rounded-2xl bg-[#f3f7fb] px-3 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#09294c]/45">
                          {r.label}
                        </p>
                        <p className="text-xl font-semibold text-[#09294c]">
                          {countInRange(link.clicks, r.days)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Paid but not live yet
  if (status !== 'waitlist') {
    return (
      <div className="space-y-6 max-w-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">
            Hello{profile?.full_name ? `, ${profile.full_name}` : ''}
          </h1>
          <p className="text-gray-600">We&apos;re on it — your site is in progress.</p>
        </div>
        <div className="rounded-3xl border border-[#09294c]/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-2">
            Site status
          </p>
          <p className="text-2xl font-semibold text-[#09294c] mb-2">{statusLabel(status)}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{statusHint(status)}</p>
          {(site?.destination || site?.listing_urls) && (
            <div className="mt-4 pt-4 border-t border-[#09294c]/08 space-y-2 text-sm text-gray-600">
              {site.destination && (
                <p>
                  Destination:{' '}
                  <span className="font-medium text-[#09294c]">{site.destination}</span>
                </p>
              )}
              {profile?.company && (
                <p>
                  Brand:{' '}
                  <span className="font-medium text-[#09294c]">{profile.company}</span>
                </p>
              )}
            </div>
          )}
        </div>
        {sub?.status === 'active' && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Subscription active — payment received.
          </div>
        )}
      </div>
    );
  }

  // Waitlist: multi-step → subscribe
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-2">
          Onboarding · Step {step + 1} of {STEPS.length}
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
          {step === 0 && 'What’s your name?'}
          {step === 1 && 'Your tour brand'}
          {step === 2 && 'Your listing URLs'}
          {step === 3 && 'Any ideas for the site?'}
          {step === 4 && 'Complete your subscription'}
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          {step < 4
            ? 'Complete onboarding so we know who you are and which tours to feature.'
            : 'Confirm your details and subscribe. We start building after payment — your live site and click dashboard unlock at launch.'}
        </p>
      </div>

      {/* Progress */}
      <ol className="flex gap-2">
        {STEPS.map((s, i) => (
          <li key={s.id} className="flex-1">
            <button
              type="button"
              disabled={i > step}
              onClick={() => i <= step && setStep(i)}
              className={`w-full h-1.5 rounded-full transition-colors ${
                i <= step ? 'bg-[#3d8fd1]' : 'bg-[#09294c]/10'
              }`}
              aria-label={`Step ${i + 1}: ${s.label}`}
            />
            <p
              className={`mt-1.5 text-[10px] sm:text-xs font-medium truncate ${
                i === step ? 'text-[#09294c]' : 'text-[#09294c]/40'
              }`}
            >
              {s.label}
            </p>
          </li>
        ))}
      </ol>

      <div className="rounded-3xl border border-[#09294c]/10 bg-white p-5 sm:p-6 shadow-sm space-y-4">
        {step === 0 && (
          <>
            <label className="block text-sm font-medium text-[#09294c]">
              Full name
              <input
                autoFocus
                required
                placeholder="Your name"
                value={form.full_name}
                onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), goNext())}
                className={`${inputClass} mt-2`}
              />
            </label>
          </>
        )}

        {step === 1 && (
          <>
            <label className="block text-sm font-medium text-[#09294c]">
              Company / tour brand
              <input
                autoFocus
                required
                placeholder="e.g. Prague Old Town Tours, Miami Boat Charters"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className={`${inputClass} mt-2`}
              />
            </label>
            <label className="block text-sm font-medium text-[#09294c]">
              Destination
              <input
                required
                placeholder="e.g. Prague, Miami, Aruba"
                value={form.destination}
                onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), goNext())}
                className={`${inputClass} mt-2`}
              />
            </label>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-gray-600">
              Choose one marketplace, then paste your listing URL(s). We&apos;ll point booking links
              there.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'viator', label: 'Viator' },
                { id: 'getyourguide', label: 'GetYourGuide' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMarketplace(opt.id)}
                  className={`rounded-2xl border px-4 py-3.5 text-sm font-semibold transition-colors ${
                    marketplace === opt.id
                      ? 'border-[#3d8fd1] bg-[#e8f1f8] text-[#09294c]'
                      : 'border-[#09294c]/12 bg-white text-[#09294c]/60 hover:border-[#09294c]/25'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {marketplace && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                  {marketplaceLabel(marketplace)} listing URLs
                </p>
                {listingLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      autoFocus={index === 0}
                      required={index === 0}
                      placeholder={
                        marketplace === 'viator'
                          ? index === 0
                            ? 'https://www.viator.com/…'
                            : `Another Viator URL (${index + 1})`
                          : index === 0
                            ? 'https://www.getyourguide.com/…'
                            : `Another GetYourGuide URL (${index + 1})`
                      }
                      value={link}
                      onChange={(e) =>
                        setListingLinks((prev) =>
                          prev.map((l, i) => (i === index ? e.target.value : l))
                        )
                      }
                      className={inputClass}
                    />
                    {listingLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setListingLinks((prev) => prev.filter((_, i) => i !== index))
                        }
                        className="shrink-0 px-3 rounded-2xl border border-[#09294c]/12 text-gray-400 hover:text-red-600"
                        aria-label="Remove URL"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setListingLinks((prev) => [...prev, ''])}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a5f9e]"
                >
                  <Plus className="w-4 h-4" />
                  Add another listing
                </button>
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-sm text-gray-600">
              Optional — anything you&apos;d like us to consider when we build your site. Skip if
              you&apos;re happy for us to decide from your listings.
            </p>
            <label className="block text-sm font-medium text-[#09294c]">
              Ideas &amp; suggestions
              <textarea
                autoFocus
                rows={5}
                placeholder={
                  'e.g. Highlight the sunset sail and private charter\nPrefer a clean, simple look\nMention “family-friendly” and hotel pickup\nAvoid competitor names'
                }
                value={operatorIdeas}
                onChange={(e) => setOperatorIdeas(e.target.value)}
                className={`${inputClass} mt-2 resize-y min-h-[120px]`}
              />
            </label>
            <p className="text-xs text-gray-500 leading-relaxed">
              Examples: tours to feature first, tone of voice, FAQs, or things to avoid. We may or
              may not use your suggestions in the build — no guarantee they will be included.
            </p>
          </>
        )}

        {step === 4 && (
          <>
            <div className="rounded-2xl bg-[#f3f7fb] px-4 py-4 space-y-2 text-sm">
              <p>
                <span className="text-[#09294c]/45">Name</span>
                <br />
                <span className="font-medium text-[#09294c]">{form.full_name || '—'}</span>
              </p>
              <p>
                <span className="text-[#09294c]/45">Brand</span>
                <br />
                <span className="font-medium text-[#09294c]">{form.company || '—'}</span>
              </p>
              <p>
                <span className="text-[#09294c]/45">Destination</span>
                <br />
                <span className="font-medium text-[#09294c]">{form.destination || '—'}</span>
              </p>
              <p>
                <span className="text-[#09294c]/45">Marketplace</span>
                <br />
                <span className="font-medium text-[#09294c]">
                  {marketplaceLabel(marketplace)}
                </span>
              </p>
              <p>
                <span className="text-[#09294c]/45">Listings</span>
                <br />
                <span className="font-medium text-[#09294c] break-all">
                  {filledListings.length
                    ? filledListings.map((u) => (
                        <span key={u} className="block">
                          {u}
                        </span>
                      ))
                    : '—'}
                </span>
              </p>
              {operatorIdeas.trim() && (
                <p>
                  <span className="text-[#09294c]/45">Ideas</span>
                  <br />
                  <span className="font-medium text-[#09294c] whitespace-pre-wrap">
                    {operatorIdeas.trim()}
                  </span>
                </p>
              )}
              <button
                type="button"
                onClick={() => setStep(0)}
                className="text-xs font-semibold text-[#1a5f9e] hover:underline pt-1"
              >
                Edit details
              </button>
            </div>

            <div className="rounded-2xl border border-[#09294c]/12 px-4 py-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1]">
                Dedicated managed SEO site
              </p>
              <p className="text-3xl font-semibold text-[#09294c]">
                ${ANNUAL_PRICE_USD}
                <span className="text-base font-medium text-[#09294c]/45"> / year</span>
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Annual managed SEO site for your tours. We build and manage the Google-facing site;
                bookings remain on{' '}
                {marketplaceLabel(marketplace) === '—'
                  ? 'Viator or GetYourGuide'
                  : marketplaceLabel(marketplace)}
                .
              </p>
              <p className="text-sm text-[#09294c]/75 leading-relaxed border-t border-[#09294c]/08 pt-3">
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
            </div>

            <label className="flex items-start gap-3 px-1 py-1 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  if (e.target.checked) setError('');
                }}
                className="mt-0.5 h-4 w-4 rounded border-[#09294c]/30 text-[#1a5f9e] focus:ring-[#3d8fd1]"
              />
              <span className="text-sm text-gray-500 leading-relaxed">
                I agree to the{' '}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a5f9e] hover:underline"
                >
                  Terms of Service
                </a>{' '}
                and understand that 2xGen owns and operates the website and domain.
              </span>
            </label>
          </>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-wrap gap-3 pt-1">
          {step > 0 && (
            <button
              type="button"
              onClick={() => {
                setError('');
                setStep((s) => s - 1);
              }}
              className="xgen-btn border border-[#09294c]/15 text-[#09294c]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={saving}
              className="xgen-btn xgen-btn-primary flex-1 sm:flex-none disabled:opacity-50"
            >
              {saving
                ? 'Saving…'
                : step === 3 && !operatorIdeas.trim()
                  ? 'Skip for now'
                  : 'Continue'}
              {!saving && <ArrowRight className="w-4 h-4" />}
            </button>
          ) : (
            <button
              type="button"
              onClick={startCheckout}
              disabled={
                checkoutBusy ||
                !acceptedTerms ||
                filledListings.length === 0 ||
                !form.full_name.trim()
              }
              className="xgen-btn xgen-btn-primary flex-1 disabled:opacity-50"
            >
              {checkoutBusy
                ? 'Redirecting to payment…'
                : `Complete payment · $${ANNUAL_PRICE_USD}/year`}
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 leading-relaxed px-2">
        Finish onboarding and payment to start your site build. Your live site and click dashboard
        unlock when we launch.
      </p>
    </div>
  );
}

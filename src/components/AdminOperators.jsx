'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, ExternalLink, LogOut, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { statusLabel, trackingLinkUrl } from '@/lib/saas';

function randomCode(len = 8) {
  const alphabet = 'abcdefghijkmnopqrstuvwxyz23456789';
  let out = '';
  for (let i = 0; i < len; i += 1) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

const TABS = [
  { id: 'status', label: 'Status' },
  { id: 'details', label: 'Site details' },
  { id: 'links', label: 'Tracking links' },
];

function liveChecklist(site, links) {
  return [
    { id: 'destination', label: 'Destination', ok: Boolean(site?.destination?.trim()) },
    { id: 'listing_urls', label: 'Listing URLs', ok: Boolean(site?.listing_urls?.trim()) },
    { id: 'domain', label: 'Domain', ok: Boolean(site?.domain?.trim()) },
    {
      id: 'public_url',
      label: 'Public URL',
      ok: Boolean(site?.public_url?.trim()?.startsWith('http')),
    },
    {
      id: 'screenshot_url',
      label: 'Screenshot URL',
      ok: Boolean(site?.screenshot_url?.trim()?.startsWith('http')),
    },
    { id: 'links', label: 'At least one tracking link', ok: (links || []).length > 0 },
  ];
}

export default function AdminOperators() {
  const { supabase, logout } = useAuth();
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [links, setLinks] = useState([]);
  const [linkForm, setLinkForm] = useState({ label: '', destination_url: '', code: '' });
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('status');
  const [form, setForm] = useState({
    destination: '',
    listing_urls: '',
    domain: '',
    public_url: '',
    screenshot_url: '',
  });

  const load = async () => {
    setLoading(true);
    setError('');
    const { data, error: err } = await supabase
      .from('sites')
      .select('*, profiles(id, email, full_name, company)')
      .order('created_at', { ascending: false });
    if (err) {
      setError(err.message);
      setSites([]);
    } else {
      setSites(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const checklist = useMemo(() => liveChecklist(selected, links), [selected, links]);
  const liveReady = checklist.every((c) => c.ok);
  const missingLive = checklist.filter((c) => !c.ok);

  const updateSite = async (id, patch) => {
    setSaving(true);
    setError('');
    const { error: err } = await supabase
      .from('sites')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', id);
    setSaving(false);
    if (err) {
      setError(err.message);
      return false;
    }
    if (patch.status) {
      fetch('/api/notify-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId: id, status: patch.status }),
      }).catch(() => {});
    }
    await load();
    if (selected?.id === id) {
      setSelected((s) => ({ ...s, ...patch }));
    }
    return true;
  };

  const openSite = async (site) => {
    setSelected(site);
    setTab(site.status === 'building' || site.status === 'live' ? 'details' : 'status');
    setForm({
      destination: site.destination || '',
      listing_urls: site.listing_urls || '',
      domain: site.domain || '',
      public_url: site.public_url || '',
      screenshot_url: site.screenshot_url || '',
    });
    setLinkForm({ label: 'Booking link', destination_url: '', code: randomCode() });
    const { data } = await supabase
      .from('tracking_links')
      .select('*')
      .eq('site_id', site.id)
      .order('created_at', { ascending: true });
    setLinks(data || []);
  };

  const saveDetails = async (e) => {
    e.preventDefault();
    if (!selected) return;
    const ok = await updateSite(selected.id, {
      destination: form.destination.trim(),
      listing_urls: form.listing_urls.trim(),
      domain: form.domain.trim(),
      public_url: form.public_url.trim(),
      screenshot_url: form.screenshot_url.trim(),
    });
    if (ok) setTab('links');
  };

  const setStatus = async (status) => {
    if (!selected) return;
    if (status === 'live' && !liveReady) {
      setError('Fill Site details and add tracking links before setting Live.');
      setTab(missingLive.some((m) => m.id === 'links') ? 'links' : 'details');
      return;
    }
    await updateSite(selected.id, { status });
    if (status === 'building') setTab('details');
  };

  const addLink = async (e) => {
    e.preventDefault();
    if (!selected) return;
    setSaving(true);
    setError('');
    const code = (linkForm.code || randomCode()).trim().toLowerCase();
    const { error: err } = await supabase.from('tracking_links').insert({
      site_id: selected.id,
      code,
      label: linkForm.label.trim() || 'Booking link',
      destination_url: linkForm.destination_url.trim(),
      active: true,
    });
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    const refreshed = sites.find((s) => s.id === selected.id) || selected;
    await openSite({ ...refreshed, ...selected });
  };

  const removeLink = async (id) => {
    if (!confirm('Delete this tracking link?')) return;
    await supabase.from('tracking_links').delete().eq('id', id);
    if (selected) await openSite(selected);
  };

  return (
    <div className="min-h-screen bg-[#f3f7fb]">
      <header className="bg-white border-b border-[#09294c]/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[#09294c]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              2xGen Admin
            </span>
            <Link href="/admin/microsites" className="text-sm text-[#09294c]/60 hover:text-[#09294c]">
              Network sites
            </Link>
            <Link href="/admin/operators" className="text-sm font-semibold text-[#09294c]">
              Operators
            </Link>
            <Link href="/admin/links" className="text-sm text-[#09294c]/60 hover:text-[#09294c]">
              Tracking links
            </Link>
          </div>
          <button
            type="button"
            onClick={() => logout()}
            className="inline-flex items-center gap-1.5 text-sm text-[#09294c]/60 hover:text-[#09294c]"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-6">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Operators & sites</h1>
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          {loading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : sites.length === 0 ? (
            <p className="text-sm text-gray-500">No operator sites yet.</p>
          ) : (
            <div className="space-y-3">
              {sites.map((site) => (
                <button
                  key={site.id}
                  type="button"
                  onClick={() => openSite(site)}
                  className={`w-full text-left rounded-2xl border bg-white p-4 transition-colors ${
                    selected?.id === site.id
                      ? 'border-[#3d8fd1] shadow-sm'
                      : 'border-[#09294c]/10 hover:border-[#09294c]/25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-[#09294c] truncate">
                        {site.profiles?.company || site.profiles?.full_name || site.profiles?.email}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{site.profiles?.email}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {site.destination || 'No destination'} · {statusLabel(site.status)}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-[#3d8fd1] shrink-0">
                      {site.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {!selected ? (
            <p className="text-sm text-gray-500 mt-12">Select an operator to manage.</p>
          ) : (
            <div className="space-y-4">
              <div className="rounded-3xl border border-[#09294c]/10 bg-white p-5">
                <h2 className="font-semibold text-[#09294c] mb-1">{selected.profiles?.email}</h2>
                <p className="text-sm text-gray-500 mb-4">
                  {selected.profiles?.company || selected.profiles?.full_name || 'Operator'} ·{' '}
                  <span className="font-medium text-[#09294c]">{statusLabel(selected.status)}</span>
                </p>

                <div className="flex gap-1 p-1 rounded-xl bg-[#f3f7fb] mb-5">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTab(t.id)}
                      className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-colors ${
                        tab === t.id
                          ? 'bg-white text-[#09294c] shadow-sm'
                          : 'text-[#09294c]/50 hover:text-[#09294c]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {tab === 'status' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Move the operator through the queue here. Fill <strong>Site details</strong> and{' '}
                      <strong>Tracking links</strong> while status is Building — then set Live.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        { status: 'waitlist', label: 'Waitlist' },
                        { status: 'queued', label: 'Queued' },
                        { status: 'building', label: 'Building' },
                      ].map((s) => (
                        <button
                          key={s.status}
                          type="button"
                          disabled={saving || selected.status === s.status}
                          onClick={() => setStatus(s.status)}
                          className={`rounded-xl border px-3 py-2.5 text-sm font-semibold disabled:opacity-50 ${
                            selected.status === s.status
                              ? 'border-[#3d8fd1] bg-[#e8f1f8] text-[#09294c]'
                              : 'border-[#09294c]/12 text-[#09294c] hover:border-[#09294c]/25'
                          }`}
                        >
                          Set {s.label}
                        </button>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-[#09294c]/10 bg-[#f8fafc] p-4 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                        Ready for Live
                      </p>
                      {checklist.map((c) => (
                        <div key={c.id} className="flex items-center gap-2 text-sm">
                          <span
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${
                              c.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-[#09294c]/08 text-[#09294c]/35'
                            }`}
                          >
                            <Check className="w-3 h-3" />
                          </span>
                          <span className={c.ok ? 'text-[#09294c]' : 'text-gray-500'}>{c.label}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={saving || !liveReady || selected.status === 'live'}
                      onClick={() => setStatus('live')}
                      className="xgen-btn xgen-btn-primary w-full disabled:opacity-50"
                    >
                      {selected.status === 'live'
                        ? 'Already live'
                        : liveReady
                          ? 'Set status to Live'
                          : `Set to Live (complete ${missingLive.length} item${missingLive.length === 1 ? '' : 's'})`}
                    </button>
                    {!liveReady && (
                      <p className="text-xs text-gray-500 text-center">
                        Missing: {missingLive.map((m) => m.label).join(', ')}
                      </p>
                    )}
                  </div>
                )}

                {tab === 'details' && (
                  <form onSubmit={saveDetails} className="space-y-3">
                    <p className="text-sm text-gray-600 mb-1">
                      Complete these while the site is <strong>Building</strong>.
                    </p>
                    <label className="block text-xs font-semibold uppercase text-[#09294c]/45">
                      Destination
                      <input
                        value={form.destination}
                        onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
                        className="mt-1 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 font-normal normal-case"
                        placeholder="Prague, Aruba, …"
                      />
                    </label>
                    <label className="block text-xs font-semibold uppercase text-[#09294c]/45">
                      Listing URLs
                      <textarea
                        value={form.listing_urls}
                        onChange={(e) => setForm((f) => ({ ...f, listing_urls: e.target.value }))}
                        rows={3}
                        className="mt-1 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 font-normal normal-case text-sm"
                        placeholder="One Viator/GYG URL per line"
                      />
                    </label>
                    <label className="block text-xs font-semibold uppercase text-[#09294c]/45">
                      Domain
                      <input
                        value={form.domain}
                        onChange={(e) => setForm((f) => ({ ...f, domain: e.target.value }))}
                        className="mt-1 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 font-normal normal-case"
                        placeholder="example.fun"
                      />
                    </label>
                    <label className="block text-xs font-semibold uppercase text-[#09294c]/45">
                      Public URL
                      <input
                        value={form.public_url}
                        onChange={(e) => setForm((f) => ({ ...f, public_url: e.target.value }))}
                        className="mt-1 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 font-normal normal-case"
                        placeholder="https://…"
                      />
                    </label>
                    <label className="block text-xs font-semibold uppercase text-[#09294c]/45">
                      Screenshot URL
                      <input
                        value={form.screenshot_url}
                        onChange={(e) => setForm((f) => ({ ...f, screenshot_url: e.target.value }))}
                        className="mt-1 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 font-normal normal-case"
                        placeholder="https://… (shown in operator dashboard)"
                      />
                    </label>
                    {form.screenshot_url.startsWith('http') && (
                      <div className="rounded-xl overflow-hidden border border-[#09294c]/10 aspect-video bg-[#f3f7fb]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={form.screenshot_url}
                          alt="Site screenshot preview"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={saving}
                      className="xgen-btn xgen-btn-primary w-full disabled:opacity-50"
                    >
                      {saving ? 'Saving…' : 'Save details → Tracking links'}
                    </button>
                  </form>
                )}

                {tab === 'links' && (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      Add booking redirects for the live site. At least one is required before Live.
                    </p>
                    <ul className="space-y-3 mb-4">
                      {links.map((link) => (
                        <li
                          key={link.id}
                          className="flex items-start justify-between gap-2 rounded-xl bg-[#f3f7fb] px-3 py-2.5"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-[#09294c]">{link.label}</p>
                            <a
                              href={trackingLinkUrl(link.code)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#1a5f9e] break-all inline-flex items-center gap-1"
                            >
                              {trackingLinkUrl(link.code)}
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLink(link.id)}
                            className="text-gray-400 hover:text-red-600"
                            aria-label="Delete link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    {links.length === 0 && (
                      <p className="text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 mb-3">
                        No tracking links yet — add one before setting Live.
                      </p>
                    )}
                    <form onSubmit={addLink} className="space-y-2">
                      <input
                        required
                        placeholder="Label"
                        value={linkForm.label}
                        onChange={(e) => setLinkForm((f) => ({ ...f, label: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12"
                      />
                      <input
                        required
                        placeholder="Viator / GYG destination URL"
                        value={linkForm.destination_url}
                        onChange={(e) =>
                          setLinkForm((f) => ({ ...f, destination_url: e.target.value }))
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12"
                      />
                      <input
                        required
                        placeholder="Short code"
                        value={linkForm.code}
                        onChange={(e) => setLinkForm((f) => ({ ...f, code: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12"
                      />
                      <button
                        type="submit"
                        disabled={saving}
                        className="xgen-btn xgen-btn-primary w-full disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                        Add tracking link
                      </button>
                    </form>
                    {liveReady && selected.status === 'building' && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => {
                          setTab('status');
                          setStatus('live');
                        }}
                        className="mt-4 xgen-btn w-full border border-emerald-200 bg-emerald-50 text-emerald-800 disabled:opacity-50"
                      >
                        All set — Set status to Live
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

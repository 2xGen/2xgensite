'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, LogOut, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { statusLabel, trackingLinkUrl } from '@/lib/saas';

function countInRange(clicks, days) {
  if (!clicks?.length) return 0;
  if (!days) return clicks.length;
  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  return clicks.filter((c) => new Date(c.clicked_at).getTime() >= since).length;
}

export default function AdminTrackingLinks() {
  const { supabase, logout } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      const { data: links, error: err } = await supabase
        .from('tracking_links')
        .select(
          'id, code, label, destination_url, active, created_at, sites(id, domain, destination, status, profiles(email, full_name, company))'
        )
        .order('created_at', { ascending: false });

      if (err) {
        if (!cancelled) {
          setError(err.message);
          setRows([]);
          setLoading(false);
        }
        return;
      }

      const withStats = await Promise.all(
        (links || []).map(async (link) => {
          const { data: clicks } = await supabase
            .from('link_clicks')
            .select('clicked_at')
            .eq('tracking_link_id', link.id);
          return { ...link, clicks: clicks || [] };
        })
      );

      if (!cancelled) {
        setRows(withStats);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((link) => {
      const site = link.sites;
      const profile = site?.profiles;
      const hay = [
        link.code,
        link.label,
        link.destination_url,
        site?.domain,
        site?.destination,
        profile?.email,
        profile?.full_name,
        profile?.company,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [rows, q]);

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
            <Link href="/admin/operators" className="text-sm text-[#09294c]/60 hover:text-[#09294c]">
              Operators
            </Link>
            <Link href="/admin/links" className="text-sm font-semibold text-[#09294c]">
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#09294c]">Tracking links</h1>
            <p className="text-sm text-gray-600 mt-1">
              All <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-[#09294c]/10">/go/[code]</code>{' '}
              booking redirects across operators.
            </p>
          </div>
          <label className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search code, operator, domain…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#09294c]/12 bg-white text-sm"
            />
          </label>
        </div>

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-500">
            {rows.length === 0 ? 'No tracking links yet.' : 'No links match your search.'}
          </p>
        ) : (
          <div className="space-y-3">
            {filtered.map((link) => {
              const site = link.sites;
              const profile = site?.profiles;
              const operator =
                profile?.company || profile?.full_name || profile?.email || 'Unknown operator';
              return (
                <div
                  key={link.id}
                  className="rounded-2xl border border-[#09294c]/10 bg-white p-4 sm:p-5 shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-semibold text-[#09294c]">{link.label}</p>
                        {!link.active && (
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                            Inactive
                          </span>
                        )}
                        {site?.status && (
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#1a5f9e] bg-[#1a5f9e]/10 px-2 py-0.5 rounded">
                            {statusLabel(site.status)}
                          </span>
                        )}
                      </div>
                      <a
                        href={trackingLinkUrl(link.code)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#1a5f9e] break-all inline-flex items-center gap-1"
                      >
                        {trackingLinkUrl(link.code)}
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                      <p className="text-xs text-gray-500 break-all mt-1">→ {link.destination_url}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {operator}
                        {site?.domain ? ` · ${site.domain}` : ''}
                        {site?.destination ? ` · ${site.destination}` : ''}
                      </p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 shrink-0 lg:w-72">
                      {[
                        { label: '7d', days: 7 },
                        { label: '30d', days: 30 },
                        { label: '90d', days: 90 },
                        { label: 'All', days: null },
                      ].map((r) => (
                        <div key={r.label} className="rounded-xl bg-[#f3f7fb] px-2 py-2 text-center">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#09294c]/45">
                            {r.label}
                          </p>
                          <p className="text-lg font-semibold text-[#09294c]">
                            {countInRange(link.clicks, r.days)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

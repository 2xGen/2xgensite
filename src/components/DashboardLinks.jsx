'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { trackingLinkUrl } from '@/lib/saas';

function countInRange(clicks, days) {
  if (!clicks?.length) return 0;
  if (!days) return clicks.length;
  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  return clicks.filter((c) => new Date(c.clicked_at).getTime() >= since).length;
}

export default function DashboardLinks() {
  const { supabase, user } = useAuth();
  const [rows, setRows] = useState([]);
  const [siteStatus, setSiteStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user?.id) return;
      setLoading(true);
      const { data: site } = await supabase
        .from('sites')
        .select('id, status')
        .eq('profile_id', user.id)
        .maybeSingle();
      if (!site) {
        if (!cancelled) {
          setRows([]);
          setSiteStatus(null);
          setLoading(false);
        }
        return;
      }
      setSiteStatus(site.status);

      const { data: links } = await supabase
        .from('tracking_links')
        .select('id, code, label, destination_url, active, created_at')
        .eq('site_id', site.id)
        .order('created_at', { ascending: true });

      const withStats = await Promise.all(
        (links || []).map(async (link) => {
          const { data: clicks } = await supabase
            .from('link_clicks')
            .select('clicked_at')
            .eq('tracking_link_id', link.id);
          return {
            ...link,
            clicks: clicks || [],
          };
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
  }, [supabase, user?.id]);

  if (loading) return <p className="text-sm text-gray-500">Loading…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">Tracked links</h1>
        <p className="text-gray-600">
          Booking redirects we place on your site. Clicks are logged when travelers open them.
        </p>
      </div>

      {siteStatus !== 'live' && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Links and stats appear fully once your site status is <strong>Live</strong>. You can still
          see any links we&apos;ve already assigned.
        </div>
      )}

      {rows.length === 0 ? (
        <p className="text-sm text-gray-500">No tracking links yet. We&apos;ll add them when your site goes live.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((link) => (
            <div
              key={link.id}
              className="rounded-3xl border border-[#09294c]/10 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <p className="font-semibold text-[#09294c]">{link.label}</p>
                  <p className="text-xs text-gray-500 break-all mt-1">{trackingLinkUrl(link.code)}</p>
                  <p className="text-xs text-gray-400 break-all mt-1">→ {link.destination_url}</p>
                </div>
                {!link.active && (
                  <span className="text-xs font-semibold uppercase text-gray-400">Inactive</span>
                )}
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
  );
}

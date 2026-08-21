'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, ExternalLink, LogOut } from 'lucide-react';
import {
  listMicrosites,
  createMicrosite,
  updateMicrosite,
  deleteMicrosite,
} from '@/services/micrositeService';
import { FALLBACK_MICROSITES } from '@/data/microsites';
import { useAuth } from '@/contexts/AuthContext';

const emptyForm = {
  domain: '',
  url: '',
  category: '',
  destination: '',
  title: '',
  blurb: '',
  featured: true,
  sort_order: 0,
};

export default function AdminMicrosites() {
  const { logout } = useAuth();
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listMicrosites();
      const isFallback = data.length > 0 && String(data[0].id).startsWith('fallback-');
      setUsingFallback(isFallback);
      setSites(data);
    } catch (e) {
      console.error(e);
      setSites(FALLBACK_MICROSITES);
      setUsingFallback(true);
      setError('Could not load from Supabase. Showing fallback list. Run tour_microsites.sql.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const openEdit = (site) => {
    if (String(site.id).startsWith('fallback-')) {
      setError('Fallback items are read-only until Supabase table is live. Run the SQL, then add sites here.');
      return;
    }
    setEditing(site);
    setForm({
      domain: site.domain || '',
      url: site.url || '',
      category: site.category || '',
      destination: site.destination || '',
      title: site.title || '',
      blurb: site.blurb || '',
      featured: site.featured !== false,
      sort_order: site.sort_order ?? 0,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usingFallback && !editing) {
      setError('Run supabase/tour_microsites.sql first so inserts can be saved.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (editing) {
        await updateMicrosite(editing.id, form);
      } else {
        await createMicrosite(form);
      }
      setIsFormOpen(false);
      setEditing(null);
      setForm(emptyForm);
      await load();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Save failed. Check Supabase table + RLS policies.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (site) => {
    if (String(site.id).startsWith('fallback-')) return;
    if (!confirm(`Delete ${site.domain}?`)) return;
    try {
      await deleteMicrosite(site.id);
      await load();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Delete failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#09294c] text-white px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-white/50 uppercase tracking-wide">Admin</p>
          <h1 className="text-lg font-semibold">Tour microsites</h1>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" className="text-sm text-white/70 hover:text-white px-3 py-2">
            View site
          </a>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white px-3 py-2"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-sm text-gray-500">
              Add domain, category, destination — shown on the homepage Live Projects grid.
            </p>
            {usingFallback && (
              <p className="text-sm text-amber-700 mt-1">
                Supabase empty or offline — run <code className="text-xs">supabase/tour_microsites.sql</code>
              </p>
            )}
          </div>
          <button type="button" onClick={openCreate} className="xgen-btn xgen-btn-primary !py-2.5 !px-4 text-sm">
            <Plus className="w-4 h-4" />
            Add microsite
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : (
          <div className="space-y-3">
            {sites.map((site) => (
              <div
                key={site.id}
                className="rounded-2xl bg-white border border-[#09294c]/10 px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-[#09294c]">{site.domain}</p>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md bg-[#e8f1f8] text-[#1a5f9e]">
                      {site.category}
                    </span>
                    <span className="text-xs text-gray-500">{site.destination}</span>
                  </div>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1a5f9e] hover:underline inline-flex items-center gap-1"
                  >
                    {site.url}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  {site.blurb && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{site.blurb}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEdit(site)}
                    className="p-2 rounded-xl border border-[#09294c]/10 hover:bg-[#f3f7fb]"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-[#09294c]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(site)}
                    className="p-2 rounded-xl border border-red-100 hover:bg-red-50"
                    aria-label="Delete"
                    disabled={String(site.id).startsWith('fallback-')}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div className="bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">{editing ? 'Edit microsite' : 'Add microsite'}</h2>
              <button type="button" onClick={() => setIsFormOpen(false)} className="p-2 rounded-xl hover:bg-[#f3f7fb]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                placeholder="Domain (e.g. GozoQuadTours.fun)"
                value={form.domain}
                onChange={(e) => setForm((f) => ({ ...f, domain: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc]"
              />
              <input
                required
                placeholder="URL (https://…)"
                value={form.url}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc]"
              />
              <input
                required
                placeholder="Category (e.g. Quad / ATV)"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc]"
              />
              <input
                required
                placeholder="Destination (e.g. Gozo, Malta)"
                value={form.destination}
                onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc]"
              />
              <input
                placeholder="Title (optional)"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc]"
              />
              <textarea
                placeholder="Short blurb (optional)"
                rows={3}
                value={form.blurb}
                onChange={(e) => setForm((f) => ({ ...f, blurb: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc] resize-y"
              />
              <input
                type="number"
                placeholder="Sort order"
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl border border-[#09294c]/12 bg-[#f7fafc]"
              />
              <label className="flex items-center gap-2 text-sm text-[#09294c]">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                />
                Show on homepage
              </label>
              <button type="submit" disabled={saving} className="xgen-btn xgen-btn-primary w-full disabled:opacity-50">
                {saving ? 'Saving…' : editing ? 'Update' : 'Create'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

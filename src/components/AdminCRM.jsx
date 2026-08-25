'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  ExternalLink,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AdminNav from '@/components/AdminNav';

export const TOUR_TYPES = [
  'Boat / Cruise',
  'Walking tour',
  'Food & drink',
  'Adventure / ATV',
  'Snorkel / Dive',
  'Day trip',
  'Private charter',
  'Culture / History',
  'Wildlife',
  'Transfer',
];

export const CRM_STATUSES = [
  { id: 'first_email', label: 'First email' },
  { id: 'no_reply', label: 'No reply' },
  { id: 'reply_with_questions', label: 'Reply · questions' },
  { id: 'reply_not_interested', label: 'Reply · not interested' },
];

const emptyForm = {
  company_name: '',
  email: '',
  tour_type: '',
  destination: '',
  viator_url: '',
  status: 'first_email',
  email_sent_on: '',
  first_contact_on: '',
  notes: '',
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function startOfMonthIso() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10);
}

function daysAgoIso(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function statusLabel(id) {
  return CRM_STATUSES.find((s) => s.id === id)?.label || id;
}

function statusTone(id) {
  if (id === 'reply_with_questions') return 'bg-sky-50 text-sky-800 border-sky-100';
  if (id === 'reply_not_interested') return 'bg-rose-50 text-rose-800 border-rose-100';
  if (id === 'no_reply') return 'bg-amber-50 text-amber-900 border-amber-100';
  return 'bg-[#e8f1f8] text-[#09294c] border-[#09294c]/10';
}

function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function AdminCRM() {
  const { supabase } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [filterDestination, setFilterDestination] = useState('');
  const [filterTourType, setFilterTourType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showFirstContact, setShowFirstContact] = useState(false);
  const [destSuggestOpen, setDestSuggestOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const { data, error: err } = await supabase
      .from('crm_suppliers')
      .select('*')
      .order('email_sent_on', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false });
    if (err) {
      setError(
        err.message.includes('crm_suppliers')
          ? 'CRM table missing — run supabase/crm_suppliers.sql in Supabase.'
          : err.message
      );
      setRows([]);
    } else {
      setRows(data || []);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  const destinations = useMemo(() => {
    const set = new Set();
    rows.forEach((r) => {
      const d = r.destination?.trim();
      if (d) set.add(d);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const tourTypesUsed = useMemo(() => {
    const set = new Set(TOUR_TYPES);
    rows.forEach((r) => {
      if (r.tour_type?.trim()) set.add(r.tour_type.trim());
    });
    return Array.from(set);
  }, [rows]);

  const destSuggestions = useMemo(() => {
    const needle = form.destination.trim().toLowerCase();
    if (!needle) return destinations.slice(0, 8);
    return destinations
      .filter((d) => d.toLowerCase().includes(needle) && d.toLowerCase() !== needle)
      .slice(0, 8);
  }, [destinations, form.destination]);

  const stats = useMemo(() => {
    const mailed = rows.filter((r) => r.email_sent_on);
    const since7 = daysAgoIso(7);
    const monthStart = startOfMonthIso();
    return {
      total: mailed.length,
      week: mailed.filter((r) => r.email_sent_on >= since7).length,
      month: mailed.filter((r) => r.email_sent_on >= monthStart).length,
      suppliers: rows.length,
    };
  }, [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (filterDestination && (r.destination || '') !== filterDestination) return false;
      if (filterTourType && (r.tour_type || '') !== filterTourType) return false;
      if (filterStatus && r.status !== filterStatus) return false;
      if (!needle) return true;
      const hay = [r.company_name, r.email, r.destination, r.tour_type, r.notes, r.viator_url]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [rows, q, filterDestination, filterTourType, filterStatus]);

  const byDestination = useMemo(() => {
    const map = new Map();
    filtered.forEach((r) => {
      const key = r.destination?.trim() || 'No destination';
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [filtered]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      ...emptyForm,
      email_sent_on: todayIso(),
      first_contact_on: todayIso(),
      status: 'first_email',
    });
    setShowFirstContact(false);
    setFormOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({
      company_name: row.company_name || '',
      email: row.email || '',
      tour_type: row.tour_type || '',
      destination: row.destination || '',
      viator_url: row.viator_url || '',
      status: row.status || 'first_email',
      email_sent_on: row.email_sent_on || '',
      first_contact_on: row.first_contact_on || '',
      notes: row.notes || '',
    });
    setShowFirstContact(Boolean(row.first_contact_on));
    setFormOpen(true);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.company_name.trim()) {
      setError('Company name is required.');
      return;
    }
    setSaving(true);
    setError('');
    const payload = {
      company_name: form.company_name.trim(),
      email: form.email.trim() || null,
      tour_type: form.tour_type.trim() || null,
      destination: form.destination.trim() || null,
      viator_url: form.viator_url.trim() || null,
      status: form.status || 'first_email',
      email_sent_on: form.email_sent_on || null,
      first_contact_on:
        form.first_contact_on ||
        form.email_sent_on ||
        null,
      notes: form.notes.trim() || null,
      updated_at: new Date().toISOString(),
    };

    let err;
    if (editing) {
      ({ error: err } = await supabase.from('crm_suppliers').update(payload).eq('id', editing.id));
    } else {
      ({ error: err } = await supabase.from('crm_suppliers').insert(payload));
    }
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    setFormOpen(false);
    setEditing(null);
    await load();
  };

  const remove = async (row) => {
    if (!confirm(`Delete ${row.company_name}?`)) return;
    const { error: err } = await supabase.from('crm_suppliers').delete().eq('id', row.id);
    if (err) {
      setError(err.message);
      return;
    }
    if (editing?.id === row.id) {
      setFormOpen(false);
      setEditing(null);
    }
    await load();
  };

  const quickStatus = async (row, status) => {
    const { error: err } = await supabase
      .from('crm_suppliers')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', row.id);
    if (err) {
      setError(err.message);
      return;
    }
    await load();
  };

  return (
    <div className="min-h-screen bg-[#f3f7fb]">
      <AdminNav active="crm" />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#09294c]">Supplier CRM</h1>
            <p className="text-sm text-gray-600 mt-1">
              Track outreach to Viator / GYG suppliers before they sign up.
            </p>
          </div>
          <button type="button" onClick={openCreate} className="xgen-btn xgen-btn-primary">
            <Plus className="w-4 h-4" />
            Add company
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Suppliers', value: stats.suppliers },
            { label: 'Emailed total', value: stats.total },
            { label: 'Emailed · 7 days', value: stats.week },
            { label: 'Emailed · this month', value: stats.month },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[#09294c]/10 bg-white px-4 py-4 shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#09294c]/45">
                {s.label}
              </p>
              <p className="text-2xl font-semibold text-[#09294c] mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-[#09294c]/10 bg-white p-4 shadow-sm space-y-3">
          <div className="flex flex-col lg:flex-row gap-3">
            <label className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search company, email, destination…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#09294c]/12 text-sm"
              />
            </label>
            <select
              value={filterDestination}
              onChange={(e) => setFilterDestination(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#09294c]/12 text-sm bg-white lg:w-48"
            >
              <option value="">All destinations</option>
              {destinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              value={filterTourType}
              onChange={(e) => setFilterTourType(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#09294c]/12 text-sm bg-white lg:w-48"
            >
              <option value="">All tour types</option>
              {tourTypesUsed.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#09294c]/12 text-sm bg-white lg:w-48"
            >
              <option value="">All statuses</option>
              {CRM_STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {byDestination.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {byDestination.slice(0, 12).map(([dest, count]) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() =>
                    setFilterDestination((cur) => (cur === dest ? '' : dest === 'No destination' ? '' : dest))
                  }
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${
                    filterDestination === dest
                      ? 'border-[#1a5f9e] bg-[#e8f1f8] text-[#09294c]'
                      : 'border-[#09294c]/10 text-[#09294c]/60 hover:border-[#09294c]/25'
                  }`}
                >
                  {dest} · {count}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        {/* List */}
        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-500">
            {rows.length === 0
              ? 'No suppliers yet. Add your first company to start tracking outreach.'
              : 'No suppliers match these filters.'}
          </p>
        ) : (
          <div className="space-y-2">
            {filtered.map((row) => (
              <div
                key={row.id}
                className="rounded-2xl border border-[#09294c]/10 bg-white p-4 shadow-sm hover:border-[#3d8fd1]/35 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-4">
                  <button
                    type="button"
                    onClick={() => openEdit(row)}
                    className="flex-1 text-left min-w-0"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-semibold text-[#09294c]">{row.company_name}</p>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border ${statusTone(row.status)}`}
                      >
                        {statusLabel(row.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {[row.destination, row.tour_type].filter(Boolean).join(' · ') || '—'}
                    </p>
                    {row.email && (
                      <p className="text-xs text-gray-500 mt-1 break-all">{row.email}</p>
                    )}
                    {row.notes?.trim() && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2 whitespace-pre-wrap">
                        {row.notes.trim()}
                      </p>
                    )}
                  </button>

                  <div className="flex flex-wrap lg:flex-col items-start gap-2 shrink-0 lg:w-44">
                    <div className="flex items-center gap-1.5 text-xs text-[#09294c]/70">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Emailed {formatDate(row.email_sent_on)}</span>
                    </div>
                    {row.first_contact_on && row.first_contact_on !== row.email_sent_on && (
                      <p className="text-[11px] text-gray-400">
                        First contact {formatDate(row.first_contact_on)}
                      </p>
                    )}
                    {row.viator_url && (
                      <a
                        href={row.viator_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a5f9e] hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Viator listing
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {CRM_STATUSES.filter((s) => s.id !== row.status).slice(0, 3).map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => quickStatus(row, s.id)}
                          className="text-[10px] font-medium px-2 py-1 rounded-lg border border-[#09294c]/10 text-[#09294c]/55 hover:border-[#09294c]/25 hover:text-[#09294c]"
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(row)}
                      className="text-gray-300 hover:text-red-600 p-1"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form drawer */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <button
            type="button"
            className="absolute inset-0 bg-[#09294c]/45"
            aria-label="Close"
            onClick={() => setFormOpen(false)}
          />
          <div className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white border border-[#09294c]/10 shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between gap-3 px-5 py-4 bg-white border-b border-[#09294c]/08">
              <h2 className="text-lg font-semibold text-[#09294c]">
                {editing ? 'Edit company' : 'Add company'}
              </h2>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="p-2 rounded-full text-gray-400 hover:text-[#09294c] hover:bg-[#f3f7fb]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={save} className="px-5 py-4 space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                Company name
                <input
                  required
                  autoFocus
                  value={form.company_name}
                  onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
                  className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 font-normal normal-case text-sm"
                  placeholder="Aruba Sunset Sails"
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 font-normal normal-case text-sm"
                  placeholder="ops@example.com"
                />
              </label>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#09294c]/45 mb-2">
                  Tour type
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TOUR_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, tour_type: t }))}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-full border transition-colors ${
                        form.tour_type === t
                          ? 'border-[#1a5f9e] bg-[#e8f1f8] text-[#09294c]'
                          : 'border-[#09294c]/10 text-[#09294c]/60 hover:border-[#09294c]/25'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <input
                  value={form.tour_type}
                  onChange={(e) => setForm((f) => ({ ...f, tour_type: e.target.value }))}
                  className="mt-2 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 text-sm"
                  placeholder="Or type a custom tour type"
                />
              </div>

              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                  Destination
                  <input
                    value={form.destination}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, destination: e.target.value }));
                      setDestSuggestOpen(true);
                    }}
                    onFocus={() => setDestSuggestOpen(true)}
                    onBlur={() => setTimeout(() => setDestSuggestOpen(false), 150)}
                    className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 font-normal normal-case text-sm"
                    placeholder="Aruba, Prague, Gozo…"
                    autoComplete="off"
                  />
                </label>
                {destSuggestOpen && destSuggestions.length > 0 && (
                  <ul className="absolute z-10 left-0 right-0 mt-1 rounded-xl border border-[#09294c]/12 bg-white shadow-lg overflow-hidden">
                    {destSuggestions.map((d) => (
                      <li key={d}>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 text-sm text-[#09294c] hover:bg-[#f3f7fb]"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setForm((f) => ({ ...f, destination: d }));
                            setDestSuggestOpen(false);
                          }}
                        >
                          {d}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <label className="block text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                Viator / listing URL
                <input
                  value={form.viator_url}
                  onChange={(e) => setForm((f) => ({ ...f, viator_url: e.target.value }))}
                  className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 font-normal normal-case text-sm"
                  placeholder="https://www.viator.com/…"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                  Email sent on
                  <input
                    type="date"
                    value={form.email_sent_on}
                    onChange={(e) => {
                      const v = e.target.value;
                      setForm((f) => ({
                        ...f,
                        email_sent_on: v,
                        first_contact_on: f.first_contact_on || v,
                      }));
                      setShowFirstContact(true);
                    }}
                    onClick={() => setShowFirstContact(true)}
                    className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 font-normal normal-case text-sm"
                  />
                </label>
                {(showFirstContact || form.first_contact_on) && (
                  <label className="block text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                    First contact
                    <input
                      type="date"
                      value={form.first_contact_on}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, first_contact_on: e.target.value }))
                      }
                      className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 font-normal normal-case text-sm"
                    />
                  </label>
                )}
              </div>
              {!showFirstContact && !form.first_contact_on && (
                <button
                  type="button"
                  onClick={() => setShowFirstContact(true)}
                  className="text-xs font-semibold text-[#1a5f9e] hover:underline"
                >
                  Show first contact date
                </button>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#09294c]/45 mb-2">
                  Status
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {CRM_STATUSES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, status: s.id }))}
                      className={`text-left text-xs font-medium px-3 py-2.5 rounded-xl border transition-colors ${
                        form.status === s.id
                          ? 'border-[#1a5f9e] bg-[#e8f1f8] text-[#09294c]'
                          : 'border-[#09294c]/10 text-[#09294c]/60'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block text-xs font-semibold uppercase tracking-wide text-[#09294c]/45">
                Notes
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-[#09294c]/12 font-normal normal-case text-sm resize-y"
                  placeholder="Call notes, follow-up, objections…"
                />
              </label>

              <button
                type="submit"
                disabled={saving}
                className="xgen-btn xgen-btn-primary w-full disabled:opacity-50"
              >
                {saving ? 'Saving…' : editing ? 'Save changes' : 'Add to CRM'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

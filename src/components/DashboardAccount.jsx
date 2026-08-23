'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardAccount() {
  const { supabase, user, profile, refreshProfile } = useAuth();
  const [form, setForm] = useState({
    full_name: '',
    company: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setForm({
      full_name: profile?.full_name || '',
      company: profile?.company || '',
    });
  }, [profile]);

  const save = async (e) => {
    e.preventDefault();
    if (!user?.id) return;
    setSaving(true);
    setMessage('');
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: form.full_name.trim(),
        company: form.company.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);
    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    await refreshProfile(user);
    setMessage('Saved.');
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-white text-[#09294c] focus:outline-none focus:border-[#3d8fd1]';

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">Account</h1>
        <p className="text-gray-600">{user?.email}</p>
      </div>
      <form onSubmit={save} className="rounded-3xl border border-[#09294c]/10 bg-white p-6 space-y-3 shadow-sm">
        <input
          placeholder="Full name"
          value={form.full_name}
          onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
          className={inputClass}
        />
        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          className={inputClass}
        />
        {message && <p className="text-sm text-[#1a5f9e]">{message}</p>}
        <button type="submit" disabled={saving} className="xgen-btn xgen-btn-primary disabled:opacity-50">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </form>
    </div>
  );
}

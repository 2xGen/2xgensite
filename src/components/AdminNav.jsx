'use client';

import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LINKS = [
  { href: '/admin/microsites', id: 'microsites', label: 'Network sites' },
  { href: '/admin/operators', id: 'operators', label: 'Operators' },
  { href: '/admin/links', id: 'links', label: 'Tracking links' },
  { href: '/admin/crm', id: 'crm', label: 'CRM' },
];

export default function AdminNav({ active }) {
  const { logout } = useAuth();

  return (
    <header className="bg-white border-b border-[#09294c]/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 overflow-x-auto">
          <span
            className="font-semibold text-[#09294c] shrink-0"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            2xGen Admin
          </span>
          {LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`text-sm whitespace-nowrap shrink-0 ${
                active === link.id
                  ? 'font-semibold text-[#09294c]'
                  : 'text-[#09294c]/60 hover:text-[#09294c]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={() => logout()}
          className="inline-flex items-center gap-1.5 text-sm text-[#09294c]/60 hover:text-[#09294c] shrink-0"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </header>
  );
}

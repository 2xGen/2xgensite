'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/billing', label: 'Billing' },
  { href: '/dashboard/links', label: 'Links' },
  { href: '/dashboard/account', label: 'Account' },
];

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const { profile, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#f3f7fb]">
      <header className="border-b border-[#09294c]/10 bg-white">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 min-w-0">
            <Link href="/" className="font-semibold text-[#09294c] shrink-0" style={{ fontFamily: 'Outfit, sans-serif' }}>
              2xGen
            </Link>
            <nav className="hidden sm:flex items-center gap-1 overflow-x-auto">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === l.href
                      ? 'bg-[#e8f1f8] text-[#09294c]'
                      : 'text-[#09294c]/60 hover:text-[#09294c]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-gray-500 hidden md:inline truncate max-w-[10rem]">
              {profile?.email}
            </span>
            <button
              type="button"
              onClick={() => logout()}
              className="text-sm font-medium text-[#09294c]/60 hover:text-[#09294c]"
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="sm:hidden flex gap-1 px-4 pb-3 overflow-x-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                pathname === l.href ? 'bg-[#e8f1f8] text-[#09294c]' : 'text-[#09294c]/60'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

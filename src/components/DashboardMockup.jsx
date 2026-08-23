'use client';

import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { label: '7 days', value: '128' },
  { label: '30 days', value: '512' },
  { label: '90 days', value: '1,480' },
  { label: 'All time', value: '4,210' },
];

/** Decorative mock of the operator dashboard — not interactive. */
export default function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div
        className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[#3d8fd1]/10 blur-2xl"
        aria-hidden
      />
      <div className="relative rounded-3xl border border-[#09294c]/10 bg-white shadow-[0_24px_60px_rgba(9,41,76,0.12)] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-[#09294c]/08 bg-[#f8fafc]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-[#09294c] text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
              2xGen
            </span>
            <span className="text-[#09294c]/25">/</span>
            <span className="text-sm text-[#09294c]/55 truncate">Operator dashboard</span>
          </div>
          <div className="flex gap-1.5 shrink-0" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-[#09294c]/15" />
            <span className="h-2 w-2 rounded-full bg-[#09294c]/15" />
            <span className="h-2 w-2 rounded-full bg-[#3d8fd1]/50" />
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Status */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#09294c]/40 mb-1">
                Site status
              </p>
              <p className="text-lg font-semibold text-[#09294c]">Gozo Quad Tours</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>

          {/* Link row */}
          <div className="rounded-2xl border border-[#09294c]/08 bg-[#f3f7fb] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#09294c]/40 mb-1">
              Tracked booking link
            </p>
            <p className="text-sm font-medium text-[#1a5f9e] truncate">2xgen.com/go/gozo-quad</p>
            <p className="text-xs text-gray-500 mt-1 truncate">→ viator.com/tours/…</p>
          </div>

          {/* Stats */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#09294c]/40 mb-2.5">
              Link clicks
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="rounded-2xl bg-[#f8fafc] border border-[#09294c]/06 px-3 py-3"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#09294c]/40">
                    {stat.label}
                  </p>
                  <p className="text-xl font-semibold text-[#09294c] tabular-nums tracking-tight">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mini chart bars — decorative */}
          <div className="pt-1" aria-hidden>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#09294c]/40 mb-2.5">
              Last 7 days
            </p>
            <div className="flex items-end gap-1.5 h-16">
              {[40, 55, 35, 70, 48, 82, 65].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md bg-[#3d8fd1]/35 origin-bottom"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';
import GetTourSiteForm from '@/components/GetTourSiteForm';
import AccountManagerAsk from '@/components/AccountManagerAsk';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
};

const HIGHLIGHTS = [
  '$249 / year · fully managed',
  'Live within 3 business days',
  'Books through your Viator or GetYourGuide listing',
  'You run the tours. We run the Google side.',
];

export default function GetTourSitePage() {
  return (
    <section className="relative pattern-diagonal overflow-hidden pb-4">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#09294c]" />
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#3d8fd1]/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-[#09294c]/10 blur-3xl"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 md:pt-10 md:pb-14 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div {...fadeUp} className="space-y-5">
            <div className="accent-bar" />
            <p className="xgen-pill">Get a Site for Your Tours</p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.08]">
              Tell us about your tours.{' '}
              <span className="text-[#1a5f9e]">We&apos;ll build the Google side.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Share your destination and Viator or GetYourGuide listing(s). We build and manage a
              dedicated SEO site around your tours for the year — travelers find you on Google, then
              book through the marketplace checkout you already use.
            </p>
            <ul className="space-y-2.5 pt-1">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-gray-700 leading-snug">
                  <Check className="w-4 h-4 text-[#3d8fd1] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
              <div className="space-y-2 text-sm pt-2">
                <a
                  href="mailto:hello@2xgen.com"
                  className="block font-semibold text-[#1a5f9e] hover:underline"
                >
                  hello@2xgen.com
                </a>
                <AccountManagerAsk variant="ghost" source="get-a-site" className="!inline-flex" />
                <a
                  href="https://wa.me/2975668844"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[#1a5f9e] hover:underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              <p className="pt-2 text-gray-600">
                Prefer self-serve?{' '}
                <a href="/signup" className="font-semibold text-[#1a5f9e] hover:underline">
                  Continue with Google
                </a>{' '}
                to join the waitlist, then subscribe at $249/year in your dashboard.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="rounded-3xl border border-[#09294c]/12 bg-white/90 backdrop-blur-sm p-6 sm:p-8 shadow-[0_24px_60px_rgba(9,41,76,0.12)]"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-4">
              Request your site
            </p>
            <GetTourSiteForm source="get-a-site" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

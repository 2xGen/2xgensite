'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';

const ArubaSection = () => {
  const { t, href } = useLocale();
  const c = t.arubaHome;

  return (
    <section id="aruba" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <div className="accent-bar mb-4" />
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">
            {c.h2a} <span className="text-[#1a5f9e]">{c.h2b}</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">{c.p1}</p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">{c.p2}</p>
          <Link
            href={href('/aruba')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a5f9e] hover:underline"
          >
            {c.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ArubaSection;

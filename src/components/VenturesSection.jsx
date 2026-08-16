'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { getFeaturedPlatforms } from '@/i18n/content';
import { useLocale } from '@/i18n/LocaleContext';

const VenturesSection = () => {
  const { locale, t, href } = useLocale();
  const featuredPlatforms = getFeaturedPlatforms(locale);

  return (
    <section id="ventures" className="py-20 md:py-28 pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white border border-[#09294c]/10 p-8 sm:p-10 shadow-[0_16px_40px_rgba(9,41,76,0.06)]"
          >
            <div className="accent-bar mb-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.1] mb-4">
              {t.ventures.h2}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{t.ventures.body}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-3xl pattern-navy text-white p-8 sm:p-10 flex flex-col justify-center"
          >
            <p className="text-[#3d8fd1] text-sm font-semibold mb-3">{t.ventures.lab}</p>
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white leading-tight">
              {t.ventures.h3}
            </h3>
            <p className="text-lg text-white/65 leading-relaxed">{t.ventures.process}</p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {featuredPlatforms.map((venture, index) => (
            <motion.a
              key={venture.name}
              href={venture.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="group xgen-card p-5"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-semibold text-[#09294c]">{venture.name}</h3>
                <ExternalLink className="w-3.5 h-3.5 text-[#09294c]/25 group-hover:text-[#3d8fd1] transition-colors shrink-0 mt-1" />
              </div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{venture.blurb}</p>
              {venture.metrics && (
                <p className="text-xs font-semibold text-[#09294c] mb-3">{venture.metrics}</p>
              )}
              <p className="text-xs font-semibold text-[#3d8fd1]">{venture.angle}</p>
            </motion.a>
          ))}
        </div>

        <Link
          href={href('/platforms')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a5f9e] hover:underline"
        >
          {t.ventures.all}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default VenturesSection;

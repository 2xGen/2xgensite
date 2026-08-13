'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/LocaleContext';

const DistributionSection = () => {
  const { t } = useLocale();
  const d = t.distribution;

  return (
    <section id="distributie" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="accent-bar" />
            <p className="xgen-pill">{d.pill}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.1]">
              {d.h2a}
              <br />
              <span className="text-[#1a5f9e]">{d.h2b}</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{d.p1}</p>
            <p className="text-lg font-semibold text-[#09294c] leading-relaxed">{d.p2}</p>
            <p className="text-lg text-gray-600 leading-relaxed">{d.p3}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="rounded-3xl bg-[#f3f7fb] border border-[#09294c]/08 p-6 sm:p-8"
          >
            <p className="text-sm font-semibold text-[#3d8fd1] mb-5">{d.thesis}</p>
            <ol className="space-y-3">
              {d.steps.map((step, i) => (
                <li key={step} className="flex gap-3 items-start">
                  <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#09294c] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-medium text-[#09294c] pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl pattern-navy text-white p-8 sm:p-10"
        >
          <p className="text-lg text-white/70 leading-relaxed max-w-3xl mb-4">{d.gap}</p>
          <p className="text-xl sm:text-2xl font-semibold text-white leading-snug mb-3">{d.bridge}</p>
          <p className="text-[#3d8fd1] font-medium">{d.lab}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default DistributionSection;

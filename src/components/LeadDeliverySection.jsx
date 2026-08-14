'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/LocaleContext';

const LeadDeliverySection = () => {
  const { t } = useLocale();
  const s = t.leadDelivery;

  return (
    <section id="lead-delivery" className="py-20 md:py-28 pattern-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <span className="inline-flex px-3 py-1 rounded-full bg-[#3d8fd1]/20 text-[#9ec9ee] text-sm font-semibold border border-[#3d8fd1]/25">
              {s.pill}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
              {s.h2}
            </h2>
            <p className="text-lg text-white/65">{s.body}</p>
            <ol className="space-y-3 pt-2">
              {s.steps.map((step, i) => (
                <li key={step} className="flex gap-3 items-start">
                  <span className="w-7 h-7 rounded-lg bg-[#3d8fd1] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="font-medium text-white pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-3xl bg-white text-[#09294c] p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-3">Notification</p>
            <h3 className="text-xl font-semibold mb-2">{s.cardTitle}</h3>
            <p className="text-sm font-semibold text-[#1a5f9e] mb-4">{s.cardMeta}</p>
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <p>{s.cardValue}</p>
              <p>{s.cardTime}</p>
            </div>
            <div className="xgen-btn xgen-btn-primary w-full justify-center">{s.cardCta}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadDeliverySection;

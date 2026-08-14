'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/LocaleContext';

const ExampleCaseSection = () => {
  const { t } = useLocale();
  const c = t.exampleCase;

  const flow = [c.estimate, c.cta, c.lead, c.followup];

  return (
    <section id="example-case" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <div className="accent-bar mb-4" />
          <p className="xgen-pill mb-4">{c.pill}</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-2">{c.h2}</h2>
          <p className="text-lg font-semibold text-[#1a5f9e]">{c.example}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-[#f3f7fb] border border-[#09294c]/08 p-7 sm:p-8 space-y-6"
          >
            <div>
              <p className="text-sm font-semibold text-[#3d8fd1] mb-2">{c.problemLabel}</p>
              <p className="text-[#09294c] leading-relaxed">{c.problem}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#3d8fd1] mb-2">{c.buildLabel}</p>
              <p className="text-xl font-semibold text-[#09294c]">{c.build}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#09294c]/60 mb-3">{c.visitorEnters}</p>
              <ul className="flex flex-wrap gap-2">
                {c.fields.map((field) => (
                  <li
                    key={field}
                    className="text-sm font-medium px-3 py-1.5 rounded-xl bg-white border border-[#09294c]/10 text-[#09294c]"
                  >
                    {field}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="rounded-3xl pattern-navy text-white p-7 sm:p-8"
          >
            <div className="space-y-0">
              {flow.map((step, i) => (
                <div key={step}>
                  <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-sm sm:text-base font-medium leading-snug">
                    {step}
                  </div>
                  {i < flow.length - 1 && (
                    <div className="flex justify-center py-1.5 text-[#3d8fd1] font-bold" aria-hidden>
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExampleCaseSection;

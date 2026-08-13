'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/LocaleContext';

const PhilosophySection = () => {
  const { t } = useLocale();
  const p = t.philosophy;

  return (
    <>
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <div className="accent-bar" />
              <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-semibold tracking-tight leading-[1.1]">
                {p.h2}
              </h2>
              <div className="space-y-1 text-lg text-gray-600">
                <p>{p.p1}</p>
                <p className="font-semibold text-[#09294c]">{p.p2}</p>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">{p.body}</p>
            </motion.div>

            <div className="space-y-2.5">
              <p className="text-sm font-semibold text-[#3d8fd1] mb-3">{p.want}</p>
              {p.questions.map((q, i) => (
                <motion.div
                  key={q}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 bg-[#f3f7fb] hover:bg-[#e8f1f8] transition-colors rounded-2xl px-5 py-4 border border-[#09294c]/06"
                >
                  <span className="text-sm font-bold text-[#3d8fd1] w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-semibold text-[#09294c]">{q}</span>
                </motion.div>
              ))}
              <p className="pt-4 text-[#09294c] font-semibold text-lg">{p.start}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 md:py-28 pattern-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-12"
          >
            <div className="accent-bar mb-4 !bg-[#3d8fd1]" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4 text-white">
              {p.systemH2}
            </h2>
            <p className="text-lg text-white/65 leading-relaxed">{p.systemBody}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {p.flow.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-2xl bg-[#0f3558] border border-white/10 p-5 hover:bg-[#144066] hover:border-[#3d8fd1]/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-[#3d8fd1] text-white text-xs font-bold flex items-center justify-center">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-sm text-white/55">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PhilosophySection;

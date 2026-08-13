'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/LocaleContext';

const stepsNl = [
  'Google',
  'Content / SEO',
  'Landingspagina',
  'Tool / check',
  'Lead',
  'CRM',
  'WhatsApp / e-mail',
  'Sales',
  'Klant',
];

const stepsEn = [
  'Google',
  'Content / SEO',
  'Landing page',
  'Tool / check',
  'Lead',
  'CRM',
  'WhatsApp / email',
  'Sales',
  'Customer',
];

const LeadEngineSection = () => {
  const { locale, t } = useLocale();
  const steps = locale === 'en' ? stepsEn : stepsNl;
  const highlight = locale === 'en' ? ['Lead', 'Customer'] : ['Lead', 'Klant'];

  return (
    <section id="lead-engine" className="py-20 md:py-28 pattern-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <span className="inline-flex px-3 py-1 rounded-full bg-[#3d8fd1]/20 text-[#9ec9ee] text-sm font-semibold border border-[#3d8fd1]/25">
              {t.lead.pill}
            </span>
            <h2 className="font-semibold tracking-tight leading-[1.12]">
              <span className="block text-lg sm:text-xl text-white/55 font-medium mb-3">
                {t.lead.small}
              </span>
              <span className="block text-3xl sm:text-4xl text-white">
                {t.lead.h2a}
                <br />
                <span className="text-[#3d8fd1]">{t.lead.h2b}</span>
              </span>
            </h2>
            <p className="text-lg text-white/65 leading-relaxed">{t.lead.p1}</p>
            <p className="text-lg text-white/65 leading-relaxed">{t.lead.p2}</p>
            <p className="text-white font-semibold text-lg">{t.lead.bridge}</p>
            <p className="text-sm text-white/40">{t.lead.note}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-sm"
          >
            <div className="max-w-[240px] mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <div
                    className={`rounded-xl px-4 py-2.5 text-center text-sm font-semibold ${
                      highlight.includes(step)
                        ? 'bg-[#3d8fd1] text-white shadow-lg shadow-[#3d8fd1]/30'
                        : 'bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    {step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-1" aria-hidden>
                      <div className="w-px h-3 bg-[#3d8fd1]/50" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadEngineSection;

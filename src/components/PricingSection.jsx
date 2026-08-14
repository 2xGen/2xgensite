'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';

function StepCard({ step }) {
  return (
    <div className="rounded-3xl border border-[#09294c]/10 bg-white text-[#09294c] p-6 sm:p-7 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center bg-[#e8f1f8] text-[#09294c]">
          {step.num}
        </span>
        <span className="text-xs font-semibold text-[#1a5f9e]">{step.badge}</span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight mb-1">{step.title}</h3>
      <p className="text-lg font-semibold mb-4 text-[#1a5f9e]">{step.price}</p>
      <p className="text-sm mb-3 text-gray-500">{step.intro}</p>
      <ul className="space-y-2 flex-1">
        {step.items.map((item) => (
          <li key={item} className="text-sm flex gap-2 leading-snug text-gray-600">
            <span className="text-[#3d8fd1] font-bold shrink-0">·</span>
            {item}
          </li>
        ))}
      </ul>
      {step.footnote && <p className="text-xs mt-4 text-gray-400">{step.footnote}</p>}
    </div>
  );
}

function StepArrow() {
  return (
    <>
      <div className="hidden md:flex items-center justify-center shrink-0 px-1" aria-hidden>
        <div className="w-10 h-10 rounded-full bg-white border border-[#09294c]/12 shadow-sm flex items-center justify-center text-[#3d8fd1]">
          <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex md:hidden items-center justify-center py-1" aria-hidden>
        <div className="w-10 h-10 rounded-full bg-white border border-[#09294c]/12 shadow-sm flex items-center justify-center text-[#3d8fd1]">
          <ArrowDown className="w-5 h-5" strokeWidth={2.5} />
        </div>
      </div>
    </>
  );
}

const PricingSection = () => {
  const { t, href } = useLocale();
  const p = t.homePricing;
  const steps = p.steps || [];

  return (
    <section id="pricing-home" className="py-20 md:py-28 pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-12"
        >
          <div className="accent-bar mb-4" />
          <p className="text-[#1a5f9e] font-semibold mb-2">{p.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] mb-4">{p.h2}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{p.body}</p>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-stretch gap-0 md:gap-0 mb-10">
          {steps.map((step, i) => (
            <React.Fragment key={step.title}>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex-1 min-w-0"
              >
                <StepCard step={step} />
              </motion.div>
              {i < steps.length - 1 && <StepArrow />}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-sm text-gray-500 max-w-xl">{p.note}</p>
          <a href={href('/pricing')} className="xgen-btn xgen-btn-primary inline-flex shrink-0 self-start">
            {p.cta}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

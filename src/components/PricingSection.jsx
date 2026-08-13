'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';

const PricingSection = () => {
  const { t, href } = useLocale();

  return (
    <section id="explore" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="accent-bar mx-auto mb-4" />
          <p className="text-[#1a5f9e] font-semibold mb-2">{t.cta.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] mb-4">
            {t.cta.h2}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto">{t.cta.body}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={href('/contact')} className="xgen-btn xgen-btn-primary">
              {t.cta.spar}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href={href('/prijzen')} className="xgen-btn xgen-btn-secondary">
              {t.cta.prices}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

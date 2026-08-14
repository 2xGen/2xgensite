'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AcquisitieCheck from '@/components/AcquisitieCheck';
import { useLocale } from '@/i18n/LocaleContext';
import { LIVE_PRODUCT_COUNT } from '@/data/siteContent';

const HeroSection = () => {
  const { t, href } = useLocale();
  const { hero } = t;

  const stats = hero.stats.map((item) => {
    if (item.key === 'live') {
      return { ...item, value: String(LIVE_PRODUCT_COUNT) };
    }
    return item;
  });

  return (
    <section id="home" className="relative pattern-dots pt-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#09294c]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 md:pt-20 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="accent-bar" />
            <p className="xgen-pill">{hero.pill}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.05]">
              {hero.h1a}{' '}
              <span className="text-[#1a5f9e]">{hero.h1b}</span>
            </h1>
            <div className="flex flex-col gap-1 text-lg text-[#09294c]/70 font-medium border-l-4 border-[#3d8fd1] pl-4">
              <span>{hero.line1}</span>
              <span>{hero.line2}</span>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">{hero.body}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a href={href('/what-we-build')} className="xgen-btn xgen-btn-primary">
                {hero.cta1}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href={href('/acquisition-check')} className="xgen-btn xgen-btn-secondary">
                {hero.cta2}
              </a>
            </div>
          </motion.div>

          <motion.div
            id="acquisitiecheck"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="scroll-mt-28"
          >
            <AcquisitieCheck />
          </motion.div>
        </div>
      </div>

      <div className="bg-[#09294c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="relative pl-4 border-l border-white/20"
              >
                <p className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">{item.value}</p>
                <p className="text-sm text-white/55 mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

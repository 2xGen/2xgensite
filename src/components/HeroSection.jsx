'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AcquisitieCheck from '@/components/AcquisitieCheck';

const credibility = [
  { value: '15+', label: 'Digitale projecten' },
  { value: '12', label: 'Platforms gebouwd' },
  { value: '5+', label: 'Acquisitiekanalen' },
  { value: 'Live', label: 'Eigen producten' },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative pattern-dots pt-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#09294c]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 md:pt-20 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="accent-bar" />
            <p className="xgen-pill">Leadgeneratie · Data · Tools · Automatisering · AI</p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.05]">
              Wij bouwen systemen die{' '}
              <span className="text-[#1a5f9e]">klanten vinden.</span>
            </h1>
            <div className="flex flex-col gap-1 text-lg text-[#09294c]/70 font-medium border-l-4 border-[#3d8fd1] pl-4">
              <span>Van doelgroep naar lead.</span>
              <span>Van lead naar klant.</span>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              We bouwen websites, tools en digitale systemen waarmee bedrijven structureel nieuwe klanten vinden.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a href="#services" className="xgen-btn xgen-btn-primary">
                Bekijk wat we doen
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/acquisitiecheck" className="xgen-btn xgen-btn-secondary">
                Doe de gratis acquisitiecheck
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
            {credibility.map((item, i) => (
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

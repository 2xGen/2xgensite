'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const PricingSection = () => {
  return (
    <section id="explore" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="accent-bar mx-auto mb-4" />
          <p className="text-[#1a5f9e] font-semibold mb-2">Heb je een goed product?</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] mb-4">
            Dan moeten we zorgen dat de juiste mensen het vinden.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto">
            Vertel wat je verkoopt, wie je zoekt en waar je nu tegenaan loopt. Wij kijken waar de kansen zitten.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact" className="xgen-btn xgen-btn-primary">
              Even sparren
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/prijzen" className="xgen-btn xgen-btn-secondary">
              Bekijk prijzen
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

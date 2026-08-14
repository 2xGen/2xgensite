'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/LocaleContext';

const ToolsProductSection = () => {
  const { t } = useLocale();
  const s = t.toolsProduct;

  return (
    <section id="tools-product" className="py-20 md:py-28 pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <div className="accent-bar mb-4" />
          <p className="xgen-pill mb-4">{s.pill}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.1] mb-4">
            {s.h2a}
            <br />
            <span className="text-[#1a5f9e]">{s.h2b}</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">{s.body}</p>
        </motion.div>

        <p className="text-sm font-semibold text-[#3d8fd1] mb-4">{s.examples}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {s.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-3xl bg-white border border-[#09294c]/10 p-6 sm:p-7"
            >
              <h3 className="text-xl font-semibold tracking-tight text-[#09294c] mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsProductSection;

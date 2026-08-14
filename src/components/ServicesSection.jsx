'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/LocaleContext';

const ServicesSection = () => {
  const { t, href } = useLocale();
  const s = t.services;

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <div className="accent-bar mb-4" />
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">{s.h2}</h2>
          {s.p1 && <p className="text-lg text-gray-600 leading-relaxed">{s.p1}</p>}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {(s.blocks || []).map((block, index) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="rounded-2xl bg-[#f3f7fb] border border-[#09294c]/08 p-5"
            >
              <p className="text-xs font-bold text-[#3d8fd1] mb-2">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="font-semibold text-[#09294c] mb-1">{block.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{block.text}</p>
              {index < (s.blocks?.length || 0) - 1 && (
                <p className="hidden lg:block text-[#3d8fd1] font-bold mt-3" aria-hidden>
                  →
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <Link href={href('/what-we-build')} className="text-sm font-semibold text-[#1a5f9e] hover:underline">
          {s.all}
        </Link>
      </div>
    </section>
  );
};

export default ServicesSection;

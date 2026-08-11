'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { sectors } from '@/data/siteContent';

const IndustriesSection = () => {
  return (
    <section id="who" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mb-10"
        >
          <div className="accent-bar mb-4" />
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">
            Waar zit jouw kans?
          </h2>
          <p className="text-lg text-gray-600">
            Vooral interessant voor bedrijven waarbij één nieuwe klant daadwerkelijk waarde heeft.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {sectors.map((industry, index) => (
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <Link href={`/sectoren/${industry.slug}`} className="xgen-card p-5 flex gap-4 h-full group">
                <span className="text-sm font-bold text-[#3d8fd1] pt-0.5">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-semibold text-[#09294c] mb-1 group-hover:text-[#1a5f9e] transition-colors">{industry.title}</h3>
                  <p className="text-sm text-gray-500">{industry.items}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="rounded-3xl bg-[#f3f7fb] border border-[#09294c]/08 px-6 py-5 max-w-2xl">
          <p className="text-[#09294c] font-medium leading-relaxed">
            Andere branche? Geen probleem. De vraag is of we je potentiële klanten online kunnen vinden en bereiken.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;

'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Kijken',
    text: 'Waar zitten uw klanten en waar liggen de kansen?',
  },
  {
    number: '02',
    title: 'Bereiken',
    text: 'SEO, data, tools of platforms — wat het beste werkt.',
  },
  {
    number: '03',
    title: 'Converteren',
    text: 'Van bezoeker naar iemand die écht interesse heeft.',
  },
  {
    number: '04',
    title: 'Opvolgen',
    text: 'Automatisch kwalificeren en doorzetten naar sales.',
  },
  {
    number: '05',
    title: 'Verbeteren',
    text: 'Meten wat werkt — en daarop bijsturen.',
  },
];

const ProcessSection = () => {
  return (
    <section id="aanpak" className="py-20 md:py-28 bg-[#eef3f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-12"
        >
          <p className="text-base font-medium text-[#1a4b7a] mb-3">
            Hoe we werken
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#09294c] tracking-tight leading-tight">
            Van eerste bezoeker naar goede lead.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="relative bg-white border border-[#09294c]/08 rounded-2xl p-5 sm:p-6"
            >
              <p className="text-3xl font-semibold text-[#09294c]/20 tracking-tight mb-3">{step.number}</p>
              <h3 className="text-lg font-semibold text-[#09294c] mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-[#09294c]/20" aria-hidden />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

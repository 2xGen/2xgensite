'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Target,
  Calculator,
  Database,
  Workflow,
  LayoutTemplate,
  Layers,
} from 'lucide-react';
import { services } from '@/data/siteContent';

const icons = {
  leadgeneratie: Target,
  'leadgeneratie-tools': Calculator,
  'data-prospecting': Database,
  automatisering: Workflow,
  'leadgeneratie-websites': LayoutTemplate,
  'digitale-platforms': Layers,
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-[#f3f7fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mb-12"
        >
          <div className="accent-bar mb-4" />
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">
            Wat kunnen we voor je bouwen?
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Geen standaard pakket. Geen lijst met marketingdiensten.
          </p>
          <p className="text-lg text-gray-600">
            We kijken naar je markt, je klanten en waar de kansen liggen. Daarna bouwen we wat nodig is.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const Icon = icons[service.slug] || Target;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/diensten/${service.slug}`}
                  className="xgen-card p-6 sm:p-7 h-full flex flex-col group block"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#e8f1f8] border border-[#09294c]/08 flex items-center justify-center mb-4 group-hover:bg-[#09294c] transition-colors">
                    <Icon className="w-5 h-5 text-[#1a5f9e] group-hover:text-white transition-colors" strokeWidth={2} />
                  </div>
                  <p className="text-sm font-semibold text-[#3d8fd1] mb-2 min-h-[2.75rem]">{service.eyebrow}</p>
                  <h3 className="text-xl font-semibold tracking-tight mb-2 group-hover:text-[#1a5f9e] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{service.summary}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-8">
          <Link href="/wat-we-bouwen" className="text-sm font-semibold text-[#1a5f9e] hover:underline">
            Alle diensten →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

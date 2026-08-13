'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/LocaleContext';

const founderImageUrl =
  'https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/founder%202xGen.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL2ZvdW5kZXIgMnhHZW4ucG5nIiwiaWF0IjoxNzU3MjM5NjYxLCJleHAiOjQyODAxMTk2NjF9.LeDtfzNJq5ny7A3MFdeeZb4wYii53V7tBut9vSoLrkc';

const AboutSection = () => {
  const { t, href } = useLocale();

  return (
    <section id="over" className="py-20 md:py-28 pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr,1.2fr] gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-sm mx-auto lg:mx-0"
          >
            <div className="space-y-3">
              <div className="xgen-card p-2 overflow-hidden">
                <img
                  src={founderImageUrl}
                  alt={t.about.founder}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
              <div className="px-1">
                <p className="text-sm font-semibold text-[#09294c]">{t.about.founder}</p>
                <Link
                  href={href('/over-ons')}
                  className="inline-block text-sm font-medium text-[#1a5f9e] hover:underline mt-0.5"
                >
                  {t.about.more}
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="space-y-5"
          >
            <div className="accent-bar" />
            <p className="xgen-pill">{t.about.pill}</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">{t.about.h2}</h2>
            <p className="text-xl font-semibold text-[#1a5f9e] leading-snug">{t.about.tag}</p>
            <p className="text-lg text-gray-600 leading-relaxed">{t.about.p1}</p>
            <p className="text-lg text-gray-600 leading-relaxed">{t.about.p2}</p>
            <p className="text-lg text-gray-600 leading-relaxed">{t.about.p3}</p>
            <p className="text-lg font-semibold text-[#09294c] leading-relaxed">{t.about.p4}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

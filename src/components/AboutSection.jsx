'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const founderImageUrl =
  'https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/founder%202xGen.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL2ZvdW5kZXIgMnhHZW4ucG5nIiwiaWF0IjoxNzU3MjM5NjYxLCJleHAiOjQyODAxMTk2NjF9.LeDtfzNJq5ny7A3MFdeeZb4wYii53V7tBut9vSoLrkc';

const AboutSection = () => {
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
                  alt="Matthijs van Reek, oprichter van 2xGen"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
              <div className="px-1">
                <p className="text-sm font-semibold text-[#09294c]">
                  Matthijs van Reek, oprichter van 2xGen
                </p>
                <Link
                  href="/over-ons"
                  className="inline-block text-sm font-medium text-[#1a5f9e] hover:underline mt-0.5"
                >
                  Meer over Matthijs →
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
            <p className="xgen-pill">Over 2xGen</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
              2xGen — 2x Generatie.
            </h2>
            <p className="text-xl font-semibold text-[#1a5f9e] leading-snug">
              Meer leads. Meer klanten. Meer resultaat.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              2xGen helpt bedrijven nieuwe klanten vinden met leadgeneratie, data, tools, websites, AI en automatisering.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We bouwen geen losse campagnes die verdwijnen zodra het budget stopt. We bouwen systemen die blijven werken en steeds beter kunnen worden.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Daarnaast bouwen en runnen we onze eigen digitale platforms. Zo testen we zelf wat werkt, wat niet werkt en waar de kansen liggen.
            </p>
            <p className="text-lg font-semibold text-[#09294c] leading-relaxed">
              Wat we voor klanten bouwen, bouwen we zelf ook.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

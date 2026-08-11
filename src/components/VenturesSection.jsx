'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ventures = [
  { name: 'FactuurBaas', angle: 'SEO → tool → lead', blurb: 'Gratis facturatie voor freelancers en kleine bedrijven.', url: 'https://factuurbaas.nl' },
  { name: 'ArubaBuddies', angle: 'Search → boeking', blurb: 'Travelplatform met SEO, content en affiliates.', url: 'https://arubabuddies.com' },
  { name: 'TopTours.ai', angle: 'AI → discovery', blurb: 'AI-gedreven discovery voor tours en activiteiten.', url: 'https://toptours.ai' },
  { name: 'OneHappyFinance', angle: 'Info → lead', blurb: 'Financiële informatie en leadgeneratie voor Aruba.', url: 'https://onehappyfinance.com' },
  { name: 'AruList', angle: 'Listing → deal', blurb: 'Marketplace voor tweedehands producten.', url: 'https://arulist.com' },
  { name: 'TOF Sports', angle: 'Community → product', blurb: 'Digitaal ecosysteem voor tennis en padel.', url: 'https://tofsports.nl' },
  { name: 'MyGoProfile', angle: 'Profiel → zichtbaarheid', blurb: 'Digitale bedrijfsprofielen voor lokale bedrijven.', url: 'https://mygoprofile.com' },
  { name: '365-platforms', angle: 'Search → intent', blurb: 'SEO-platforms voor tours in verschillende steden.', url: 'https://tyo365.com' },
];

const VenturesSection = () => {
  return (
    <section id="ventures" className="py-20 md:py-28 pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white border border-[#09294c]/10 p-8 sm:p-10 shadow-[0_16px_40px_rgba(9,41,76,0.06)]"
          >
            <div className="accent-bar mb-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.1] mb-4">
              We doen het zelf ook.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We runnen zelf websites en digitale producten. Daardoor weten we wat werkt — niet uit een presentatie, maar uit de praktijk.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-3xl pattern-navy text-white p-8 sm:p-10 flex flex-col justify-center"
          >
            <p className="text-[#3d8fd1] text-sm font-semibold mb-3">Onze proeftuin</p>
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white leading-tight">
              Geen PowerPoint-cases.
            </h3>
            <p className="text-lg text-white/65 leading-relaxed">
              We bouwen. Publiceren. Meten. Aanpassen. Bouwen verder.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ventures.map((venture, index) => (
            <motion.a
              key={venture.name}
              href={venture.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="group xgen-card p-5"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-semibold text-[#09294c]">{venture.name}</h3>
                <ExternalLink className="w-3.5 h-3.5 text-[#09294c]/25 group-hover:text-[#3d8fd1] transition-colors shrink-0 mt-1" />
              </div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{venture.blurb}</p>
              <p className="text-xs font-semibold text-[#3d8fd1]">{venture.angle}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenturesSection;

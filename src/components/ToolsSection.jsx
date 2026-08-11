'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const tools = [
  { name: 'HubSpot', category: 'CRM', icon: 'hubspot' },
  { name: 'n8n', category: 'Automation', icon: 'n8n' },
  { name: 'Make', category: 'Automation', icon: 'make' },
  { name: 'Zapier', category: 'Automation', icon: 'zapier' },
  { name: 'Google', category: 'Data', icon: 'google' },
  { name: 'Search Console', category: 'Data', icon: 'googlesearchconsole' },
  { name: 'LinkedIn', category: 'Data', logo: '/logos/linkedin.svg' },
  { name: 'ChatGPT', category: 'AI', logo: '/logos/chatgpt.svg' },
  { name: 'Claude', category: 'AI', icon: 'anthropic' },
  { name: 'Next.js', category: 'Development', icon: 'nextdotjs' },
  { name: 'WordPress', category: 'Development', icon: 'wordpress' },
  { name: 'Supabase', category: 'Development', icon: 'supabase' },
  { name: 'Vercel', category: 'Development', icon: 'vercel' },
];

function ToolLogo({ tool }) {
  const [failed, setFailed] = useState(false);
  const src = tool.logo
    ? tool.logo
    : tool.icon
      ? `https://cdn.simpleicons.org/${tool.icon}/ffffff`
      : null;

  if (!src || failed) {
    return (
      <span className="w-8 h-8 rounded-lg bg-white/10 text-white text-xs font-bold flex items-center justify-center">
        {tool.name.slice(0, 1)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={32}
      height={32}
      className="w-8 h-8 object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

const ToolsSection = () => {
  const duplicated = [...tools, ...tools];

  return (
    <section id="tools" className="py-20 md:py-24 pattern-navy overflow-hidden relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <span className="inline-flex px-3 py-1 rounded-full bg-[#3d8fd1]/20 text-[#9ec9ee] text-sm font-semibold mb-4 border border-[#3d8fd1]/25">
            Technologie
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-3 text-white">
            We gebruiken de technologie die past.
          </h2>
          <p className="text-lg text-white/60">
            Niet andersom. Bestaande tools waar dat slim is — maatwerk waar dat nodig is.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-[#09294c] z-10" style={{ maskImage: 'linear-gradient(to right, black, transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-[#09294c] z-10" style={{ maskImage: 'linear-gradient(to left, black, transparent)' }} />
        <div className="flex w-max gap-3 tools-marquee-track py-1">
          {duplicated.map((tool, index) => (
            <div
              key={`${tool.name}-${index}`}
              className="flex-shrink-0 w-[158px] h-[100px] bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 px-3 hover:bg-white/10 transition-colors"
            >
              <ToolLogo tool={tool} />
              <div className="text-center">
                <span className="block text-[11px] text-[#3d8fd1] font-medium leading-none mb-1">{tool.category}</span>
                <span className="text-sm font-semibold text-white leading-tight">{tool.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;

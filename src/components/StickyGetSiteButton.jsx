'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function StickyGetSiteButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="/get-a-site"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="fixed z-40 right-4 bottom-4 xgen-btn xgen-btn-primary !py-3 !px-5 text-sm shadow-lg shadow-[#09294c]/30 max-w-[calc(100vw-2rem)]"
        >
          <span className="truncate">Get a Site for Your Tours</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

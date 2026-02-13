import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const PricingSection = () => {
  return (
    <section id="explore" className="py-24 md:py-32 bg-[#0a2744] relative overflow-hidden">
      {/* Soft orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#1a4b7a]/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#2d6ba8]/30 rounded-full blur-[80px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center py-16 md:py-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-white/60 mb-6">Next step</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Explore the Possibilities
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-4 font-light">
            Every scalable venture begins with architecture.
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-12">
            If you're building a platform, a SaaS product, or a digital ecosystem — let's explore how to structure it for long-term growth.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-[#0a2744] bg-white rounded-full hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
          >
            Contact us to start the conversation
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

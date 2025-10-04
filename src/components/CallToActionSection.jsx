import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToActionSection = ({ title, description, buttonText, buttonLink }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-slate-50 to-gray-100 hero-pattern-subtle relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full filter blur-3xl opacity-50 animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-300/20 rounded-full filter blur-3xl opacity-40 animate-float-slow-reverse" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-indigo-300/10 rounded-full filter blur-2xl opacity-30 animate-float-medium" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">{title}</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
            {description}
          </p>
          <Button
            size="lg"
            className="bg-[#09294c] text-white hover:bg-[#1a4b7a] px-8 py-5 text-lg font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300 pulse-glow-light"
            onClick={() => document.querySelector(buttonLink)?.scrollIntoView({ behavior: 'smooth' })}
          >
            {buttonText}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;

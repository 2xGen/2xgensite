import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const AnimatedTextCharacter = ({ children, delay }) => {
  return (
    <motion.span
      style={{ display: 'inline-block' }}
      initial={{ opacity: 0, y: '0.5em' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  );
};

const AnimatedTextWord = ({ text, baseDelay = 0, className = "" }) => {
  return text.split(" ").map((word, wordIndex) => (
    <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.25em' }} className={className}>
      {word.split("").map((char, charIndex) => (
        <AnimatedTextCharacter key={charIndex} delay={baseDelay + (wordIndex * 0.08) + (charIndex * 0.02)}>
          {char}
        </AnimatedTextCharacter>
      ))}
    </span>
  ));
};

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-gray-100 hero-pattern-subtle overflow-hidden pt-32 pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full filter blur-3xl opacity-50"
          animate={{ 
            x: [0, 50, 0, -50, 0], 
            y: [0, -30, 0, 30, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-300/20 rounded-full filter blur-3xl opacity-40"
          animate={{ 
            x: [0, -40, 0, 40, 0], 
            y: [0, 20, 0, -20, 0],
            scale: [1, 0.9, 1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
         <motion.div 
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-indigo-300/10 rounded-full filter blur-2xl opacity-30"
          animate={{ 
            x: [0, 30, 0, -30, 0], 
            y: [0, -40, 0, 40, 0],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center glass-hero-content rounded-3xl shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="space-y-4 py-12 md:py-16"
        >
          <motion.div
            className="floating"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <span className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-[#09294c] opacity-90">
              <AnimatedTextWord text="2xGen" baseDelay={0.35} />
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-5 tracking-tight">
            <span className="block">
              <AnimatedTextWord text="We Build the" baseDelay={0.4} />
            </span>
            <span className="block bg-gradient-to-r from-[#09294c] via-[#1a4b7a] to-[#2d6ba8] text-transparent bg-clip-text pb-2">
              <AnimatedTextWord text="Future, Together" baseDelay={0.8} />
            </span>
          </h1>

          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
          >
            2xGen is a digital venture studio. We build, validate, and scale SaaS products and web platforms that deliver growth and long-term value.
          </motion.p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.9, ease: "easeOut" }}
          >
            <a
              href="#projects"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-[#09294c] rounded-full hover:bg-[#1a4b7a] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Our Portfolio
              <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
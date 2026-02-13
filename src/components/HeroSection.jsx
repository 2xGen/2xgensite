import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

const AnimatedTextCharacter = ({ children, delay }) => (
  <motion.span
    style={{ display: 'inline-block' }}
    initial={{ opacity: 0, y: '0.4em' }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.span>
);

const AnimatedTextWord = ({ text, baseDelay = 0, className = '' }) =>
  text.split(' ').map((word, wordIndex) => (
    <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.35em' }} className={className}>
      {word.split('').map((char, charIndex) => (
        <AnimatedTextCharacter key={charIndex} delay={baseDelay + wordIndex * 0.06 + charIndex * 0.015}>
          {char}
        </AnimatedTextCharacter>
      ))}
    </span>
  ));

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/50 via-sky-50/40 to-white hero-pattern-subtle overflow-hidden pt-24 pb-28"
    >
      {/* Animated background orbs (original style) */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full filter blur-3xl opacity-50"
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -30, 0, 30, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-300/20 rounded-full filter blur-3xl opacity-40"
          animate={{
            x: [0, -40, 0, 40, 0],
            y: [0, 20, 0, -20, 0],
            scale: [1, 0.9, 1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-indigo-300/10 rounded-full filter blur-2xl opacity-30"
          animate={{
            x: [0, 30, 0, -30, 0],
            y: [0, -40, 0, 40, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-10"
        >
          {/* Overline */}
          <motion.p
            className="text-sm font-semibold tracking-[0.2em] uppercase text-[#09294c]/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Digital venture studio
          </motion.p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            <AnimatedTextWord text="Let's" baseDelay={0.2} />
            <AnimatedTextWord text="build" baseDelay={0.28} />
            <AnimatedTextWord text="the" baseDelay={0.36} />
            <AnimatedTextWord text="future," baseDelay={0.44} />
            <br className="hidden sm:block" />
            <motion.span
              className="bg-gradient-to-r from-[#09294c] via-[#1a4b7a] to-[#2d6ba8] bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <AnimatedTextWord text="together." baseDelay={0.52} />
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            Digital ventures. SaaS platforms. Scalable systems. We architect the infrastructure that allows your digital presence to grow and compound.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#09294c] rounded-full hover:bg-[#1a4b7a] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Contact
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/insights"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-[#09294c] border-2 border-[#09294c]/30 rounded-full hover:bg-[#09294c]/5 hover:border-[#09294c]/50 transition-all duration-300"
            >
              <BookOpen className="w-4 h-4" />
              Read guides
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

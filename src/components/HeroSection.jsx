import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';

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
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50/30 to-white hero-pattern-subtle overflow-hidden pt-20 pb-20">
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
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-8 py-8 md:py-12"
        >
          {/* Main Headline - Compact */}
          <div className="relative mb-4">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-[-0.02em] leading-[1.15] max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="block">
                <span className="text-gray-500 font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  <AnimatedTextWord text="Get" baseDelay={0.5} />
                </span>{" "}
                <AnimatedTextWord text="Your Business" baseDelay={0.55} />{" "}
                <span className="text-gray-500 font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  <AnimatedTextWord text="Seen" baseDelay={0.6} />
                </span>{" "}
                <span className="text-gray-500 font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl">by the</span>{" "}
                <AnimatedTextWord text="Right Travelers" baseDelay={0.7} />{" "}
                <span className="text-gray-500 font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl">at the</span>{" "}
                <motion.span 
                  className="bg-gradient-to-r from-[#09294c] via-[#1a4b7a] to-[#2d6ba8] text-transparent bg-clip-text"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                >
                  <AnimatedTextWord text="Right Moment." baseDelay={1.0} />
                </motion.span>
              </span>
            </motion.h1>
            
            {/* Refined Decorative Element */}
            <motion.div
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[#09294c]/40 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "40%", opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.3, ease: "easeOut" }}
            />
          </div>

          {/* Refined Subheadline */}
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
          >
            We Drive the Bookings. You Provide the Memories.
          </motion.p>

          {/* Premium Features - More Refined */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
          >
            {[
              { icon: <TrendingUp className="w-4 h-4" />, text: "Maximum Visibility" },
              { icon: <Users className="w-4 h-4" />, text: "Targeted Leads" },
              { icon: <Zap className="w-4 h-4" />, text: "Zero Effort" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group flex items-center gap-3 px-5 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/80 hover:border-[#09294c]/30 hover:bg-white/80 transition-all duration-500 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <span className="text-[#09294c] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {item.icon}
                </span>
                <span className="text-base font-semibold text-gray-700 tracking-wide">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium CTA Section */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.8, ease: "easeOut" }}
          >
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center px-10 py-4 text-lg font-semibold text-white bg-[#09294c] rounded-full hover:bg-[#1a4b7a] transition-all duration-500 shadow-lg hover:shadow-xl overflow-hidden"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.7 }}
              />
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-4 h-4 ml-2 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href="#pricing"
              className="inline-flex items-center px-10 py-4 text-lg font-semibold text-[#09294c] bg-white border border-[#09294c]/20 rounded-full hover:border-[#09294c] hover:bg-gray-50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              View Pricing
            </motion.a>
          </motion.div>

          {/* Refined Trust Indicator */}
          <motion.div
            className="text-sm text-gray-400 font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.1 }}
          >
            Trusted by hospitality businesses worldwide
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
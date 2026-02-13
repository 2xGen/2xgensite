import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Target, Zap, TrendingUp } from 'lucide-react';

const AboutSection = () => {
  const founderImageUrl = "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/founder%202xGen.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL2ZvdW5kZXIgMnhHZW4ucG5nIiwiaWF0IjoxNzU3MjM5NjYxLCJleHAiOjQyODAxMTk2NjF9.LeDtfzNJq5ny7A3MFdeeZb4wYii53V7tBut9vSoLrkc";

  const philosophy = [
    { icon: <Layers className="w-8 h-8 text-[#09294c]" />, text: "Platforms outperform campaigns" },
    { icon: <Zap className="w-8 h-8 text-[#09294c]" />, text: "Systems outperform tactics" },
    { icon: <Target className="w-8 h-8 text-[#09294c]" />, text: "Ownership outperforms dependency" },
    { icon: <TrendingUp className="w-8 h-8 text-[#09294c]" />, text: "Long-term positioning beats short-term traffic" }
  ];

  return (
    <section id="about" className="relative overflow-hidden">
      {/* Block 1: founder + copy — subtle blue tint */}
      <div className="bg-[#eef4f9] py-24 md:py-32 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09294c]/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[1fr,1.4fr] gap-10 md:gap-14 items-start">
          <motion.div
            className="relative group max-w-sm mx-auto md:mx-0 md:sticky md:top-24"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="card-premium p-2 overflow-hidden">
              <img
                src={founderImageUrl}
                alt="Matthijs van Reek, Founder of 2xGen"
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-gray-100">
                  <p className="text-sm font-bold text-[#09294c] text-center tracking-wide">
                    Matthijs van Reek, Founder of 2xGen
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#09294c]/60">About 2xGen</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.15]">
              <span className="text-premium-gradient">Beyond Websites. Built for Scale.</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-800 font-bold leading-snug">
              We help turn ideas into platforms — and platforms into long-term digital assets.
            </p>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              2xGen is a digital venture studio. We partner with founders and operators to architect scalable digital models — then build the systems that allow them to grow.
            </p>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              SaaS platforms. Marketplaces. AI-driven applications. Authority-driven ecosystems.
            </p>
            <p className="text-lg sm:text-xl text-gray-800 font-medium">
              Every venture is structured around one principle:
              <br />
              compounding digital leverage.
            </p>
          </motion.div>
          </div>
        </div>
      </div>

      {/* Block 2: philosophy + office — slightly warmer/softer tint */}
      <div className="bg-[#f5f8fb] py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[1.2fr,1fr] gap-10 md:gap-14 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#09294c]/60">How we think</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Our Philosophy
            </h3>
            <p className="text-xl text-gray-700 font-medium">
              Digital presence should be structural, not decorative.
            </p>
            <p className="text-lg text-gray-500">We believe:</p>
            <div className="grid sm:grid-cols-2 gap-5">
              {philosophy.map((item, index) => (
                <motion.div
                  key={index}
                  className="card-premium flex items-center gap-5 p-6"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 bg-gradient-to-br from-[#E5F5FC] to-[#D0E8F5] p-4 rounded-xl shadow-inner">
                    {item.icon}
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{item.text}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-lg text-gray-600 font-medium">
              The right digital architecture creates optionality — and optionality creates power.
            </p>
          </motion.div>

          <motion.div
            className="md:sticky md:top-24 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="card-premium p-2 w-full max-w-md overflow-hidden">
              <img
                src="https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/images/2xGen%20office.png"
                alt="2xGen office"
                className="w-full aspect-square object-cover rounded-xl"
              />
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

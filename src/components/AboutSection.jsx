import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Zap } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-[#09294c]" />,
      title: "Strategic Positioning",
      description: "We understand where travelers actually make decisions, not just where they search."
    },
    {
      icon: <Heart className="w-8 h-8 text-[#09294c]" />,
      title: "Human-Centered",
      description: "Real recommendations from real people create trust that algorithms can't replicate."
    },
    {
      icon: <Zap className="w-8 h-8 text-[#09294c]" />,
      title: "Product-First",
      description: "Tools built specifically for your industry, not generic solutions adapted to fit."
    }
  ];

  const founderImageUrl = "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/founder%202xGen.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL2ZvdW5kZXIgMnhHZW4ucG5nIiwiaWF0IjoxNzU3MjM5NjYxLCJleHAiOjQyODAxMTk2NjF9.LeDtfzNJq5ny7A3MFdeeZb4wYii53V7tBut9vSoLrkc";

  return (
    <section id="about" className="py-28 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[1fr,1.5fr] gap-8 md:gap-12 items-start px-4 mb-20">
          <motion.div
            className="relative group max-w-sm mx-auto md:mx-0 md:sticky md:top-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-[#09294c] via-[#1a4b7a] to-[#2d6ba8] rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-2 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <img 
                src={founderImageUrl} 
                alt="Matthijs van Reek, Founder of 2xGen" 
                className="h-auto w-full object-cover rounded-xl"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-md rounded-xl px-5 py-3 shadow-xl border border-gray-100">
                  <p className="text-sm font-bold text-[#09294c] text-center tracking-wide">
                    Matthijs van Reek, Founder of 2xGen
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09294c] via-[#1a4b7a] to-[#2d6ba8]">Built for Hospitality</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-light">
              We build tools specifically for tours and restaurants to help you get found, trusted, and booked.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              At 2xGen, we understand that running a hospitality business means focusing on creating exceptional experiences for your guests. That's why we've built four SaaS products that work together to solve the specific challenges tours and restaurants face.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Instead of generic marketing tools, you get products designed for your industry. Our tools help you get discovered by travelers when they're planning their trip, manage your online presence efficiently, and capture bookings from high-intent travelers.
            </p>
          </motion.div>
        </div>

        {/* Our Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-10 text-center tracking-tight">What We Stand For</h3>
          <div className="grid sm:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#09294c]/20 transition-all duration-500 hover:-translate-y-1 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-[#E5F5FC] to-[#D0E8F5] p-4 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
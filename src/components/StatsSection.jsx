'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 15, suffix: '+', label: 'Digitale projecten' },
  { value: 12, suffix: '', label: 'Platforms gebouwd' },
  { value: 5, suffix: '+', label: 'Acquisitiekanalen' },
  { value: null, display: 'Live', label: 'Eigen producten in productie' },
];

function CountUp({ value, suffix = '', active }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || value == null) return;
    let frame;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);
  if (value == null) return null;
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="cijfers" className="py-16 md:py-20 bg-[#09294c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="text-center lg:text-left"
            >
              <p className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                {stat.display ? (
                  stat.display
                ) : (
                  <CountUp value={stat.value} suffix={stat.suffix} active={inView} />
                )}
              </p>
              <p className="text-sm text-white/55 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

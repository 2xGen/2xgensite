'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';

const ContactSection = () => {
  const { t } = useLocale();

  return (
    <section id="contact" className="py-20 md:py-24 pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-[#09294c] text-white p-8 sm:p-10 relative overflow-hidden flex flex-col justify-center"
          >
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#3d8fd1]" />
            <p className="text-[#3d8fd1] font-semibold mb-3">{t.contactHome.label}</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white">
              {t.contactHome.h2}
            </h2>
            <p className="text-white/65 leading-relaxed max-w-md">{t.contactHome.body}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="space-y-3"
          >
            <a
              href="mailto:matthijs@2xgen.com"
              className="xgen-card p-5 sm:p-6 flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f1f8] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#09294c]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{t.pages.contact.email}</p>
                  <p className="font-semibold text-[#09294c]">matthijs@2xgen.com</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#3d8fd1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="https://wa.me/2975668844"
              target="_blank"
              rel="noopener noreferrer"
              className="xgen-card p-5 sm:p-6 flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f1f8] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#09294c]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{t.pages.contact.whatsapp}</p>
                  <p className="font-semibold text-[#09294c]">+297 566 8844</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#3d8fd1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

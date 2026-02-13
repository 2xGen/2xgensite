import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, MessageCircle, Building2 } from 'lucide-react';

const ContactSection = () => {
  const contactInfo = [
    { icon: <Building2 className="w-7 h-7 text-[#09294c]" />, title: "Company", lines: ["2xGen LLC"], subtext: "" },
    { icon: <MapPin className="w-7 h-7 text-[#09294c]" />, title: "Company registration", lines: ["Albuquerque, New Mexico, USA"], subtext: "" },
    {
      icon: <Mail className="w-7 h-7 text-[#09294c]" />,
      title: "Email",
      lines: ["matthijs@2xgen.com"],
      subtext: "",
      href: "mailto:matthijs@2xgen.com",
      actionLabel: "Send email",
    },
    {
      icon: <MessageCircle className="w-7 h-7 text-[#09294c]" />,
      title: "WhatsApp",
      lines: ["+297 566 8844"],
      subtext: "",
      href: "https://wa.me/2975668844",
      actionLabel: "Send WhatsApp",
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#f8fafc] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09294c]/10 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#09294c]/60 mb-6">Get in touch</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-premium-gradient">Contact</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every scalable venture begins with architecture. Contact us to start the conversation.
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Card className="card-premium border-0 p-8">
            <CardContent className="space-y-6">
              {contactInfo.map((info, index) => {
                const content = (
                  <>
                    <div className="flex-shrink-0 bg-gradient-to-br from-[#E5F5FC] to-[#D0E8F5] p-3 rounded-xl">
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{info.title}</h4>
                      {info.lines.map((line, i) => (
                        <p key={i} className="text-gray-800 font-medium">{line}</p>
                      ))}
                    </div>
                  </>
                );
                const linkProps = info.href
                  ? { href: info.href, ...(info.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
                  : {};
                return (
                  <div key={index} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    {info.href && info.actionLabel ? (
                      <>
                        <div className="flex items-start gap-4 min-w-0 flex-1">{content}</div>
                        <a
                          {...linkProps}
                          className="w-full sm:w-auto sm:min-w-[140px] shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#09294c] text-white font-semibold text-sm hover:bg-[#1a4b7a] transition-colors"
                        >
                          {info.actionLabel}
                        </a>
                      </>
                    ) : info.href ? (
                      <a className="flex items-start gap-4 hover:opacity-90 transition-opacity flex-1" {...linkProps}>
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">{content}</div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

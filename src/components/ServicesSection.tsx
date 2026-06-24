'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { SERVICES, BRAND } from '@/lib/constants';

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-sm font-medium mb-4">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="gradient-text-white">World-Class Travel</span>{' '}<span className="gradient-text">Services</span>
          </h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto">Premium travel services with tiered accommodation options.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-6 group relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-[60px] group-hover:bg-gold-400/10 transition-colors duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-navy-300 text-sm mb-6 leading-relaxed flex-grow">{service.description}</p>

                {/* Categories */}
                <div className="space-y-2 mb-6">
                  {service.categories.map((category) => (
                    <div key={category} className="flex items-center gap-2 text-sm py-2 px-3 rounded-lg bg-navy-800/50">
                      <span className="text-gold-400 text-xs">★</span>
                      <span className="text-navy-200">{category} Accommodation</span>
                    </div>
                  ))}
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-3 justify-center mt-auto pt-4 border-t border-navy-700/30">
                  <a
                    href={`mailto:${BRAND.email}`}
                    title="Send Email"
                    className="w-9 h-9 rounded-lg bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/30 text-gold-400 transition-all flex items-center justify-center hover:scale-110"
                  >
                    <Mail size={18} className="hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Chat on WhatsApp"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-400/10 hover:from-gold-400/30 hover:to-gold-400/20 border-2 border-gold-400/40 text-gold-400 transition-all flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-gold-400/20"
                  >
                    <MessageCircle size={18} className="hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

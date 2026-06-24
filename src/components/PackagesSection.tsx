'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { PACKAGES, BRAND } from '@/lib/constants';

export default function PackagesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="packages" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gold-400/3 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-sm font-medium mb-4">Premium Umrah</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="gradient-text-white">Tailored Umrah</span>{' '}<span className="gradient-text">Packages</span>
          </h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto">Choose from our premium tiered Umrah packages designed for your spiritual journey.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -8 }}
              className={`glass-card p-8 relative overflow-hidden group ${pkg.featured ? 'ring-2 ring-gold-400/50 md:scale-105' : ''}`}
            >
              {pkg.featured && (
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold-400/20 rounded-full blur-2xl" />
              )}

              {pkg.featured && (
                <div className="absolute top-4 right-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/50 text-gold-400 text-xs font-bold uppercase">
                    Recommended
                  </span>
                </div>
              )}

              <div className="relative z-10">
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 rounded-lg bg-gold-400/10 border border-gold-400/30 mb-4">
                    <span className="text-gold-400 text-xs font-medium">★ {pkg.tier}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.title}</h3>
                  <p className="text-navy-300 text-sm">{pkg.description}</p>
                </div>

                <div className="mb-8 p-6 bg-gold-400/5 rounded-xl border border-gold-400/20">
                  <span className="text-navy-400 text-sm">Starting from</span>
                  <div className="text-4xl font-bold gradient-text mt-1">
                    {pkg.price} <span className="text-lg text-navy-300">{pkg.currency}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3 text-sm text-navy-200">
                      <span className="text-gold-400 mt-1">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 justify-center">
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=Hi,%20I'm%20interested%20in%20the%20${pkg.tier}%20Umrah%20Package`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Chat on WhatsApp"
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-400/10 hover:from-gold-400/30 hover:to-gold-400/20 border-2 border-gold-400/40 text-gold-400 transition-all flex items-center justify-center group hover:scale-110 hover:shadow-lg hover:shadow-gold-400/20"
                  >
                    <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href={`mailto:${BRAND.email}?subject=Inquiry:%20${pkg.tier}%20Umrah%20Package`}
                    title="Send Email"
                    className="w-11 h-11 rounded-lg bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/30 text-gold-400 transition-all flex items-center justify-center group hover:scale-110"
                  >
                    <Mail size={19} className="group-hover:scale-110 transition-transform" />
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

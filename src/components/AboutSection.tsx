'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    { icon: '🌍', title: '30+ Years Experience', description: 'Three decades of excellence in corporate and leisure travel.' },
    { icon: '✈️', title: 'Corporate Travel Specialists', description: 'Tailored solutions for businesses with dedicated management.' },
    { icon: '🕋', title: 'Hajj & Umrah Experts', description: 'Authorized packages with premium accommodations near Haram.' },
    { icon: '🤝', title: 'Global Airline Partnerships', description: 'Partnerships with 50+ international airlines for best fares.' },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/3 rounded-full blur-[120px]" />
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-sm font-medium mb-4">About Us</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="gradient-text-white">Your Trusted Travel</span>{' '}<span className="gradient-text">Partner</span>
          </h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto">Since 1994, Ticksol has been providing world-class travel services globally.</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="glass-card p-8 md:p-10">
              <h3 className="text-2xl font-bold gradient-text mb-6" style={{ fontFamily: 'var(--font-display)' }}>Our Story</h3>
              <div className="space-y-4 text-navy-200 leading-relaxed">
                <p>Ticksol Corporate Travel & Tours was founded with a vision to transform travel in Pakistan. Over three decades, we grew from a small agency to a trusted name in corporate and luxury travel.</p>
                <p>Our expertise spans international flights, visa processing, Hajj & Umrah, hotel reservations, and customized tour packages. We pride ourselves on a 98% visa success rate and 50+ airline partnerships.</p>
                <p>Today, we serve thousands of corporate clients and individual travelers, providing seamless end-to-end travel solutions combining luxury, reliability, and value.</p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-gold-400/50 to-transparent" />
                <span className="text-gold-400 text-sm font-medium">Est. 1994</span>
                <div className="h-px flex-1 bg-gradient-to-l from-gold-400/50 to-transparent" />
              </div>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }} whileHover={{ y: -5 }} className="glass-card-light p-6 group cursor-default">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h4 className="text-white font-semibold mb-2">{f.title}</h4>
                <p className="text-navy-300 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

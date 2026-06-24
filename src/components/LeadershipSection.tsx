'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LEADERSHIP_TEAM } from '@/lib/constants';
import Image from 'next/image';

export default function LeadershipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="leadership" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/30 to-navy-950" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold-400/3 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-sm font-medium mb-4">Leadership</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="gradient-text-white">Our Leadership</span>{' '}<span className="gradient-text">Team</span>
          </h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto">Experienced leaders dedicated to excellence in travel services.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {LEADERSHIP_TEAM.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -8 }}
              className="text-center"
            >
              {/* Circular Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-48 h-48 mx-auto mb-6 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/20 to-gold-600/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gold-400/30 group-hover:border-gold-400/50 transition-all duration-500 shadow-2xl shadow-gold-400/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                    priority
                    quality={95}
                    sizes="(max-width: 768px) 150px, 192px"
                  />
                </div>
              </motion.div>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + 0.1 * i }}
                className="glass-card p-6"
              >
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-gold-400 font-semibold text-sm mb-4">{member.position}</p>
                <p className="text-navy-300 text-sm leading-relaxed">
                  Committed to delivering premium travel experiences and exceeding customer expectations with dedication and expertise.
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { DESTINATIONS, RELIGIOUS_TOURS, BRAND } from '@/lib/constants';

export default function DestinationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'religious' | 'international'>('religious');

  const gradients = [
    'from-amber-500/20 to-orange-600/20',
    'from-emerald-500/20 to-teal-600/20',
    'from-blue-500/20 to-indigo-600/20',
    'from-purple-500/20 to-violet-600/20',
    'from-rose-500/20 to-pink-600/20',
    'from-cyan-500/20 to-sky-600/20',
    'from-lime-500/20 to-green-600/20',
  ];

  const religiousDestinations = [
    {
      id: 'hajj-umrah',
      title: 'Hajj & Umrah',
      image: '/Umrah.jpg',
      emoji: '🕋',
      highlights: [
        'Premium accommodation options',
        'Visa assistance',
        'Flight arrangements',
        'Transportation',
        'Religious guidance',
      ],
    },
    {
      id: 'najaf-karbala',
      title: 'Najaf & Karbala',
      image: '/Najaf.jpg',
      emoji: '🏛️',
      highlights: [
        'Ziyarat tours',
        'Accommodation',
        'Transportation',
        'Guided religious visits',
      ],
    },
    {
      id: 'mashhad-iran',
      title: 'Mashhad, Iran',
      image: '/Mashad-shrine.webp',
      emoji: '🇮🇷',
      highlights: [
        'Shrine visitation',
        'Hotel arrangements',
        'Transportation',
        'Religious tour services',
      ],
    },
  ];

  return (
    <section id="destinations" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/30 to-navy-950" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-400/3 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-sm font-medium mb-4">Explore Destinations</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="gradient-text-white">Discover</span>{' '}<span className="gradient-text">Religious & International Tours</span>
          </h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto">Choose your spiritual or leisure journey to unforgettable destinations.</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <motion.button
            onClick={() => setActiveTab('religious')}
            className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'religious'
                ? 'bg-gold-400/20 text-gold-400 border border-gold-400/50'
                : 'bg-navy-800/50 text-navy-300 border border-navy-700/50 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🕋 Religious Tours
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('international')}
            className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'international'
                ? 'bg-gold-400/20 text-gold-400 border border-gold-400/50'
                : 'bg-navy-800/50 text-navy-300 border border-navy-700/50 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌍 International Tours
          </motion.button>
        </div>

        {/* Religious Tours Tab */}
        {activeTab === 'religious' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {religiousDestinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card overflow-hidden group cursor-pointer flex flex-col h-full"
              >
                <div className="relative h-48 bg-gradient-to-br from-gold-400/10 to-gold-600/10 overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0">
                    <Image
                      src={dest.image}
                      alt={dest.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent group-hover:from-navy-950/50 transition-all duration-300" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3">{dest.title}</h3>
                  <div className="space-y-2 mb-6 flex-grow">
                    {dest.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-2 text-sm text-navy-300">
                        <span className="text-gold-400 mt-0.5">✓</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 justify-center mt-auto pt-4 border-t border-navy-700/30">
                    <a
                      href={`mailto:${BRAND.email}`}
                      title="Send Email"
                      className="w-9 h-9 rounded-lg bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/30 text-gold-400 transition-all flex items-center justify-center hover:scale-110"
                    >
                      <Mail size={16} className="hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href={`https://wa.me/${BRAND.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Chat on WhatsApp"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-400/10 hover:from-gold-400/30 hover:to-gold-400/20 border-2 border-gold-400/40 text-gold-400 transition-all flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-gold-400/20"
                    >
                      <MessageCircle size={16} className="hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* International Tours Tab */}
        {activeTab === 'international' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {DESTINATIONS.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card overflow-hidden group cursor-pointer flex flex-col h-full"
              >
                <div className={`relative h-48 bg-gradient-to-br ${gradients[i]} overflow-hidden group flex-shrink-0`}>
                  <div className="absolute inset-0">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      priority
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent group-hover:from-navy-950/70 transition-all duration-300" />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">{dest.name}</h3>
                  <p className="text-navy-300 text-sm leading-relaxed mb-4 flex-grow">{dest.description}</p>
                  <div className="flex gap-2 justify-center mt-auto pt-3 border-t border-navy-700/30">
                    <a
                      href={`mailto:${BRAND.email}`}
                      title="Send Email"
                      className="w-9 h-9 rounded-lg bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/30 text-gold-400 transition-all flex items-center justify-center hover:scale-110"
                    >
                      <Mail size={16} className="hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href={`tel:${BRAND.phone}`}
                      title="Call"
                      className="w-9 h-9 rounded-lg bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/30 text-gold-400 transition-all flex items-center justify-center hover:scale-110"
                    >
                      <Phone size={16} className="hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href={`https://wa.me/${BRAND.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Chat on WhatsApp"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-400/10 hover:from-gold-400/30 hover:to-gold-400/20 border-2 border-gold-400/40 text-gold-400 transition-all flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-gold-400/20"
                    >
                      <MessageCircle size={16} className="hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BRAND, STATS } from '@/lib/constants';

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold gradient-text">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-40" />

        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-400/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy-600/10 rounded-full blur-[100px]" />

        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -100, null],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Flying plane animation */}
        <motion.div
          className="absolute top-[30%] text-4xl opacity-20"
          animate={{
            x: ['-10%', '110%'],
            y: ['0%', '-5%', '0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ✈️
        </motion.div>

        {/* Globe lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          viewBox="0 0 1200 800"
          fill="none"
        >
          <ellipse cx="600" cy="400" rx="350" ry="350" stroke="currentColor" strokeWidth="0.5" className="text-gold-400" />
          <ellipse cx="600" cy="400" rx="350" ry="200" stroke="currentColor" strokeWidth="0.5" className="text-gold-400" transform="rotate(30 600 400)" />
          <ellipse cx="600" cy="400" rx="350" ry="200" stroke="currentColor" strokeWidth="0.5" className="text-gold-400" transform="rotate(-30 600 400)" />
          <ellipse cx="600" cy="400" rx="350" ry="150" stroke="currentColor" strokeWidth="0.5" className="text-gold-400" transform="rotate(60 600 400)" />
        </svg>
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Main Content */}
          <div className="flex flex-col items-start lg:items-start text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/20 mb-8"
            >
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              <span className="text-gold-400 text-sm font-medium">
                30+ Years of Excellence
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="gradient-text-white">Your Trusted</span>
              <br />
              <span className="gradient-text">Travel Partner</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-lg text-navy-300 max-w-xl mb-10"
            >
              {BRAND.subTagline}. Specializing in Hajj & Umrah, religious tours, international holidays, visa processing, and air ticketing.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a href="#services" className="btn-premium text-base px-8 py-4 flex items-center gap-2 justify-center">
                <span>Explore Services</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 10h6m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#contact" className="btn-outline-gold text-base px-8 py-4 flex items-center gap-2 justify-center">
                <span>Get Quote</span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-8 w-full max-w-lg"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="text-left"
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <div className="text-sm text-navy-400 mt-2 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Service Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              { title: 'Air Ticketing', icon: '✈️', desc: 'International & domestic flights' },
              { title: 'Hotel Reservations', icon: '🏨', desc: '3★ to 5★ properties' },
              { title: 'Visa Processing', icon: '🛂', desc: '98% success rate' },
              { title: 'Domestic Travel', icon: '🚗', desc: 'All transport options' },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-card p-5 rounded-xl group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gold-400/5 rounded-full blur-2xl group-hover:bg-gold-400/10 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                  <h4 className="font-bold text-white text-sm mb-2 group-hover:text-gold-400 transition-colors">{service.title}</h4>
                  <p className="text-navy-300 text-xs leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
    </section>
  );
}

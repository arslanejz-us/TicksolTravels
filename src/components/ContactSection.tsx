'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validations';
import { BRAND } from '@/lib/constants';
import toast from 'react-hot-toast';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { toast.success('Message sent successfully!'); reset(); }
      else { toast.error('Failed to send message. Please try again.'); }
    } catch { toast.error('Something went wrong.'); }
    finally { setIsSubmitting(false); }
  };

  const inputClass = 'w-full bg-navy-800/50 border border-navy-600/50 rounded-xl px-4 py-3 text-white placeholder-navy-400 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all';
  const errorClass = 'text-red-400 text-xs mt-1';

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/30 to-navy-950" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-400/3 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-sm font-medium mb-4">Contact Us</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="gradient-text-white">Get In</span>{' '}<span className="gradient-text">Touch</span>
          </h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto">Ready to plan your next trip? Contact us for a personalized quote.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <input {...register('name')} placeholder="Your Name" className={inputClass} />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <input {...register('email')} placeholder="Email Address" className={inputClass} />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <input {...register('phone')} placeholder="Phone Number" className={inputClass} />
                  </div>
                  <div>
                    <select {...register('serviceType')} className={inputClass}>
                      <option value="">Select Service</option>
                      <option value="ticket">Ticket Reservation</option>
                      <option value="visa">Visa Processing</option>
                      <option value="hajj">Hajj & Umrah</option>
                      <option value="hotel">Hotel Booking</option>
                      <option value="tour">Tour Package</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <textarea {...register('message')} placeholder="Your Message" rows={5} className={inputClass} />
                  {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full btn-premium !py-4 text-base disabled:opacity-50">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="glass-card p-6 flex items-center gap-4 group hover:bg-gold-400/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 group-hover:bg-gold-400/20 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110">📱</div>
              <div>
                <h4 className="text-white font-semibold">Phone</h4>
                <a href={`tel:${BRAND.phone}`} className="text-navy-300 hover:text-gold-400 transition-colors font-medium">{BRAND.phone}</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.45 }} className="glass-card p-6 flex items-center gap-4 group hover:bg-gold-400/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 group-hover:bg-gold-400/20 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110">📧</div>
              <div>
                <h4 className="text-white font-semibold">Email</h4>
                <a href={`mailto:${BRAND.email}`} className="text-navy-300 hover:text-gold-400 transition-colors font-medium">{BRAND.email}</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="glass-card p-6 flex items-center gap-4 group hover:bg-gold-400/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 group-hover:bg-gold-400/20 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110">💬</div>
              <div>
                <h4 className="text-white font-semibold">WhatsApp</h4>
                <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-navy-300 hover:text-gold-400 transition-colors font-medium">{BRAND.whatsapp}</a>
              </div>
            </motion.div>
            <div className="glass-card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center text-2xl">📍</div>
              <div>
                <h4 className="text-white font-semibold">Address</h4>
                <p className="text-navy-300">{BRAND.address}</p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="glass-card overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435519.2274198979!2d74.00472!3d31.4832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Ticksol Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

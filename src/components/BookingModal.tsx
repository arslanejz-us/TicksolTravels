'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, BookingFormData } from '@/lib/validations';
import { SERVICES, DESTINATIONS } from '@/lib/constants';
import toast from 'react-hot-toast';

interface BookingModalProps {
  defaultService?: string;
  onClose: () => void;
}

export default function BookingModal({ defaultService = '', onClose }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: defaultService,
      travelers: 1,
      packageType: '3-star',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await res.json();
      if (res.ok) {
        toast.success(`Booking confirmed! ID: ${result.id?.slice(0, 8)}`);
        onClose();
      } else { toast.error(result.error || 'Booking failed'); }
    } catch { toast.error('Something went wrong'); }
    finally { setIsSubmitting(false); }
  };

  const nextStep = async () => {
    const fields: (keyof BookingFormData)[][] = [['name', 'email', 'phone'], ['service', 'packageType', 'destination', 'date', 'travelers']];
    const valid = await trigger(fields[step - 1]);
    if (valid) setStep(step + 1);
  };

  const inputClass = 'w-full bg-navy-800/50 border border-navy-600/50 rounded-xl px-4 py-3 text-white placeholder-navy-400 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all text-sm';
  const labelClass = 'block text-navy-200 text-sm font-medium mb-1.5';
  const errorClass = 'text-red-400 text-xs mt-1';

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold gradient-text">Book Your Trip</h3>
              <p className="text-navy-400 text-sm">Step {step} of 2</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-navy-800/50 flex items-center justify-center text-navy-400 hover:text-white transition-colors">✕</button>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-gold-400' : 'bg-navy-700'}`} />
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-4">
                <div><label className={labelClass}>Full Name *</label><input {...register('name')} placeholder="John Doe" className={inputClass} />{errors.name && <p className={errorClass}>{errors.name.message}</p>}</div>
                <div><label className={labelClass}>Email *</label><input {...register('email')} type="email" placeholder="john@example.com" className={inputClass} />{errors.email && <p className={errorClass}>{errors.email.message}</p>}</div>
                <div><label className={labelClass}>Phone *</label><input {...register('phone')} placeholder="+92-300-1234567" className={inputClass} />{errors.phone && <p className={errorClass}>{errors.phone.message}</p>}</div>
                <button type="button" onClick={nextStep} className="w-full btn-premium !py-3 text-sm mt-4">Next Step →</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Service *</label>
                  <select {...register('service')} className={inputClass}>
                    <option value="">Select Service</option>
                    {SERVICES.map((s) => <option key={s.id} value={s.title}>{s.icon} {s.title}</option>)}
                  </select>
                  {errors.service && <p className={errorClass}>{errors.service.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Package Tier *</label>
                  <select {...register('packageType')} className={inputClass}>
                    <option value="3-star">3★ Standard</option>
                    <option value="4-star">4★ Premium</option>
                    <option value="premium">Premium / VIP</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Destination *</label>
                  <select {...register('destination')} className={inputClass}>
                    <option value="">Select Destination</option>
                    {DESTINATIONS.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                  {errors.destination && <p className={errorClass}>{errors.destination.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Travel Date *</label>
                    <input {...register('date')} type="date" className={inputClass} />
                    {errors.date && <p className={errorClass}>{errors.date.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Travelers</label>
                    <input {...register('travelers', { valueAsNumber: true })} type="number" min="1" max="50" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Notes (Optional)</label>
                  <textarea {...register('notes')} rows={3} placeholder="Any special requirements..." className={inputClass} />
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 btn-outline-gold !py-3 text-sm">← Back</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 btn-premium !py-3 text-sm disabled:opacity-50">{isSubmitting ? 'Booking...' : 'Confirm Booking'}</button>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

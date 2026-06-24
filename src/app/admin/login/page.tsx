'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/validations';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.ok) {
        toast.success('Welcome back, Admin!');
        router.push('/admin');
      } else {
        toast.error('Invalid credentials');
      }
    } catch {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = 'w-full bg-navy-800/50 border border-navy-600/50 rounded-xl px-4 py-3.5 text-white placeholder-navy-400 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all';

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 bg-grid relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md mx-4">
        <div className="glass-card p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gold-400/20">
              <span className="text-navy-950 font-bold text-2xl">T</span>
            </div>
            <h1 className="text-2xl font-bold gradient-text" style={{ fontFamily: 'var(--font-display)' }}>Admin Panel</h1>
            <p className="text-navy-400 text-sm mt-1">Sign in to manage Ticksol</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-navy-200 text-sm font-medium mb-1.5">Email</label>
              <input {...register('email')} type="email" placeholder="admin@ticksol.com" className={inputClass} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-navy-200 text-sm font-medium mb-1.5">Password</label>
              <input {...register('password')} type="password" placeholder="••••••••" className={inputClass} />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={isLoading} className="w-full btn-premium !py-4 text-base disabled:opacity-50">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-navy-400 hover:text-gold-400 text-sm transition-colors">← Back to website</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

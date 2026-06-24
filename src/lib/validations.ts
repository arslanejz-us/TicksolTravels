import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  packageType: z.string().min(1, 'Please select a package type'),
  destination: z.string().min(1, 'Please select a destination'),
  date: z.string().min(1, 'Please select a date'),
  travelers: z.number().min(1, 'At least 1 traveler required').max(50),
  notes: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  serviceType: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const serviceSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  icon: z.string().optional(),
  rating: z.number().min(1).max(5),
  price3Star: z.string().optional(),
  price4Star: z.string().optional(),
  pricePremium: z.string().optional(),
  isActive: z.boolean(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;

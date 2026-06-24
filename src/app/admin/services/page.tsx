'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, ServiceFormData } from '@/lib/validations';
import toast from 'react-hot-toast';
import { SERVICES } from '@/lib/constants';

interface DBService {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  rating: number;
  price3Star: string | null;
  price4Star: string | null;
  pricePremium: string | null;
  isActive: boolean;
  order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<DBService[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<DBService | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      description: '',
      icon: '✈️',
      rating: 3,
      price3Star: '',
      price4Star: '',
      pricePremium: '',
      isActive: true,
    },
  });

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const onSubmit = async (data: ServiceFormData) => {
    try {
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
      const method = editingService ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(editingService ? 'Service updated successfully!' : 'Service created successfully!');
        reset();
        setEditingService(null);
        setShowForm(false);
        fetchServices();
      } else {
        toast.error('Failed to save service');
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  const startEdit = (service: DBService) => {
    setEditingService(service);
    setValue('title', service.title);
    setValue('description', service.description);
    setValue('icon', service.icon || '✈️');
    setValue('rating', service.rating);
    setValue('price3Star', service.price3Star || '');
    setValue('price4Star', service.price4Star || '');
    setValue('pricePremium', service.pricePremium || '');
    setValue('isActive', service.isActive);
    setShowForm(true);
  };

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Service deleted');
        fetchServices();
      } else {
        toast.error('Failed to delete service');
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  const toggleActive = async (service: DBService) => {
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !service.isActive }),
      });
      if (res.ok) {
        toast.success(`Service ${!service.isActive ? 'enabled' : 'disabled'}`);
        fetchServices();
      }
    } catch {
      toast.error('Failed to update service status');
    }
  };

  const seedDefaultServices = async () => {
    if (!confirm('This will seed default services into the database. Continue?')) return;
    try {
      for (const s of SERVICES) {
        await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: s.title,
            description: s.description,
            icon: s.icon,
            rating: s.id === 'hajj-umrah' ? 5 : s.id === 'visa-processing' ? 4 : 3,
            price3Star: s.prices[0] || '',
            price4Star: s.prices[1] || '',
            pricePremium: s.prices[2] || s.prices[0] || '',
            isActive: true,
          }),
        });
      }
      toast.success('Default services seeded!');
      fetchServices();
    } catch {
      toast.error('Seeding failed');
    }
  };

  const inputClass = 'w-full bg-navy-800/50 border border-navy-600/50 rounded-xl px-4 py-3 text-white placeholder-navy-400 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all text-sm';
  const labelClass = 'block text-navy-200 text-sm font-medium mb-1.5';
  const errorClass = 'text-red-400 text-xs mt-1';

  if (loading) return <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-20 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Services List ({services.length})</h2>
        <div className="flex gap-2">
          {services.length === 0 && (
            <button onClick={seedDefaultServices} className="btn-outline-gold !py-2.5 !px-4 text-xs font-semibold">
              Seed Defaults
            </button>
          )}
          <button
            onClick={() => {
              setEditingService(null);
              reset();
              setShowForm(!showForm);
            }}
            className="btn-premium !py-2.5 !px-6 text-sm"
          >
            {showForm ? 'Cancel' : 'Add Service'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">
            {editingService ? `Edit Service: ${editingService.title}` : 'Add New Service'}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Service Title *</label>
                <input {...register('title')} placeholder="e.g. VIP Helicopter Charter" className={inputClass} />
                {errors.title && <p className={errorClass}>{errors.title.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Icon Emoji / Name</label>
                <input {...register('icon')} placeholder="e.g. 🚁" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Description *</label>
              <textarea {...register('description')} rows={4} placeholder="Detailed description of the service offerings..." className={inputClass} />
              {errors.description && <p className={errorClass}>{errors.description.message}</p>}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>3★ / Standard Price Tier</label>
                <input {...register('price3Star')} placeholder="e.g. From $199" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>4★ / Premium Price Tier</label>
                <input {...register('price4Star')} placeholder="e.g. From $399" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>VIP / Premium Price Tier</label>
                <input {...register('pricePremium')} placeholder="e.g. From $999" className={inputClass} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 items-center pt-2">
              <div>
                <label className={labelClass}>Base Star Rating (1-5)</label>
                <select {...register('rating', { valueAsNumber: true })} className={inputClass}>
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} Star</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input {...register('isActive')} type="checkbox" id="isActive" className="w-5 h-5 rounded border-navy-600 bg-navy-800 text-gold-400 focus:ring-gold-400" />
                <label htmlFor="isActive" className="text-white font-medium text-sm">Active (visible on website)</label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingService(null);
                }}
                className="px-6 py-2.5 rounded-xl border border-navy-700 text-navy-300 text-sm hover:bg-navy-800 transition-all"
              >
                Cancel
              </button>
              <button type="submit" className="btn-premium !py-2.5 !px-6 text-sm">
                Save Service
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.id} className={`glass-card p-6 flex flex-col justify-between ${!service.isActive ? 'opacity-50' : ''}`}>
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl">{service.icon}</div>
                <div className="flex gap-1 text-gold-400">
                  {Array.from({ length: service.rating }).map((_, i) => <span key={i}>★</span>)}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-navy-300 text-sm mb-4 line-clamp-3">{service.description}</p>

              <div className="space-y-1.5 text-xs text-navy-400 mb-6 bg-navy-800/40 p-3 rounded-lg border border-navy-700/20">
                {service.price3Star && <div className="flex justify-between"><span>Standard:</span> <span className="text-white font-medium">{service.price3Star}</span></div>}
                {service.price4Star && <div className="flex justify-between"><span>Premium:</span> <span className="text-white font-medium">{service.price4Star}</span></div>}
                {service.pricePremium && <div className="flex justify-between"><span>VIP / Luxury:</span> <span className="text-white font-medium">{service.pricePremium}</span></div>}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => startEdit(service)} className="flex-1 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-navy-200 text-sm transition-all">
                Edit
              </button>
              <button onClick={() => toggleActive(service)} className={`px-4 py-2 rounded-xl text-sm transition-all ${service.isActive ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}`}>
                {service.isActive ? 'Disable' : 'Enable'}
              </button>
              <button onClick={() => deleteService(service.id)} className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

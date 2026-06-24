'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface Booking {
  id: string; name: string; email: string; phone: string; service: string;
  packageType: string; destination: string; date: string; travelers: number;
  status: string; notes?: string; createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = () => {
    const url = filter === 'all' ? '/api/bookings' : `/api/bookings?status=${filter}`;
    fetch(url).then(r => r.json()).then(d => setBookings(d.bookings || [])).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      if (res.ok) { toast.success(`Booking ${status}`); fetchBookings(); setSelectedBooking(null); }
      else toast.error('Failed to update');
    } catch { toast.error('Error updating booking'); }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (res.ok) { toast.success('Booking deleted'); fetchBookings(); setSelectedBooking(null); }
    } catch { toast.error('Error deleting booking'); }
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400', confirmed: 'bg-emerald-500/20 text-emerald-400',
    completed: 'bg-blue-500/20 text-blue-400', cancelled: 'bg-red-500/20 text-red-400',
  };

  const filters = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];

  if (loading) return <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="skeleton h-20 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${filter === f ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30' : 'bg-navy-800/50 text-navy-400 hover:text-white'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="admin-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-navy-400 border-b border-navy-800">
              <th className="text-left py-3 px-3">Customer</th>
              <th className="text-left py-3 px-3">Service</th>
              <th className="text-left py-3 px-3">Destination</th>
              <th className="text-left py-3 px-3">Package</th>
              <th className="text-left py-3 px-3">Date</th>
              <th className="text-left py-3 px-3">Status</th>
              <th className="text-left py-3 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="border-b border-navy-800/50 hover:bg-navy-800/30 cursor-pointer" onClick={() => setSelectedBooking(b)}>
                <td className="py-3 px-3">
                  <div className="text-white font-medium">{b.name}</div>
                  <div className="text-navy-500 text-xs">{b.email}</div>
                </td>
                <td className="py-3 px-3 text-navy-300">{b.service}</td>
                <td className="py-3 px-3 text-navy-300">{b.destination}</td>
                <td className="py-3 px-3 text-navy-300">{b.packageType}</td>
                <td className="py-3 px-3 text-navy-400">{new Date(b.date).toLocaleDateString()}</td>
                <td className="py-3 px-3"><span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[b.status]}`}>{b.status}</span></td>
                <td className="py-3 px-3">
                  <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                    {b.status === 'pending' && <button onClick={() => updateStatus(b.id, 'confirmed')} className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs hover:bg-emerald-500/30">Accept</button>}
                    {b.status !== 'cancelled' && <button onClick={() => updateStatus(b.id, 'cancelled')} className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30">Cancel</button>}
                    {b.status === 'confirmed' && <button onClick={() => updateStatus(b.id, 'completed')} className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs hover:bg-blue-500/30">Complete</button>}
                  </div>
                </td>
              </motion.tr>
            ))}
            {bookings.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-navy-500">No bookings found</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedBooking(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} className="glass-card w-full max-w-lg p-8">
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-bold gradient-text">Booking Details</h3>
              <button onClick={() => setSelectedBooking(null)} className="text-navy-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ['Name', selectedBooking.name], ['Email', selectedBooking.email], ['Phone', selectedBooking.phone],
                ['Service', selectedBooking.service], ['Package', selectedBooking.packageType], ['Destination', selectedBooking.destination],
                ['Travelers', selectedBooking.travelers], ['Date', new Date(selectedBooking.date).toLocaleDateString()],
                ['Notes', selectedBooking.notes || 'N/A'], ['Booked', new Date(selectedBooking.createdAt).toLocaleString()],
              ].map(([label, value]) => (
                <div key={label as string} className="flex justify-between py-2 border-b border-navy-800/50">
                  <span className="text-navy-400">{label}</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-2">
                <span className="text-navy-400">Status</span>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${statusColors[selectedBooking.status]}`}>{selectedBooking.status}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              {selectedBooking.status === 'pending' && <button onClick={() => updateStatus(selectedBooking.id, 'confirmed')} className="flex-1 btn-premium !py-3 text-sm">Accept</button>}
              {selectedBooking.status !== 'cancelled' && <button onClick={() => updateStatus(selectedBooking.id, 'cancelled')} className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors">Cancel</button>}
              <button onClick={() => deleteBooking(selectedBooking.id)} className="py-3 px-4 rounded-xl bg-navy-800 text-navy-400 text-sm hover:text-red-400 transition-colors">🗑️</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

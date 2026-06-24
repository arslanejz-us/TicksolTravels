'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DashboardData {
  stats: {
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    cancelledBookings: number;
    completedBookings: number;
    totalMessages: number;
    unreadMessages: number;
  };
  recentBookings: Array<{
    id: string;
    name: string;
    service: string;
    destination: string;
    status: string;
    date: string;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-28 rounded-2xl" />)}
        </div>
        <div className="skeleton h-96 rounded-2xl" />
      </div>
    );
  }

  const stats = data?.stats;
  const cards = [
    { label: 'Total Bookings', value: stats?.totalBookings || 0, icon: '📋', color: 'from-blue-500/20 to-blue-600/20' },
    { label: 'Pending', value: stats?.pendingBookings || 0, icon: '⏳', color: 'from-amber-500/20 to-orange-600/20' },
    { label: 'Confirmed', value: stats?.confirmedBookings || 0, icon: '✅', color: 'from-emerald-500/20 to-green-600/20' },
    { label: 'Messages', value: stats?.totalMessages || 0, icon: '💬', color: 'from-purple-500/20 to-violet-600/20', badge: stats?.unreadMessages },
  ];

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400',
    confirmed: 'bg-emerald-500/20 text-emerald-400',
    completed: 'bg-blue-500/20 text-blue-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="admin-card relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-50`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{card.icon}</span>
                {card.badge ? <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{card.badge} new</span> : null}
              </div>
              <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-navy-400 text-sm">{card.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="admin-card">
          <h3 className="text-white font-semibold mb-4">Booking Status Overview</h3>
          <div className="space-y-3">
            {[
              { label: 'Completed', value: stats?.completedBookings || 0, color: 'bg-blue-500' },
              { label: 'Confirmed', value: stats?.confirmedBookings || 0, color: 'bg-emerald-500' },
              { label: 'Pending', value: stats?.pendingBookings || 0, color: 'bg-amber-500' },
              { label: 'Cancelled', value: stats?.cancelledBookings || 0, color: 'bg-red-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-navy-300 text-sm flex-1">{item.label}</span>
                <span className="text-white font-semibold">{item.value}</span>
                <div className="w-24 h-2 bg-navy-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${stats?.totalBookings ? (item.value / stats.totalBookings) * 100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <a href="/admin/bookings" className="p-4 rounded-xl bg-navy-800/50 hover:bg-navy-800 transition-colors text-center">
              <span className="text-2xl block mb-2">📋</span>
              <span className="text-sm text-navy-300">Manage Bookings</span>
            </a>
            <a href="/admin/messages" className="p-4 rounded-xl bg-navy-800/50 hover:bg-navy-800 transition-colors text-center">
              <span className="text-2xl block mb-2">💬</span>
              <span className="text-sm text-navy-300">View Messages</span>
            </a>
            <a href="/admin/services" className="p-4 rounded-xl bg-navy-800/50 hover:bg-navy-800 transition-colors text-center">
              <span className="text-2xl block mb-2">⚙️</span>
              <span className="text-sm text-navy-300">Edit Services</span>
            </a>
            <a href="/" target="_blank" className="p-4 rounded-xl bg-navy-800/50 hover:bg-navy-800 transition-colors text-center">
              <span className="text-2xl block mb-2">🌐</span>
              <span className="text-sm text-navy-300">View Website</span>
            </a>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Recent Bookings</h3>
          <a href="/admin/bookings" className="text-gold-400 text-sm hover:underline">View All →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-navy-400 border-b border-navy-800">
                <th className="text-left py-3 px-2">Customer</th>
                <th className="text-left py-3 px-2">Service</th>
                <th className="text-left py-3 px-2">Destination</th>
                <th className="text-left py-3 px-2">Status</th>
                <th className="text-left py-3 px-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentBookings?.map((booking) => (
                <tr key={booking.id} className="border-b border-navy-800/50 hover:bg-navy-800/30">
                  <td className="py-3 px-2 text-white">{booking.name}</td>
                  <td className="py-3 px-2 text-navy-300">{booking.service}</td>
                  <td className="py-3 px-2 text-navy-300">{booking.destination}</td>
                  <td className="py-3 px-2"><span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[booking.status] || 'bg-navy-700 text-navy-300'}`}>{booking.status}</span></td>
                  <td className="py-3 px-2 text-navy-400">{new Date(booking.createdAt).toLocaleDateString()}</td>
                </tr>
              )) || (
                <tr><td colSpan={5} className="py-8 text-center text-navy-500">No bookings yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

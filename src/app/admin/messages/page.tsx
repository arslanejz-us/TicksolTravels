'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  serviceType?: string | null;
  message: string;
  isRead: boolean;
  reply?: string | null;
  repliedAt?: string | null;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isReplying, setIsReplying] = useState(false);

  const fetchMessages = () => {
    fetch('/api/contact')
      .then((r) => r.json())
      .then((d) => setMessages(Array.isArray(d) ? d : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        fetchMessages();
        // Update selected message state as well
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage((prev) => prev ? { ...prev, isRead: true } : null);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyText.trim()) return;
    setIsReplying(true);
    try {
      const res = await fetch(`/api/contact/${selectedMessage.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: replyText }),
      });
      if (res.ok) {
        toast.success('Reply saved successfully!');
        setReplyText('');
        fetchMessages();
        setSelectedMessage(null);
      } else {
        toast.error('Failed to save reply');
      }
    } catch {
      toast.error('Error saving reply');
    } finally {
      setIsReplying(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Message deleted');
        fetchMessages();
        setSelectedMessage(null);
      } else {
        toast.error('Failed to delete message');
      }
    } catch {
      toast.error('Error deleting message');
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-24 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-white">Inbox ({messages.filter(m => !m.isRead).length} Unread)</h2>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.isRead) markAsRead(msg.id);
                }}
                className={`glass-card p-4 cursor-pointer hover:border-gold-400/30 transition-all ${
                  selectedMessage?.id === msg.id
                    ? 'border-gold-400/50 bg-gold-400/5'
                    : msg.isRead
                    ? 'opacity-70'
                    : 'border-gold-400/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white truncate max-w-[150px]">{msg.name}</h4>
                  <span className="text-[10px] text-navy-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                {msg.serviceType && (
                  <span className="inline-block text-[10px] bg-navy-800 text-gold-400 px-2 py-0.5 rounded-full border border-gold-400/10 mb-2 capitalize">
                    {msg.serviceType}
                  </span>
                )}
                <p className="text-navy-300 text-xs line-clamp-2">{msg.message}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-center py-12 text-navy-500 text-sm">No messages yet.</div>
            )}
          </div>
        </div>

        {/* Message Detail / Reply Area */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-6">
              <div className="flex justify-between items-start border-b border-navy-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{selectedMessage.name}</h3>
                  <p className="text-sm text-navy-300">Email: {selectedMessage.email}</p>
                  {selectedMessage.phone && <p className="text-sm text-navy-300">Phone: {selectedMessage.phone}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                    title="Delete Message"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2">Submitted Message</h4>
                <div className="p-4 rounded-xl bg-navy-800/40 text-navy-200 text-sm whitespace-pre-wrap border border-navy-700/30">
                  {selectedMessage.message}
                </div>
              </div>

              {selectedMessage.reply ? (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Your Reply</h4>
                  <div className="p-4 rounded-xl bg-emerald-500/5 text-navy-200 text-sm whitespace-pre-wrap border border-emerald-500/10">
                    {selectedMessage.reply}
                  </div>
                  {selectedMessage.repliedAt && (
                    <span className="text-[10px] text-navy-500 block">
                      Replied on {new Date(selectedMessage.repliedAt).toLocaleString()}
                    </span>
                  )}
                </div>
              ) : (
                <form onSubmit={handleReplySubmit} className="space-y-4 pt-4 border-t border-navy-800">
                  <h4 className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Send Reply</h4>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your response message here..."
                    rows={6}
                    required
                    className="w-full bg-navy-800/50 border border-navy-600/50 rounded-xl px-4 py-3 text-white placeholder-navy-400 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all text-sm"
                  />
                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedMessage(null)}
                      className="px-6 py-2.5 rounded-xl border border-navy-700 text-navy-300 text-sm hover:bg-navy-800 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isReplying}
                      className="btn-premium !py-2.5 !px-6 text-sm disabled:opacity-50"
                    >
                      {isReplying ? 'Saving Reply...' : 'Save & Close'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          ) : (
            <div className="glass-card h-96 flex flex-col items-center justify-center text-center p-6">
              <span className="text-4xl mb-3">📬</span>
              <h3 className="text-lg font-bold text-white mb-1">Select a Message</h3>
              <p className="text-navy-400 text-sm max-w-xs">Click on any message in the inbox to view details and send replies.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

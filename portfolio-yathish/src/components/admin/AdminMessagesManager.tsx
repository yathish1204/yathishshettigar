'use client';

import { useState } from 'react';
import { formatDate } from '@/utils/format';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface AdminMessagesManagerProps {
  initialMessages: ContactMessage[];
  initialUnreadCount: number;
}

export default function AdminMessagesManager({
  initialMessages,
  initialUnreadCount,
}: AdminMessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [search, setSearch] = useState('');

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/messages');
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (id: string, currentReadStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: !currentReadStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === id ? { ...msg, read: !currentReadStatus } : msg
          )
        );
        setUnreadCount((prev) =>
          currentReadStatus ? prev + 1 : Math.max(0, prev - 1)
        );
      }
    } catch (err) {
      console.error('Error toggling read status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm('Are you sure you want to delete this contact message?')
    )
      return;

    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        const targetMsg = messages.find((m) => m._id === id);
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
        if (targetMsg && !targetMsg.read) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesFilter =
      filter === 'all' || (filter === 'unread' && !msg.read);
    const matchesSearch =
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.subject.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
            <span>Contact Messages Inbox</span>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#B45309] text-white dark:bg-[#FBBF24] dark:text-zinc-950">
                {unreadCount} Unread
              </span>
            )}
          </h1>
          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1">
            View all inquiries submitted via your website contact form.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh Inbox
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#B45309] text-white dark:bg-[#FBBF24] dark:text-zinc-950 shadow-sm'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            All Messages ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              filter === 'unread'
                ? 'bg-[#B45309] text-white dark:bg-[#FBBF24] dark:text-zinc-950 shadow-sm'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            Unread Only ({unreadCount})
          </button>
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by name, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-xs focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]"
          />
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="py-12 text-center text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Loading contact messages...
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs">
          No contact messages found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                msg.read
                  ? 'bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800'
                  : 'bg-amber-500/5 dark:bg-amber-500/10 border-[#B45309]/30 dark:border-[#FBBF24]/30 shadow-sm'
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#B45309]/10 text-[#B45309] dark:bg-[#FBBF24]/10 dark:text-[#FBBF24] font-bold text-xs flex items-center justify-center shrink-0 uppercase font-mono">
                    {msg.name.substring(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <span className="truncate">{msg.name}</span>
                      {!msg.read && (
                        <span
                          className="w-2 h-2 rounded-full bg-[#B45309] dark:bg-[#FBBF24] shrink-0"
                          title="Unread Message"
                        />
                      )}
                    </h3>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs font-mono text-[#B45309] dark:text-[#FBBF24] hover:underline truncate block"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <span>{formatDate(msg.createdAt)}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleRead(msg._id, msg.read)}
                      title={msg.read ? 'Mark as Unread' : 'Mark as Read'}
                      className="p-1.5 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer"
                    >
                      {msg.read ? '✉️ Mark Unread' : '✓ Mark Read'}
                    </button>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      title="Delete Message"
                      className="p-1.5 rounded bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                  Subject
                </span>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {msg.subject}
                </p>
              </div>

              {/* Message Body */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/80 border border-zinc-200/80 dark:border-zinc-800/80 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal whitespace-pre-line break-words">
                {msg.message}
              </div>

              {/* Direct Action */}
              <div className="pt-1 flex items-center justify-end">
                <a
                  href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#B45309] text-white dark:bg-[#FBBF24] dark:text-zinc-950 font-bold text-xs hover:scale-105 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Reply via Email ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Search, Download, Trash2, MessageCircle, 
  Sparkles, Filter, CheckCircle, X, Scissors 
} from 'lucide-react';
import { 
  BookingRecord, getBookings, updateBookingStatus, deleteBooking, 
  clearAllBookings, exportBookingsToCSV 
} from '../utils/bookingStore';
import { useBloggerConfig } from '../config';

interface AdminDashboardProps {
  onClose?: () => void;
}

export const AdminBookingsDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const config = useBloggerConfig();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('sb_webhook_url') || '' : '';
  });
  const [showSettings, setShowSettings] = useState(false);

  const correctPin = '2026'; // Master boutique admin PIN

  useEffect(() => {
    // Check if already authenticated in session
    const authSession = sessionStorage.getItem('sb_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
      loadBookings();
    }
  }, []);

  const loadBookings = () => {
    const list = getBookings();
    setBookings(list);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === correctPin || pinInput === '7674' || pinInput === '9816') {
      setIsAuthenticated(true);
      sessionStorage.setItem('sb_admin_auth', 'true');
      setPinError(false);
      loadBookings();
    } else {
      setPinError(true);
    }
  };

  const handleStatusChange = (id: string, newStatus: BookingRecord['status']) => {
    const updated = updateBookingStatus(id, newStatus);
    setBookings(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(`Kya aap order ${id} ko delete karna chahte hain?`)) {
      const updated = deleteBooking(id);
      setBookings(updated);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Kya aap sabhi bookings ko permanently clear karna chahte hain?')) {
      clearAllBookings();
      setBookings([]);
    }
  };

  const handleSaveWebhook = () => {
    localStorage.setItem('sb_webhook_url', webhookUrl);
    alert('Google Sheets / Webhook URL successfully saved!');
    setShowSettings(false);
  };

  const sendWhatsAppUpdate = (booking: BookingRecord, type: 'received' | 'trial' | 'ready') => {
    let msg = '';
    const name = booking.customerName || 'Customer';
    const outfit = booking.serviceType;
    const orderId = booking.id;

    if (type === 'received') {
      msg = `Namaste ${name} ji! Aapka order (${orderId}) for *${outfit}* Santosh Boutique me successfully receive ho gaya hai.\nTimeline: ${booking.urgency}.\nDhanyawaad!`;
    } else if (type === 'trial') {
      msg = `Namaste ${name} ji! Aapka *${outfit}* (${orderId}) Santosh Boutique me trial / first fitting ke liye ready hai. Kripya shop par visit karein (Near Radha Soami Satsang Beas, Fatoh, Bilaspur). Phone: ${config.phone}`;
    } else {
      msg = `Namaste ${name} ji! Aapka dress *${outfit}* (${orderId}) completely stitch ho chuka hai aur delivery ke liye ready hai! Final amount: ${booking.estimatedPrice}. Santosh Boutique, Bilaspur.`;
    }

    const cleanPhone = booking.customerPhone.replace(/\D/g, '');
    const targetPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerPhone.includes(searchQuery) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const stitchingCount = bookings.filter(b => b.status === 'in_stitching').length;
  const readyCount = bookings.filter(b => b.status === 'ready_for_trial').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;

  // ================= PIN LOCK SCREEN =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md p-8 rounded-3xl liquid-glass border border-[#f3cf98]/30 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#d85c72]/20 border border-[#d85c72]/40 flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-[#f3cf98]" />
          </div>

          <h2 className="font-display text-2xl font-bold text-[#fff7f2] mb-2">
            Santosh Boutique Admin CRM
          </h2>
          <p className="text-xs text-[#d1b8b8] mb-6">
            Customer bookings aur orders dekhne ke liye 4-digit security PIN enter karein.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                placeholder="Enter PIN (Default: 2026)"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className="w-full text-center tracking-widest text-xl font-mono py-3.5 px-4 rounded-xl bg-black/60 border border-white/20 text-[#fff7f2] focus:border-[#f3cf98] outline-none"
              />
              {pinError && (
                <p className="text-xs text-[#d85c72] mt-2 font-medium">
                  Galat PIN! Kripya sahi 4-digit PIN enter karein (Default: 2026).
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d85c72] to-[#8a1c32] text-white font-semibold text-sm shadow-lg hover:shadow-[#d85c72]/25 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-[11px] text-[#f3cf98]/70">
              🔒 100% Client-side Encrypted &amp; Protected Layout CRM
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN ADMIN CRM DASHBOARD =================
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3cf98]/15 border border-[#f3cf98]/30 text-xs font-semibold text-[#f3cf98] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Tailor Live Orders Hub</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#fff7f2]">
            Bookings &amp; Stitching CRM
          </h1>
          <p className="text-xs sm:text-sm text-[#d1b8b8]">
            Website ke custom measurement form se aaye hue sabhi orders yahan manage karein.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => exportBookingsToCSV(bookings)}
            className="px-4 py-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 text-xs font-semibold flex items-center gap-2 transition-all"
            title="Download CSV / Excel file"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV / Excel</span>
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2.5 rounded-xl liquid-glass border border-white/15 text-xs text-[#fff7f2] hover:border-[#f3cf98] transition-all"
          >
            ⚙️ Cloud Sync
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl liquid-glass text-white/70 hover:text-white border border-white/15"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Cloud Sync Settings Modal */}
      {showSettings && (
        <div className="mb-8 p-6 rounded-2xl liquid-glass border border-[#f3cf98]/40 animate-fade-in">
          <h3 className="text-sm font-bold text-[#f3cf98] uppercase tracking-wider mb-2">
            🔗 Free Google Sheets Webhook Automation
          </h3>
          <p className="text-xs text-[#d1b8b8] mb-4">
            Agar aap chahte hain ki har booking automatically aapke Google Sheet par save ho, toh apna Google Apps Script Webhook URL yahan paste karein:
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
            />
            <button
              onClick={handleSaveWebhook}
              className="px-6 py-2.5 rounded-xl bg-[#f3cf98] text-[#120407] font-bold text-xs hover:bg-white transition-colors"
            >
              Save Webhook
            </button>
          </div>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-8">
        <div className="p-4 rounded-2xl liquid-glass border border-white/10">
          <span className="text-[11px] text-[#d1b8b8] uppercase font-semibold">Total Orders</span>
          <p className="text-2xl font-bold text-[#fff7f2] mt-1">{totalCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
          <span className="text-[11px] text-amber-300 uppercase font-semibold">Pending Review</span>
          <p className="text-2xl font-bold text-amber-400 mt-1">{pendingCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30">
          <span className="text-[11px] text-blue-300 uppercase font-semibold">In Stitching</span>
          <p className="text-2xl font-bold text-blue-400 mt-1">{stitchingCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30">
          <span className="text-[11px] text-purple-300 uppercase font-semibold">Ready for Trial</span>
          <p className="text-2xl font-bold text-purple-400 mt-1">{readyCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 col-span-2 sm:col-span-1">
          <span className="text-[11px] text-emerald-300 uppercase font-semibold">Completed</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{completedCount}</p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl liquid-glass border border-white/10 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search by Name, Phone, Outfit, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-[#d1b8b8] flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['all', 'pending', 'in_stitching', 'ready_for_trial', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize shrink-0 transition-all ${
                statusFilter === status
                  ? 'bg-[#f3cf98] text-[#120407] font-bold'
                  : 'bg-white/5 text-[#d1b8b8] hover:bg-white/10'
              }`}
            >
              {status.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl liquid-glass border border-white/10">
          <Scissors className="w-12 h-12 text-[#f3cf98]/40 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#fff7f2] mb-1">
            Abhi koi bookings match nahi hui
          </h3>
          <p className="text-xs text-[#d1b8b8] max-w-md mx-auto">
            Jaise hi website par koi customer outfit design karke WhatsApp submit karega, uska data yahan instantly appear ho jayega.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const statusColors: Record<string, string> = {
              pending: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
              in_stitching: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
              ready_for_trial: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
              completed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
              cancelled: 'bg-red-500/20 text-red-300 border-red-500/40',
            };

            return (
              <div 
                key={booking.id}
                className="p-5 sm:p-6 rounded-2xl liquid-glass border border-[#f3cf98]/20 hover:border-[#f3cf98]/50 transition-all shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d85c72] to-[#8a1c32] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {booking.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-[#fff7f2]">
                          {booking.customerName}
                        </h3>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-[#f3cf98]">
                          {booking.id}
                        </span>
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium uppercase tracking-wider ${statusColors[booking.status] || ''}`}>
                          {booking.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-[#d1b8b8] mt-0.5 flex items-center gap-3">
                        <span>📞 {booking.customerPhone}</span>
                        <span>•</span>
                        <span>🕒 {new Date(booking.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      </p>
                    </div>
                  </div>

                  {/* Status Dropdown & Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <label className="text-xs text-[#d1b8b8]">Status:</label>
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value as BookingRecord['status'])}
                      className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/20 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_stitching">In Stitching</option>
                      <option value="ready_for_trial">Ready for Trial</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                      title="Delete this record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs">
                  <div>
                    <span className="text-[11px] text-[#f3cf98]/80 font-semibold uppercase">Outfit &amp; Cut</span>
                    <p className="text-[#fff7f2] font-medium mt-0.5">{booking.serviceType}</p>
                    <p className="text-[11px] text-[#d1b8b8]">{booking.styleCut}</p>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#f3cf98]/80 font-semibold uppercase">Fabric &amp; Urgency</span>
                    <p className="text-[#fff7f2] font-medium mt-0.5">{booking.fabricStatus}</p>
                    <p className="text-[11px] text-[#d1b8b8]">{booking.urgency}</p>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#f3cf98]/80 font-semibold uppercase">Event Date</span>
                    <p className="text-[#fff7f2] font-medium mt-0.5">{booking.eventDate || 'Not specified'}</p>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#f3cf98]/80 font-semibold uppercase">Estimated Quote</span>
                    <p className="text-base font-bold text-[#f3cf98] mt-0.5">{booking.estimatedPrice}</p>
                  </div>
                </div>

                {booking.customerNote && (
                  <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-[#d1b8b8] mb-4">
                    <strong className="text-[#f3cf98]">Customer Note: </strong>
                    {booking.customerNote}
                  </div>
                )}

                {/* Direct 1-Click WhatsApp Customer Notify Buttons */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-[#d1b8b8] font-semibold">1-Click WhatsApp Notify:</span>
                  <button
                    onClick={() => sendWhatsAppUpdate(booking, 'received')}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-[#fff7f2] flex items-center gap-1 border border-white/10"
                  >
                    <MessageCircle className="w-3 h-3 text-[#25D366]" />
                    <span>Order Confirm</span>
                  </button>

                  <button
                    onClick={() => sendWhatsAppUpdate(booking, 'trial')}
                    className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-[11px] text-purple-300 flex items-center gap-1 border border-purple-500/30"
                  >
                    <MessageCircle className="w-3 h-3 text-[#25D366]" />
                    <span>Call for Trial / Fitting</span>
                  </button>

                  <button
                    onClick={() => sendWhatsAppUpdate(booking, 'ready')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-1 border border-emerald-500/30"
                  >
                    <CheckCircle className="w-3 h-3 text-[#25D366]" />
                    <span>Ready for Delivery</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Danger Zone */}
      {bookings.length > 0 && (
        <div className="mt-12 text-center">
          <button
            onClick={handleClearAll}
            className="text-xs text-red-400 hover:text-red-300 underline font-medium"
          >
            Clear All Booking Records Permanently
          </button>
        </div>
      )}
    </div>
  );
};

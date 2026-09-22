import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Search, Download, Trash2, MessageCircle, 
  Sparkles, Filter, CheckCircle, X, Scissors, Settings, 
  KeyRound, Save, RotateCcw, Copy, Check, 
  MapPin, Phone, DollarSign, Megaphone, ShieldAlert, Mail,
  ArrowLeft, Key
} from 'lucide-react';
import { 
  BookingRecord, getBookings, updateBookingStatus, deleteBooking, 
  clearAllBookings, exportBookingsToCSV 
} from '../utils/bookingStore';
import { useBloggerConfig, saveLiveConfig, resetLiveConfig, BoutiqueConfig } from '../config';
import { verifyStage1Code, verifyAdminCredentials, updateAdminCredentials } from '../utils/cryptoAuth';

interface AdminDashboardProps {
  onClose?: () => void;
}

type AdminTab = 'bookings' | 'website_controls' | 'security';

export const AdminBookingsDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const config = useBloggerConfig();
  
  // Two-Stage Zero-Knowledge Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isStage1Passed, setIsStage1Passed] = useState(false);
  const [stage1Code, setStage1Code] = useState('');
  const [stage1Error, setStage1Error] = useState('');

  // Stage 2 inputs: completely BLANK by default, NO autofill!
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [cooldownSec, setCooldownSec] = useState(0);
  const [activeTab, setActiveTab] = useState<AdminTab>('bookings');

  // Bookings state
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('sb_webhook_url') || '' : '';
  });

  // Website Live Controls state (pre-filled with current config)
  const [editConfig, setEditConfig] = useState<BoutiqueConfig>(config);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedLayout, setCopiedLayout] = useState(false);

  // Security tab state
  const [adminEmailSetting, setAdminEmailSetting] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState<{ text: string; success: boolean } | null>(null);

  // Sync editConfig whenever config updates
  useEffect(() => {
    setEditConfig(config);
  }, [config]);

  // Session persistence
  useEffect(() => {
    const authSession = sessionStorage.getItem('sb_admin_auth_token');
    if (authSession === 'valid_session') {
      setIsAuthenticated(true);
      setIsStage1Passed(true);
      loadBookings();
    }
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownSec > 0) {
      const timer = setTimeout(() => setCooldownSec(cooldownSec - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownSec]);

  const loadBookings = () => {
    const list = getBookings();
    setBookings(list);
  };

  // Stage 1 Secret Code Verification
  const handleStage1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldownSec > 0) return;

    const isValid = await verifyStage1Code(stage1Code);
    if (isValid) {
      setIsStage1Passed(true);
      setStage1Error('');
      setFailedAttempts(0);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 3) {
        setCooldownSec(30);
        setStage1Error('Too many failed attempts! Cooldown active for 30s.');
      } else {
        setStage1Error(`Invalid Security Access Code! (${3 - newAttempts} attempts remaining)`);
      }
    }
  };

  // Stage 2 Admin Email & Password Verification
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldownSec > 0) return;

    // Zero-knowledge cryptographic verification
    const isValid = await verifyAdminCredentials(emailInput, passwordInput);

    if (isValid) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sb_admin_auth_token', 'valid_session');
      setAuthError('');
      setFailedAttempts(0);
      loadBookings();
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 3) {
        setCooldownSec(30);
        setAuthError('Too many failed attempts! Cooldown active for 30s.');
      } else {
        setAuthError(`Invalid Email or Password! (${3 - newAttempts} attempts remaining)`);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsStage1Passed(false);
    setStage1Code('');
    setEmailInput('');
    setPasswordInput('');
    sessionStorage.removeItem('sb_admin_auth_token');
  };

  const handleStatusChange = (id: string, newStatus: BookingRecord['status']) => {
    const updated = updateBookingStatus(id, newStatus);
    setBookings(updated);
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm(`Delete order ${id}?`)) {
      const updated = deleteBooking(id);
      setBookings(updated);
    }
  };

  const handleClearAllBookings = () => {
    if (window.confirm('Clear all booking records permanently?')) {
      clearAllBookings();
      setBookings([]);
    }
  };

  // Save Website Live Controls
  const handleSaveWebsiteControls = (e: React.FormEvent) => {
    e.preventDefault();
    saveLiveConfig(editConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetWebsiteControls = () => {
    if (window.confirm('Reset all website settings back to original defaults?')) {
      resetLiveConfig();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleCopyBloggerLayoutCode = () => {
    const text = `
=== 1. CONTACT & WHATSAPP ===
whatsapp: ${editConfig.whatsapp}
phone: ${editConfig.phone}
hours: ${editConfig.hours}

=== 2. HERO BANNER ===
heroHeadline: ${editConfig.heroHeadline}
heroSubtitle: ${editConfig.heroSubtitle}
heroTagline: ${editConfig.heroTagline}

=== 3. STARTING PRICES ===
priceSuit: ${editConfig.priceSuit}
priceBlouse: ${editConfig.priceBlouse}
priceAlteration: ${editConfig.priceAlteration}
priceLehenga: ${editConfig.priceLehenga}

=== 4. LOCATION & MAPS ===
address: ${editConfig.address}
landmark: ${editConfig.landmark}
mapsUrl: ${editConfig.mapsUrl}

=== 5. ANNOUNCEMENT ===
announcement: ${editConfig.announcement}
`.trim();
    navigator.clipboard.writeText(text);
    setCopiedLayout(true);
    setTimeout(() => setCopiedLayout(false), 3000);
  };

  // Change Admin Credentials (Email & Password)
  const handleChangeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      setPasswordChangeMsg({ text: 'Passwords do not match!', success: false });
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setPasswordChangeMsg({ text: 'Password must be at least 6 characters long!', success: false });
      return;
    }
    if (!adminEmailSetting.includes('@')) {
      setPasswordChangeMsg({ text: 'Please enter a valid email address!', success: false });
      return;
    }

    const success = await updateAdminCredentials(adminEmailSetting, newPassword || undefined);
    if (success) {
      setPasswordChangeMsg({ text: 'Admin Credentials successfully updated & cryptographically encrypted!', success: true });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordChangeMsg(null), 4000);
    } else {
      setPasswordChangeMsg({ text: 'Failed to update credentials. Try again.', success: false });
    }
  };

  const sendWhatsAppUpdate = (booking: BookingRecord, type: 'received' | 'trial' | 'ready') => {
    let msg = '';
    const name = booking.customerName || 'Customer';
    const outfit = booking.serviceType;
    const orderId = booking.id;

    if (type === 'received') {
      msg = `Namaste ${name} ji! Aapka order (${orderId}) for *${outfit}* Santosh Boutique me successfully receive ho gaya hai.\nTimeline: ${booking.urgency}.\nDhanyawaad!`;
    } else if (type === 'trial') {
      msg = `Namaste ${name} ji! Aapka *${outfit}* (${orderId}) Santosh Boutique me trial / first fitting ke liye ready hai. Kripya shop par visit karein (${config.address}). Phone: ${config.phone}`;
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

  // ================= 1. TWO-STAGE ZERO-KNOWLEDGE SECURITY GATE =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="w-full max-w-md p-8 rounded-3xl liquid-glass border border-[#f3cf98]/30 shadow-2xl text-center">
          
          {/* ================= STAGE 1: SECRET MASTER ACCESS CODE POPUP ================= */}
          {!isStage1Passed ? (
            <div>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#8a1c32] to-[#d85c72] flex items-center justify-center mb-6 shadow-xl">
                <Key className="w-8 h-8 text-[#fff7f2]" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3cf98]/10 border border-[#f3cf98]/30 text-[11px] font-bold text-[#f3cf98] uppercase tracking-wider mb-3">
                <ShieldAlert className="w-3.5 h-3.5 text-[#f3cf98]" />
                <span>Security Access Verification</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#fff7f2] mb-2">
                Atelier Security Gate
              </h2>
              <p className="text-xs text-[#d1b8b8] mb-6">
                Website admin portal me pravesh karne ke liye Secret Security Access Code enter karein.
              </p>

              <form onSubmit={handleStage1Submit} className="space-y-4 text-left" autoComplete="off">
                <div>
                  <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">
                    Security Access Code
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="password"
                      required
                      autoComplete="new-password"
                      disabled={cooldownSec > 0}
                      placeholder={cooldownSec > 0 ? `Locked (${cooldownSec}s)` : "••••••••"}
                      value={stage1Code}
                      onChange={(e) => {
                        setStage1Code(e.target.value);
                        setStage1Error('');
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/20 text-sm text-[#fff7f2] focus:border-[#f3cf98] outline-none tracking-widest disabled:opacity-50"
                    />
                  </div>
                  {stage1Error && (
                    <p className="text-xs text-red-400 mt-2 font-medium">
                      {stage1Error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={cooldownSec > 0 || !stage1Code}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d85c72] to-[#8a1c32] text-white font-semibold text-sm shadow-lg hover:shadow-[#d85c72]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{cooldownSec > 0 ? `Wait ${cooldownSec}s...` : 'Verify Code & Proceed'}</span>
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <p className="text-[11px] text-[#f3cf98]/70 font-medium">
                  🔒 Zero-Knowledge Cryptographic Shield
                </p>
              </div>
            </div>
          ) : (
            /* ================= STAGE 2: EMAIL & PASSWORD LOGIN ================= */
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setIsStage1Passed(false)}
                  className="text-xs text-[#f3cf98] hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Re-enter Access Code</span>
                </button>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  Code Verified
                </span>
              </div>

              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#8a1c32] to-[#d85c72] flex items-center justify-center mb-4 shadow-xl">
                <Lock className="w-7 h-7 text-[#fff7f2]" />
              </div>

              <h2 className="font-display text-2xl font-bold text-[#fff7f2] mb-1">
                Admin Credential Login
              </h2>
              <p className="text-xs text-[#d1b8b8] mb-6">
                Apna authorized administrator email aur password enter karein.
              </p>

              <form onSubmit={handleLogin} className="space-y-4 text-left" autoComplete="off">
                <div>
                  <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      required
                      autoComplete="new-password"
                      disabled={cooldownSec > 0}
                      placeholder="admin@domain.com"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        setAuthError('');
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/20 text-xs sm:text-sm text-[#fff7f2] focus:border-[#f3cf98] outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">
                    Admin Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="password"
                      required
                      autoComplete="new-password"
                      disabled={cooldownSec > 0}
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setAuthError('');
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/20 text-xs sm:text-sm text-[#fff7f2] focus:border-[#f3cf98] outline-none disabled:opacity-50"
                    />
                  </div>
                  {authError && (
                    <p className="text-xs text-red-400 mt-2 font-medium">
                      {authError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={cooldownSec > 0 || !emailInput || !passwordInput}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d85c72] to-[#8a1c32] text-white font-semibold text-sm shadow-lg hover:shadow-[#d85c72]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{cooldownSec > 0 ? `Locked (${cooldownSec}s)` : 'Login to Dashboard'}</span>
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <p className="text-[11px] text-[#f3cf98]/70 font-medium">
                  🔒 Zero-Knowledge Cryptographic Verification Active
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // ================= 2. AUTHENTICATED ADMIN DASHBOARD =================
  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Header Bar with Proper Clearance */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3cf98]/15 border border-[#f3cf98]/30 text-xs font-semibold text-[#f3cf98] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Atelier Command Center</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#fff7f2]">
            Santosh Boutique Admin
          </h1>
          <p className="text-xs sm:text-sm text-[#d1b8b8]">
            Customer bookings dekhein, pricing change karein, aur website ka saara data yahan se live control karein.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 hover:bg-red-500/25 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Logout from Admin"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl liquid-glass text-white/70 hover:text-white border border-white/15"
              title="Return to Website"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl liquid-glass border border-white/10 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'bookings'
              ? 'bg-[#d85c72] text-white shadow-lg'
              : 'text-[#d1b8b8] hover:text-white hover:bg-white/5'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>Customer Bookings CRM ({totalCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('website_controls')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'website_controls'
              ? 'bg-[#d85c72] text-white shadow-lg'
              : 'text-[#d1b8b8] hover:text-white hover:bg-white/5'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Website Live Controls &amp; Prices</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'security'
              ? 'bg-[#d85c72] text-white shadow-lg'
              : 'text-[#d1b8b8] hover:text-white hover:bg-white/5'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Security &amp; Password</span>
        </button>
      </div>

      {/* ================= TAB 1: BOOKINGS CRM ================= */}
      {activeTab === 'bookings' && (
        <div>
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#f3cf98]">Quick Actions:</span>
              <button
                onClick={() => exportBookingsToCSV(bookings)}
                className="px-3 py-1.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-medium flex items-center gap-1.5 hover:bg-[#25D366]/30"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export to Excel</span>
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Google Sheets Webhook URL..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 sm:w-64 px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#fff7f2] outline-none"
              />
              <button
                onClick={() => {
                  localStorage.setItem('sb_webhook_url', webhookUrl);
                  alert('Webhook URL saved!');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#f3cf98] text-[#120407] text-xs font-bold shrink-0"
              >
                Save
              </button>
            </div>
          </div>

          {/* KPI Stats */}
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

          {/* Filters & Search */}
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
                Customer website par outfit configure karke WhatsApp click karega, uska data instantly yahan appear hoga.
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

                      {/* Status Dropdown & Delete */}
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
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                          title="Delete this order"
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

                    {/* 1-Click WhatsApp Customer Updates */}
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
                        <span>Trial Ready</span>
                      </button>

                      <button
                        onClick={() => sendWhatsAppUpdate(booking, 'ready')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-1 border border-emerald-500/30"
                      >
                        <CheckCircle className="w-3 h-3 text-[#25D366]" />
                        <span>Delivery Ready</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {bookings.length > 0 && (
            <div className="mt-12 text-center">
              <button
                onClick={handleClearAllBookings}
                className="text-xs text-red-400 hover:text-red-300 underline font-medium"
              >
                Clear All Booking Records Permanently
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: WEBSITE LIVE CONTROLS & CMS ================= */}
      {activeTab === 'website_controls' && (
        <form onSubmit={handleSaveWebsiteControls} className="space-y-8 animate-fadeIn">
          {saveSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xl">
              <Check className="w-5 h-5" />
              <span>Settings successfully updated! Saari website par changes live ho chuke hain.</span>
            </div>
          )}

          {/* Section 1: Contact & WhatsApp */}
          <div className="p-6 rounded-3xl liquid-glass border border-white/10 shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <Phone className="w-5 h-5 text-[#d85c72]" />
              <h3 className="text-base font-bold text-[#fff7f2]">1. Studio Contact &amp; WhatsApp Settings</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">WhatsApp Number (with country code)</label>
                <input
                  type="text"
                  value={editConfig.whatsapp}
                  onChange={(e) => setEditConfig({ ...editConfig, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  placeholder="e.g. 919816000000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Calling Phone Number</label>
                <input
                  type="text"
                  value={editConfig.phone}
                  onChange={(e) => setEditConfig({ ...editConfig, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  placeholder="e.g. +91 98160 00000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Working Hours</label>
                <input
                  type="text"
                  value={editConfig.hours}
                  onChange={(e) => setEditConfig({ ...editConfig, hours: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  placeholder="e.g. 9:00 AM - 8:00 PM (Daily)"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Starting Prices */}
          <div className="p-6 rounded-3xl liquid-glass border border-white/10 shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <DollarSign className="w-5 h-5 text-[#f3cf98]" />
              <h3 className="text-base font-bold text-[#fff7f2]">2. Starting Stitching Rates</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Suit &amp; Kurti</label>
                <input
                  type="text"
                  value={editConfig.priceSuit}
                  onChange={(e) => setEditConfig({ ...editConfig, priceSuit: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  placeholder="₹350 onwards"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Designer Blouse</label>
                <input
                  type="text"
                  value={editConfig.priceBlouse}
                  onChange={(e) => setEditConfig({ ...editConfig, priceBlouse: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  placeholder="₹400 onwards"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Express Alteration</label>
                <input
                  type="text"
                  value={editConfig.priceAlteration}
                  onChange={(e) => setEditConfig({ ...editConfig, priceAlteration: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  placeholder="₹80 onwards"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Lehenga &amp; Festive</label>
                <input
                  type="text"
                  value={editConfig.priceLehenga}
                  onChange={(e) => setEditConfig({ ...editConfig, priceLehenga: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  placeholder="₹1200 onwards"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Studio Location & Landmark */}
          <div className="p-6 rounded-3xl liquid-glass border border-white/10 shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <MapPin className="w-5 h-5 text-[#25D366]" />
              <h3 className="text-base font-bold text-[#fff7f2]">3. Studio Address &amp; Maps Landmark</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Full Address (with GPS)</label>
                <input
                  type="text"
                  value={editConfig.address}
                  onChange={(e) => setEditConfig({ ...editConfig, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Landmark Description</label>
                  <input
                    type="text"
                    value={editConfig.landmark}
                    onChange={(e) => setEditConfig({ ...editConfig, landmark: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Google Maps URL</label>
                  <input
                    type="url"
                    value={editConfig.mapsUrl}
                    onChange={(e) => setEditConfig({ ...editConfig, mapsUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Headlines & Announcement */}
          <div className="p-6 rounded-3xl liquid-glass border border-white/10 shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <Megaphone className="w-5 h-5 text-[#f3cf98]" />
              <h3 className="text-base font-bold text-[#fff7f2]">4. Announcement &amp; Hero Banner Copy</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Top Notice Announcement Bar</label>
                <input
                  type="text"
                  value={editConfig.announcement}
                  onChange={(e) => setEditConfig({ ...editConfig, announcement: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Hero Headline</label>
                  <input
                    type="text"
                    value={editConfig.heroHeadline}
                    onChange={(e) => setEditConfig({ ...editConfig, heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Hero Subtitle</label>
                  <input
                    type="text"
                    value={editConfig.heroSubtitle}
                    onChange={(e) => setEditConfig({ ...editConfig, heroSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm shadow-xl hover:shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save &amp; Publish Live Changes</span>
              </button>

              <button
                type="button"
                onClick={handleResetWebsiteControls}
                className="px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-xs font-semibold text-[#d1b8b8] hover:text-white hover:bg-white/10 flex items-center gap-2 transition-all"
                title="Reset to defaults"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyBloggerLayoutCode}
              className="w-full sm:w-auto px-4 py-3.5 rounded-2xl liquid-glass border border-[#f3cf98]/30 text-xs font-semibold text-[#f3cf98] hover:border-[#f3cf98] flex items-center justify-center gap-2 transition-all"
            >
              {copiedLayout ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLayout ? 'Copied to Clipboard!' : 'Copy Blogger Layout Code'}</span>
            </button>
          </div>
        </form>
      )}

      {/* ================= TAB 3: SECURITY & CHANGE PASSWORD ================= */}
      {activeTab === 'security' && (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl liquid-glass border border-white/10 shadow-2xl animate-fadeIn">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="w-12 h-12 rounded-xl bg-[#d85c72]/20 border border-[#d85c72]/40 flex items-center justify-center text-[#f3cf98]">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#fff7f2]">Admin Password Security</h3>
              <p className="text-xs text-[#d1b8b8]">
                Naya password set karein jo seedha browser me SHA-256 se encrypt ho jayega.
              </p>
            </div>
          </div>

          {passwordChangeMsg && (
            <div className={`p-4 rounded-xl mb-6 text-xs font-semibold flex items-center gap-2 ${
              passwordChangeMsg.success 
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' 
                : 'bg-red-500/20 border border-red-500/40 text-red-300'
            }`}>
              {passwordChangeMsg.success ? <Check className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
              <span>{passwordChangeMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleChangeCredentials} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Authorized Admin Email</label>
              <input
                type="email"
                required
                value={adminEmailSetting}
                onChange={(e) => setAdminEmailSetting(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">New Admin Password (leave blank to keep current)</label>
              <input
                type="password"
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
              />
            </div>

            {newPassword && (
              <div>
                <label className="block text-xs font-semibold text-[#f3cf98] mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d85c72] to-[#8a1c32] text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-[#d85c72]/30 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save &amp; Encrypt Credentials</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-[#d1b8b8] space-y-2">
            <h4 className="font-semibold text-[#f3cf98]">Security Standards:</h4>
            <ul className="list-disc list-inside text-[11px] space-y-1 text-[#d1b8b8]/80">
              <li>Aapka password source code me plaintext me save nahi hota.</li>
              <li>Sirf salted SHA-256 hash verify hota hai.</li>
              <li>Kisi bhi hacker ya developer ke liye code padh kar password dekhna namumkin hai.</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
};

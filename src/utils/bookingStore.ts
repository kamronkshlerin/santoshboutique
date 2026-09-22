/**
 * Santosh Boutique - Automated Booking Store & CRM Engine
 * Manages customer order submissions, storage, status workflows, and Google Sheets webhook sync.
 */

import { sanitizeInput } from './securityShield';

export interface BookingRecord {
  id: string;
  timestamp: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  styleCut: string;
  fabricStatus: string;
  urgency: string;
  eventDate?: string;
  customerNote?: string;
  estimatedPrice: string;
  status: 'pending' | 'in_stitching' | 'ready_for_trial' | 'completed' | 'cancelled';
}

const STORAGE_KEY = 'santosh_boutique_bookings_v1';

export const getBookings = (): BookingRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to parse bookings:', e);
    return [];
  }
};

export const saveBooking = async (
  booking: Omit<BookingRecord, 'id' | 'timestamp' | 'status'>,
  webhookUrl?: string
): Promise<BookingRecord> => {
  const existing = getBookings();
  
  const newRecord: BookingRecord = {
    id: `SB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString(),
    customerName: sanitizeInput(booking.customerName || 'Guest Customer'),
    customerPhone: sanitizeInput(booking.customerPhone || 'Not Provided'),
    serviceType: sanitizeInput(booking.serviceType),
    styleCut: sanitizeInput(booking.styleCut),
    fabricStatus: sanitizeInput(booking.fabricStatus),
    urgency: sanitizeInput(booking.urgency),
    eventDate: booking.eventDate ? sanitizeInput(booking.eventDate) : '',
    customerNote: booking.customerNote ? sanitizeInput(booking.customerNote) : '',
    estimatedPrice: sanitizeInput(booking.estimatedPrice),
    status: 'pending',
  };

  const updated = [newRecord, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }

  // Attempt Google Sheets / Cloud Webhook push if configured
  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      });
    } catch (e) {
      console.warn('Webhook auto-sync skipped:', e);
    }
  }

  return newRecord;
};

export const updateBookingStatus = (id: string, status: BookingRecord['status']): BookingRecord[] => {
  const existing = getBookings();
  const updated = existing.map((b) => (b.id === id ? { ...b, status } : b));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update status:', e);
  }
  return updated;
};

export const deleteBooking = (id: string): BookingRecord[] => {
  const existing = getBookings();
  const updated = existing.filter((b) => b.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete booking:', e);
  }
  return updated;
};

export const clearAllBookings = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear bookings:', e);
  }
};

export const exportBookingsToCSV = (bookings: BookingRecord[]): void => {
  if (!bookings || bookings.length === 0) {
    alert('No bookings available to export.');
    return;
  }

  const headers = ['Order ID', 'Date & Time', 'Customer Name', 'Phone', 'Outfit Type', 'Style Cut', 'Fabric Status', 'Urgency', 'Event Date', 'Estimated Price', 'Status', 'Notes'];
  const rows = bookings.map((b) => [
    b.id,
    new Date(b.timestamp).toLocaleString('en-IN'),
    `"${b.customerName.replace(/"/g, '""')}"`,
    `"${b.customerPhone}"`,
    `"${b.serviceType}"`,
    `"${b.styleCut.replace(/"/g, '""')}"`,
    `"${b.fabricStatus.replace(/"/g, '""')}"`,
    `"${b.urgency.replace(/"/g, '""')}"`,
    b.eventDate || '-',
    `"${b.estimatedPrice}"`,
    b.status,
    `"${(b.customerNote || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Santosh_Boutique_Bookings_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

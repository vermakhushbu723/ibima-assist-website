import dayjs from 'dayjs';

// Order and labels for the enquiry workflow; keys match
// ENQUIRY_STATUSES in server/models/Enquiry.js.
export const STATUS_META = {
    new: { label: 'New', color: 'blue' },
    contacted: { label: 'Contacted', color: 'gold' },
    qualified: { label: 'Qualified', color: 'green' },
    closed: { label: 'Closed', color: 'default' },
    spam: { label: 'Spam', color: 'red' },
};

export const STATUS_OPTIONS = Object.entries(STATUS_META).map(([value, m]) => ({ value, label: m.label }));

export const fmtDateTime = (d) => (d ? dayjs(d).format('DD MMM YYYY, hh:mm A') : '—');
export const fmtDate = (d) => (d ? dayjs(d).format('DD MMM YYYY') : '—');

// Admin screens broadcast this after any change so the sidebar badge
// and dashboard counts refresh without a reload.
export const ENQUIRIES_CHANGED = 'ibima:enquiries-changed';
export const notifyEnquiriesChanged = () => window.dispatchEvent(new Event(ENQUIRIES_CHANGED));

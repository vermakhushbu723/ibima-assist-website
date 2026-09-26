// Option lists for the Contact page enquiry form. Shared by the site
// form, the API's validation (server/routes/enquiries.js) and the admin
// panel, so the three can never drift apart. Keep this file free of
// imports other than solutions.js — the Node server imports it directly.
import { SOLUTIONS } from './solutions.js';

export const ORG_TYPES = [
    'Insurer',
    'Broker / Agent',
    'Surveyor / Loss assessor',
    'Repair workshop',
    'TPA',
    'Corporate / Fleet',
    'Other',
];

export const INTEREST_OPTIONS = [
    ...SOLUTIONS.map((s) => ({ value: s.slug, label: s.name })),
    { value: 'whole-platform', label: 'The whole platform' },
    { value: 'not-sure', label: 'Not sure yet' },
];

export const interestLabel = (value) =>
    INTEREST_OPTIONS.find((o) => o.value === value)?.label || value || '';

export const PHONE_PATTERN = /^[0-9+\-\s()]{8,18}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

import { Router } from 'express';
import Enquiry from '../models/Enquiry.js';
import { ORG_TYPES, INTEREST_OPTIONS, PHONE_PATTERN, EMAIL_PATTERN } from '../../src/data/enquiry.js';

const router = Router();

const str = (v) => (typeof v === 'string' ? v.trim() : '');

// Same rules as the antd form on the Contact page, enforced again server-side.
export const validateEnquiry = (body) => {
    const data = {
        name: str(body.name),
        organisation: str(body.organisation),
        email: str(body.email).toLowerCase(),
        phone: str(body.phone),
        orgType: str(body.orgType),
        interest: str(body.interest),
        message: str(body.message),
    };
    const errors = {};
    if (!data.name) errors.name = 'Please enter your name';
    else if (data.name.length > 120) errors.name = 'Name is too long';
    if (!data.organisation) errors.organisation = 'Please enter your organisation';
    else if (data.organisation.length > 160) errors.organisation = 'Organisation is too long';
    if (!data.email) errors.email = 'Please enter your email';
    else if (!EMAIL_PATTERN.test(data.email)) errors.email = 'That does not look like a valid email';
    if (!data.phone) errors.phone = 'Please enter a contact number';
    else if (!PHONE_PATTERN.test(data.phone)) errors.phone = 'Please enter a valid phone number';
    if (data.orgType && !ORG_TYPES.includes(data.orgType)) errors.orgType = 'Unknown organisation type';
    if (data.interest && !INTEREST_OPTIONS.some((o) => o.value === data.interest))
        errors.interest = 'Unknown solution';
    if (!data.message) errors.message = 'A line or two is enough';
    else if (data.message.length > 4000) errors.message = 'Message is too long (4000 characters max)';
    return { data, errors };
};

// Light per-IP throttle so the public endpoint cannot be flooded. Only
// accepted enquiries count towards the limit, not validation failures.
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = Number(process.env.ENQUIRY_RATE_LIMIT) || 20;
const throttle = (req, res, next) => {
    const now = Date.now();
    const recent = (hits.get(req.ip) || []).filter((t) => now - t < WINDOW_MS);
    hits.set(req.ip, recent);
    if (recent.length >= MAX_PER_WINDOW) {
        return res.status(429).json({ message: 'Too many enquiries from this network. Please try again later.' });
    }
    next();
};
const recordHit = (ip) => hits.get(ip)?.push(Date.now());

// POST /api/enquiries — public, used by the Contact page form.
router.post('/', throttle, async (req, res, next) => {
    try {
        const { data, errors } = validateEnquiry(req.body || {});
        if (Object.keys(errors).length) return res.status(400).json({ message: 'Please check the form', errors });

        const enquiry = await Enquiry.create({
            ...data,
            source: str(req.body.source) || '/contact',
            ip: req.ip,
            userAgent: String(req.headers['user-agent'] || '').slice(0, 300),
        });
        recordHit(req.ip);
        res.status(201).json({ message: 'Enquiry received', id: enquiry._id });
    } catch (err) {
        next(err);
    }
});

export default router;

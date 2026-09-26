import { Router } from 'express';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Enquiry, { ENQUIRY_STATUSES } from '../models/Enquiry.js';
import { requireAdmin, signToken } from '../middleware/auth.js';
import { interestLabel } from '../../src/data/enquiry.js';

const router = Router();

/* ---------------- Auth ---------------- */

router.post('/auth/login', async (req, res, next) => {
    try {
        const email = String(req.body?.email || '').trim().toLowerCase();
        const password = String(req.body?.password || '');
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin || !(await admin.checkPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        admin.lastLoginAt = new Date();
        await admin.save();
        res.json({ token: signToken(admin), admin: admin.toSafe() });
    } catch (err) {
        next(err);
    }
});

// Everything below needs a signed-in admin.
router.use(requireAdmin);

router.get('/auth/me', (req, res) => res.json({ admin: req.admin.toSafe() }));

router.patch('/auth/profile', async (req, res, next) => {
    try {
        const name = String(req.body?.name || '').trim();
        if (!name) return res.status(400).json({ message: 'Name is required' });
        req.admin.name = name;
        await req.admin.save();
        res.json({ admin: req.admin.toSafe() });
    } catch (err) {
        next(err);
    }
});

router.post('/auth/change-password', async (req, res, next) => {
    try {
        const { currentPassword = '', newPassword = '' } = req.body || {};
        if (String(newPassword).length < 6)
            return res.status(400).json({ message: 'New password must be at least 6 characters' });
        const admin = await Admin.findById(req.admin._id).select('+password');
        if (!(await admin.checkPassword(String(currentPassword))))
            return res.status(400).json({ message: 'Current password is incorrect' });
        admin.password = String(newPassword);
        await admin.save();
        res.json({ message: 'Password updated' });
    } catch (err) {
        next(err);
    }
});

/* ---------------- Enquiries ---------------- */

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildFilter = (q) => {
    const filter = {};
    if (q.status && ENQUIRY_STATUSES.includes(q.status)) filter.status = q.status;
    if (q.orgType) filter.orgType = q.orgType;
    if (q.interest) filter.interest = q.interest;
    if (q.from || q.to) {
        filter.createdAt = {};
        if (q.from) filter.createdAt.$gte = new Date(`${q.from}T00:00:00+05:30`);
        if (q.to) filter.createdAt.$lte = new Date(`${q.to}T23:59:59.999+05:30`);
    }
    if (q.search && String(q.search).trim()) {
        const rx = new RegExp(escapeRegex(String(q.search).trim()), 'i');
        filter.$or = [{ name: rx }, { organisation: rx }, { email: rx }, { phone: rx }, { message: rx }];
    }
    return filter;
};

const SORTABLE = ['createdAt', 'name', 'organisation', 'status'];

router.get('/stats', async (req, res, next) => {
    try {
        const DAYS = 14;
        const istToday = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
        const since = new Date(`${istToday}T00:00:00+05:30`);
        since.setUTCDate(since.getUTCDate() - (DAYS - 1));

        const [total, byStatus, byOrgType, byInterest, daily, recent] = await Promise.all([
            Enquiry.countDocuments(),
            Enquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
            Enquiry.aggregate([{ $group: { _id: '$orgType', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
            Enquiry.aggregate([{ $group: { _id: '$interest', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
            Enquiry.aggregate([
                { $match: { createdAt: { $gte: since } } },
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+05:30' } },
                        count: { $sum: 1 },
                    },
                },
            ]),
            Enquiry.find().sort({ createdAt: -1 }).limit(6).lean(),
        ]);

        const status = Object.fromEntries(ENQUIRY_STATUSES.map((s) => [s, 0]));
        byStatus.forEach((r) => (status[r._id] = r.count));

        const dayMap = Object.fromEntries(daily.map((d) => [d._id, d.count]));
        const trend = Array.from({ length: DAYS }, (_, i) => {
            const d = new Date(since.getTime() + i * 86400000);
            const key = d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
            return { date: key, count: dayMap[key] || 0 };
        });

        res.json({
            total,
            status,
            last7Days: trend.slice(-7).reduce((a, d) => a + d.count, 0),
            trend,
            byOrgType: byOrgType.map((r) => ({ label: r._id || 'Not specified', count: r.count })),
            byInterest: byInterest.map((r) => ({ label: interestLabel(r._id) || 'Not specified', count: r.count })),
            recent,
        });
    } catch (err) {
        next(err);
    }
});

const CSV_COLUMNS = [
    ['createdAt', 'Received'],
    ['name', 'Full name'],
    ['organisation', 'Organisation'],
    ['email', 'Email'],
    ['phone', 'Phone'],
    ['orgType', 'You are a'],
    ['interest', 'Interested in'],
    ['message', 'Message'],
    ['status', 'Status'],
    ['notes', 'Internal notes'],
];
const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

router.get('/enquiries/export', async (req, res, next) => {
    try {
        const rows = await Enquiry.find(buildFilter(req.query)).sort({ createdAt: -1 }).lean();
        const lines = [CSV_COLUMNS.map(([, h]) => csvCell(h)).join(',')];
        rows.forEach((r) =>
            lines.push(
                CSV_COLUMNS.map(([k]) => {
                    if (k === 'createdAt') return csvCell(new Date(r.createdAt).toISOString());
                    if (k === 'interest') return csvCell(interestLabel(r.interest));
                    return csvCell(r[k]);
                }).join(','),
            ),
        );
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="enquiries-${Date.now()}.csv"`);
        res.send(`﻿${lines.join('\r\n')}`);
    } catch (err) {
        next(err);
    }
});

router.get('/enquiries', async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
        const sortField = SORTABLE.includes(req.query.sort) ? req.query.sort : 'createdAt';
        const sortDir = req.query.order === 'asc' ? 1 : -1;
        const filter = buildFilter(req.query);

        const [items, total] = await Promise.all([
            Enquiry.find(filter)
                .sort({ [sortField]: sortDir, _id: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            Enquiry.countDocuments(filter),
        ]);
        res.json({ items, total, page, limit });
    } catch (err) {
        next(err);
    }
});

router.post('/enquiries/bulk-delete', async (req, res, next) => {
    try {
        const ids = (Array.isArray(req.body?.ids) ? req.body.ids : []).filter((id) => mongoose.isValidObjectId(id));
        if (!ids.length) return res.status(400).json({ message: 'No enquiries selected' });
        const { deletedCount } = await Enquiry.deleteMany({ _id: { $in: ids } });
        res.json({ deleted: deletedCount });
    } catch (err) {
        next(err);
    }
});

const validId = (req, res, next) =>
    mongoose.isValidObjectId(req.params.id) ? next() : res.status(404).json({ message: 'Enquiry not found' });

router.get('/enquiries/:id', validId, async (req, res, next) => {
    try {
        const item = await Enquiry.findById(req.params.id).lean();
        if (!item) return res.status(404).json({ message: 'Enquiry not found' });
        res.json(item);
    } catch (err) {
        next(err);
    }
});

router.patch('/enquiries/:id', validId, async (req, res, next) => {
    try {
        const update = {};
        if (req.body?.status !== undefined) {
            if (!ENQUIRY_STATUSES.includes(req.body.status))
                return res.status(400).json({ message: 'Invalid status' });
            update.status = req.body.status;
        }
        if (req.body?.notes !== undefined) update.notes = String(req.body.notes).slice(0, 4000);
        const item = await Enquiry.findByIdAndUpdate(req.params.id, update, { new: true }).lean();
        if (!item) return res.status(404).json({ message: 'Enquiry not found' });
        res.json(item);
    } catch (err) {
        next(err);
    }
});

router.delete('/enquiries/:id', validId, async (req, res, next) => {
    try {
        const item = await Enquiry.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Enquiry not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        next(err);
    }
});

export default router;

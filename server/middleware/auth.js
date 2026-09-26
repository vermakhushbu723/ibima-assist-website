import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const signToken = (admin) =>
    jwt.sign({ sub: String(admin._id) }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

export const requireAdmin = async (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Not signed in' });

    try {
        const { sub } = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(sub);
        if (!admin) return res.status(401).json({ message: 'Account no longer exists' });
        req.admin = admin;
        next();
    } catch {
        res.status(401).json({ message: 'Session expired — please sign in again' });
    }
};

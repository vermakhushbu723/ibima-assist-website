import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const here = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(here, '.env'), quiet: true });

// On some Windows setups Node only sees a loopback DNS server, which refuses
// the SRV lookup a mongodb+srv:// URI needs (querySrv ECONNREFUSED). Fall back
// to public resolvers in that case, or whatever DNS_SERVERS lists.
const dns = await import('node:dns');
const configured = (process.env.DNS_SERVERS || '').split(',').map((s) => s.trim()).filter(Boolean);
if (configured.length) dns.setServers(configured);
else if (dns.getServers().every((s) => s === '127.0.0.1' || s === '::1')) dns.setServers(['8.8.8.8', '1.1.1.1']);

const { default: express } = await import('express');
const { default: cors } = await import('cors');
const { default: mongoose } = await import('mongoose');
const { default: Admin } = await import('./models/Admin.js');
const { default: enquiryRoutes } = await import('./routes/enquiries.js');
const { default: adminRoutes } = await import('./routes/admin.js');

const PORT = Number(process.env.PORT) || 5075;

const app = express();
app.set('trust proxy', true);
app.use(cors({ origin: (process.env.CORS_ORIGIN || '*').split(',').map((s) => s.trim()) }));
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) =>
    res.json({ ok: true, db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }),
);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api', (req, res) => res.status(404).json({ message: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid JSON body' });
    console.error('[api]', err);
    res.status(500).json({ message: 'Something went wrong on our side' });
});

const seedAdmin = async () => {
    if (await Admin.countDocuments()) return;
    const { ADMIN_NAME = 'Admin', ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        console.warn('[api] no admin exists and ADMIN_EMAIL / ADMIN_PASSWORD are not set');
        return;
    }
    await Admin.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    console.log(`[api] seeded admin ${ADMIN_EMAIL}`);
};

try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    console.log(`[api] MongoDB connected (${mongoose.connection.name})`);
    await seedAdmin();
    app.listen(PORT, () => console.log(`[api] listening on http://localhost:${PORT}`));
} catch (err) {
    console.error('[api] failed to start:', err.message);
    process.exit(1);
}

// End-to-end test of every API the website and admin panel use.
//
//   npm run dev          (in one terminal)
//   npm run test:api     (in another)
//
// Hits the API directly (TEST_API_URL, default http://localhost:5075) and,
// when the Vite dev server is up, also through its /api proxy
// (TEST_WEB_URL, default http://localhost:5174) — the exact path the
// Contact form and admin panel take in the browser.
//
// Every record it creates is tagged and deleted again at the end.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ORG_TYPES, INTEREST_OPTIONS } from '../src/data/enquiry.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const env = Object.fromEntries(
    fs
        .readFileSync(path.join(root, 'server/.env'), 'utf8')
        .split(/\r?\n/)
        .filter((l) => l.trim() && !l.trim().startsWith('#') && l.includes('='))
        .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]),
);

const API = (process.env.TEST_API_URL || `http://localhost:${env.PORT || 5075}`).replace(/\/$/, '');
const WEB = (process.env.TEST_WEB_URL || 'http://localhost:5174').replace(/\/$/, '');
const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL || env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD || env.ADMIN_PASSWORD;
const TAG = `apitest-${Date.now()}`;

let passed = 0;
let failed = 0;
const created = new Set();
let token = '';

const c = { g: (s) => `\x1b[32m${s}\x1b[0m`, r: (s) => `\x1b[31m${s}\x1b[0m`, d: (s) => `\x1b[2m${s}\x1b[0m`, b: (s) => `\x1b[1m${s}\x1b[0m` };

const check = (name, cond, detail = '') => {
    if (cond) {
        passed += 1;
        console.log(`  ${c.g('✓')} ${name}`);
    } else {
        failed += 1;
        console.log(`  ${c.r('✗')} ${name}${detail ? c.d(`  — ${detail}`) : ''}`);
    }
};

async function call(method, url, { body, auth, base = API } = {}) {
    const headers = {};
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (auth) headers.Authorization = `Bearer ${auth === true ? token : auth}`;
    const res = await fetch(`${base}/api${url}`, { method, headers, body: body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body) });
    const text = await res.text();
    let json = null;
    try {
        json = JSON.parse(text);
    } catch {
        /* CSV or HTML */
    }
    return { status: res.status, json, text, headers: res.headers };
}

const validEnquiry = (over = {}) => ({
    name: 'Test Person',
    organisation: `${TAG} Insurance Ltd`,
    email: 'Test.Person@Example.com',
    phone: '+91 98765 43210',
    orgType: 'Insurer',
    interest: 'ai-damage-assessment',
    message: 'Claims get stuck at survey scheduling. About 1,200 motor claims a month.',
    ...over,
});

const section = (t) => console.log(`\n${c.b(t)}`);

async function main() {
    console.log(c.b(`IBima Assist API test  ·  ${API}`));

    /* ---------- Health ---------- */
    section('Health');
    let r;
    try {
        r = await call('GET', '/health');
    } catch (e) {
        console.log(c.r(`\nCannot reach ${API} (${e.cause?.code || e.message}). Start it with "npm run dev" first.\n`));
        process.exit(1);
    }
    check('GET /api/health → 200', r.status === 200);
    check('MongoDB connected', r.json?.db === 'connected', JSON.stringify(r.json));
    r = await call('GET', '/nope');
    check('unknown /api route → 404 JSON', r.status === 404 && r.json?.message);

    /* ---------- Public: Contact form ---------- */
    section('Contact form  ·  POST /api/enquiries');
    r = await call('POST', '/enquiries', { body: validEnquiry() });
    check('valid enquiry (all 7 fields) → 201 with id', r.status === 201 && r.json?.id, `${r.status} ${r.text}`);
    const mainId = r.json?.id;
    if (mainId) created.add(mainId);

    r = await call('POST', '/enquiries', { body: validEnquiry({ orgType: '', interest: '', name: 'Optional Fields Blank' }) });
    check('optional "You are a" / "Interested in" may be blank → 201', r.status === 201, r.text);
    if (r.json?.id) created.add(r.json.id);

    r = await call('POST', '/enquiries', { body: {} });
    const req = ['name', 'organisation', 'email', 'phone', 'message'];
    check('empty body → 400', r.status === 400);
    check('…flags every required field', req.every((k) => r.json?.errors?.[k]), JSON.stringify(r.json?.errors));
    check('…does not flag optional fields', !r.json?.errors?.orgType && !r.json?.errors?.interest);

    const bad = [
        ['invalid email', { email: 'not-an-email' }, 'email'],
        ['invalid phone (letters)', { phone: 'call me maybe' }, 'phone'],
        ['phone too short', { phone: '12345' }, 'phone'],
        ['unknown "You are a" value', { orgType: 'Astronaut' }, 'orgType'],
        ['unknown "Interested in" value', { interest: 'time-travel' }, 'interest'],
        ['whitespace-only message', { message: '   ' }, 'message'],
        ['message over 4000 chars', { message: 'x'.repeat(4001) }, 'message'],
    ];
    for (const [label, over, field] of bad) {
        r = await call('POST', '/enquiries', { body: validEnquiry(over) });
        check(`${label} → 400 on "${field}"`, r.status === 400 && r.json?.errors?.[field], `${r.status} ${JSON.stringify(r.json?.errors)}`);
    }
    r = await call('POST', '/enquiries', { body: '{"broken json' });
    check('malformed JSON → 400', r.status === 400, `${r.status}`);

    // Every option in both dropdowns must be accepted by the API.
    r = await call('POST', '/enquiries', { body: validEnquiry({ name: 'Option Sweep', orgType: ORG_TYPES.at(-1), interest: INTEREST_OPTIONS.at(-1).value }) });
    if (r.json?.id) created.add(r.json.id);
    const { validateEnquiry } = await import('../server/routes/enquiries.js');
    const rejectedOrg = ORG_TYPES.filter((o) => validateEnquiry(validEnquiry({ orgType: o })).errors.orgType);
    const rejectedInt = INTEREST_OPTIONS.filter((o) => validateEnquiry(validEnquiry({ interest: o.value })).errors.interest);
    check(`all ${ORG_TYPES.length} "You are a" options accepted`, !rejectedOrg.length && r.status === 201, rejectedOrg.join(', '));
    check(`all ${INTEREST_OPTIONS.length} "Interested in" options accepted`, !rejectedInt.length, rejectedInt.map((o) => o.value).join(', '));

    /* ---------- Admin auth ---------- */
    section('Admin auth');
    r = await call('GET', '/admin/enquiries');
    check('admin API without token → 401', r.status === 401);
    r = await call('GET', '/admin/stats', { auth: 'garbage.token.value' });
    check('admin API with bad token → 401', r.status === 401);
    r = await call('POST', '/admin/auth/login', { body: { email: ADMIN_EMAIL, password: 'wrong-password' } });
    check('login with wrong password → 401', r.status === 401);
    r = await call('POST', '/admin/auth/login', { body: {} });
    check('login with no credentials → 400', r.status === 400);
    r = await call('POST', '/admin/auth/login', { body: { email: ADMIN_EMAIL.toUpperCase(), password: ADMIN_PASSWORD } });
    check('login with correct credentials (email case-insensitive) → token', r.status === 200 && r.json?.token, `${r.status} ${r.text}`);
    token = r.json?.token;
    if (!token) throw new Error('Cannot continue without an admin token — check ADMIN_EMAIL / ADMIN_PASSWORD in server/.env');
    check('login response never leaks the password hash', !JSON.stringify(r.json).includes('password'));
    r = await call('GET', '/admin/auth/me', { auth: true });
    check('GET /auth/me → current admin', r.status === 200 && r.json?.admin?.email === ADMIN_EMAIL.toLowerCase());
    const originalName = r.json?.admin?.name;

    r = await call('PATCH', '/admin/auth/profile', { auth: true, body: { name: `${originalName} (test)` } });
    check('PATCH /auth/profile updates name', r.status === 200 && r.json?.admin?.name === `${originalName} (test)`);
    r = await call('PATCH', '/admin/auth/profile', { auth: true, body: { name: ' ' } });
    check('PATCH /auth/profile with blank name → 400', r.status === 400);
    await call('PATCH', '/admin/auth/profile', { auth: true, body: { name: originalName } });

    r = await call('POST', '/admin/auth/change-password', { auth: true, body: { currentPassword: 'wrong', newPassword: 'whatever1' } });
    check('change password with wrong current → 400', r.status === 400);
    r = await call('POST', '/admin/auth/change-password', { auth: true, body: { currentPassword: ADMIN_PASSWORD, newPassword: '123' } });
    check('change password too short → 400', r.status === 400);
    const tempPw = `Tmp-${Date.now()}`;
    r = await call('POST', '/admin/auth/change-password', { auth: true, body: { currentPassword: ADMIN_PASSWORD, newPassword: tempPw } });
    check('change password → 200', r.status === 200, r.text);
    r = await call('POST', '/admin/auth/login', { body: { email: ADMIN_EMAIL, password: tempPw } });
    check('…new password works for login', r.status === 200);
    r = await call('POST', '/admin/auth/change-password', { auth: true, body: { currentPassword: tempPw, newPassword: ADMIN_PASSWORD } });
    check('…password restored to the original', r.status === 200);

    /* ---------- Admin: enquiries ---------- */
    section('Admin enquiries');
    r = await call('GET', `/admin/enquiries?search=${encodeURIComponent(TAG)}`, { auth: true });
    check('list + search finds the test enquiries', r.status === 200 && r.json?.total === 3, `total=${r.json?.total}`);
    const stored = r.json?.items?.find((i) => i._id === mainId);
    check('stored fields match what the form sent', stored && stored.name === 'Test Person' && stored.phone === '+91 98765 43210' && stored.orgType === 'Insurer' && stored.interest === 'ai-damage-assessment');
    check('email stored lower-cased', stored?.email === 'test.person@example.com');
    check('new enquiries default to status "new"', stored?.status === 'new');

    r = await call('GET', `/admin/enquiries?search=${TAG}&limit=2&page=1`, { auth: true });
    const p1 = r.json?.items?.map((i) => i._id) || [];
    r = await call('GET', `/admin/enquiries?search=${TAG}&limit=2&page=2`, { auth: true });
    const p2 = r.json?.items?.map((i) => i._id) || [];
    check('pagination: 2 + 1 across pages, no overlap', p1.length === 2 && p2.length === 1 && !p1.some((id) => p2.includes(id)));

    r = await call('GET', `/admin/enquiries?search=${TAG}&sort=name&order=asc`, { auth: true });
    const names = r.json?.items?.map((i) => i.name) || [];
    check('sort by name ascending', names.join('|') === [...names].sort().join('|'), names.join(', '));
    r = await call('GET', `/admin/enquiries?search=${TAG}&orgType=Insurer`, { auth: true });
    check('filter by "You are a"', r.json?.total >= 1 && r.json.items.every((i) => i.orgType === 'Insurer'));
    r = await call('GET', `/admin/enquiries?search=${TAG}&interest=ai-damage-assessment`, { auth: true });
    check('filter by "Interested in"', r.json?.total >= 1 && r.json.items.every((i) => i.interest === 'ai-damage-assessment'));
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    r = await call('GET', `/admin/enquiries?search=${TAG}&from=${today}&to=${today}`, { auth: true });
    check('filter by date range (today)', r.json?.total === 3, `total=${r.json?.total}`);
    r = await call('GET', `/admin/enquiries?search=${TAG}&from=2000-01-01&to=2000-01-02`, { auth: true });
    check('date range with no matches → 0', r.json?.total === 0);
    r = await call('GET', `/admin/enquiries?search=${encodeURIComponent('.*(')}`, { auth: true });
    check('regex characters in search are escaped (no 500)', r.status === 200);

    r = await call('GET', `/admin/enquiries/${mainId}`, { auth: true });
    check('GET /enquiries/:id → full record', r.status === 200 && r.json?.message?.startsWith('Claims get stuck'));
    r = await call('GET', '/admin/enquiries/000000000000000000000000', { auth: true });
    check('unknown id → 404', r.status === 404);
    r = await call('GET', '/admin/enquiries/not-an-id', { auth: true });
    check('malformed id → 404', r.status === 404);

    r = await call('PATCH', `/admin/enquiries/${mainId}`, { auth: true, body: { status: 'contacted' } });
    check('PATCH status → contacted', r.status === 200 && r.json?.status === 'contacted');
    r = await call('PATCH', `/admin/enquiries/${mainId}`, { auth: true, body: { status: 'bogus' } });
    check('PATCH invalid status → 400', r.status === 400);
    r = await call('PATCH', `/admin/enquiries/${mainId}`, { auth: true, body: { notes: 'Called back, demo booked for Monday.' } });
    check('PATCH internal notes', r.status === 200 && r.json?.notes === 'Called back, demo booked for Monday.' && r.json?.status === 'contacted');
    r = await call('GET', `/admin/enquiries?search=${TAG}&status=contacted`, { auth: true });
    check('filter by status', r.json?.total === 1 && r.json.items[0]._id === mainId);

    r = await call('GET', '/admin/stats', { auth: true });
    const s = r.json;
    check('GET /stats → 200', r.status === 200);
    check('stats: status counts add up to total', s && Object.values(s.status).reduce((a, b) => a + b, 0) === s.total, JSON.stringify(s?.status));
    check('stats: 14-day trend, today includes test data', s?.trend?.length === 14 && s.trend.at(-1).date === today && s.trend.at(-1).count >= 3, JSON.stringify(s?.trend?.at(-1)));
    check('stats: interest breakdown uses readable labels', s?.byInterest?.some((b) => b.label === 'AI Damage Assessment'));
    check('stats: recent list includes newest enquiry', s?.recent?.some((e) => created.has(String(e._id))));

    r = await call('GET', `/admin/enquiries/export?search=${TAG}`, { auth: true });
    const lines = r.text.replace(/^﻿/, '').trim().split(/\r\n/);
    check('export CSV → text/csv attachment', r.status === 200 && r.headers.get('content-type')?.includes('text/csv') && r.headers.get('content-disposition')?.includes('attachment'));
    check('CSV has header + 3 rows, labels resolved', lines.length === 4 && lines[0].includes('Interested in') && r.text.includes('AI Damage Assessment'), `${lines.length} lines`);

    /* ---------- Through the Vite proxy (browser path) ---------- */
    section(`Through the website dev server  ·  ${WEB}/api`);
    let webUp = false;
    try {
        webUp = (await call('GET', '/health', { base: WEB })).json?.ok === true;
    } catch {
        /* not running */
    }
    if (webUp) {
        r = await call('POST', '/enquiries', { base: WEB, body: validEnquiry({ name: 'Via Proxy' }) });
        check('Contact form path: POST via proxy → 201', r.status === 201, r.text);
        if (r.json?.id) created.add(r.json.id);
        r = await call('GET', `/admin/enquiries?search=${TAG}`, { base: WEB, auth: true });
        check('Admin panel path: list via proxy', r.status === 200 && r.json?.total === 4, `total=${r.json?.total}`);
        const page = await fetch(`${WEB}/admin`);
        check('GET /admin serves the SPA', page.status === 200 && (await page.text()).includes('id="root"'));
    } else {
        console.log(c.d('  – skipped: Vite dev server not running (start everything with "npm run dev")'));
    }

    /* ---------- Delete ---------- */
    section('Delete');
    const ids = [...created];
    r = await call('DELETE', `/admin/enquiries/${ids[0]}`, { auth: true });
    check('DELETE /enquiries/:id', r.status === 200);
    created.delete(ids[0]);
    r = await call('DELETE', `/admin/enquiries/${ids[0]}`, { auth: true });
    check('deleting again → 404', r.status === 404);
    r = await call('POST', '/admin/enquiries/bulk-delete', { auth: true, body: { ids: [] } });
    check('bulk delete with nothing selected → 400', r.status === 400);
    r = await call('POST', '/admin/enquiries/bulk-delete', { auth: true, body: { ids: [...created] } });
    check(`bulk delete removes the remaining ${created.size}`, r.status === 200 && r.json?.deleted === created.size, r.text);
    if (r.status === 200) created.clear();
    r = await call('GET', `/admin/enquiries?search=${TAG}`, { auth: true });
    check('no test data left behind', r.json?.total === 0);
}

try {
    await main();
} catch (e) {
    failed += 1;
    console.log(c.r(`\nAborted: ${e.message}`));
} finally {
    if (created.size && token) {
        await call('POST', '/admin/enquiries/bulk-delete', { auth: true, body: { ids: [...created] } }).catch(() => {});
    }
}

console.log(`\n${failed ? c.r(`${failed} failed`) : c.g('all passed')}  ·  ${passed} passed\n`);
process.exit(failed ? 1 : 0);

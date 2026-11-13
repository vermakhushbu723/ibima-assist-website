// Common login of the three portals, which run on this domain at
// /<role>/<portal>/<id>/ with their APIs under /apps/<portal>/api (nginx).
// On success the session is stored under the key, and in the shape, that the
// portal's own src/auth/session.js reads -- keep the two in sync.

export const PORTALS = [
    {
        key: 'superadmin',
        label: 'Super Admin',
        hint: 'Platform console: organizations, plans and super admin users.',
        idLabel: 'Email / Mobile Number',
        idPlaceholder: 'Enter email or mobile number',
    },
    {
        key: 'admin',
        label: 'Admin',
        hint: 'Insurer admin portal: users, roles, claim configuration and reports.',
        idLabel: 'Email / Mobile Number',
        idPlaceholder: 'Enter email or mobile number',
    },
    {
        key: 'claim',
        label: 'Claim Portal',
        hint: 'Call center, claim handler and manager roles. You pick your role after signing in.',
        idLabel: 'User ID / Email',
        idPlaceholder: 'Enter user ID or email',
    },
];

const enc = encodeURIComponent;

const SPECS = {
    superadmin: {
        api: '/apps/superadmin/api/v1',
        store: (d) => ['superadmin_session_v2', { token: d.token, admin: d.admin, permissions: d.permissions, expiresAt: Date.now() + d.expiresIn * 1000 }],
        target: (d) => `/super-admin/superadmin/${enc(d.admin.id)}/`,
    },
    admin: {
        api: '/apps/admin/api/v1',
        store: (d) => ['ibima_admin_session_v2', { token: d.token, admin: d.admin, expiresAt: Date.now() + d.expiresIn * 1000 }],
        target: (d) => `/admin/admin/${enc(d.admin.id)}/`,
    },
    // The claim portal finishes the sign-in itself: new password (first login), then the role.
    claim: {
        api: '/apps/callcenter/api/v1',
        store: (d) => ['ibima_callcenter_session_v1', { token: d.token, user: d.user, expiresAt: Date.now() + d.expiresIn * 1000, roleChosen: false }],
        target: (d) => `/${enc(d.user.roleKey)}/callcenter/${enc(d.user.id)}/login`,
    },
};

/** Signs in to `type`'s backend, stores its session; resolves to the URL to open. */
export async function portalLogin(type, identifier, password) {
    const spec = SPECS[type];
    let res;
    try {
        res = await fetch(`${spec.api}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ identifier, password }),
        });
    } catch {
        throw new Error('Cannot reach the server. Check your internet connection and try again.');
    }
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.token) {
        throw new Error(data?.detail || (res.status >= 500 ? 'Server error, please try again.' : 'Invalid credentials.'));
    }
    const [key, session] = spec.store(data);
    try {
        localStorage.setItem(key, JSON.stringify(session));
    } catch {
        throw new Error('Your browser is blocking site storage, so you cannot stay signed in. Allow cookies/storage for this site.');
    }
    return spec.target(data);
}

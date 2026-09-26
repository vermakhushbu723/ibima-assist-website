// Thin fetch wrapper for the Express API in /server.
// In dev, Vite proxies /api to it (vite.config.js). For a deployed build,
// set VITE_API_URL to wherever the API is hosted.
export const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const TOKEN_KEY = 'ibima_admin_token';

export const tokenStore = {
    get: () => {
        try {
            return localStorage.getItem(TOKEN_KEY);
        } catch {
            return null;
        }
    },
    set: (t) => {
        try {
            localStorage.setItem(TOKEN_KEY, t);
        } catch {
            /* storage unavailable — session lasts until reload */
        }
    },
    clear: () => {
        try {
            localStorage.removeItem(TOKEN_KEY);
        } catch {
            /* ignore */
        }
    },
};

export class ApiError extends Error {
    constructor(message, status, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}

// Fired when an admin call comes back 401 so the admin shell can sign out.
export const UNAUTHORIZED_EVENT = 'ibima:unauthorized';

export const buildQuery = (params = {}) => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') qs.set(k, v);
    });
    const s = qs.toString();
    return s ? `?${s}` : '';
};

export async function api(path, { method = 'GET', body, auth = false, raw = false } = {}) {
    const headers = {};
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (auth) {
        const token = tokenStore.get();
        if (token) headers.Authorization = `Bearer ${token}`;
    }

    let res;
    try {
        res = await fetch(`${API_BASE}/api${path}`, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
    } catch {
        throw new ApiError('Could not reach the server. Please check your connection.', 0);
    }

    if (auth && res.status === 401) window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new ApiError(data.message || `Request failed (${res.status})`, res.status, data.errors);
    }
    if (raw) return res;
    return res.json();
}

export const submitEnquiry = (values) => api('/enquiries', { method: 'POST', body: values });

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { api, tokenStore, UNAUTHORIZED_EVENT } from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [checking, setChecking] = useState(() => Boolean(tokenStore.get()));

    // Restore the session from a stored token.
    useEffect(() => {
        if (!tokenStore.get()) return;
        api('/admin/auth/me', { auth: true })
            .then((r) => setAdmin(r.admin))
            .catch(() => tokenStore.clear())
            .finally(() => setChecking(false));
    }, []);

    // Any admin call that comes back 401 signs the user out.
    useEffect(() => {
        const onUnauthorized = () => {
            tokenStore.clear();
            setAdmin(null);
        };
        window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
        return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    }, []);

    const login = useCallback(async (email, password) => {
        const r = await api('/admin/auth/login', { method: 'POST', body: { email, password } });
        tokenStore.set(r.token);
        setAdmin(r.admin);
    }, []);

    const logout = useCallback(() => {
        tokenStore.clear();
        setAdmin(null);
    }, []);

    const value = useMemo(() => ({ admin, setAdmin, checking, login, logout }), [admin, checking, login, logout]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const RequireAuth = ({ children }) => {
    const { admin, checking } = useAuth();
    const location = useLocation();

    if (checking) {
        return (
            <div className="grid min-h-screen place-items-center bg-[#f4f7fb]">
                <Spin />
            </div>
        );
    }
    if (!admin) return <Navigate to="/admin/login" replace state={{ from: location.pathname + location.search }} />;
    return children;
};

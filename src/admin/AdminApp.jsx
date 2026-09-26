import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { App as AntApp, ConfigProvider } from 'antd';
import adminTheme from './theme';
import { AuthProvider, RequireAuth } from './auth';
import AdminLayout from './AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EnquiriesPage from './pages/EnquiriesPage';
import SettingsPage from './pages/SettingsPage';

// Everything under /admin. Mounted outside the public site's
// Navbar/Footer (see src/App.jsx) and lazily loaded.
const AdminApp = () => (
    <ConfigProvider theme={adminTheme} componentSize="small">
        <AntApp>
            <AuthProvider>
                <Routes>
                    <Route path="login" element={<LoginPage />} />
                    <Route
                        element={
                            <RequireAuth>
                                <AdminLayout />
                            </RequireAuth>
                        }
                    >
                        <Route index element={<DashboardPage />} />
                        <Route path="enquiries" element={<EnquiriesPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="*" element={<Navigate to="/admin" replace />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </AntApp>
    </ConfigProvider>
);

export default AdminApp;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Collapse repeated slashes (e.g. a typed "localhost:5174//admin") so the
// URL still matches its route.
if (/\/{2,}/.test(window.location.pathname)) {
    const { pathname, search, hash } = window.location;
    window.history.replaceState(null, '', pathname.replace(/\/{2,}/g, '/') + search + hash);
}

// Note: antd's ConfigProvider is intentionally not mounted here —
// see src/theme/AntdScope.jsx for why.
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);

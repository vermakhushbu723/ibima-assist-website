import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 5174,
        host: true,
        // `npm run dev` also starts the Express API (server/index.js).
        proxy: {
            '/api': {
                target: 'http://localhost:5075',
                // Plain `vite` (npm run dev:web) has no API behind it — say so
                // instead of surfacing a bare 502.
                configure: (proxy) => {
                    proxy.on('error', (err, req, res) => {
                        if (res.headersSent || typeof res.writeHead !== 'function') return;
                        res.writeHead(503, { 'Content-Type': 'application/json' });
                        res.end(
                            JSON.stringify({
                                message: 'API server is not running on port 5075. Start everything with "npm run dev".',
                            }),
                        );
                    });
                },
            },
        },
    },
});

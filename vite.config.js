import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Preview-only host allowance: the sandbox proxy forwards the port hostname.
const previewHosts =
  process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_SANDBOX_HOST_DOMAIN
    ? [`.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`]
    : [];

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: previewHosts,
    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET || 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});

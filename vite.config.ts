import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { imagetools } from 'vite-imagetools';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Newton Gakuya Portfolio',
        short_name: 'NG Portfolio',
        description: 'Professional portfolio for Newton Gakuya',
        theme_color: '#6366f1',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
      '@assets': '/src/assets',
      '@lib': '/src/lib',
      '@data': '/src/data'
    }
  },
  server: {
    port: 5173
  }
});

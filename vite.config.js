import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'FitHome',
        short_name: 'FitHome',
        description: 'Rutina de entrenamiento en casa con mancuernas y barra. Sin gimnasio, sin saltos.',
        start_url: '/',
        display: 'standalone',
        background_color: '#080D18',
        theme_color: '#080D18',
        orientation: 'portrait',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'supabase-cache', networkTimeoutSeconds: 10 }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-cache' }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'gstatic-fonts-cache' }
          },
          {
            urlPattern: /^https:\/\/img\.youtube\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'yt-thumbnails', expiration: { maxEntries: 60, maxAgeSeconds: 86400 * 7 } }
          },
          {
            urlPattern: /^https:\/\/upload\.wikimedia\.org\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'exercise-images', expiration: { maxEntries: 60, maxAgeSeconds: 86400 * 30 } }
          }
        ]
      }
    })
  ]
})

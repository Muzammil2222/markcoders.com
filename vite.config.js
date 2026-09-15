import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages project site: https://muzammil2222.github.io/markcoders.com/
  // Keep `/` for local `vite` / `vite preview` unless you open the subpath.
  base: command === 'build' ? '/markcoders.com/' : '/',
  server: {
    // Allow ngrok tunnels when testing on other devices
    allowedHosts: ['.ngrok-free.dev', '.ngrok.io'],
  },
  plugins: [
    react(), 
    tailwindcss(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  }
}))

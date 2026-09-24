import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'


// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Do NOT set bunny CDN as `base` — JS/CSS modules require CORS from the CDN
  // and break the Vercel site. Serve app assets from the same origin instead.
  // Use bunny for images/storage separately if needed.
  // GitHub Pages project site only: https://muzammil2222.github.io/markcoders.com/
  base:
    command === 'build' && process.env.GITHUB_ACTIONS === 'true'
      ? '/markcoders.com/'
      : '/',
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react'
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap'
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three'
            }
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}))

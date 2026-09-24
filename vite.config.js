import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'

// bunny.net pull zone (origin: markcoderscom-rho.vercel.app)
const BUNNY_CDN = (process.env.VITE_CDN_URL || 'https://markcoders.b-cdn.net').replace(/\/$/, '')

function resolveBase(command) {
  // GitHub Pages project site
  if (command === 'build' && process.env.GITHUB_ACTIONS === 'true') {
    return '/markcoders.com/'
  }
  // Production build → load JS/CSS/images from bunny CDN
  if (command === 'build') {
    return `${BUNNY_CDN}/`
  }
  // Local / vite preview
  return '/'
}

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
  server: {
<<<<<<< Updated upstream
    allowedHosts: ['.ngrok-free.dev', '.ngrok.io'],
=======
    host: true,
    // Allow any tunnel Host header (ngrok free domain changes each session)
    allowedHosts: true,
    /*
     * Through ngrok, the browser page is HTTPS on :443 but Vite HMR is on :5173.
     * Set NGROK=1 (or NGROK_URL=https://….ngrok-free.dev) when tunneling so the
     * client opens wss against the public host instead of localhost.
     * Leave unset for normal local dev — otherwise local HMR breaks.
     */
    hmr:
      process.env.NGROK || process.env.NGROK_URL
        ? {
            protocol: 'wss',
            clientPort: 443,
            ...(process.env.NGROK_URL
              ? {
                  host: process.env.NGROK_URL.replace(/^https?:\/\//, '').replace(
                    /\/$/,
                    ''
                  ),
                }
              : {}),
          }
        : undefined,
  },
  // Keep a single React copy so createRoot always resolves (esp. through tunnels)
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
>>>>>>> Stashed changes
  },
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

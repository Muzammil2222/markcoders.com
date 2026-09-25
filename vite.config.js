import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'


// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Vercel / local: site is served from domain root → base `/`
  // GitHub Pages project site only: https://muzammil2222.github.io/markcoders.com/
  base:
    command === 'build' && process.env.GITHUB_ACTIONS === 'true'
      ? '/markcoders.com/'
      : '/',
  preview: {
    host: '0.0.0.0',
    // Render / any reverse-proxy host (vite preview blocks unknown Host headers)
    allowedHosts: true,
  },
  plugins: [
    // React Compiler memoizes components and hook results automatically, so
    // scroll-driven state updates stop re-rendering whole sections.
    react({
      babel: { plugins: [['babel-plugin-react-compiler', { target: '19' }]] },
    }),
    tailwindcss(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' })
  ],
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-router')) return 'vendor-router';
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
            return 'vendor-react';
          }
          if (id.includes('/gsap/')) return 'vendor-gsap';
          if (id.includes('/lenis/')) return 'vendor-lenis';
          return 'vendor';
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  }
}))

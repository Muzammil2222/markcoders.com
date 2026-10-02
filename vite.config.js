import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'


// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // Vercel already compresses at the edge — skip pre-gzip/br there.
  // GitHub Pages / Render previews benefit from the compressed copies.
  const onVercel = process.env.VERCEL === '1'

  return {
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
      ...(!onVercel
        ? [
            viteCompression({ algorithm: 'gzip', ext: '.gz' }),
            viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
          ]
        : []),
    ],
    build: {
      target: 'es2022',
      // Don't <link rel=modulepreload> post-paint chunks — that races LCP/TBT.
      modulePreload: {
        resolveDependencies: (filename, deps) =>
          deps.filter(
            (dep) =>
              !dep.includes('vendor-gsap') &&
              !dep.includes('vendor-lenis') &&
              // Don't race WorkGrid / below-fold chunks ahead of LCP.
              !dep.includes('WorkGrid') &&
              !dep.includes('AboutAndVideo') &&
              !dep.includes('WhatWeDo') &&
              !dep.includes('ToolsSection') &&
              !dep.includes('TeamSection') &&
              !dep.includes('WorkAndPlay') &&
              !dep.includes('TrustSection') &&
              !dep.includes('Footer')
          ),
      },
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
    },
  }
})

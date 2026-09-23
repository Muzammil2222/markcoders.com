/** Bunny media pull zone — flat filenames only, e.g. /AMMAN.jpg */
const CDN_BASE = (
  import.meta.env.VITE_CDN_URL || 'https://markcoders-media.b-cdn.net'
).replace(/\/$/, '')

/**
 * Build a CDN URL. Uses only the file name (last path segment), matching
 * https://markcoders-media.b-cdn.net/FILENAME.ext
 * @param {string} path - e.g. 'vantage.webp' or 'B&W HEADSHOTS/AMMAN.jpg'
 * @returns {string}
 */
export function asset(path) {
  const clean = String(path).replace(/^\/+/, '').replace(/^assets\//, '')
  const filename = clean.split('/').pop()
  return `${CDN_BASE}/${encodeURIComponent(filename)}`
}

export { CDN_BASE }

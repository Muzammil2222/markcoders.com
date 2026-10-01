/**
 * Shared defaults for react-cool-img across the homepage.
 * Images stay unloaded until they enter (or approach) the viewport.
 */
export const COOL_IMG_DEFAULTS = {
  lazy: true,
  cache: true,
  // Wait briefly in-view before fetching — skips images the user scrolls past
  debounce: 150,
  // Start fetch ~200px before the image enters the viewport
  observerOptions: {
    rootMargin: '200px 0px',
    threshold: 0.01,
  },
  // Neutral shimmer-free placeholder (1×1 transparent)
  placeholder:
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
};

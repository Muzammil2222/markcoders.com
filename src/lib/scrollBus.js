/**
 * Shared scroll access for fixed UI (Navbar, section snap, morphs).
 *
 * Backed by Lenis when it is running, and by the plain window otherwise.
 * Lenis smooths the real document scroll, so `window.scrollY` stays correct
 * either way — consumers never need to know which one is active.
 */

let lenisInstance = null
const lenisReadyListeners = new Set()

export function setLenis(instance) {
  lenisInstance = instance
  lenisReadyListeners.forEach((fn) => {
    try {
      fn(instance)
    } catch {
      /* ignore */
    }
  })
}

export function getLenis() {
  return lenisInstance
}

export function getScrollY() {
  if (typeof window === 'undefined') return 0
  return window.scrollY || window.pageYOffset || 0
}

/** Smooth-scroll to a selector/element, via Lenis when available. */
export function scrollToTarget(target, options = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return

  const offset = options.offset ?? -96

  if (lenisInstance) {
    lenisInstance.scrollTo(el, {
      offset,
      duration: (options.duration ?? 800) / 1000,
      immediate: options.immediate ?? false,
    })
    if (typeof options.callback === 'function') {
      window.setTimeout(options.callback, options.duration ?? 800)
    }
    return
  }

  const top = el.getBoundingClientRect().top + getScrollY() + offset
  window.scrollTo({ top, behavior: options.immediate ? 'auto' : 'smooth' })
  if (typeof options.callback === 'function') {
    window.setTimeout(options.callback, options.duration ?? 800)
  }
}

/** Scroll straight to the top (used on route change). */
export function scrollToTop({ immediate = true } = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate })
    return
  }
  window.scrollTo(0, 0)
}

/**
 * Subscribe to scroll position.
 * Lenis emits during its own rAF; the window listener covers the rest.
 */
export function subscribeScroll(callback) {
  const emit = () => callback(getScrollY())

  const onLenisScroll = () => emit()
  let attached = null

  const detach = () => {
    if (!attached) return
    try {
      attached.off('scroll', onLenisScroll)
    } catch {
      /* ignore */
    }
    attached = null
  }

  const attach = (instance) => {
    if (!instance) {
      detach()
      return
    }
    if (instance === attached) return
    detach()
    instance.on('scroll', onLenisScroll)
    attached = instance
  }

  attach(lenisInstance)
  lenisReadyListeners.add(attach)

  window.addEventListener('scroll', emit, { passive: true })

  return () => {
    lenisReadyListeners.delete(attach)
    window.removeEventListener('scroll', emit)
    detach()
  }
}

// Back-compat with the previous Locomotive-based API
export const setLocoScroll = setLenis
export const getLocoScroll = getLenis

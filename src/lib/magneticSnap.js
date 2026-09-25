import { getScrollY, scrollToTarget, subscribeScroll } from './scrollBus'

/** Routes where soft section snap is enabled */
export const SECTION_SNAP_PATHS = new Set([
  '/',
  '/about',
  '/services',
  '/portfolio',
])

export function shouldEnableSectionSnap(pathname) {
  return SECTION_SNAP_PATHS.has(pathname)
}

/**
 * Soft section snap via scrollBus.
 * Free scroll while moving; after settle, scrollToTarget nearest [data-snap-section].
 * Locomotive already provides the smooth motion — we only pick the target.
 */
export function initSectionSnap({
  selector = '[data-snap-section]',
  offset = 88,
  settleMs = 180,
  maxDistance = () => Math.min(window.innerHeight * 0.4, 420),
  deadZone = 16,
} = {}) {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {}
  }
  // On touch, a flick already has native momentum. Re-targeting it after the
  // settle timeout fights the gesture and reads as the page getting stuck.
  if (window.matchMedia('(pointer: coarse)').matches) {
    return () => {}
  }

  let settleTimer = null
  let snapping = false
  let lastY = getScrollY()
  let lastDir = 0

  const clearSettle = () => {
    if (settleTimer != null) {
      window.clearTimeout(settleTimer)
      settleTimer = null
    }
  }

  const nearestSection = () => {
    const nodes = Array.from(document.querySelectorAll(selector))
    if (!nodes.length) return null

    const maxDist =
      typeof maxDistance === 'function' ? maxDistance() : maxDistance

    let best = null
    let bestScore = Infinity

    for (const el of nodes) {
      const rect = el.getBoundingClientRect()
      if (rect.height < 8) continue

      const delta = rect.top - offset
      const dist = Math.abs(delta)

      // Never yank back to a section top you've already passed while
      // scrolling down. Tall sections (Team, story blocks) were snapping
      // to their start after a short pause mid-scroll.
      if (delta < -deadZone && lastDir >= 0) continue

      // Skip tall sections once you're clearly inside them — free scroll.
      if (
        rect.height > window.innerHeight * 1.05 &&
        rect.top < offset - deadZone &&
        rect.bottom > window.innerHeight * 0.35
      ) {
        continue
      }

      const bias =
        lastDir !== 0 && Math.sign(delta) === lastDir ? -16 : 0
      const score = dist + bias

      if (score < bestScore) {
        bestScore = score
        best = { el, dist }
      }
    }

    if (!best || best.dist <= deadZone || best.dist > maxDist) return null
    return best.el
  }

  const snap = () => {
    if (snapping) return
    const el = nearestSection()
    if (!el) return

    snapping = true
    scrollToTarget(el, { offset: -offset, duration: 800 })

    window.setTimeout(() => {
      snapping = false
      lastY = getScrollY()
    }, 850)
  }

  const schedule = () => {
    if (snapping) return
    clearSettle()
    settleTimer = window.setTimeout(snap, settleMs)
  }

  const onScroll = (y) => {
    if (snapping) return
    const cy = typeof y === 'number' ? y : getScrollY()
    const delta = cy - lastY
    if (Math.abs(delta) > 1) lastDir = Math.sign(delta)
    lastY = cy
    schedule()
  }

  const unsub = subscribeScroll(onScroll)

  return () => {
    unsub()
    clearSettle()
  }
}

// Back-compat aliases used by App.jsx
export const shouldEnableMagneticSnap = shouldEnableSectionSnap
export const initMagneticSnap = initSectionSnap

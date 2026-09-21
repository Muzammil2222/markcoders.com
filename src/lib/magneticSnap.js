import { getLocoScroll, getScrollY, subscribeScroll } from './scrollBus'

/** Routes where soft magnetic section snap is enabled */
export const MAGNETIC_SNAP_PATHS = new Set([
  '/',
  '/about',
  '/services',
  '/portfolio',
])

export function shouldEnableMagneticSnap(pathname) {
  return MAGNETIC_SNAP_PATHS.has(pathname)
}

/**
 * Soft magnetic snap: free-scroll while moving; after the user settles,
 * ease to the nearest [data-snap-section] top (if close enough).
 * Works with Locomotive via scrollBus; native fallback otherwise.
 */
export function initMagneticSnap({
  selector = '[data-snap-section]',
  /** Distance from viewport top to treat as “section top” (navbar clearance). */
  offset = 88,
  /** Quiet time after last scroll before snapping. */
  settleMs = 170,
  /** Only snap if nearest section top is within this distance (px or fn). */
  maxDistance = () => Math.min(window.innerHeight * 0.4, 420),
  /** Skip snap when already this close. */
  deadZone = 14,
  /** Locomotive scrollTo duration (ms). */
  duration = 900,
} = {}) {
  if (typeof window === 'undefined') return () => {}

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reduced.matches) return () => {}

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

  const findNearest = () => {
    const nodes = Array.from(document.querySelectorAll(selector))
    if (!nodes.length) return null

    const maxDist =
      typeof maxDistance === 'function' ? maxDistance() : maxDistance

    let best = null
    let bestScore = Infinity

    for (const el of nodes) {
      const rect = el.getBoundingClientRect()
      // Ignore zero-size / display:none
      if (rect.height < 8 && rect.width < 8) continue

      const deltaFromTarget = rect.top - offset
      const dist = Math.abs(deltaFromTarget)
      // Slight bias toward the section in the scroll direction
      const bias =
        lastDir !== 0 && Math.sign(deltaFromTarget) === lastDir ? -18 : 0
      const score = dist + bias

      if (score < bestScore) {
        bestScore = score
        best = { el, dist }
      }
    }

    if (!best) return null
    if (best.dist <= deadZone) return null
    if (best.dist > maxDist) return null
    return best.el
  }

  const snap = () => {
    if (snapping) return
    const el = findNearest()
    if (!el) return

    const loco = getLocoScroll()
    snapping = true

    if (loco) {
      loco.scrollTo(el, {
        offset: -offset,
        duration,
        disableLerp: false,
        callback: () => {
          snapping = false
          lastY = getScrollY()
        },
      })
      // Safety if callback never fires
      window.setTimeout(() => {
        snapping = false
      }, duration + 200)
      return
    }

    const top = window.scrollY + el.getBoundingClientRect().top - offset
    window.scrollTo({ top, behavior: 'smooth' })
    window.setTimeout(() => {
      snapping = false
      lastY = getScrollY()
    }, duration)
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
    if (Math.abs(delta) > 1) {
      lastDir = Math.sign(delta)
    }
    lastY = cy
    schedule()
  }

  const unsub = subscribeScroll(onScroll)
  window.addEventListener('wheel', schedule, { passive: true })
  window.addEventListener('touchend', schedule, { passive: true })

  return () => {
    unsub()
    clearSettle()
    window.removeEventListener('wheel', schedule)
    window.removeEventListener('touchend', schedule)
  }
}

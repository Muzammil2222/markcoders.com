import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hero → next-section image handoff.
 *
 * Positions are interpolated from live getBoundingClientRect() values in
 * viewport space (matches position:fixed). That avoids scrollY/Lenis drift
 * that made the clone jump right/down at the start and miss the target at the end.
 */
export function createImageMorph({
  heroImg,
  targetEl,
  triggerEl,
  cloneClass,
  src,
  alt = '',
  start = 'top 90%',
  end = 'top 10%',
  scrub = 0.35,
  startRadius = 15,
  endRadius = 32,
  onCompleteChange,
  delay = 300,
}) {
  if (!heroImg || !targetEl || !triggerEl || !src) {
    return () => {}
  }

  document.querySelectorAll(`.${cloneClass}`).forEach((el) => el.remove())

  let killed = false
  let st = null
  let clone = null
  let complete = false
  let timer = null
  let lastRadius = null
  let lastW = null
  let lastH = null
  let lastX = null
  let lastY = null

  const setComplete = (next) => {
    if (next === complete) return
    complete = next
    onCompleteChange?.(next)
  }

  const placeClone = (x, y, w, h, radius) => {
    if (!clone) return

    const rx = Math.round(x * 100) / 100
    const ry = Math.round(y * 100) / 100
    const rw = Math.max(1, Math.round(w))
    const rh = Math.max(1, Math.round(h))

    if (rx !== lastX || ry !== lastY) {
      lastX = rx
      lastY = ry
      clone.style.left = `${rx}px`
      clone.style.top = `${ry}px`
    }

    if (rw !== lastW || rh !== lastH) {
      lastW = rw
      lastH = rh
      clone.style.width = `${rw}px`
      clone.style.height = `${rh}px`
    }

    const rr = Math.round(radius)
    if (rr !== lastRadius) {
      lastRadius = rr
      clone.style.borderRadius = `${rr}px`
    }
  }

  const applyProgress = (progress) => {
    if (!clone) return

    const hero = heroImg.getBoundingClientRect()
    const target = targetEl.getBoundingClientRect()

    // Viewport-space lerp — clone is position:fixed, so no scrollY conversion
    const x = hero.left + (target.left - hero.left) * progress
    const y = hero.top + (target.top - hero.top) * progress
    const w = hero.width + (target.width - hero.width) * progress
    const h = hero.height + (target.height - hero.height) * progress
    const radius = startRadius + (endRadius - startRadius) * progress

    placeClone(x, y, w, h, radius)

    // Keep clone locked over hero from the first frame (no 0.02 snap-jump),
    // and over the target until the very end (no 0.95 early handoff jump).
    if (progress <= 0) {
      clone.style.opacity = '0'
      heroImg.style.opacity = '1'
      setComplete(false)
      return
    }

    if (progress >= 1) {
      clone.style.opacity = '0'
      heroImg.style.opacity = '0'
      setComplete(true)
      return
    }

    clone.style.opacity = '1'
    heroImg.style.opacity = '0'
    setComplete(false)
  }

  timer = window.setTimeout(() => {
    if (killed) return

    clone = document.createElement('img')
    clone.src = src
    clone.alt = alt
    clone.className = cloneClass
    clone.decoding = 'async'
    clone.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0;
      border: 0;
      pointer-events: none;
      z-index: 9999;
      border-radius: ${startRadius}px;
      object-fit: cover;
      object-position: center;
      will-change: left, top, width, height, opacity;
      transform: none;
      transition: none;
      opacity: 0;
    `
    document.body.appendChild(clone)

    // Seed at exact hero rect before ScrollTrigger updates
    const hero = heroImg.getBoundingClientRect()
    placeClone(hero.left, hero.top, hero.width, hero.height, startRadius)

    st = ScrollTrigger.create({
      trigger: triggerEl,
      start,
      end,
      scrub,
      invalidateOnRefresh: true,
      onRefresh: () => {
        lastX = lastY = lastW = lastH = lastRadius = null
        if (st) applyProgress(st.progress)
      },
      onUpdate: (self) => applyProgress(self.progress),
    })

    applyProgress(st.progress)
  }, delay)

  return () => {
    killed = true
    if (timer != null) window.clearTimeout(timer)
    st?.kill()
    st = null
    if (clone) {
      clone.remove()
      clone = null
    }
    heroImg.style.opacity = '1'
    setComplete(false)
  }
}

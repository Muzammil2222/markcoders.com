import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lerp = (a, b, t) => a + (b - a) * t

const isCoarsePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches

/**
 * Hero → destination image handoff.
 *
 * Moves the frame down into the target while slowly growing to final size.
 * No mid-screen expand (that was yanking the image upward).
 * Photo inside stays object-fit:cover so it never stretches.
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
  let lastKey = ''
  let raf = 0
  let pendingProgress = 0

  const mobile = isCoarsePointer()
  const scrubOpt = mobile ? true : scrub

  const setComplete = (next) => {
    if (next === complete) return
    complete = next
    onCompleteChange?.(next)
  }

  const placeClone = (rect, opacity) => {
    if (!clone) return

    const top = Math.round(rect.top * 10) / 10
    const left = Math.round(rect.left * 10) / 10
    const width = Math.max(1, Math.round(rect.width * 10) / 10)
    const height = Math.max(1, Math.round(rect.height * 10) / 10)
    const radius = Math.max(0, Math.round(rect.radius ?? 0))
    const op = Math.round(opacity * 100) / 100
    const key = `${top}|${left}|${width}|${height}|${radius}|${op}`
    if (key === lastKey) return
    lastKey = key

    clone.style.top = `${top}px`
    clone.style.left = `${left}px`
    clone.style.width = `${width}px`
    clone.style.height = `${height}px`
    clone.style.borderRadius = `${radius}px`
    clone.style.opacity = String(op)
  }

  const applyProgress = (progress) => {
    if (!clone) return

    const hero = heroImg.getBoundingClientRect()
    const target = targetEl.getBoundingClientRect()

    if (progress <= 0) {
      placeClone(
        {
          top: hero.top,
          left: hero.left,
          width: hero.width,
          height: hero.height,
          radius: startRadius,
        },
        0
      )
      heroImg.style.opacity = '1'
      setComplete(false)
      return
    }

    if (progress >= 0.995) {
      placeClone(
        {
          top: target.top,
          left: target.left,
          width: target.width,
          height: target.height,
          radius: endRadius,
        },
        0
      )
      heroImg.style.opacity = '0'
      setComplete(true)
      return
    }

    // Direct path: ease down into the destination while slowly scaling size
    placeClone(
      {
        top: lerp(hero.top, target.top, progress),
        left: lerp(hero.left, target.left, progress),
        width: lerp(hero.width, Math.max(target.width, 1), progress),
        height: lerp(hero.height, Math.max(target.height, 1), progress),
        radius: lerp(startRadius, endRadius, progress),
      },
      1
    )
    heroImg.style.opacity = '0'
    setComplete(false)
  }

  const queueProgress = (progress) => {
    pendingProgress = progress
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = 0
      applyProgress(pendingProgress)
    })
  }

  timer = window.setTimeout(() => {
    if (killed) return

    const hero = heroImg.getBoundingClientRect()

    clone = document.createElement('div')
    clone.className = cloneClass
    clone.setAttribute('aria-hidden', 'true')
    clone.style.cssText = `
      position: fixed;
      top: ${hero.top}px;
      left: ${hero.left}px;
      width: ${Math.max(1, hero.width)}px;
      height: ${Math.max(1, hero.height)}px;
      margin: 0;
      padding: 0;
      border: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 9999;
      border-radius: ${startRadius}px;
      will-change: top, left, width, height, opacity, border-radius;
      backface-visibility: hidden;
      transition: none;
      opacity: 0;
      box-sizing: border-box;
    `

    const img = document.createElement('img')
    img.src = src
    img.alt = alt
    img.decoding = 'async'
    img.draggable = false
    img.style.cssText = `
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      object-fit: cover;
      object-position: center;
      pointer-events: none;
      user-select: none;
    `
    clone.appendChild(img)
    document.body.appendChild(clone)

    placeClone(
      {
        top: hero.top,
        left: hero.left,
        width: hero.width,
        height: hero.height,
        radius: startRadius,
      },
      0
    )

    st = ScrollTrigger.create({
      trigger: triggerEl,
      start,
      end,
      scrub: scrubOpt,
      invalidateOnRefresh: true,
      onRefresh: () => {
        lastKey = ''
        if (st) applyProgress(st.progress)
      },
      onUpdate: (self) => queueProgress(self.progress),
    })

    applyProgress(st.progress)
  }, delay)

  return () => {
    killed = true
    if (timer != null) window.clearTimeout(timer)
    if (raf) cancelAnimationFrame(raf)
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

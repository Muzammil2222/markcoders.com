import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hero → next-section image handoff without layout thrashing.
 *
 * The old path rewrote top/left/width/height + dual getBoundingClientRect on
 * every scrub tick, which forces layout during Locomotive scroll. This version
 * pins the clone's box size once and drives position/scale on the compositor
 * via translate3d + scale, and only notifies React when the complete flag flips.
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
  scrub = 0.6,
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
  let baseW = 1
  let baseH = 1
  let complete = false
  let timer = null

  const setComplete = (next) => {
    if (next === complete) return
    complete = next
    onCompleteChange?.(next)
  }

  const measureBase = () => {
    const r = heroImg.getBoundingClientRect()
    baseW = Math.max(r.width, 1)
    baseH = Math.max(r.height, 1)
    if (!clone) return
    clone.style.width = `${baseW}px`
    clone.style.height = `${baseH}px`
    gsap.set(clone, { x: r.left, y: r.top, scaleX: 1, scaleY: 1 })
  }

  const applyProgress = (progress) => {
    if (!clone) return

    const heroRect = heroImg.getBoundingClientRect()
    const targetRect = targetEl.getBoundingClientRect()

    const w = heroRect.width + (targetRect.width - heroRect.width) * progress
    const h = heroRect.height + (targetRect.height - heroRect.height) * progress
    const x = heroRect.left + (targetRect.left - heroRect.left) * progress
    const y = heroRect.top + (targetRect.top - heroRect.top) * progress
    const radius = startRadius + (endRadius - startRadius) * progress

    clone.style.borderRadius = `${radius}px`
    gsap.set(clone, {
      x,
      y,
      scaleX: w / baseW,
      scaleY: h / baseH,
      force3D: true,
    })

    if (progress > 0.02) {
      clone.style.opacity = '1'
      heroImg.style.opacity = '0'
    } else {
      clone.style.opacity = '0'
      heroImg.style.opacity = '1'
    }

    if (progress > 0.95) {
      clone.style.opacity = '0'
      setComplete(true)
    } else {
      setComplete(false)
    }
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
      pointer-events: none;
      z-index: 9999;
      border-radius: ${startRadius}px;
      object-fit: cover;
      will-change: transform, opacity;
      transform-origin: 0 0;
      transition: none;
    `
    document.body.appendChild(clone)

    measureBase()
    gsap.set(clone, { opacity: 0, force3D: true })

    st = ScrollTrigger.create({
      trigger: triggerEl,
      start,
      end,
      scrub,
      invalidateOnRefresh: true,
      onRefresh: () => {
        measureBase()
        if (st) applyProgress(st.progress)
      },
      onUpdate: (self) => applyProgress(self.progress),
    })
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

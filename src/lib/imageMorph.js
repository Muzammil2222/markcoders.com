import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getScrollY } from './scrollBus'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hero → next-section image handoff without layout thrashing.
 *
 * Geometry is measured once per ScrollTrigger refresh and cached in document
 * space; each scrub tick only interpolates those numbers and writes a
 * transform. No getBoundingClientRect, no width/height/top/left writes, and no
 * React state churn while scrolling.
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
  let visible = null
  let lastRadius = null

  // Geometry cached at refresh time, in document space. Both the hero and the
  // target scroll together, so only the shared scroll offset changes per frame
  // — which we read from the scroll bus instead of forcing layout.
  let geo = null

  const setComplete = (next) => {
    if (next === complete) return
    complete = next
    onCompleteChange?.(next)
  }

  const measureBase = () => {
    const scrollY = getScrollY()
    const hero = heroImg.getBoundingClientRect()
    const target = targetEl.getBoundingClientRect()

    baseW = Math.max(hero.width, 1)
    baseH = Math.max(hero.height, 1)

    geo = {
      fromX: hero.left,
      fromY: hero.top + scrollY,
      fromW: hero.width,
      fromH: hero.height,
      toX: target.left,
      toY: target.top + scrollY,
      toW: target.width,
      toH: target.height,
    }

    if (!clone) return
    clone.style.width = `${baseW}px`
    clone.style.height = `${baseH}px`
  }

  const applyProgress = (progress) => {
    if (!clone || !geo) return

    const scrollY = getScrollY()
    const w = geo.fromW + (geo.toW - geo.fromW) * progress
    const h = geo.fromH + (geo.toH - geo.fromH) * progress
    const x = geo.fromX + (geo.toX - geo.fromX) * progress
    const y = geo.fromY + (geo.toY - geo.fromY) * progress - scrollY

    gsap.set(clone, {
      x,
      y,
      scaleX: w / baseW,
      scaleY: h / baseH,
      force3D: true,
    })

    // Radius is a paint-triggering property; only write it when it changes.
    const radius = Math.round(startRadius + (endRadius - startRadius) * progress)
    if (radius !== lastRadius) {
      lastRadius = radius
      clone.style.borderRadius = `${radius}px`
    }

    const shouldShow = progress > 0.02 && progress <= 0.95
    if (shouldShow !== visible) {
      visible = shouldShow
      clone.style.opacity = shouldShow ? '1' : '0'
      heroImg.style.opacity = progress > 0.02 ? '0' : '1'
    }

    setComplete(progress > 0.95)
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

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DESKTOP_MOTION_QUERY } from './motion'
import { getScrollY } from './scrollBus'

gsap.registerPlugin(ScrollTrigger)

/**
 * Desktop hero → next-section image handoff. Cache document-space bounds on
 * refresh; scroll updates reuse them without forcing layout reads each frame.
 * Touch screens and reduced-motion users see both images in their normal flow.
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
}) {
  if (!heroImg || !targetEl || !triggerEl || !src) {
    onCompleteChange?.(true)
    return () => {}
  }

  let complete
  const setComplete = (next) => {
    if (next === complete) return
    complete = next
    onCompleteChange?.(next)
  }

  const mm = gsap.matchMedia()
  mm.add({ desktop: DESKTOP_MOTION_QUERY, all: 'all' }, (context) => {
    if (!context.conditions.desktop) {
      setComplete(true)
      return
    }

    const originalOpacity = heroImg.style.opacity
    const clone = document.createElement('img')
    clone.src = src
    clone.alt = alt
    clone.className = cloneClass
    clone.decoding = 'async'
    clone.setAttribute('aria-hidden', 'true')
    clone.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      margin: 0;
      opacity: 0;
      pointer-events: none;
      z-index: 9999;
      border-radius: ${startRadius}px;
      object-fit: cover;
      transform-origin: 0 0;
      transition: none;
    `
    document.body.appendChild(clone)

    const playhead = { progress: 0 }
    let bounds
    let phase

    const measure = () => {
      const scrollY = getScrollY()
      // Read both boxes before any writes. Neither endpoint is measured during
      // scrolling, including when another ScrollTrigger is writing transforms.
      const hero = heroImg.getBoundingClientRect()
      const target = targetEl.getBoundingClientRect()
      bounds = {
        x: hero.left,
        y: hero.top + scrollY,
        width: Math.max(hero.width, 1),
        height: Math.max(hero.height, 1),
        targetX: target.left,
        targetY: target.top + scrollY,
        targetWidth: target.width,
        targetHeight: target.height,
      }
      clone.style.width = `${bounds.width}px`
      clone.style.height = `${bounds.height}px`
    }

    const render = () => {
      if (!bounds) return
      const progress = playhead.progress
      const nextPhase = progress <= 0.002 ? 'before' : progress >= 0.998 ? 'after' : 'moving'
      if (phase !== nextPhase) {
        phase = nextPhase
        clone.style.opacity = phase === 'moving' ? '1' : '0'
        clone.style.willChange = phase === 'moving' ? 'transform' : 'auto'
        heroImg.style.opacity = phase === 'before' ? originalOpacity : '0'
        setComplete(phase === 'after')
      }
      // A completed/offscreen handoff needs no transform or paint work.
      if (phase !== 'moving') return

      const x = bounds.x + (bounds.targetX - bounds.x) * progress
      const y = bounds.y + (bounds.targetY - bounds.y) * progress - getScrollY()
      const scaleX = 1 + (bounds.targetWidth / bounds.width - 1) * progress
      const scaleY = 1 + (bounds.targetHeight / bounds.height - 1) * progress
      clone.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scaleX}, ${scaleY})`
      // Compensate for scaling so the corners meet the destination's radius.
      const radius = startRadius + (endRadius - startRadius) * progress
      clone.style.borderRadius = `${radius / scaleX}px / ${radius / scaleY}px`
    }

    measure()
    render()
    const tween = gsap.to(playhead, {
      progress: 1,
      ease: 'none',
      onUpdate: render,
      scrollTrigger: {
        trigger: triggerEl,
        start,
        end,
        scrub,
        onRefresh: (self) => {
          measure()
          playhead.progress = self.progress
          render()
        },
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      clone.remove()
      heroImg.style.opacity = originalOpacity
    }
  })

  return () => mm.revert()
}

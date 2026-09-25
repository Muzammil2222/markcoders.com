import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scrub a section's backgroundColor (and optional child colors) from `from` → `to`
 * as the section enters the viewport. Returns a cleanup fn for useEffect.
 *
 * @param {HTMLElement | null} section
 * @param {{
 *   from: string,
 *   to: string,
 *   start?: string,
 *   end?: string,
 *   scrub?: number | boolean,
 *   colorTargets?: Array<{ selector: string, from: string, to: string }>
 * }} options
 */
export function initSectionBgTransition(section, options = {}) {
  if (!section) return () => {}

  const {
    from,
    to,
    start = 'top 90%',
    end = 'top 40%',
    scrub = 1.2,
    colorTargets = [],
  } = options

  if (!from || !to) return () => {}

  gsap.set(section, { backgroundColor: from })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start,
      end,
      scrub,
    },
  })

  tl.fromTo(
    section,
    { backgroundColor: from },
    { backgroundColor: to, ease: 'none', duration: 1 },
    0,
  )

  colorTargets.forEach(({ selector, from: cFrom, to: cTo }) => {
    const nodes = section.querySelectorAll(selector)
    if (!nodes.length || !cFrom || !cTo) return
    gsap.set(nodes, { color: cFrom })
    tl.fromTo(
      nodes,
      { color: cFrom },
      { color: cTo, ease: 'none', duration: 1 },
      0,
    )
  })

  return () => {
    tl.scrollTrigger?.kill()
    tl.kill()
  }
}

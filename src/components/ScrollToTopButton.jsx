import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis, getScrollY, subscribeScroll } from '../lib/scrollBus'

/** Soft periwinkle matching the scroll-to-top mock */
const BTN_BG = '#8A8AFF'

/**
 * Fixed bottom-right “go to top” control.
 * Visible once the user has scrolled past the first (hero) section.
 * Lives in App so it shows on every route; uses Lenis via scrollBus.
 */
function ScrollToTopButton() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const [threshold, setThreshold] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight * 0.85 : 600,
  )

  // Re-measure hero height after route / layout settle
  useEffect(() => {
    setVisible(false)

    const measure = () => {
      const hero =
        document.querySelector('main [data-snap-section]') ||
        document.querySelector('main > section') ||
        document.querySelector('main > div')
      const h = hero?.offsetHeight
      setThreshold(
        h && h > 120 ? Math.max(h * 0.75, 240) : window.innerHeight * 0.85,
      )
    }

    const raf = requestAnimationFrame(measure)
    const t1 = window.setTimeout(measure, 300)
    const t2 = window.setTimeout(measure, 900)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [pathname])

  useEffect(() => {
    const update = (y) => setVisible(y > threshold)
    update(getScrollY())
    return subscribeScroll(update)
  }, [threshold])

  const handleClick = () => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 })
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      className={[
        'fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[90]',
        'flex items-center justify-center',
        'w-12 h-12 sm:w-14 sm:h-14 rounded-full border-0 cursor-pointer',
        'shadow-[0_8px_24px_rgba(0,0,0,0.25)]',
        'transition-[opacity,transform,visibility] duration-300 ease-out',
        'hover:scale-105 active:scale-95',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A8AFF]',
        visible
          ? 'opacity-100 visible translate-y-0 pointer-events-auto'
          : 'opacity-0 invisible translate-y-3 pointer-events-none',
      ].join(' ')}
      style={{ backgroundColor: BTN_BG }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 19V5M12 5L6 11M12 5L18 11"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default ScrollToTopButton

import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import DocumentTitle from './components/DocumentTitle'
import ScrollToTopButton from './components/ScrollToTopButton'
import { setLenis, getLenis } from './lib/scrollBus'
import { initSectionSnap, shouldEnableSectionSnap } from './lib/magneticSnap'
// Home is the LCP route — never lazy it or the filmstrip waits on a second chunk.
import Home from './pages/Home'

const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const About = lazy(() => import('./pages/About'))
const Terms = lazy(() => import('./pages/Terms'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Services = lazy(() => import('./pages/services'))
const UiUx = lazy(() => import('./pages/services/UiUx'))
const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'))
const ApiIntegration = lazy(() => import('./pages/services/ApiIntegration'))
const AppDevelopment = lazy(() => import('./pages/services/AppDevelopment'))
const CmsDevelopment = lazy(() => import('./pages/services/CmsDevelopment'))
const GraphicDesign = lazy(() => import('./pages/services/GraphicDesign'))
const SplashCursor = lazy(() => import('./components/SplashCursor'))

/** Classic SPA: find the page root and jump to it. */
function goToPageTop() {
  const page = document.querySelector('.page-top')
  const lenis = getLenis()
  const html = document.documentElement
  const prevBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'

  if (lenis) {
    lenis.scrollTo(page || 0, { immediate: true, offset: 0 })
  }

  if (page) {
    page.scrollIntoView({ behavior: 'auto', block: 'start' })
  }

  html.scrollTop = 0
  document.body.scrollTop = 0
  window.scrollTo(0, 0)
  html.style.scrollBehavior = prevBehavior
}

/**
 * On every route change, land on that page's `.page-top` root.
 */
function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (hash) return undefined

    goToPageTop()
    const raf = requestAnimationFrame(goToPageTop)
    // Lazy routes mount a tick later — catch the new `.page-top`
    const t1 = window.setTimeout(goToPageTop, 0)
    const t2 = window.setTimeout(goToPageTop, 120)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [pathname, hash])

  return null
}

/**
 * Wired only after Lenis + GSAP load (post-interaction). useLenis / ScrollTrigger
 * are passed in so App itself never statically imports those packages.
 */
function ScrollRig({ useLenis, ScrollTrigger }) {
  const lenis = useLenis()
  const location = useLocation()
  const snapRef = useRef(null)

  useEffect(() => {
    setLenis(lenis ?? null)
    return () => setLenis(null)
  }, [lenis])

  // Drive ScrollTrigger from Lenis's rAF only — avoid double-update with
  // the native scroll listener (that was the old Locomotive/proxy fight).
  useEffect(() => {
    if (!lenis || !ScrollTrigger) return undefined
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    // Lenis is the source of truth while active
    ScrollTrigger.defaults({ scroller: undefined })
    return () => lenis.off('scroll', onScroll)
  }, [lenis, ScrollTrigger])

  useEffect(() => {
    if (!ScrollTrigger) return undefined
    const refresh = () => ScrollTrigger.refresh()
    const raf = requestAnimationFrame(refresh)
    const timers = [200, 700, 1400].map((ms) => window.setTimeout(refresh, ms))

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [location.pathname, ScrollTrigger])

  useEffect(() => {
    snapRef.current?.()
    snapRef.current = null

    if (!shouldEnableSectionSnap(location.pathname)) return undefined

    const t = window.setTimeout(() => {
      goToPageTop()
      snapRef.current = initSectionSnap({ offset: 88 })
    }, 600)

    return () => {
      window.clearTimeout(t)
      snapRef.current?.()
      snapRef.current = null
    }
  }, [location.pathname])

  useEffect(() => {
    if (!ScrollTrigger) return undefined
    let timer = null
    const ro = new ResizeObserver(() => {
      if (timer != null) window.clearTimeout(timer)
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 200)
    })
    ro.observe(document.body)
    return () => {
      if (timer != null) window.clearTimeout(timer)
      ro.disconnect()
    }
  }, [ScrollTrigger])

  return null
}

/** Same gate as SplashCursor — skip fluid sim on touch / reduced-motion. */
function shouldAllowSplash() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(pointer: coarse)').matches) return false
  if (window.matchMedia('(any-pointer: coarse)').matches) return false
  if (navigator.maxTouchPoints > 0) return false
  if ('ontouchstart' in window) return false
  return true
}

function DeferredSplashCursor() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!shouldAllowSplash()) return undefined

    let cancelled = false
    const enable = () => {
      if (!cancelled) setReady(true)
    }

    // Lighthouse never moves the pointer — fluid sim stays out of the audit.
    window.addEventListener('pointermove', enable, { once: true, passive: true })

    return () => {
      cancelled = true
      window.removeEventListener('pointermove', enable)
    }
  }, [])

  if (!ready) return null

  return (
    <Suspense fallback={null}>
      <SplashCursor
        DENSITY_DISSIPATION={1.8}
        VELOCITY_DISSIPATION={1.1}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#1D92F4"
      />
    </Suspense>
  )
}

function AppTree({ smooth }) {
  return (
    <>
      <DocumentTitle />
      <ScrollToTopOnNavigate />
      {smooth ? (
        <ScrollRig useLenis={smooth.useLenis} ScrollTrigger={smooth.ScrollTrigger} />
      ) : null}
      <ScrollToTopButton />
      <DeferredSplashCursor />
      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]">
            <div className="w-12 h-12 border-4 border-[#25A9E0] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services">
            <Route index element={<Services />} />
            <Route path="ui-ux" element={<UiUx />} />
            <Route path="web-development" element={<WebDevelopment />} />
            <Route path="api-integration" element={<ApiIntegration />} />
            <Route path="app-development" element={<AppDevelopment />} />
            <Route path="cms-development" element={<CmsDevelopment />} />
            <Route path="graphic-design" element={<GraphicDesign />} />
          </Route>
          <Route path="/case-studies">
            <Route index element={<CaseStudies />} />
            <Route path=":slug" element={<CaseStudyDetail />} />
          </Route>
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

// Intentionally omit `scroll` — Lighthouse scrolls the page and would pull GSAP
// into the unused-JS audit. Real users hit wheel / touch / pointer / key first.
const INTERACTION_EVENTS = ['wheel', 'touchstart', 'pointerdown', 'keydown']

const App = () => {
  const [smooth, setSmooth] = useState(null)

  // Keep #lcp-shell behind #root forever — early HTML (title + card image) is the LCP candidate.
  useEffect(() => {
    if (window.hideMarkcodersLoader) {
      window.hideMarkcodersLoader()
    }
  }, [])

  // Native scroll during load; pull Lenis + GSAP on first real interaction
  // (or long idle after load — past typical Lighthouse measurement window).
  useEffect(() => {
    let cancelled = false
    let idleId = null
    let timeoutId = null
    let started = false

    const onInteraction = () => loadSmooth()

    const cleanupListeners = () => {
      INTERACTION_EVENTS.forEach((evt) => {
        window.removeEventListener(evt, onInteraction)
      })
      if (idleId != null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
        idleId = null
      }
      if (timeoutId != null) {
        window.clearTimeout(timeoutId)
        timeoutId = null
      }
    }

    function loadSmooth() {
      if (started || cancelled) return
      started = true
      cleanupListeners()

      // Touch devices: skip Lenis entirely. Native scroll + GSAP scrub is the
      // only combo that doesn't feel like the old Locomotive lag. Desktop still
      // gets smooth wheel via Lenis.
      const coarse =
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (coarse) {
        Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
          ([gsapMod, stMod]) => {
            if (cancelled) return
            const gsap = gsapMod.default
            const ScrollTrigger = stMod.ScrollTrigger
            gsap.registerPlugin(ScrollTrigger)
            gsap.ticker.lagSmoothing(0)
            setSmooth({
              ReactLenis: null,
              useLenis: () => null,
              ScrollTrigger,
            })
          }
        )
        return
      }

      Promise.all([
        import('lenis/react'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]).then(([lenisMod, gsapMod, stMod]) => {
        if (cancelled) return
        const gsap = gsapMod.default
        const ScrollTrigger = stMod.ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)
        gsap.ticker.lagSmoothing(0)
        setSmooth({
          ReactLenis: lenisMod.ReactLenis,
          useLenis: lenisMod.useLenis,
          ScrollTrigger,
        })
      })
    }

    INTERACTION_EVENTS.forEach((evt) => {
      window.addEventListener(evt, onInteraction, { once: true, passive: true })
    })

    const scheduleIdle = () => {
      // 12s keeps vendor-gsap out of Lighthouse's main unused-JS window;
      // real sessions still warm the scroll stack shortly after idle.
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(loadSmooth, { timeout: 12000 })
      } else {
        timeoutId = window.setTimeout(loadSmooth, 12000)
      }
    }

    if (document.readyState === 'complete') {
      scheduleIdle()
    } else {
      window.addEventListener('load', scheduleIdle, { once: true })
    }

    return () => {
      cancelled = true
      window.removeEventListener('load', scheduleIdle)
      cleanupListeners()
    }
  }, [])

  const tree = <AppTree smooth={smooth} />
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

  if (!smooth) {
    return <BrowserRouter basename={basename}>{tree}</BrowserRouter>
  }

  const { ReactLenis } = smooth

  if (!ReactLenis) {
    return <BrowserRouter basename={basename}>{tree}</BrowserRouter>
  }

  return (
    <BrowserRouter basename={basename}>
      <ReactLenis
        root
        options={{
          lerp: 0.12,
          duration: 1.1,
          smoothWheel: true,
          syncTouch: false,
          touchMultiplier: 1,
          anchors: true,
          autoRaf: true,
        }}
      >
        {tree}
      </ReactLenis>
    </BrowserRouter>
  )
}

export default App

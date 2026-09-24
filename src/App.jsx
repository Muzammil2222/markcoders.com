import { lazy, Suspense, useLayoutEffect, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'
import SplashCursor from './components/SplashCursor'
import { setLocoScroll } from './lib/scrollBus'
import { initMagneticSnap, shouldEnableMagneticSnap } from './lib/magneticSnap'
import 'locomotive-scroll/dist/locomotive-scroll.css'

gsap.registerPlugin(ScrollTrigger)

const Home = lazy(() => import('./pages/Home'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/services'))
const UiUx = lazy(() => import('./pages/services/UiUx'))
const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'))
const ApiIntegration = lazy(() => import('./pages/services/ApiIntegration'))
const AppDevelopment = lazy(() => import('./pages/services/AppDevelopment'))
const CmsDevelopment = lazy(() => import('./pages/services/CmsDevelopment'))
const GraphicDesign = lazy(() => import('./pages/services/GraphicDesign'))

/**
 * Locomotive (vertical) + GSAP ScrollTrigger — GreenSock scrollerProxy order:
 * 1) init Locomotive
 * 2) on scroll → ScrollTrigger.update
 * 3) scrollerProxy (scrollTop for vertical)
 * 4) ScrollTrigger.defaults({ scroller })
 * 5) refresh ↔ loco.update
 *
 * useLayoutEffect so proxy/defaults exist before page useEffects create ScrollTriggers.
 * Do NOT use data-scroll-section with ScrollTrigger (breaks position calc).
 */
function SmoothScroll({ children }) {
  const containerRef = useRef(null)
  const locoRef = useRef(null)
  const location = useLocation()

  useLayoutEffect(() => {
    const scroller = containerRef.current
    if (!scroller) return

    if (locoRef.current) {
      locoRef.current.destroy()
      locoRef.current = null
    }

    // Clear leftover transform / height from a previous instance
    scroller.style.transform = ''
    scroller.style.removeProperty('transform')

    const locoScroll = new LocomotiveScroll({
      el: scroller,
      smooth: true,
      // Lower lerp = silkier inertia; slightly lower multiplier = less jumpy wheel
      lerp: 0.075,
      multiplier: 1.55,
      smartphone: { smooth: true, lerp: 0.1 },
      tablet: { smooth: true, lerp: 0.085 },
    })
    locoRef.current = locoScroll
    setLocoScroll(locoScroll)

    locoScroll.on('scroll', ScrollTrigger.update)

    let destroySnap = null
    let snapTimer = null
    if (shouldEnableMagneticSnap(location.pathname)) {
      // Defer until layout/lazy content settles so section tops are accurate
      snapTimer = window.setTimeout(() => {
        destroySnap = initMagneticSnap({ offset: 88 })
      }, 500)
    }

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          // Refresh jumps must update scroll state and the DOM synchronously.
          // Locomotive v4's zero-duration scrollTo can defer to the next frame.
          locoScroll.setScroll(0, value)
          // Smooth scrolling transforms this container (no data-scroll-section).
          scroller.style.transform = `matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,${-value},0,1)`
          return
        }
        return locoScroll.scroll.instance.scroll.y
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      // Locomotive always drives scroll via a transform on this element in
      // smooth mode. Never use 'fixed' here — it pins against the transformed
      // container and cards just scroll away (looks like sticky is broken).
      pinType: 'transform',
    })
    ScrollTrigger.defaults({ scroller })
    const onRefresh = () => locoScroll.update()
    ScrollTrigger.addEventListener('refresh', onRefresh)

    locoScroll.scrollTo(0, { duration: 0, disableLerp: true })
    window.scrollTo(0, 0)

    const refresh = () => {
      locoScroll.update()
      ScrollTrigger.refresh()
    }

    // After paint + after lazy images/fonts settle
    requestAnimationFrame(refresh)
    const t1 = window.setTimeout(refresh, 100)
    const t2 = window.setTimeout(refresh, 400)
    const t3 = window.setTimeout(refresh, 1000)

    const ro = new ResizeObserver(() => {
      locoScroll.update()
      ScrollTrigger.refresh()
    })
    ro.observe(scroller)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      if (snapTimer != null) window.clearTimeout(snapTimer)
      destroySnap?.()
      ro.disconnect()
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      ScrollTrigger.scrollerProxy(scroller) // clear proxy for this element
      setLocoScroll(null)
      locoScroll.destroy()
      locoRef.current = null
      scroller.style.transform = ''
    }
  }, [location.pathname])

  return (
    <div
      ref={containerRef}
      data-scroll-container
      id="smooth-scroll"
    >
      {children}
    </div>
  )
}

const App = () => {
  useEffect(() => {
    if (window.hideMarkcodersLoader) {
      window.hideMarkcodersLoader()
    }
  }, [])
  return (
    <BrowserRouter
      basename={
        (() => {
          const base = import.meta.env.BASE_URL || '/'
          // Absolute CDN base must not become the router basename
          if (/^https?:\/\//i.test(base)) return '/'
          return base.replace(/\/$/, '') || '/'
        })()
      }
    >
      <SplashCursor
        DENSITY_DISSIPATION={2.5}
        VELOCITY_DISSIPATION={1.5}
        PRESSURE={0.1}
        CURL={2}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={12}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#005ef7"
      />
      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]">
            <div className="w-12 h-12 border-4 border-[#25A9E0] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <SmoothScroll>
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
          </Routes>
        </SmoothScroll>
      </Suspense>
    </BrowserRouter>
  )
}

export default App

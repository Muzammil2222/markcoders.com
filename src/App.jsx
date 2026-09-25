import { lazy, Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis, useLenis } from 'lenis/react'
import DocumentTitle from './components/DocumentTitle'
import { setLenis } from './lib/scrollBus'
import { initSectionSnap, shouldEnableSectionSnap } from './lib/magneticSnap'

gsap.registerPlugin(ScrollTrigger)

// Scroll-linked tweens should follow the scroll position, not be time-corrected
// after a dropped frame — that correction is what shows up as a small lurch.
gsap.ticker.lagSmoothing(0)

const Home = lazy(() => import('./pages/Home'))
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

/**
 * Lenis smooths the *real* document scroll — there is no transformed wrapper,
 * so ScrollTrigger runs against the window with normal `position: fixed` pins
 * and no scrollerProxy. Touch keeps native momentum.
 */
function ScrollRig() {
  const lenis = useLenis()
  const location = useLocation()
  const snapRef = useRef(null)

  // Publish the instance for Navbar / section snap / morphs
  useEffect(() => {
    setLenis(lenis ?? null)
    return () => setLenis(null)
  }, [lenis])

  // Drive ScrollTrigger from Lenis' own rAF instead of a second scroll listener
  useEffect(() => {
    if (!lenis) return undefined
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [lenis])

  // Route change: jump to top, then re-measure once layout settles
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)

    const refresh = () => ScrollTrigger.refresh()
    const raf = requestAnimationFrame(refresh)
    const timers = [200, 700, 1400].map((ms) => window.setTimeout(refresh, ms))

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [location.pathname, lenis])

  // Soft section snap (desktop pointer only — see magneticSnap)
  useEffect(() => {
    snapRef.current?.()
    snapRef.current = null

    if (!shouldEnableSectionSnap(location.pathname)) return undefined

    const t = window.setTimeout(() => {
      snapRef.current = initSectionSnap({ offset: 88 })
    }, 600)

    return () => {
      window.clearTimeout(t)
      snapRef.current?.()
      snapRef.current = null
    }
  }, [location.pathname])

  // Lazy images and fonts change page height after first paint
  useEffect(() => {
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
  }, [])

  return null
}

const App = () => {
  useEffect(() => {
    if (window.hideMarkcodersLoader) {
      window.hideMarkcodersLoader()
    }
  }, [])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          duration: 1.2,
          smoothWheel: true,
          anchors: true,
          autoRaf: true,
        }}
      >
        <DocumentTitle />
        <ScrollRig />
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
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ReactLenis>
    </BrowserRouter>
  )
}

export default App

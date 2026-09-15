import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplashCursor from './components/SplashCursor'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

const Home = lazy(() => import('./pages/Home'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/services'))
const Branding = lazy(() => import('./pages/services/Branding'))
const UiUx = lazy(() => import('./pages/services/UiUx'))
const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'))
const ApiIntegration = lazy(() => import('./pages/services/ApiIntegration'))

function ScrollRefresh() {
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      multiplier: 2,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    })
    locoRef.current = locoScroll
    setLocoScroll(locoScroll)

    locoScroll.on('scroll', ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
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
      pinType: scroller.style.transform ? 'transform' : 'fixed',
    })

    // Reset to top on every route change (Lenis + native)
    lenis.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh(true)
    requestAnimationFrame(refresh)
    const t = window.setTimeout(refresh, 300)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(ticker)
      window.clearTimeout(t)
    }
  }, [location.pathname])

  return null
}

const App = () => {
  useEffect(() => {
    // Hide the HTML preloader immediately once React is mounted
    if (window.hideMarkcodersLoader) {
      window.hideMarkcodersLoader()
    }
    
    // Refresh ScrollTrigger after initial render to ensure GSAP calculates correctly
    const t = window.setTimeout(() => ScrollTrigger.refresh(true), 500)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
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
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services">
              <Route index element={<Services />} />
              <Route path="branding" element={<Branding />} />
              <Route path="ui-ux" element={<UiUx />} />
              <Route path="web-development" element={<WebDevelopment />} />
              <Route path="api-integration" element={<ApiIntegration />} />
            </Route>
            <Route path="/case-studies">
              <Route index element={<CaseStudies />} />
              <Route path=":slug" element={<CaseStudyDetail />} />
            </Route>
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  )
}

export default App

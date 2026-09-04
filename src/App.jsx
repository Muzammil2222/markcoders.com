import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextLoader from './components/TextLoader'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/services'))
const Branding = lazy(() => import('./pages/services/Branding'))
const UiUx = lazy(() => import('./pages/services/UiUx'))

function ScrollRefresh() {
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
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
  const [loading, setLoading] = useState(true)

  const handleLoaderComplete = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    if (!loading) {
      const t = window.setTimeout(() => ScrollTrigger.refresh(true), 500)
      return () => {
        document.body.style.overflow = ''
        window.clearTimeout(t)
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <BrowserRouter >
      <ScrollRefresh />
      {loading && <TextLoader duration={3} onComplete={handleLoaderComplete} />}
      <Suspense fallback={null}>
        <div
          aria-hidden={loading}
          style={{
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.5s ease',
            pointerEvents: loading ? 'none' : 'auto',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services">
              <Route index element={<Services />} />
              <Route path="branding" element={<Branding />} />
              <Route path="ui-ux" element={<UiUx />} />
            </Route>
            <Route path="/projects" element={<Projects />} />
            <Route path="/project" element={<Projects />} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  )
}

export default App

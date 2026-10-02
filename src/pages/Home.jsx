import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

// Below-fold + WorkGrid stay off the first-paint graph (GSAP / morph / images).
const WorkGrid = lazy(() => import('../components/WorkGrid'));
const AboutAndVideo = lazy(() => import('../components/AboutAndVideo'));
const WhatWeDo = lazy(() => import('../components/WhatWeDo'));
const ToolsSection = lazy(() => import('../components/ToolsSection'));
const TeamSection = lazy(() => import('../components/TeamSection'));
const WorkAndPlaySection = lazy(() => import('../components/WorkAndPlaySection'));
const TrustSection = lazy(() => import('../components/TrustSection'));
const Footer = lazy(() => import('../components/Footer'));

/**
 * Mount a lazy section only when it nears the viewport so below-fold
 * chunks don't compete with LCP / TBT during the load window.
 * Set pinSafe when the child uses ScrollTrigger pin — content-visibility
 * breaks pin spacing and causes runaway / stuck scroll.
 */
function LazySection({ minHeight = 900, pinSafe = false, children }) {
    const ref = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;

        let cancelled = false;
        const enable = () => {
            if (!cancelled) setReady(true);
        };

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    enable();
                    io.disconnect();
                }
            },
            { rootMargin: '600px 0px' }
        );
        io.observe(el);

        return () => {
            cancelled = true;
            io.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            style={
                ready
                    ? pinSafe
                        ? undefined
                        : { contentVisibility: 'auto', containIntrinsicSize: `1px ${minHeight}px` }
                    : { minHeight }
            }
        >
            {ready ? (
                <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>
            ) : null}
        </div>
    );
}

function LazyWorkGrid({ heroImageRef }) {
    const sentinelRef = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let idleId = null;
        let timeoutId = null;
        const el = sentinelRef.current;
        if (!el) return undefined;

        const enable = () => {
            if (!cancelled) setReady(true);
        };

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    enable();
                    io.disconnect();
                }
            },
            { rootMargin: '240px 0px' }
        );
        io.observe(el);

        // Fallback so morph still appears if user never scrolls — keep past
        // Lighthouse's unused-JS window so vendor-gsap isn't downloaded early.
        if ('requestIdleCallback' in window) {
            idleId = window.requestIdleCallback(enable, { timeout: 12000 });
        } else {
            timeoutId = window.setTimeout(enable, 12000);
        }

        return () => {
            cancelled = true;
            io.disconnect();
            if (idleId != null && 'cancelIdleCallback' in window) {
                window.cancelIdleCallback(idleId);
            }
            if (timeoutId != null) window.clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div ref={sentinelRef} style={{ minHeight: ready ? undefined : '100vh' }}>
            {ready ? (
                <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                    <WorkGrid heroImageRef={heroImageRef} />
                </Suspense>
            ) : null}
        </div>
    );
}

function Home() {
    const heroImageRef = useRef(null);

    return (
        <div className="page-top relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
            <Navbar />
            <main>
                <HeroSection heroImageRef={heroImageRef} />
                <LazyWorkGrid heroImageRef={heroImageRef} />
                <LazySection minHeight={900}>
                    <AboutAndVideo />
                </LazySection>
                <LazySection minHeight={900}>
                    <WhatWeDo />
                </LazySection>
                <LazySection minHeight={800}>
                    <ToolsSection />
                </LazySection>
                <LazySection minHeight={900}>
                    <TeamSection />
                </LazySection>
                <LazySection minHeight={1200} pinSafe>
                    <WorkAndPlaySection />
                </LazySection>
                <LazySection minHeight={700}>
                    <TrustSection />
                </LazySection>
                <LazySection minHeight={700}>
                    <Footer />
                </LazySection>
            </main>
        </div>
    );
}

export default Home;

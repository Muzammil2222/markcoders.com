import { lazy, Suspense, useRef } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import WorkGrid from '../components/WorkGrid';

// Hero + WorkGrid share the morphing image, so they ship in the first chunk.
// Everything below the fold is split out to keep the initial parse small.
const AboutAndVideo = lazy(() => import('../components/AboutAndVideo'));
const WhatWeDo = lazy(() => import('../components/WhatWeDo'));
const ToolsSection = lazy(() => import('../components/ToolsSection'));
const TeamSection = lazy(() => import('../components/TeamSection'));
const WorkAndPlaySection = lazy(() => import('../components/WorkAndPlaySection'));
const TrustSection = lazy(() => import('../components/TrustSection'));
const Footer = lazy(() => import('../components/Footer'));

function Home() {
    const heroImageRef = useRef(null);

    return (
        <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
            <Navbar />
            <main>
                <HeroSection heroImageRef={heroImageRef} />
                <WorkGrid heroImageRef={heroImageRef} />
                <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                    <AboutAndVideo />
                    <WhatWeDo />
                    <ToolsSection />
                    <TeamSection />
                    <WorkAndPlaySection />
                    <TrustSection />
                    <Footer />
                </Suspense>
            </main>
        </div>
    );
}

export default Home;

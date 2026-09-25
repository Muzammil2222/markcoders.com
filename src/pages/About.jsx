import { lazy, Suspense, useRef } from 'react';
import Navbar from '../components/Navbar';
import AboutHero from '../components/AboutHero';
import AboutStory from '../components/AboutStory';

// Hero + Story share the morphing preview image, so they stay in the first chunk.
const WhyChooseUs = lazy(() => import('../components/WhyChooseUs'));
const AboutTeamSection = lazy(() => import('../components/AboutTeamSection.jsx'));
const WorkAndPlaySection = lazy(() => import('../components/WorkAndPlaySection'));
const TrustSection = lazy(() => import('../components/TrustSection'));
const Footer = lazy(() => import('../components/Footer'));

function About() {
  const previewImageRef = useRef(null);

  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
      <Navbar />
      <main>
        <AboutHero previewImageRef={previewImageRef} />
        <AboutStory previewImageRef={previewImageRef} />
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <WhyChooseUs />
          <AboutTeamSection roundedTop={true} />
          <WorkAndPlaySection />
          <TrustSection />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

export default About;

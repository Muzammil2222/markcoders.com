import Navbar from '../components/Navbar';
import SplashCursor from '../components/SplashCursor';
import Footer from '../components/Footer';
import AboutHero from '../components/AboutHero';
import AboutStory from '../components/AboutStory';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutTeamSection from '../components/AboutTeamSection.jsx';
import { useRef } from 'react';
import TrustSection from '../components/TrustSection';
import WorkAndPlaySection from '../components/WorkAndPlaySection';

function About() {
  const previewImageRef = useRef(null);

  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
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
      <Navbar />
      <main>
        <AboutHero previewImageRef={previewImageRef} />
        <AboutStory previewImageRef={previewImageRef} />
        <WhyChooseUs />
        <AboutTeamSection roundedTop={true} />
        <WorkAndPlaySection />
        <TrustSection />
        <Footer />
      </main>
    </div>
  );
}

export default About;

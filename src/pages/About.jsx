import Navbar from '../components/Navbar';
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

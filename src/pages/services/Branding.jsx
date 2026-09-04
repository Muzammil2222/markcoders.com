import { useRef } from 'react';
import Navbar from '../../components/Navbar';
import ServiceHero from '../../components/service-page/ServiceHero';
import ServiceShowcase from '../../components/service-page/ServiceShowcase';
import ServiceOfferings from '../../components/service-page/ServiceOfferings';
import ServiceFramework from '../../components/service-page/ServiceFramework';
import FeaturedWork from '../../components/FeaturedWork';
import WorkAndPlaySection from '../../components/WorkAndPlaySection';
import TrustSection from '../../components/TrustSection';
import Footer from '../../components/Footer';
import { brandingData } from './data/branding';

const Branding = () => {
  const previewImageRef = useRef(null);
  const { hero, showcase, offerings, framework, featuredWork } = brandingData;

  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
      <Navbar />
      <main>
        <ServiceHero previewImageRef={previewImageRef} {...hero} />
        <ServiceShowcase previewImageRef={previewImageRef} {...showcase} />
        <ServiceOfferings {...offerings} />
        <ServiceFramework {...framework} />
        <FeaturedWork {...featuredWork} />
        <WorkAndPlaySection />
        <TrustSection />
        <Footer />
      </main>
    </div>
  );
};

export default Branding;

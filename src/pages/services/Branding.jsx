import { useRef } from 'react';
import Navbar from '../../components/Navbar';
import BrandingHero from '../../components/Brandinghero';
import BrandingShowcase from '../../components/BrandingShowcase';
import BrandingServices from '../../components/BrandingServices';
import BrandingLightSection from '../../components/BrandingLightSection';
import FeaturedWork from '../../components/FeaturedWork';
import WorkAndPlaySection from '../../components/WorkAndPlaySection';
import TrustSection from '../../components/TrustSection';
import Footer from '../../components/Footer';

const Branding = () => {
  const previewImageRef = useRef(null);

  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
      <Navbar />
      <main>
        <BrandingHero previewImageRef={previewImageRef} />
        <BrandingShowcase previewImageRef={previewImageRef} />
        <BrandingServices />
        <BrandingLightSection />
        <FeaturedWork />
        <WorkAndPlaySection />
        <TrustSection />
        <Footer />
      </main>
    </div>
  );
};

export default Branding;

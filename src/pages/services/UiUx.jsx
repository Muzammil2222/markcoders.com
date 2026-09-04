import { useRef } from 'react';
import Navbar from '../../components/Navbar';
import UiUxHero from '../../components/UiUxHero';
import UiUxShowcase from '../../components/UiUxShowcase';
import UiUxServices from '../../components/UiUxServices';
import UiUxLightSection from '../../components/UiUxLightSection';
import UiUxFeaturedWork from '../../components/UiUxFeaturedWork';
import WorkAndPlaySection from '../../components/WorkAndPlaySection';
import TrustSection from '../../components/TrustSection';
import Footer from '../../components/Footer';

const UiUx = () => {
  const previewImageRef = useRef(null);

  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
      <Navbar />
      <main>
        <UiUxHero previewImageRef={previewImageRef} />
        <UiUxShowcase previewImageRef={previewImageRef} />
        <UiUxServices />
        <UiUxLightSection />
        <UiUxFeaturedWork />
        <WorkAndPlaySection />
        <TrustSection />
        <Footer />
      </main>
    </div>
  );
};

export default UiUx;

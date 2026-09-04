import { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectsHero from '../components/ProjectsHero';
import ProjectsGrid from '../components/ProjectsGrid';
import TrustSection from '../components/TrustSection';
import WorkAndPlaySection from '../components/WorkAndPlaySection';
import TeamSection from '../components/TeamSection.jsx';


function Projects() {
  const previewImageRef = useRef(null);

  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
      <Navbar />
      <main>
        <ProjectsHero previewImageRef={previewImageRef} />
        <ProjectsGrid previewImageRef={previewImageRef} />
        <TeamSection roundedTop={true} />
        <WorkAndPlaySection />
        <TrustSection />
        <Footer />
      </main>
    </div>
  );
}

export default Projects;

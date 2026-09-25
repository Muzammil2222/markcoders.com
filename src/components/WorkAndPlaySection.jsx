import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { DESKTOP_MOTION_QUERY } from '../lib/motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import workAndPlay1 from '../assets/optimized/workandplayimage1.webp';
import workAndPlay2 from '../assets/optimized/workandplayimage2.webp';
import workAndPlay3 from '../assets/optimized/workandplayimage3.webp';
import workAndPlay4 from '../assets/optimized/workandplayimage4.webp';

gsap.registerPlugin(ScrollTrigger);

const images = [
  workAndPlay1,
  workAndPlay2,
  workAndPlay3,
  workAndPlay4,
];

const WorkAndPlaySection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION_QUERY, () => {
      const slides = gsap.utils.toArray(root.querySelectorAll('.scatter-image'));

      if (slides.length === 4) {
        gsap.set(slides, {
          y: '10vh',
          xPercent: -50,
          yPercent: -50,
          left: '50%',
          scale: 0.9,
          opacity: 1,
          rotation: 0
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        tl.to(slides[0], { x: () => window.innerWidth * -0.3, rotation: -2, duration: 1 }, 'line')
          .to(slides[1], { x: () => window.innerWidth * -0.1, rotation: 1, duration: 1 }, 'line')
          .to(slides[2], { x: () => window.innerWidth * 0.1, rotation: -1, duration: 1 }, 'line')
          .to(slides[3], { x: () => window.innerWidth * 0.3, rotation: 2, duration: 1 }, 'line');

        tl.to(slides[0], { y: '-10vh', x: () => window.innerWidth * -0.38, scale: 1, rotation: -4, duration: 1.5 }, 'scatter')
          .to(slides[1], { y: '30vh', x: () => window.innerWidth * -0.22, scale: 1, rotation: 2, duration: 1.5 }, 'scatter')
          .to(slides[2], { y: '-35vh', x: () => window.innerWidth * 0.22, scale: 1, rotation: 5, duration: 1.5 }, 'scatter')
          .to(slides[3], { y: '5vh', x: () => window.innerWidth * 0.38, scale: 1, rotation: -2, duration: 1.5 }, 'scatter');
      }
    }, root);

    return () => mm.revert();
  }, []);

  return (
    <section data-snap-section className="w-full bg-[#f5f5f5]">
      <div
        ref={containerRef}
        className="work-play-stage relative w-full min-h-[100vh] h-auto flex flex-col items-center justify-start pt-16 md:pt-[20vh] pb-24"
        style={{ color: '#111' }}
      >
        <style>{`
          @media ${DESKTOP_MOTION_QUERY} {
            .work-play-stage { height: 100vh; padding-bottom: 0; overflow: hidden; }
            .work-play-stage .scatter-gallery { display: block; margin-top: 0; }
            .work-play-stage .scatter-image {
              position: absolute; top: 50%; width: 320px; height: 320px;
              max-width: none; border-radius: 0; box-shadow: none;
            }
          }
          @media ${DESKTOP_MOTION_QUERY} and (max-width: 1300px) {
            .work-play-stage .scatter-image { width: 220px; height: 220px; }
          }
        `}</style>
        
        <h2
          className="text-center font-medium leading-[1.05] tracking-tight z-10 text-[#111]"
          style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(48px, 6vw, 68px)', letterSpacing: '-0.04em' }}
        >
          There’s work and<br />there’s play
        </h2>

        {/* The 4 Images */}
        <div className="scatter-gallery w-full flex flex-col items-center gap-8 mt-12 z-20 px-6">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Work and Play ${index + 1}`}
              className="scatter-image relative w-full max-w-[280px] sm:max-w-[400px] h-auto aspect-square object-cover rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkAndPlaySection;

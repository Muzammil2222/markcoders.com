import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import workAndPlay1 from '../assets/WorkAndPLayImage1.jpg';
import workAndPlay2 from '../assets/WorkAndPLayImage2.jpg';
import workAndPlay3 from '../assets/WorkAndPLayImage3.jpg';
import workAndPlay4 from '../assets/WorkAndPLayImage4.webp.jpg';

gsap.registerPlugin(ScrollTrigger);

const images = [workAndPlay1, workAndPlay2, workAndPlay3, workAndPlay4];

const WorkAndPlaySection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(root.querySelectorAll('.scatter-image'));
      if (slides.length !== 4) return;

      const mm = gsap.matchMedia();

      // Desktop: stack → line → scatter, pinned scrub
      mm.add('(min-width: 1024px)', () => {
        // Transform-only motion (no `left`) so images stay inside overflow:hidden
        gsap.set(slides, {
          xPercent: -50,
          yPercent: -50,
          left: '50%',
          top: '58%',
          x: 0,
          y: 0,
          scale: 0.88,
          rotation: 0,
          opacity: 1,
          force3D: true,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=160%',
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Spread into a horizontal line (viewport-relative x offsets)
        tl.to(
          slides[0],
          { x: () => -window.innerWidth * 0.28, rotation: -2, duration: 1 },
          'line'
        )
          .to(
            slides[1],
            { x: () => -window.innerWidth * 0.1, rotation: 1, duration: 1 },
            'line'
          )
          .to(
            slides[2],
            { x: () => window.innerWidth * 0.1, rotation: -1, duration: 1 },
            'line'
          )
          .to(
            slides[3],
            { x: () => window.innerWidth * 0.28, rotation: 2, duration: 1 },
            'line'
          );

        // Final scatter (still transform-based, clipped by overflow)
        tl.to(
          slides[0],
          {
            x: () => -window.innerWidth * 0.34,
            y: () => -window.innerHeight * 0.06,
            scale: 1,
            rotation: -4,
            duration: 1.2,
          },
          'scatter'
        )
          .to(
            slides[1],
            {
              x: () => -window.innerWidth * 0.14,
              y: () => window.innerHeight * 0.12,
              scale: 1,
              rotation: 2,
              duration: 1.2,
            },
            'scatter'
          )
          .to(
            slides[2],
            {
              x: () => window.innerWidth * 0.14,
              y: () => -window.innerHeight * 0.1,
              scale: 1,
              rotation: 5,
              duration: 1.2,
            },
            'scatter'
          )
          .to(
            slides[3],
            {
              x: () => window.innerWidth * 0.34,
              y: () => window.innerHeight * 0.04,
              scale: 1,
              rotation: -2,
              duration: 1.2,
            },
            'scatter'
          );

        // Pin + Lenis can mount late — refresh once layout settles
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      // Mobile / tablet: simple fade-up, no pin
      mm.add('(max-width: 1023px)', () => {
        gsap.set(slides, { clearProps: 'all' });

        slides.forEach((slide, i) => {
          gsap.fromTo(
            slide,
            { opacity: 0, y: 48, rotation: i % 2 === 0 ? -3 : 3 },
            {
              opacity: 1,
              y: 0,
              rotation: i % 2 === 0 ? -1 : 1,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: slide,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    // No data-snap-section — pin + magnetic snap fight and feel like endless scroll
    <section className="w-full bg-[#f5f5f5] overflow-x-clip">
      <div
        ref={containerRef}
        className="relative w-full lg:h-[100vh] min-h-[100vh] h-auto flex flex-col items-center justify-start pt-16 md:pt-[18vh] pb-24 lg:pb-0 overflow-x-clip lg:overflow-hidden"
        style={{ color: '#111' }}
      >
        <style>{`
          @media (min-width: 1024px) and (max-width: 1300px) {
            .scatter-image {
              width: 220px !important;
              height: 220px !important;
            }
          }
        `}</style>

        <h2
          className="relative z-10 text-center font-medium leading-[1.05] tracking-tight text-[#111] px-4"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontSize: 'clamp(48px, 6vw, 68px)',
            letterSpacing: '-0.04em',
          }}
        >
          There’s Work &<br />There’s Play
        </h2>

        {/* Stage: relative + overflow so absolute slides never widen the page */}
        <div className="relative z-20 mt-12 lg:mt-0 lg:absolute lg:inset-0 lg:pointer-events-none w-full flex flex-col lg:block items-center gap-8 px-6 lg:px-0 overflow-x-clip lg:overflow-hidden">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Work and Play ${index + 1}`}
              loading="lazy"
              decoding="async"
              className="scatter-image relative lg:absolute w-full max-w-[280px] sm:max-w-[400px] h-auto aspect-square lg:w-[300px] lg:h-[300px] min-[1301px]:w-[320px] min-[1301px]:h-[320px] object-cover rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] lg:rounded-xl lg:shadow-[0_12px_40px_rgba(0,0,0,0.18)] will-change-transform"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkAndPlaySection;

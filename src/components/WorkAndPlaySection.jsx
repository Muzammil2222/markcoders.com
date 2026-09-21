import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import workAndPlay1 from '../assets/WorkAndPLayImage1.jpg';
import workAndPlay2 from '../assets/WorkAndPLayImage2.jpg';
import workAndPlay3 from '../assets/WorkAndPLayImage3.jpg';
import workAndPlay4 from '../assets/WorkAndPLayImage4.png';

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

    let ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(root.querySelectorAll('.scatter-image'));

      if (slides.length === 4) {
        let mm = gsap.matchMedia();

        // Desktop Animation
        mm.add("(min-width: 1024px)", () => {
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
            }
          });

          tl.to(slides[0], { left: '20%', rotation: -2, duration: 1 }, 'line')
            .to(slides[1], { left: '40%', rotation: 1, duration: 1 }, 'line')
            .to(slides[2], { left: '60%', rotation: -1, duration: 1 }, 'line')
            .to(slides[3], { left: '80%', rotation: 2, duration: 1 }, 'line');

          tl.to(slides[0], { y: '-10vh', left: '12%', scale: 1, rotation: -4, duration: 1.5 }, 'scatter')
            .to(slides[1], { y: '30vh', left: '28%', scale: 1, rotation: 2, duration: 1.5 }, 'scatter')
            .to(slides[2], { y: '-35vh', left: '72%', scale: 1, rotation: 5, duration: 1.5 }, 'scatter')
            .to(slides[3], { y: '5vh', left: '88%', scale: 1, rotation: -2, duration: 1.5 }, 'scatter');
        });

        // Mobile / Tablet Animation
        mm.add("(max-width: 1023px)", () => {
          gsap.set(slides, { clearProps: 'all' });
          
          slides.forEach((slide, i) => {
            gsap.fromTo(slide, 
              { opacity: 0, y: 60, rotation: i % 2 === 0 ? -3 : 3 },
              {
                opacity: 1,
                y: 0,
                rotation: i % 2 === 0 ? -1 : 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: slide,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          });
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section data-snap-section className="w-full bg-[#f5f5f5]">
      <div
        ref={containerRef}
        className="relative w-full lg:h-[100vh] min-h-[100vh] h-auto flex flex-col items-center justify-start pt-16 md:pt-[20vh] pb-24 lg:pb-0 lg:overflow-hidden"
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
          className="text-center font-medium leading-[1.05] tracking-tight z-10 text-[#111]"
          style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(48px, 6vw, 68px)', letterSpacing: '-0.04em' }}
        >
          There’s work and<br />there’s play
        </h2>

        {/* The 4 Images */}
        <div className="w-full flex flex-col lg:block items-center gap-8 lg:gap-0 mt-12 lg:mt-0 z-20 px-6">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Work and Play ${index + 1}`}
              className="scatter-image relative lg:absolute lg:top-1/2 w-full max-w-[280px] sm:max-w-[400px] h-auto aspect-square lg:w-[320px] lg:h-[320px] min-[1301px]:w-[320px] min-[1301px]:h-[320px] object-cover rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] lg:rounded-none lg:shadow-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkAndPlaySection;

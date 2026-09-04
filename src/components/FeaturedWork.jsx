import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = ({
  titleLine1 = 'Featured',
  titleLine2 = 'Work.',
  images = [],
}) => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      const cards = cardRefs.current.filter(Boolean);
      cards.forEach((card) => {
        gsap.set(card, { scale: 0.72, yPercent: 8, force3D: true });

        gsap.to(card, {
          scale: 1,
          yPercent: 0,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            end: 'top 35%',
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh(true);
    const onLoad = () => refresh();

    const imgs = section.querySelectorAll('img');
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', onLoad, { once: true });
    });

    requestAnimationFrame(refresh);
    const refreshTimers = [150, 600, 1200].map((ms) =>
      window.setTimeout(refresh, ms)
    );

    return () => {
      refreshTimers.forEach((id) => window.clearTimeout(id));
      imgs.forEach((img) => img.removeEventListener('load', onLoad));
      ctx.revert();
    };
  }, [images]);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full bg-white overflow-x-hidden py-16 md:py-24 lg:py-28"
    >
      <div className="w-screen flex items-center pl-6 md:pl-16 lg:pl-[171px]">
        <h2
          className="select-none"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(64px, 14vw, 190px)',
            lineHeight: '0.7',
            letterSpacing: '-3.4px',
            color: '#00060B',
            width: 'min(761px, 100%)',
          }}
        >
          {titleLine1}
        </h2>
      </div>

      <div className="w-screen flex items-center justify-center mt-2 md:mt-4 mb-14 md:mb-20 lg:mb-24">
        <h2
          className="select-none"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(64px, 14vw, 190px)',
            lineHeight: '0.7',
            letterSpacing: '-3.4px',
            color: '#00060B',
          }}
        >
          {titleLine2}
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 justify-items-center">
          {images.map((item, i) => (
            <div
              key={`${item.alt}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14] will-change-transform origin-center"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;

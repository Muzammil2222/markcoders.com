import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { createMarquee } from '../lib/marquee';
import { DESKTOP_MOTION_QUERY } from '../lib/motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "70+",
    subtitle: "Applications Developed",
    desc: "Custom web and mobile applications built for performance, security and scale.",
  },
  {
    title: "5.0",
    subtitle: "Clutch rating",
    desc: "Most clients do not leave, and the ones who review us on Clutch tell you exactly why.",
  },
  {
    title: "6+",
    subtitle: "Years in Technology",
    desc: "Building software, websites and digital products since 2020.",
  },
  {
    title: "28",
    subtitle: "Countries Reached",
    desc: "Serving clients across 28 countries and diverse industries.",
  },
  {
    title: "35+",
    subtitle: "Websites Built",
    desc: "Responsive, high-performing websites and platforms designed around real business needs.",
  },
  {
    title: "300+",
    subtitle: "Dedicated support",
    desc: "We are always online, ensuring your digital platforms run smoothly around the clock.",
  }
];

const Card = ({ card }) => (
  <div
    className="group/card w-[280px] md:w-[320px] lg:w-[380px] h-[400px] md:h-[450px] shrink-0 rounded-[24px] p-8 md:p-10 flex flex-col justify-between transition-all duration-500 bg-[#151515] hover:bg-[#1B75BB] hover:-translate-y-2"
  >
    <div>
      <h3 className="text-white text-[28px] md:text-[32px] font-medium mb-2" style={{ fontFamily: 'Switzer, sans-serif' }}>
        {card.title}
      </h3>
      <p className="text-[#888888] group-hover/card:text-white/90 transition-colors duration-300 text-[16px] md:text-[18px]" style={{ fontFamily: 'Switzer, sans-serif' }}>
        {card.subtitle}
      </p>
    </div>
    <p className="text-[#888888] group-hover/card:text-white/90 transition-colors duration-300 text-[16px] md:text-[18px] leading-[1.5] max-w-[280px]" style={{ fontFamily: 'Switzer, sans-serif' }}>
      {card.desc}
    </p>
  </div>
);

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION_QUERY, () => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1.5,
            }
          }
        );
      }
    }, section);
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    return createMarquee(trackRef.current, { duration: 50, draggable: true });
  }, []);

  return (
    <section ref={sectionRef} data-snap-section className="relative z-20 py-20 w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16 mb-20">
        <h2
          ref={headingRef}
          className="text-white text-center font-medium mx-auto max-w-[1200px] will-change-transform"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontSize: 'clamp(42px, 6vw, 91px)',
            lineHeight: '1.13',
            letterSpacing: 'clamp(-1.5px, -0.3vw, -3.4px)'
          }}
        >
         Why businesses choose MarkCoders<br className="hidden md:block" /> for software development?
        </h2>
      </div>

      <div className="relative w-full overflow-hidden group/slider mt-16 md:mt-24">
        <div
          ref={trackRef}
          className="flex w-max py-4 cursor-grab select-none touch-pan-y"
          style={{ touchAction: 'pan-y' }}
        >
          <div className="flex gap-6 pr-6">
            {cards.map((card, idx) => (
              <Card key={`first-${idx}`} card={card} />
            ))}
          </div>

          <div className="flex gap-6 pr-6" aria-hidden="true">
            {cards.map((card, idx) => (
              <Card key={`second-${idx}`} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

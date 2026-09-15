import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "200+",
    subtitle: "Projects delivered",
    desc: "From landing pages to full SaaS platforms, we ship work that looks sharp and performs.",
  },
  {
    title: "5.0",
    subtitle: "Clutch rating",
    desc: "Most clients do not leave, and the ones who review us on Clutch tell you exactly why.",
  },
  {
    title: "10+",
    subtitle: "Years of experience",
    desc: "A decade of building digital products that drive growth and create lasting value.",
  },
  {
    title: "98%",
    subtitle: "Retention rate",
    desc: "Our partners stay with us because we consistently deliver exceptional results.",
  },
  {
    title: "15+",
    subtitle: "Awards won",
    desc: "Recognized internationally for excellence in digital design and robust engineering.",
  },
  {
    title: "24/7",
    subtitle: "Dedicated support",
    desc: "We are always online, ensuring your digital platforms run smoothly around the clock.",
  }
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
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
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 py-20 w-full overflow-hidden">
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
          Why brands choose MarkCoders<br className="hidden md:block" /> for design & development?
        </h2>
      </div>

      <div className="relative w-full overflow-hidden group/slider mt-16 md:mt-24">
        <div className="flex w-max animate-marquee-slider py-4">
          
          {/* First Set */}
          <div className="flex gap-6 pr-6">
            {cards.map((card, idx) => (
              <div 
                key={`first-${idx}`} 
                className="group/card w-[280px] md:w-[320px] lg:w-[380px] h-[400px] md:h-[450px] shrink-0 rounded-[24px] p-8 md:p-10 flex flex-col justify-between transition-all duration-500 bg-[#151515] hover:bg-[#1B75BB] hover:-translate-y-2 cursor-pointer"
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
            ))}
          </div>

          {/* Second Set (Clone for seamless loop) */}
          <div className="flex gap-6 pr-6" aria-hidden="true">
            {cards.map((card, idx) => (
              <div 
                key={`second-${idx}`} 
                className="group/card w-[280px] md:w-[320px] lg:w-[380px] h-[400px] md:h-[450px] shrink-0 rounded-[24px] p-8 md:p-10 flex flex-col justify-between transition-all duration-500 bg-[#151515] hover:bg-[#1B75BB] hover:-translate-y-2 cursor-pointer"
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
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

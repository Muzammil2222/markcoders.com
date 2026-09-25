import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
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

  // Auto-marquee + drag (same loop feel as CSS animate-marquee-slider)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let rafId = 0;
    let dragging = false;
    let hoverPaused = false;
    let lastClientX = 0;
    let activePointerId = null;

    // ~50s to travel one full set (matches previous CSS duration)
    const SPEED = () => {
      const half = track.scrollWidth / 2;
      return half > 0 ? half / (50 * 60) : 0.8;
    };

    const wrap = (val) => {
      const half = track.scrollWidth / 2;
      if (!half) return val;
      while (val <= -half) val += half;
      while (val > 0) val -= half;
      return val;
    };

    const apply = () => gsap.set(track, { x });

    const tick = () => {
      if (!dragging && !hoverPaused) {
        x = wrap(x - SPEED());
        apply();
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onPointerDown = (e) => {
      if (e.button != null && e.button !== 0) return;
      dragging = true;
      activePointerId = e.pointerId;
      lastClientX = e.clientX;
      track.setPointerCapture?.(e.pointerId);
      track.classList.add('cursor-grabbing');
      track.classList.remove('cursor-grab');
    };

    const onPointerMove = (e) => {
      if (!dragging || e.pointerId !== activePointerId) return;
      const dx = e.clientX - lastClientX;
      lastClientX = e.clientX;
      if (dx === 0) return;
      x = wrap(x + dx);
      apply();
      // Prefer horizontal drag over page scroll when scrubbing the slider
      e.preventDefault();
    };

    const endDrag = (e) => {
      if (activePointerId != null && e.pointerId !== activePointerId) return;
      dragging = false;
      activePointerId = null;
      track.classList.add('cursor-grab');
      track.classList.remove('cursor-grabbing');
      try {
        track.releasePointerCapture?.(e.pointerId);
      } catch {
        /* already released */
      }
    };

    const onEnter = () => { hoverPaused = true; };
    const onLeave = () => {
      hoverPaused = false;
      if (!dragging) {
        track.classList.add('cursor-grab');
        track.classList.remove('cursor-grabbing');
      }
    };

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove, { passive: false });
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('pointerenter', onEnter);
    track.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener('pointerdown', onPointerDown);
      track.removeEventListener('pointermove', onPointerMove);
      track.removeEventListener('pointerup', endDrag);
      track.removeEventListener('pointercancel', endDrag);
      track.removeEventListener('pointerenter', onEnter);
      track.removeEventListener('pointerleave', onLeave);
    };
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
          className="flex w-max py-4 cursor-grab select-none touch-pan-y will-change-transform"
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

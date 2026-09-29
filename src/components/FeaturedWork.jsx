import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
    }, section);

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

  const cardClassName =
    'w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14] will-change-transform origin-center block no-underline';

  const renderCard = (item, i) => {
    const media = (
      <>
        <img
          src={item.src}
          alt={item.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 pointer-events-none" />
      </>
    );

    const refCb = (el) => {
      cardRefs.current[i] = el;
    };

    if (!item.link) {
      return (
        <div key={`${item.alt}-${i}`} ref={refCb} className={cardClassName}>
          {media}
        </div>
      );
    }

    if (item.link.startsWith('http')) {
      return (
        <a
          key={`${item.alt}-${i}`}
          ref={refCb}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.alt}
          className={cardClassName}
        >
          {media}
        </a>
      );
    }

    return (
      <Link
        key={`${item.alt}-${i}`}
        ref={refCb}
        to={item.link}
        aria-label={item.alt}
        className={cardClassName}
      >
        {media}
      </Link>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full bg-white overflow-x-hidden pt-6 pb-12 sm:pt-8 sm:pb-16 md:py-24 lg:py-28"
    >
      {/* Mobile: Right-left-concept — left / right */}
      <h2
        className="md:hidden select-none flex flex-col w-full px-6 mb-8"
        style={{
          fontFamily: 'Switzer, sans-serif',
          fontWeight: 500,
          fontSize: 'clamp(42px, 12vw, 72px)',
          lineHeight: '1.05',
          letterSpacing: 'clamp(-1.5px, -0.4vw, -3.4px)',
          color: '#00060B',
        }}
      >
        <span className="block w-full text-left whitespace-nowrap">
          {titleLine1}
        </span>
        <span className="block w-full text-right whitespace-nowrap">
          {titleLine2}
        </span>
      </h2>

      {/* Desktop: existing staggered layout */}
      <div className="hidden md:block">
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
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 justify-items-center">
          {images.map((item, i) => renderCard(item, i))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;

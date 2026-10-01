import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createImageMorph } from '../lib/imageMorph';
import LazyImg from './LazyImg';
import { HERO_IMG_SRC as heroCardImg } from '../lib/heroImage';
import saucedImg from '../assets/sauced.webp';
import jerseyImg from '../assets/jersey.jpg';
import jersey2Img from '../assets/jersey2.webp';

gsap.registerPlugin(ScrollTrigger);

const WorkGrid = ({ heroImageRef }) => {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card1ImageRef = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const [morphComplete, setMorphComplete] = useState(false);

  useEffect(() => {
    if (!heroImageRef?.current || !card1Ref.current || !sectionRef.current) return;

    return createImageMorph({
      heroImg: heroImageRef.current,
      targetEl: card1Ref.current,
      triggerEl: sectionRef.current,
      cloneClass: 'workgrid-morph-clone',
      src: heroCardImg,
      alt: 'Vantage Project',
      start: 'top 90%',
      end: 'top 10%',
      scrub: 0.3,
      startRadius: 16,
      endRadius: 32,
      onCompleteChange: setMorphComplete,
    });
  }, [heroImageRef]);

  // Scroll scrub animation: Images scale from small to large on scroll (same as ProjectsGrid)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
      cards.forEach((card) => {
        if (!card) return;

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

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work-grid"
      data-snap-section
      className="relative z-20 pt-16 pb-8 px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto"

    >
      {/* 2x2 Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 justify-items-center">

        {/* Card 1 (Top Left) - Vantage - Blank initially, image lands here on scroll */}
        <a
          ref={card1Ref}
          href="https://vantage-contractors.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14] will-change-transform origin-center block no-underline"
        >
          {/* This image shows ONLY when morph is complete */}
          <img
            ref={card1ImageRef}
            src={heroCardImg}
            alt="Vantage Project"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ opacity: morphComplete ? 1 : 0 }}
          />
        </a>

        {/* Card 2 (Top Right) - Sauced */}
        <a
          ref={card2Ref}
          href="https://play.google.com/store/apps/details?id=com.sauced&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14] will-change-transform origin-center block no-underline"
        >
          <LazyImg
            src={saucedImg}
            alt="Sauced Project"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </a>

        {/* Card 3 (Bottom Left) - Jersey / Shareable vCard Platform */}
        <Link
          ref={card3Ref}
          to="/case-studies"
          className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14] will-change-transform origin-center block no-underline"
        >
          <LazyImg
            src={jerseyImg}
            alt="Shareable vCard Platform"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Card 4 (Bottom Right) - The Jersey Generator */}
        <a
          ref={card4Ref}
          href="https://thejerseygenerator.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14] will-change-transform origin-center block no-underline"
        >
          <LazyImg
            src={jersey2Img}
            alt="The Jersey Generator"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </a>

      </div>
    </section>
  );
};

export default WorkGrid;


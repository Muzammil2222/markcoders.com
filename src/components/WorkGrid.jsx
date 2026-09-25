import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createImageMorph } from '../lib/imageMorph';
import { DESKTOP_MOTION_QUERY } from '../lib/motion';
import heroCardImg from '../assets/vantage.webp';
import heroCardSmallImg from '../assets/optimized/vantage-800.webp';
import saucedImg from '../assets/optimized/sauced-1400.webp';
import saucedSmallImg from '../assets/optimized/sauced-800.webp';
import jerseyImg from '../assets/optimized/jersey-1400.webp';
import jerseySmallImg from '../assets/optimized/jersey-800.webp';
import jersey2Img from '../assets/optimized/jersey2-1400.webp';
import jersey2SmallImg from '../assets/optimized/jersey2-800.webp';

gsap.registerPlugin(ScrollTrigger);

const WorkGrid = ({ heroImageRef }) => {
  const navigate = useNavigate();
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
      startRadius: 16,
      endRadius: 32,
      onCompleteChange: setMorphComplete,
    });
  }, [heroImageRef]);

  // The first card is already animated by the hero handoff. Keep its target
  // stationary, and reserve the remaining card scrubs for desktop pointers.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION_QUERY, () => {
      const cards = [card2Ref.current, card3Ref.current, card4Ref.current];
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

    // Cards reserve their dimensions, so image decoding never needs to trigger
    // an expensive refresh of every scroll animation on the page.
    return () => mm.revert();
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
        <div
          ref={card1Ref}
          className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14] origin-center"
          onClick={() => window.open("https://vantage-contractors.com/", "_blank")}
        >
          {/* This image shows ONLY when morph is complete */}
          <img
            ref={card1ImageRef}
            src={heroCardImg}
            srcSet={`${heroCardSmallImg} 800w, ${heroCardImg} 1137w`}
            sizes="(max-width: 767px) 100vw, 50vw"
            alt="Vantage Project"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ opacity: morphComplete ? 1 : 0 }}
          />
        </div>

        {/* Card 2 (Top Right) - Sauced */}
        <div
          ref={card2Ref}
          className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14] origin-center"
          onClick={() => window.open("https://play.google.com/store/apps/details?id=com.sauced&pcampaignid=web_share", "_blank")}
        >
          <img
            src={saucedImg}
            srcSet={`${saucedSmallImg} 800w, ${saucedImg} 1400w`}
            sizes="(max-width: 767px) 100vw, 50vw"
            alt="Sauced Project"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Card 3 (Bottom Left) - Jersey / Shareable vCard Platform */}
        <div
          ref={card3Ref}
          className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14] origin-center"
          onClick={() => navigate("/case-studies")}
        >
          <img
            src={jerseyImg}
            srcSet={`${jerseySmallImg} 800w, ${jerseyImg} 1400w`}
            sizes="(max-width: 767px) 100vw, 50vw"
            alt="Shareable vCard Platform"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Card 4 (Bottom Right) - The Jersey Generator */}
        <div
          ref={card4Ref}
          className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14] origin-center"
          onClick={() => window.open("https://thejerseygenerator.com/", "_blank")}
        >
          <img
            src={jersey2Img}
            srcSet={`${jersey2SmallImg} 800w, ${jersey2Img} 1400w`}
            sizes="(max-width: 767px) 100vw, 50vw"
            alt="The Jersey Generator"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

      </div>
    </section>
  );
};

export default WorkGrid;

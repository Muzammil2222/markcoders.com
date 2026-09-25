import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createImageMorph } from '../lib/imageMorph';

import heroCardImg from '../assets/vantage.webp';
import saucedImg from '../assets/sauced.webp';
import savmontImg from '../assets/Savmont.webp';
import jerseyImg from '../assets/jersey2.webp';
import midasImg from '../assets/midas.webp';
import gardenImg from '../assets/gardeninminute.webp';
import checkMyRideImg from '../assets/checkmyride.webp';
import dogImg from '../assets/dog.webp';

gsap.registerPlugin(ScrollTrigger);

const ProjectsGrid = ({ previewImageRef }) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card1ImageRef = useRef(null);
  const cardRefs = useRef([]);
  const [, setMorphComplete] = useState(false);

  useEffect(() => {
    if (!previewImageRef?.current || !card1Ref.current || !sectionRef.current) return;

    return createImageMorph({
      heroImg: previewImageRef.current,
      targetEl: card1Ref.current,
      triggerEl: sectionRef.current,
      cloneClass: 'projects-morph-clone',
      src: heroCardImg,
      alt: 'Vantage Project',
      start: 'top 90%',
      end: 'top 10%',
      startRadius: 15,
      endRadius: 32,
      onCompleteChange: setMorphComplete,
    });
  }, [previewImageRef]);

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

    const images = section.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', onLoad, { once: true });
    });

    requestAnimationFrame(refresh);
    const refreshTimers = [150, 600, 1200].map((ms) =>
      window.setTimeout(refresh, ms)
    );

    return () => {
      refreshTimers.forEach((id) => window.clearTimeout(id));
      images.forEach((img) => img.removeEventListener('load', onLoad));
      ctx.revert();
    };
  }, []);

  const setCardRef = (el, index) => {
    cardRefs.current[index] = el;
    if (index === 0) {
      card1Ref.current = el;
    }
  };

  const imagesList = [
    { src: heroCardImg, alt: "Vantage", link: "https://vantage-contractors.com/" },
    { src: saucedImg, alt: "Sauced", link: "https://play.google.com/store/apps/details?id=com.sauced&pcampaignid=web_share" },
    { src: savmontImg, alt: "Savmont", link: "https://strive-d595ee.webflow.io/" },
    { src: jerseyImg, alt: "TIG The Jersey Generator", link: "https://thejerseygenerator.com/" },
    { src: midasImg, alt: "Midas", link: "/case-studies" },
    { src: gardenImg, alt: "Garden In Minutes", link: "https://gardeninminutes.com/" },
    { src: checkMyRideImg, alt: "Check My Ride", link: "/case-studies" },
    { src: dogImg, alt: "Dog App", link: "/case-studies" },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects-grid"
      className="relative z-20 py-16 px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 justify-items-center">
        {imagesList.map((item, i) => (
          <div
            key={i}
            ref={(el) => setCardRef(el, i)}
            className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14] will-change-transform origin-center"
            onClick={() => {
              if (item.link) {
                if (item.link.startsWith('http')) {
                  window.open(item.link, '_blank');
                } else {
                  navigate(item.link);
                }
              }
            }}
          >
            <img
              ref={i === 0 ? card1ImageRef : null}
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-50 relative will-change-transform opacity-100 origin-center"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;

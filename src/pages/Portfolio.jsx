import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SplashCursor from '../components/SplashCursor';
import Footer from '../components/Footer';
import TrustSection from '../components/TrustSection';
import WorkAndPlaySection from '../components/WorkAndPlaySection';
import TeamSection from '../components/TeamSection.jsx';
import PageHero from '../components/landing/PageHero';
import canvasBg from '../assets/canvasbg.gif';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FEATURED_PROJECT } from '../data/projects';
import cardImage from '../assets/vantage.webp';

import img1 from '../assets/Portfolio/Cozy101-DOKmVxsg.webp';
import img2 from '../assets/Portfolio/Sauced-2rG--Umz.webp';
import img3 from '../assets/Portfolio/WebApp-DOdx66z1.webp';
import img4 from '../assets/Portfolio/alextarnava-DvmfbhVB.webp';
import img5 from '../assets/Portfolio/checkmyride-CSxqntTt.webp';
import img6 from '../assets/Portfolio/eko-DF8SVeeE.webp';
import img7 from '../assets/Portfolio/farkle-C0Whz4yg.webp';
import img8 from '../assets/Portfolio/floral-BTOLSOmw.webp';
import img9 from '../assets/Portfolio/gardeninminutes-D0oKrHHj.webp';
import img10 from '../assets/Portfolio/iona-CHcv-X3p.webp';
import img11 from '../assets/Portfolio/lengo-CS8-VsFT.webp';
import img12 from '../assets/Portfolio/monasticmail-P9g6LemY.webp';
import img13 from '../assets/Portfolio/olaads-DROMA7a-.webp';
import img14 from '../assets/Portfolio/thejerseydesigner-CfKkuuzt.webp';
import img15 from '../assets/Portfolio/vantage-CmEHyY-D.webp';
import img16 from '../assets/Portfolio/wordsmith-DpXww4zo.webp';

gsap.registerPlugin(ScrollTrigger);

const WORK_TYPES = ['Everything', 'App Development', 'Website Development', 'CMS Development', 'UI/UX Design', 'Graphic Design'];
const DOMAINS = ['Anything', 'Advertising Technology', 'Food & Community', 'eCommerce', 'Personal Brands', 'Logistics Technology', 'Home & Garden', 'Sports & Apparel', 'Construction', 'Skincare'];

const imagesList = [
  { src: img1, title: "Cozy101", type: "Website Development", domain: "eCommerce" },
  { src: img2, title: "Sauced", type: "App Development", domain: "Food & Community" },
  { src: img3, title: "WebApp", type: "CMS Development", domain: "Anything" },
  { src: img4, title: "Alex Tarnava", type: "Website Development", domain: "Personal Brands" },
  { src: img5, title: "Check My Ride", type: "App Development", domain: "Anything" },
  { src: img6, title: "Eko", type: "UI/UX Design", domain: "Advertising Technology" },
  { src: img7, title: "Farkle", type: "App Development", domain: "Sports & Apparel" },
  { src: img8, title: "Floral", type: "Website Development", domain: "Home & Garden" },
  { src: img9, title: "Garden In Minutes", type: "Website Development", domain: "Home & Garden" },
  { src: img10, title: "Iona", type: "Graphic Design", domain: "Skincare" },
  { src: img11, title: "Lengo", type: "App Development", domain: "Anything" },
  { src: img12, title: "Monastic Mail", type: "CMS Development", domain: "Logistics Technology" },
  { src: img13, title: "Olaads", type: "Website Development", domain: "Advertising Technology" },
  { src: img14, title: "The Jersey Designer", type: "Website Development", domain: "Sports & Apparel" },
  { src: img15, title: "Vantage", type: "Website Development", domain: "Construction" },
  { src: img16, title: "Wordsmith", type: "CMS Development", domain: "Personal Brands" },
];

const OurWorkCard = ({ tagline, image, title }) => (
  <div
    className="w-full max-w-[430.82px] h-[216.86px] rounded-[15px] p-[10px] relative overflow-hidden group cursor-pointer flex flex-row items-stretch"
    style={{
      width: '430.82px',
      maxWidth: '100%',
      height: '216.86px',
      background: '#00060B',
      border: '1px solid #FFFFFF66',
      borderRadius: '15px',
      backdropFilter: 'blur(20px)',
      opacity: 1,
    }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      style={{
        background:
          'linear-gradient(135deg, transparent 30%, rgba(26, 122, 248, 0.05) 50%, transparent 70%)',
      }}
    />

    <div className="flex flex-col justify-between flex-1 relative z-10 pl-3 pr-2 py-1.5 h-full">
      <div className="flex flex-col">
        <span
          className="text-white select-none"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '26px',
            letterSpacing: '-1px',
            verticalAlign: 'middle',
          }}
        >
          Our work
        </span>
        <h3
          className="mt-2.5 select-none text-left"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '26px',
            letterSpacing: '-1px',
            verticalAlign: 'middle',
            color: '#FFFFFF66',
          }}
        >
          {tagline}
        </h3>
      </div>

      <div className="flex justify-start mt-auto">
        <div
          className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center transition-all duration-300 group-hover:scale-105"
          style={{
            background: '#1399e8',
            boxShadow: '0 2px 10px rgba(19, 153, 232, 0.3)',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path
              d="M4 12L12 4M12 4H5.33M12 4V10.67"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>

    <div
      className="relative flex-shrink-0 z-30 overflow-hidden"
      style={{
        width: '162.16px',
        height: '197.3px',
        borderRadius: '15px',
      }}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-50 will-change-transform opacity-100 origin-center"
        style={{
          width: '162.16px',
          height: '197.3px',
          borderRadius: '15px',
          opacity: 1,
        }}
        draggable={false}
      />
    </div>
  </div>
);

const Dropdown = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer group px-2 py-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-400 text-[15px]">{label}:</span>
        <span className="text-white text-[15px] font-medium transition-colors">{selected}</span>
        <svg className={`w-3.5 h-3.5 text-gray-400 ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-4 w-[280px] bg-[#1E1E1E] border border-white/10 rounded-[18px] overflow-hidden z-50 shadow-2xl py-2">
          {options.map((opt) => (
            <div
              key={opt}
              className="px-5 py-3.5 cursor-pointer hover:bg-white/5 flex items-center justify-between"
              onClick={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
            >
              <span className={`text-[15px] ${selected === opt ? 'text-white font-semibold' : 'text-gray-300'}`}>
                {opt}
              </span>
              {selected === opt && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#25a9e0]" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PortfolioCard = ({ item, index, setCardRef }) => {
  const cardRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const stopEvent = (e) => {
    e.stopPropagation();
    if (e.nativeEvent && e.nativeEvent.stopPropagation) {
      e.nativeEvent.stopPropagation();
    }
  };

  const handleMouseMove = (e) => {
    stopEvent(e);
    if (!cardRef.current || !cursorRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(cursorRef.current, {
      x: x - 45,
      y: y - 45,
      duration: 0.15,
      ease: 'power2.out',
    });
  };

  return (
    <div
      className="w-full max-w-[661.02px] flex flex-col gap-5 group cursor-pointer"
      ref={(el) => setCardRef(el, index)}
    >
      <div
        ref={cardRef}
        className="w-full h-[400px] sm:h-[513px] rounded-[32px] relative overflow-hidden bg-[#0A0D14] cursor-none"
        onMouseEnter={(e) => { setIsHovering(true); stopEvent(e); }}
        onMouseLeave={(e) => { setIsHovering(false); stopEvent(e); }}
        onMouseMove={handleMouseMove}
        onMouseDown={stopEvent}
        onMouseUp={stopEvent}
        onClick={stopEvent}
      >
        <img
          src={item.src}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Custom Cursor */}
        <div
          ref={cursorRef}
          className={`absolute top-0 left-0 w-[90px] h-[90px] rounded-full bg-[#25a9e0] flex flex-col items-center justify-center pointer-events-none z-20 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          style={{
            boxShadow: '0 4px 20px rgba(37, 169, 224, 0.4)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
          <span className="text-white text-[13px] font-semibold leading-none">Visit</span>
        </div>

        {/* Subtle Dark Overlay on Hover */}
        <div className={`absolute inset-0 bg-black/10 transition-opacity duration-500 pointer-events-none ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Title & Category Below the Image */}
      <div className="flex items-center justify-between px-2">
        <h3 className="text-white text-[22px] font-bold tracking-tight">{item.title}</h3>
        <span className="text-gray-400 text-[15px] font-medium">{item.type}</span>
      </div>
    </div>
  );
};

function Portfolio() {
  const [filterDomain, setFilterDomain] = useState('Anything');
  const [filterType, setFilterType] = useState('Everything');
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const featured = FEATURED_PROJECT;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      const cards = cardRefs.current.filter(Boolean);
      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 40, force3D: true });

        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

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
  }, [filterType, filterDomain]);

  const filteredImages = imagesList.filter(item => {
    const matchType = filterType === 'Everything' || item.type === filterType;
    const strictDomainMatch = filterDomain === 'Anything' || item.domain === filterDomain;
    return matchType && strictDomainMatch;
  });

  const setCardRef = (el, index) => {
    cardRefs.current[index] = el;
  };

  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={12}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#005ef7"
      />
      <Navbar />
      <main>
        {/* Banner Section with PageHero */}
        <section className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-12 px-6 md:px-10 lg:px-16 overflow-visible z-10">
          <img
            src={canvasBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 opacity-80"
            style={{ filter: 'brightness(0.9) contrast(1.1)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'linear-gradient(rgb(0, 6, 11) 0%, rgb(0 0 0 / 89%) 25%, rgba(0, 6, 11, 0.3) 50%, rgba(0, 6, 11, 0.8) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle at 50% 35%, rgba(26, 122, 248, 0.15) 0%, transparent 65%)',
            }}
          />

          <div className="relative z-10 w-full flex-1 flex flex-col">
            <PageHero
              title="Portfolio"
              subtitle="We've successfully delivered a wide range of projects, helping brands grow and thrive."
              layout="split"
              spread
              showDot
              titleSize="clamp(50px, 13vw, 190px)"
              className="flex-1"
              titleClassName="!tracking-[-1.4px] my-auto leading-[1.1] whitespace-nowrap"
              subtitleClassName="text-[24px] sm:text-[28px] lg:!text-[35px] leading-[1.2] font-[500] tracking-[-1px] text-white/90"
              subtitleContainerClassName="max-w-xl lg:max-w-2xl"
              subtitleStyle={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 500,
                letterSpacing: '-1px',
                verticalAlign: 'middle',
              }}
            >
              <OurWorkCard
                tagline={featured.tagline}
                image={cardImage}
                title={featured.title}
              />
            </PageHero>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
            style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(3,7,18,1) 100%)' }}
          />
        </section>

        {/* Header & Grid Section */}
        <section
          ref={sectionRef}
          id="portfolio-grid"
          className="relative z-20 pb-16 w-[95%] lg:w-[92%] max-w-[1400px] mx-auto flex flex-col items-center"
        >
          <div className="relative w-full flex flex-col items-center justify-center mb-10 mt-6">
            {/* Custom Dropdown Filters */}
            <div className="flex items-center gap-4 bg-[#141414] border border-white/10 rounded-full px-6 py-2.5 z-10 relative">
              <Dropdown
                label="Type of Work"
                options={WORK_TYPES}
                selected={filterType}
                onSelect={setFilterType}
              />
              <div className="w-[1px] h-4 bg-white/10 mx-2"></div>
              <Dropdown
                label="Domain"
                options={DOMAINS}
                selected={filterDomain}
                onSelect={setFilterDomain}
              />
            </div>
          </div>

          {filteredImages.length === 0 && (
            <div className="text-gray-400 text-xl font-medium mt-10 min-h-[30vh]">No projects found for the selected filters.</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 justify-items-center w-full">
            {filteredImages.map((item, i) => (
              <PortfolioCard key={`${item.title}-${i}`} item={item} index={i} setCardRef={setCardRef} />
            ))}
          </div>
        </section>

        <TeamSection roundedTop={true} />
        <WorkAndPlaySection />
        <TrustSection />
        <Footer />
      </main>
    </div>
  );
}

export default Portfolio;

import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSectionBgTransition } from '../lib/sectionBgTransition';
import imgUiux from '../assets/whatwedo/uiux.png';
import imgCms from '../assets/whatwedo/cms.png';
import imgApp from '../assets/whatwedo/app.png';
import imgApi from '../assets/whatwedo/api.png';
import LazyImg from './LazyImg';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_IMG = { w: 320, h: 220, fit: 'cover', bg: 'transparent' };

const services = [
  { num: '01', title: 'UI/UX Design', color: '#E84E3A', img: imgUiux, to: '/services/ui-ux' },
  { num: '02', title: 'CMS Development', color: '#6C5CE7', img: imgCms, to: '/services/cms-development' },
  {
    num: '03',
    title: 'App Development',
    color: '#00B894',
    img: imgApp,
    to: '/services/app-development',
    // Tall phone mockup — portrait frame + contain so the device isn’t cropped
    imgStyle: { w: 180, h: 340, fit: 'contain', bg: '#0a0a0a' },
  },
  { num: '04', title: 'API Integration And Automation', color: '#FDCB6E', img: imgApi, to: '/services/api-integration' },
];

const getImgStyle = (service) => ({ ...DEFAULT_IMG, ...service.imgStyle });

const WhatWeDo = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const listRef = useRef(null);
  const imageContainerRef = useRef(null);
  const rowRefs = useRef([]);
  const mouseX = useRef(0);
  const [activeIndex, setActiveIndex] = useState(null);

  // Dark → light background as this section enters from About
  useEffect(() => {
    return initSectionBgTransition(sectionRef.current, {
      from: '#030712',
      to: '#f5f5f0',
      start: 'top 95%',
      end: 'top 45%',
      scrub: 1.2,
      colorTargets: [
        { selector: '.wwd-heading', from: '#ffffff', to: '#111111' },
      ],
    });
  }, []);

  // Scroll-triggered entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.service-row');
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Track mouse X position and move image horizontally
  const handleMouseMove = useCallback((e) => {
    if (!listRef.current || !imageContainerRef.current || activeIndex === null) return;
    const rect = listRef.current.getBoundingClientRect();
    mouseX.current = e.clientX - rect.left;
    const { w } = getImgStyle(services[activeIndex]);

    gsap.to(imageContainerRef.current, {
      x: mouseX.current - w / 2,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, [activeIndex]);

  const positionImage = (index, mouseXPos) => {
    if (!imageContainerRef.current || !listRef.current || !rowRefs.current[index]) return;
    const { w, h } = getImgStyle(services[index]);
    const listRect = listRef.current.getBoundingClientRect();
    const rowRect = rowRefs.current[index].getBoundingClientRect();
    const rowCenterY = rowRect.top - listRect.top + rowRect.height / 2 - h / 2;

    if (mouseXPos != null) {
      gsap.set(imageContainerRef.current, { x: mouseXPos - w / 2 });
    }
    gsap.to(imageContainerRef.current, {
      y: rowCenterY,
      opacity: 1,
      scale: 1,
      duration: 0.45,
      ease: 'power3.out',
    });
  };

  const handleItemEnter = (index, e) => {
    setActiveIndex(index);
    if (listRef.current) {
      const listRect = listRef.current.getBoundingClientRect();
      positionImage(index, e.clientX - listRect.left);
    }
  };

  const handleItemHover = (index) => {
    setActiveIndex(index);
    positionImage(index);
  };

  const handleListLeave = () => {
    setActiveIndex(null);
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        opacity: 0,
        scale: 0.88,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      data-snap-section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: '#030712',
        borderRadius: '40px 40px 0 0',
        marginTop: '-20px',
        zIndex: 30,
      }}
    >
      <div className="py-20 md:py-32 w-full">
        {/* Section Heading */}
        <div ref={headingRef} className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 mb-16 md:mb-24 flex justify-center">
          <h2
            className="wwd-heading text-white leading-[1.05] tracking-tight"
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontSize: 'clamp(48px, 11vw, 190px)',
              fontWeight: 400,
            }}
          >
            <span className="block">What</span>
            <span className="block pl-16 md:pl-32 lg:pl-48">We Do.</span>
          </h2>
        </div>

        {/* Services List */}
        <div
          ref={listRef}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleListLeave}
        >
          {/* Floating image — follows mouse X, snaps to hovered row Y */}
          <div
            ref={imageContainerRef}
            className="hidden lg:block absolute pointer-events-none overflow-hidden rounded-[16px]"
            style={{
              top: 0,
              left: 0,
              width: activeIndex != null ? getImgStyle(services[activeIndex]).w : DEFAULT_IMG.w,
              height: activeIndex != null ? getImgStyle(services[activeIndex]).h : DEFAULT_IMG.h,
              background:
                activeIndex != null ? getImgStyle(services[activeIndex]).bg : DEFAULT_IMG.bg,
              opacity: 0,
              transform: 'scale(0.88)',
              zIndex: 20,
              willChange: 'transform, opacity',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
              transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease',
            }}
          >
            {services.map((service, i) => {
              const style = getImgStyle(service);
              return (
                <LazyImg
                  key={i}
                  src={service.img}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full rounded-[16px]"
                  style={{
                    objectFit: style.fit,
                    objectPosition: 'center',
                    opacity: activeIndex === i ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />
              );
            })}
          </div>

          {/* Service rows */}
          {services.map((service, index) => (
            <Link
              key={service.num}
              to={service.to}
              ref={(el) => (rowRefs.current[index] = el)}
              className="service-row relative overflow-hidden cursor-pointer block no-underline"
              onMouseEnter={(e) => handleItemEnter(index, e)}
              onMouseMove={() => handleItemHover(index)}
              style={{
                borderTop: index === 0 ? '1.5px solid rgba(0,0,0,0.1)' : 'none',
                borderBottom: '1.5px solid rgba(0,0,0,0.1)',
              }}
            >
              {/* Colored background that slides in on hover */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: service.color,
                  transform: activeIndex === index ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'center',
                  transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              />

              {/* Row content — w-fit keeps long titles (e.g. #04) as a centered cluster */}
              <div className="relative z-10 flex justify-center items-center py-7 md:py-9 px-4 md:px-8">
                <div className="flex items-center justify-center gap-3 md:gap-8 w-fit max-w-full min-w-0">
                  {/* Number */}
                  <span
                    className="shrink-0 self-center"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontSize: 'clamp(11px, 1.1vw, 31px)',
                      color: activeIndex === index ? 'rgba(255,255,255,0.7)' : '#999',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      transition: 'color 0.35s ease',
                    }}
                  >
                    ({service.num})
                  </span>

                  {/* Service title */}
                  <span
                    className="min-w-0 text-center"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontSize: 'clamp(22px, 4.5vw, 91px)',
                      fontWeight: activeIndex === index ? 600 : 400,
                      color: activeIndex === index ? '#fff' : '#1a1a1a',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.15,
                      maxWidth: 'min(18em, calc(100vw - 5.5rem))',
                      transition: 'font-weight 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.35s ease',
                    }}
                  >
                    {service.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;

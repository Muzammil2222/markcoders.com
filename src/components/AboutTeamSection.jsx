import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const baseMembers = [
  { name: "Saarang Ali", title: "Co-Founder & CEO", img: "https://i.pravatar.cc/300?img=12" },
  { name: "Syed Shamekh Hussain", title: "Co-Founder & COO", img: "https://i.pravatar.cc/300?img=13" },
  { name: "Bilal", title: "Co-Founder & CTO" }, // no photo
  { name: "Muzammil Ahmed", title: "Co-Founder & CAO", img: "https://i.pravatar.cc/300?img=15" },
  { name: "Affan Abdullah", title: "Director Of Sales", img: "https://i.pravatar.cc/300?img=33" },
  { name: "Aman Raza", title: "Creative Director", img: "https://i.pravatar.cc/300?img=52" },
  { name: "Ammar Sheikh", title: "Project Manager", img: "https://i.pravatar.cc/300?img=57" },
  { name: "Shahzaib Ali", title: "Senior Developer", img: "https://i.pravatar.cc/300?img=60" },
];

const displayMembers = baseMembers;

// Members with photos only — duplicated for the horizontal scroll scrub
const photoMembers = baseMembers.filter((m) => m.img);
const teamMembers = [...photoMembers, ...photoMembers, ...photoMembers, ...photoMembers, ...photoMembers, ...photoMembers];

const TeamSection = ({ roundedTop = false }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const rightSideRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {

      // 1. Heading Animation (Fade & Slide up on scroll scrub)
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

      // 2. Left Text Letter-by-Letter Scrub
      const chars = descRef.current?.querySelectorAll('.team-desc-char');
      if (chars && chars.length) {
        gsap.to(chars, {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 1.5,
          }
        });
      }

      // 3. Right Side Entrance (Comes from right)
      if (rightSideRef.current) {
        gsap.fromTo(rightSideRef.current,
          { x: 150, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: 'top 45%',
              scrub: 1.5,
            }
          }
        );
      }

      // 4. Horizontal Slider Scrub
      // It slides to the left as the user scrolls down through the section
      if (sliderRef.current && sliderRef.current.parentElement) {
        // Calculate the maximum scroll distance
        const scrollDistance = sliderRef.current.scrollWidth - sliderRef.current.parentElement.clientWidth;

        if (scrollDistance > 0) {
          gsap.to(sliderRef.current, {
            x: -scrollDistance,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 30%', // start moving when section is somewhat in view
              end: 'bottom top', // finish moving when section leaves viewport
              scrub: 1,
            }
          });
        }
      }

    }, section);

    return () => ctx.revert();
  }, []);

  const textPart = "As a distributed team across North America and Europe, we bring together diverse talent to design and build world-class digital experiences.";

  const renderAnimText = (text, className) => {
    const words = text.split(' ');
    return words.map((word, wIdx) => (
      <span key={wIdx}>
        <span className="inline-block whitespace-nowrap">
          {word.split('').map((char, cIdx) => (
            <span key={cIdx} className={`team-desc-char opacity-20 ${className}`}>{char}</span>
          ))}
        </span>
        {wIdx !== words.length - 1 && ' '}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full py-24 md:py-32 overflow-hidden ${roundedTop ? 'rounded-t-[40px] md:rounded-t-[80px]' : ''}`}
      style={{
        background: '#F5F5F5',
        zIndex: roundedTop ? 20 : 1,
      }}
    >
      <div className="w-full flex flex-col items-center">

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-[#111111] font-medium text-center mb-16 md:mb-24 will-change-transform px-6"
          style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(48px, 7vw, 91px)', letterSpacing: '-2px' }}
        >
          Team / Specialists
        </h2>

        {/* Content Grid - Full width, but left text respects 1400px container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">

          {/* Left Side: Description (Padding left calculates to match max-w-1400px) */}
          <div className="lg:col-span-5 flex flex-col pt-4 px-6 md:px-10 lg:pr-10" style={{ paddingLeft: 'max(1.5rem, calc((100vw - 1400px) / 2 + 1.5rem))' }}>
            <p
              ref={descRef}
              className="text-[18px] md:text-[28px] leading-[1.4] font-medium max-w-[400px] will-change-transform"
              style={{ fontFamily: 'Switzer, sans-serif' }}
            >
              {renderAnimText(textPart, "text-[#111111]")}
            </p>
          </div>

          {/* Right Side: Carousel and Names */}
          <div ref={rightSideRef} className="lg:col-span-7 flex flex-col will-change-transform pl-6 md:pl-10 lg:pl-12 w-full">

            {/* Top: Horizontal Images Slider (Bleeds to the right edge) */}
            <div className="w-full overflow-hidden">
              <div ref={sliderRef} className="flex gap-4 md:gap-6 w-max pr-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] will-change-transform">
                {teamMembers.map((member, i) => (
                  <div key={i} className="w-[140px] md:w-[180px] lg:w-[205px] h-[190px] md:h-[240px] lg:h-[282px] rounded-[15px] overflow-hidden shrink-0">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Vertical List of Names */}
            <div className="flex flex-col gap-6 mt-12 md:mt-16 w-full pr-6 md:pr-10 lg:pr-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))]">
              {displayMembers.map((member, i) => (
                <div key={`name-${i}`} className="flex flex-col">
                  <h3 className="text-[#111111] font-medium text-[22px] md:text-[40px]" style={{ fontFamily: 'Switzer, sans-serif' }}>
                    {member.name}
                  </h3>
                  <p className="text-[#888888] text-[16px] md:text-[26px] mt-1" style={{ fontFamily: 'Switzer, sans-serif' }}>
                    {member.title}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamSection;

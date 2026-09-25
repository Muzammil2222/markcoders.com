import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { createMarquee } from '../lib/marquee';
import { DESKTOP_MOTION_QUERY } from '../lib/motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import saarangBw from '../assets/optimized/headshot-bw-saarang.webp';
import shameekBw from '../assets/optimized/headshot-bw-shahmeek.webp';
import muzammilBw from '../assets/optimized/headshot-bw-muzammil.webp';
import affanBw from '../assets/optimized/headshot-bw-affan.webp';
import amanBw from '../assets/optimized/headshot-bw-aman.webp';
import ammarBw from '../assets/optimized/headshot-bw-ammar.webp';
import shahzaibBw from '../assets/optimized/headshot-bw-shahzaib.webp';
import hassnainBw from '../assets/optimized/headshot-bw-hassnain.webp';

import saarangColor from '../assets/optimized/headshot-color-saarang.webp';
import shameekColor from '../assets/optimized/headshot-color-shahmeek.webp';
import muzammilColor from '../assets/optimized/headshot-color-muzammil.webp';
import affanColor from '../assets/optimized/headshot-color-affan.webp';
import amanColor from '../assets/optimized/headshot-color-aman.webp';
import ammarColor from '../assets/optimized/headshot-color-ammar.webp';
import shahzaibColor from '../assets/optimized/headshot-color-shahzaib.webp';
import hassnainColor from '../assets/optimized/headshot-color-hassnain.webp';

gsap.registerPlugin(ScrollTrigger);

const baseMembers = [
  { name: "Saarang Ali", title: "Co-Founder & CEO", imgBw: saarangBw, imgColor: saarangColor },
  { name: "Syed Shamekh Hussain", title: "Co-Founder & COO", imgBw: shameekBw, imgColor: shameekColor },
  { name: "Bilal", title: "Co-Founder & CTO" }, // no photo
  { name: "Muzammil Ahmed", title: "Co-Founder & CAO", imgBw: muzammilBw, imgColor: muzammilColor },
  { name: "Affan Abdullah", title: "Director Of Sales", imgBw: affanBw, imgColor: affanColor },
  { name: "Aman Raza", title: "Creative Director", imgBw: amanBw, imgColor: amanColor },
  { name: "Ammar Sheikh", title: "Project Manager", imgBw: ammarBw, imgColor: ammarColor },
  { name: "Shahzaib Ali", title: "Senior Developer", imgBw: shahzaibBw, imgColor: shahzaibColor },
];

const displayMembers = baseMembers;

// Hassnain: photo only (no name/title in the list)
const photoOnly = [
  { name: "Hassnain", imgBw: hassnainBw, imgColor: hassnainColor },
];

const photoMembers = [...baseMembers.filter((m) => m.imgBw), ...photoOnly];

const PhotoCard = ({ member }) => (
  <div className="group relative w-[140px] md:w-[180px] lg:w-[205px] h-[190px] md:h-[240px] lg:h-[282px] rounded-[15px] overflow-hidden shrink-0">
    <img
      src={member.imgBw}
      alt={member.name}
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
      decoding="async"
      draggable={false}
    />
    <img
      src={member.imgColor}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  </div>
);

const TeamSection = ({ roundedTop = false }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const rightSideRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add({ desktop: DESKTOP_MOTION_QUERY, all: 'all' }, (context) => {
      if (!context.conditions.desktop) {
        gsap.set(descRef.current?.querySelectorAll('.team-desc-char'), { opacity: 1 });
        return;
      }
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
    }, section);

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    return createMarquee(trackRef.current, { duration: 45 });
  }, []);

  const textPart = "We are a multidisciplinary team of 35+ professionals across project management, UI/UX, web and software engineering, mobile development, QA, SEO and hosting - working together from Karachi to deliver reliable digital products for clients worldwide.";

  const renderAnimText = (text, className) => {
    const words = text.split(' ');
    return words.map((word, wIdx) => (
      <span key={wIdx}>
        <span className="inline-block whitespace-nowrap">
          <span className={`team-desc-char opacity-20 ${className}`}>{word}</span>
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

        <h2
          ref={headingRef}
          className="text-[#111111] font-medium text-center mb-16 md:mb-24 will-change-transform px-6"
          style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(48px, 7vw, 91px)', letterSpacing: '-2px' }}
        >
          Meet the Team Behind MarkCoders
        </h2>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">

          <div className="lg:col-span-5 flex flex-col pt-4 px-6 md:px-10 lg:pr-10" style={{ paddingLeft: 'max(1.5rem, calc((100vw - 1400px) / 2 + 1.5rem))' }}>
            <p
              ref={descRef}
              className="text-[18px] md:text-[28px] leading-[1.4] font-medium max-w-[400px] will-change-transform"
              style={{ fontFamily: 'Switzer, sans-serif' }}
            >
              {renderAnimText(textPart, "text-[#111111]")}
            </p>
          </div>

          <div ref={rightSideRef} className="lg:col-span-7 flex flex-col will-change-transform pl-6 md:pl-10 lg:pl-12 w-full">

            {/* Original horizontal strip — auto-scrolls (pauses on hover) */}
            <div className="w-full overflow-hidden">
              <div
                ref={trackRef}
                className="flex w-max"
              >
                <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
                  {photoMembers.map((member) => (
                    <PhotoCard key={`a-${member.name}`} member={member} />
                  ))}
                </div>
                <div className="flex gap-4 md:gap-6 pr-4 md:pr-6" aria-hidden="true">
                  {photoMembers.map((member) => (
                    <PhotoCard key={`b-${member.name}`} member={member} />
                  ))}
                </div>
              </div>
            </div>

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

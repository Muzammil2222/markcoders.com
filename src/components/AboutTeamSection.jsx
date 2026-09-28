import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import saarangBw from '../assets/B&W HEADSHOTS/SAARANG.jpg';
import shameekBw from '../assets/B&W HEADSHOTS/SHAHMEEK.jpg';
import muzammilBw from '../assets/B&W HEADSHOTS/MUZAMMIL.jpg';
import affanBw from '../assets/B&W HEADSHOTS/Affan.jpg';
import amanBw from '../assets/B&W HEADSHOTS/AMAN.jpg';
import ammarBw from '../assets/B&W HEADSHOTS/AMMAR.jpg';
import shahzaibBw from '../assets/B&W HEADSHOTS/SHAHZAIB.jpg';

import saarangColor from '../assets/COLORFUL HEADSHOTS/SAARANG.jpg';
import shameekColor from '../assets/COLORFUL HEADSHOTS/SHAHMEEK.jpg';
import muzammilColor from '../assets/COLORFUL HEADSHOTS/MUZAMMIL.jpg';
import affanColor from '../assets/COLORFUL HEADSHOTS/AFFAN.jpg';
import amanColor from '../assets/COLORFUL HEADSHOTS/AMAN.jpg';
import ammarColor from '../assets/COLORFUL HEADSHOTS/AMMAR.jpg';
import shahzaibColor from '../assets/COLORFUL HEADSHOTS/SHAHZAIB.jpg';

gsap.registerPlugin(ScrollTrigger); 

const baseMembers = [
  { name: "Saarang Ali", title: "Co-Founder & CEO", imgBw: saarangBw, imgColor: saarangColor, linkedin: 'https://www.linkedin.com/in/saarang-ali/' },
  { name: "Syed Shamekh Hussain", title: "Co-Founder & COO", imgBw: shameekBw, imgColor: shameekColor, linkedin: 'https://www.linkedin.com/in/syed-shamekh-hussain/' },
  { name: "Bilal Tunio", title: "Co-Founder & CTO" }, // no photo
  { name: "Muzammil Ahmed", title: "Co-Founder & CAO", imgBw: muzammilBw, imgColor: muzammilColor, linkedin: 'https://www.linkedin.com/in/muzammil-shk/' },
  { name: "Affan Abdullah", title: "Director Of Sales", imgBw: affanBw, imgColor: affanColor, linkedin: 'https://www.linkedin.com/in/affan-abdullah-97b7a029b/' },
  { name: "Aman Raza", title: "Creative Director", imgBw: amanBw, imgColor: amanColor, linkedin: 'https://www.linkedin.com/in/aman-raza-618a8723a/' },
  { name: "Ammar Sheikh", title: "Project Manager", imgBw: ammarBw, imgColor: ammarColor, linkedin: 'https://www.linkedin.com/in/ammar-shaikhhh/' },
  { name: "Shahzaib Ali", title: "Senior Developer", imgBw: shahzaibBw, imgColor: shahzaibColor, linkedin: 'https://www.linkedin.com/in/shahzaib-ali1/' },
];

const displayMembers = baseMembers;

const photoMembers = baseMembers.filter((m) => m.imgBw);

const PhotoCard = ({ member }) => {
  const cardClass =
    'group relative w-[140px] md:w-[180px] lg:w-[205px] h-[190px] md:h-[240px] lg:h-[282px] rounded-[15px] overflow-hidden shrink-0 block no-underline cursor-pointer';

  const content = (
    <>
      <img
        src={member.imgBw}
        alt={member.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        draggable={false}
      />
      <img
        src={member.imgColor}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
        <p
          className="text-white font-medium text-[13px] md:text-[15px] leading-tight"
          style={{ fontFamily: 'Switzer, sans-serif' }}
        >
          {member.name}
        </p>
        <p
          className="text-white/75 text-[11px] md:text-[13px] mt-0.5 leading-snug"
          style={{ fontFamily: 'Switzer, sans-serif' }}
        >
          {member.title}
        </p>
      </div>
    </>
  );

  if (member.linkedin) {
    return (
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${member.name} — ${member.title} on LinkedIn`}
        className={cardClass}
      >
        {content}
      </a>
    );
  }

  return <div className={cardClass}>{content}</div>;
};

const TeamSection = ({ roundedTop = false }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const rightSideRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, []);

  // Auto-marquee (same pattern as WhyChooseUs) — not page-scroll scrub
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let rafId = 0;
    let hoverPaused = false;

    // scrollWidth forces layout, so measure once rather than every frame.
    let half = 0;
    let speed = 0.6;
    const measure = () => {
      half = track.scrollWidth / 2;
      speed = half > 0 ? half / (45 * 60) : 0.6;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const wrap = (val) => {
      if (!half) return val;
      while (val <= -half) val += half;
      while (val > 0) val -= half;
      return val;
    };

    // Don't animate a marquee nobody can see.
    let onScreen = true;
    const tick = () => {
      rafId = 0;
      if (!onScreen) return;
      if (!hoverPaused) {
        x = wrap(x - speed);
        gsap.set(track, { x });
      }
      rafId = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!rafId && onScreen) rafId = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        start();
      },
      { rootMargin: '120px' }
    );
    io.observe(track);
    start();

    const onEnter = () => { hoverPaused = true; };
    const onLeave = () => { hoverPaused = false; };

    track.addEventListener('pointerenter', onEnter);
    track.addEventListener('pointerleave', onLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      track.removeEventListener('pointerenter', onEnter);
      track.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const textPart = "We are a multidisciplinary team of 35+ professionals across project management, UI/UX, web and software engineering, mobile development, QA, SEO and hosting - working together from Karachi to deliver reliable digital products for clients worldwide.";

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
                className="flex w-max will-change-transform"
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

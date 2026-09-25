import { useRef, useEffect } from 'react';
import gsap from 'gsap';
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

const avatars = [
  { bw: saarangBw, color: saarangColor, name: 'Saarang Ali' },
  { bw: shameekBw, color: shameekColor, name: 'Syed Shamekh Hussain' },
  { bw: muzammilBw, color: muzammilColor, name: 'Muzammil Ahmed' },
  { bw: affanBw, color: affanColor, name: 'Affan Abdullah' },
  { bw: amanBw, color: amanColor, name: 'Aman Raza' },
  { bw: ammarBw, color: ammarColor, name: 'Ammar Sheikh' },
  { bw: shahzaibBw, color: shahzaibColor, name: 'Shahzaib Ali' },
  { bw: hassnainBw, color: hassnainColor, name: 'Hassnain' },
];

const TeamSection = ({ roundedTop = false }) => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const avatarsRef = useRef([]);
  const counter1Ref = useRef(null);
  const counter2Ref = useRef(null);
  const counter3Ref = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION_QUERY, () => {
      const headings = root.querySelectorAll('.team-heading');
      const avatarsTrigger = root.querySelector('.avatars-container');
      const desc = root.querySelector('.team-desc');

      // 1. Scroll reveal animation for the heading
      if (headings.length) {
        gsap.fromTo(
          headings,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headings[0],
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Staggered 3D reveal for avatars
      gsap.fromTo(
        avatarsRef.current.filter(Boolean),
        { opacity: 0, scale: 0.5, rotationY: 90 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: avatarsTrigger || root,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3. Description text fade up
      if (desc) {
        gsap.fromTo(
          desc,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: desc,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 4. Stats card fade up
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 80, opacity: 0, rotationX: 15 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 5. Counters animation
      const animateCounter = (ref, target, prefix = "", suffix = "", padZero = false) => {
        if (!ref.current) return;
        let obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current || root,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
             if (!ref.current) return;
             let currentVal = Math.floor(obj.val);
             let displayVal = currentVal.toString();
             if(padZero && currentVal < 10) {
               displayVal = "0" + currentVal;
             }
             const nextText = `${prefix}${displayVal}${suffix}`;
             if (ref.current.textContent !== nextText) ref.current.textContent = nextText;
          }
        });
      };
      
      animateCounter(counter1Ref, 35);
      animateCounter(counter2Ref, 6, "", "", true); // pass true for padding zero
      animateCounter(counter3Ref, 5, "", "+");

    }, root);

    return () => mm.revert();
  }, []);

  // 3D Hover effect for the card
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || !window.matchMedia(DESKTOP_MOTION_QUERY).matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8; // Max rotation 8deg
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      overwrite: 'auto',
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card || !window.matchMedia(DESKTOP_MOTION_QUERY).matches) return;

    gsap.to(card, {
      overwrite: 'auto',
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)', // Nice springy return
    });
  };

  return (
    <section
      ref={sectionRef}
      data-snap-section
      className={`relative w-full py-24 md:py-32 ${roundedTop ? 'rounded-t-[40px] md:rounded-t-[80px]' : ''}`}
      style={{
        background: '#f5f5f5', // Matches previous section perfectly
        zIndex: roundedTop ? 20 : 1, // ensure it overlaps nicely if needed
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">

        {/* Heading */}
        <div className="flex flex-col mb-20 md:mb-32 max-w-[800px] mx-auto">
          <h2
            className="team-heading font-medium tracking-[-0.04em] leading-[1.1] text-[#111]"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(48px, 7vw, 84px)' }}
          >
            An Ambitious Team
          </h2>
          <h2
            className="team-heading font-medium tracking-[-0.04em] leading-[1.1] text-[#111] self-end md:pr-12 mt-2 md:mt-4"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(48px, 7vw, 84px)' }}
          >
            for Your Vision.
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">

          {/* Left Side: Avatars and Text */}
          <div className="md:col-span-5 flex flex-col pt-4">

            {/* Avatars Grid */}
            <div className="avatars-container flex flex-wrap gap-2 md:gap-[10px] max-w-[380px] mb-20">
              {avatars.map((avatar, i) => (
                <div
                  key={avatar.name}
                  ref={el => avatarsRef.current[i] = el}
                  className="group relative w-[52px] h-[52px] rounded-[10px] overflow-hidden shadow-sm"
                >
                  <img
                    src={avatar.bw}
                    alt={avatar.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <img
                    src={avatar.color}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              ))}
              {/* +25 Box */}
              <div
                ref={el => avatarsRef.current[8] = el}
                className="w-[52px] h-[52px] rounded-[10px] bg-[#23b3e8] text-white flex items-center justify-center font-bold text-[15px] shadow-sm hover:scale-105 transition-transform cursor-pointer"
              >
                +25
              </div>
            </div>

            {/* Description Text */}
            <p className="team-desc text-[#222] text-[15px] md:text-[28px] leading-[1.5] font-medium tracking-[-0.01em] max-w-[440px]">
              Our team of designers, strategists, and analysts works together to create digital experiences that deliver measurable results.
            </p>
          </div>

          {/* Right Side: Stats Card */}
          <div className="md:col-span-7 flex justify-end">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.05)] w-full max-w-[600px] p-8 md:p-8"
              style={{ transformStyle: 'preserve-3d' }}
            >

              {/* Stat Row 1 */}
              <div className="flex items-center justify-between pt-12 pb-5 ">
                <span className="text-[#111] text-[16px] md:text-[30px] font-medium tracking-tight">Team Members</span>
                <span ref={counter1Ref} className="text-[#23b3e8] text-[24px] md:text-[35px] font-medium min-w-[50px] text-right">35</span>
              </div>
              <div className="w-full h-[1px] bg-[#808385]"></div>

              {/* Stat Row 2 */}
              <div className="flex items-center justify-between pt-12 pb-5">
                <span className="text-[#111] text-[16px] md:text-[30px] font-medium tracking-tight">Core Disciplines</span>
                <span ref={counter2Ref} className="text-[#23b3e8] text-[24px] md:text-[35px] font-medium min-w-[50px] text-right">06</span>
              </div>
              <div className="w-full h-[1px] bg-[#808385]"></div>

              {/* Stat Row 3 */}
              <div className="flex items-center justify-between pt-12 pb-5">
                <span className="text-[#111] text-[16px] md:text-[30px] font-medium tracking-tight">Combined years of experience</span>
                <span ref={counter3Ref} className="text-[#23b3e8] text-[24px] md:text-[35px] font-medium min-w-[50px] text-right">5+</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamSection;

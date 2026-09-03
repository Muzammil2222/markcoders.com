import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import teamImg from '../assets/team.webp';

gsap.registerPlugin(ScrollTrigger);

const AboutStory = ({ previewImageRef }) => {
  const sectionRef = useRef(null);
  const targetImageContainerRef = useRef(null);
  const targetImageRef = useRef(null);
  const cloneRef = useRef(null);
  const paragraphRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  const [morphComplete, setMorphComplete] = useState(false);

  useEffect(() => {
    if (!previewImageRef?.current || !targetImageContainerRef.current) return;

    const heroImg = previewImageRef.current;
    const targetContainer = targetImageContainerRef.current;

    document.querySelectorAll('.about-morph-clone').forEach((el) => el.remove());

    const timer = setTimeout(() => {
      const clone = document.createElement('img');
      clone.src = teamImg;
      clone.alt = 'Team';
      clone.className = 'about-morph-clone';
      clone.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        border-radius: 15px;
        object-fit: cover;
        will-change: transform, width, height, top, left;
        transition: none;
      `;
      document.body.appendChild(clone);
      cloneRef.current = clone;

      const positionClone = () => {
        const r = heroImg.getBoundingClientRect();
        clone.style.top = r.top + 'px';
        clone.style.left = r.left + 'px';
        clone.style.width = r.width + 'px';
        clone.style.height = r.height + 'px';
      };
      positionClone();

      gsap.set(clone, { opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 95%',
        end: 'top 20%',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;

          const heroRect = heroImg.getBoundingClientRect();
          const targetRect = targetContainer.getBoundingClientRect();

          const startTop = heroRect.top;
          const startLeft = heroRect.left;
          const startWidth = heroRect.width;
          const startHeight = heroRect.height;

          const endTop = targetRect.top;
          const endLeft = targetRect.left;
          const endWidth = targetRect.width;
          const endHeight = targetRect.height;

          const currentTop = startTop + (endTop - startTop) * progress;
          const currentLeft = startLeft + (endLeft - startLeft) * progress;
          const currentWidth = startWidth + (endWidth - startWidth) * progress;
          const currentHeight = startHeight + (endHeight - startHeight) * progress;
          const currentRadius = 15 + (20 - 15) * progress;

          clone.style.top = currentTop + 'px';
          clone.style.left = currentLeft + 'px';
          clone.style.width = currentWidth + 'px';
          clone.style.height = currentHeight + 'px';
          clone.style.borderRadius = currentRadius + 'px';

          if (progress > 0.02) {
            clone.style.opacity = '1';
            heroImg.style.opacity = '0';
          } else {
            clone.style.opacity = '0';
            heroImg.style.opacity = '1';
          }

          if (progress > 0.95) {
            setMorphComplete(true);
            clone.style.opacity = '0';
          } else {
            setMorphComplete(false);
          }
        },
      });

      return () => {
        st.kill();
        clone.remove();
      };
    }, 300);

    return () => {
      clearTimeout(timer);
      if (cloneRef.current) {
        cloneRef.current.remove();
      }
    };
  }, [previewImageRef]);

  // Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Reveal Animation for the paragraph
      const chars = paragraphRef.current?.querySelectorAll('.about-story-char');
      if (chars && chars.length) {
        gsap.to(chars, {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 1,
          }
        });
      }

      // 2. Heading Entrance
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 95%',
              end: 'bottom 75%',
              scrub: 1.5,
            }
          }
        );
      }

      // 3. Stats Entrance
      if (statsRef.current) {
        const rows = statsRef.current.querySelectorAll('.stat-row');
        gsap.fromTo(rows,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: 'none',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 95%',
              end: 'center 65%',
              scrub: 1.5,
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const textPart1 = "MarkCoders was founded out of a passion for creativity and innovation in the digital space.";
  const textPart2 = "This dynamic agency specializes in SEO, digital marketing, video production, and branding, seamlessly merging artistic vision with strategic insight.";

  const renderAnimText = (text, className) => {
    const words = text.split(' ');
    return words.map((word, wIdx) => (
      <span key={wIdx}>
        <span className="inline-block whitespace-nowrap">
          {word.split('').map((char, cIdx) => (
            <span key={cIdx} className={`about-story-char opacity-30 ${className}`}>{char}</span>
          ))}
        </span>
        {wIdx !== words.length - 1 && ' '}
      </span>
    ));
  };

  return (
    <section ref={sectionRef} className="relative z-20 py-16 px-6 md:px-10 lg:px-16 w-full mt-12 mb-20 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto w-full">

        {/* Heading Alone at the top */}
        <h2
          ref={headingRef}
          className="font-medium will-change-transform text-white mb-16 md:mb-24"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontSize: 'clamp(42px, 6vw, 91px)',
            lineHeight: '1.13',
            letterSpacing: 'clamp(-1.5px, -0.3vw, -3.4px)'
          }}
        >
          <span className="block pl-30">Where we started</span>
          <span className="block">and our story</span>
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

          {/* Left Column */}
          <div className="flex flex-col">
            <p
              ref={paragraphRef}
              className="max-w-[507px] font-medium text-left"
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontSize: 'clamp(18px, 2.5vw, 26px)',
                lineHeight: 'clamp(28px, 3vw, 36px)',
                letterSpacing: '-1px'
              }}
            >
              {renderAnimText(textPart1, "text-white")}
              {' '}
              {renderAnimText(textPart2, "text-[#888888]")}
            </p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-12">
            {/* Target Image Container */}
            <div
              ref={targetImageContainerRef}
              className="w-full aspect-[16/10] rounded-[20px] overflow-hidden relative bg-[#0A0D14]"
            >
              <img
                ref={targetImageRef}
                src={teamImg}
                alt="Team"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: morphComplete ? 1 : 0 }}
              />
            </div>

            {/* Stats List */}
            <div ref={statsRef} className="flex flex-col mt-4">

              <div className="stat-row flex flex-col md:flex-row md:items-start gap-6 md:gap-10 py-8 border-b border-[#F5F5F5] will-change-transform">
                <h4
                  className="w-[170px] shrink-0 font-medium text-white"
                  style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(22px, 2.5vw, 30px)', letterSpacing: '-1.4px' }}
                >
                  The Scale
                </h4>
                <p
                  className="text-white/40 font-medium max-w-[445px]"
                  style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1px' }}
                >
                  80+ Campaigns delivered with precision, strategy, and care
                </p>
              </div>

              <div className="stat-row flex flex-col md:flex-row md:items-start gap-6 md:gap-10 py-8 border-b border-[#F5F5F5] will-change-transform">
                <h4
                  className="w-[170px] shrink-0 font-medium text-white"
                  style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(22px, 2.5vw, 30px)', letterSpacing: '-1.4px' }}
                >
                  The Reach
                </h4>
                <p
                  className="text-white/40 font-medium max-w-[445px]"
                  style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1px' }}
                >
                  25+ Unique industries served, from local startups to global brands
                </p>
              </div>

              <div className="stat-row flex flex-col md:flex-row md:items-start gap-6 md:gap-10 py-8 border-b border-[#F5F5F5] will-change-transform">
                <h4
                  className="w-[170px] shrink-0 font-medium text-white"
                  style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(22px, 2.5vw, 30px)', letterSpacing: '-1.4px' }}
                >
                  The Result
                </h4>
                <p
                  className="text-white/40 font-medium max-w-[445px]"
                  style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 'clamp(26px, 3vw, 36px)', letterSpacing: '-1px' }}
                >
                  $2M+ In verified client revenue generated to date
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutStory;

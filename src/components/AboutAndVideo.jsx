import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DESKTOP_MOTION_QUERY } from '../lib/motion';
import videoImg from '../assets/videoimg.jpg';

gsap.registerPlugin(ScrollTrigger);

const AboutAndVideo = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoImgRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    const headingMarkup = headingRef.current.innerHTML;
    const paragraphMarkup = paragraphRef.current.innerHTML;
    mm.add(DESKTOP_MOTION_QUERY, () => {
      // 1. Heading Char Reveal
      const headingElement = headingRef.current;
      if (headingElement) {
        const text = "We turn ambitious ideas into scalable digital products businesses rely on.";
        headingElement.innerHTML = '';

        // Spacer for first line indent
        const spacer = document.createElement('span');
        spacer.className = 'inline-block w-12 sm:w-20 md:w-28 lg:w-36';
        spacer.setAttribute('aria-hidden', 'true');
        headingElement.appendChild(spacer);

        const words = text.split(/\s+/).filter(Boolean);
        words.forEach((word) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'inline-block mr-[0.28em] whitespace-nowrap';

          wordSpan.textContent = word;
          wordSpan.classList.add('about-heading-word');
          wordSpan.style.opacity = '0.15';
          headingElement.appendChild(wordSpan);
        });

        const chars = headingElement.querySelectorAll('.about-heading-word');
        gsap.to(chars, {
          opacity: 1,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: headingElement,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 0.5,
          },
        });
      }

      // 2. About us paragraph reveal
      const paraElement = paragraphRef.current;
      if (paraElement) {
        paraElement.innerHTML = '';

        // Spacer for first line indent
        const spacer = document.createElement('span');
        spacer.className = 'inline-block w-8 sm:w-12 md:w-16';
        spacer.setAttribute('aria-hidden', 'true');
        paraElement.appendChild(spacer);

        const segments = [
          { text: 'About us. ', isBold: true },
          { text: 'MarkCoders is a custom software development company helping businesses plan, design and build web applications, mobile apps, eCommerce platforms and digital products. We combine strategy, UI/UX, engineering and quality assurance to deliver reliable solutions from concept to launch.', isBold: false },
        ];

        segments.forEach((seg) => {
          const segWords = seg.text.split(/\s+/).filter(Boolean);
          segWords.forEach((word) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'inline-block mr-[0.28em] whitespace-nowrap';

            wordSpan.textContent = word;
            wordSpan.classList.add('about-para-word');
            wordSpan.style.opacity = seg.isBold ? '0.35' : '0.2';
            wordSpan.style.fontWeight = seg.isBold ? '700' : '500';
            wordSpan.style.color = '#FFFFFF';
            paraElement.appendChild(wordSpan);
          });
        });

        const paraChars = paraElement.querySelectorAll('.about-para-word');
        gsap.to(paraChars, {
          opacity: 1,
          stagger: 0.01,
          ease: 'none',
          scrollTrigger: {
            trigger: paraElement,
            start: 'top 85%',
            end: 'bottom 50%',
            scrub: 0.5,
          },
        });
      }

      // 3. Video Box Scroll Animation (Expanding from small to full width)
      if (videoWrapperRef.current) {
        gsap.fromTo(
          videoWrapperRef.current,
          {
            scale: 0.6,
          },
          {
            scale: 1,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: videoWrapperRef.current,
              start: 'top 95%',
              end: 'top 15%',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
      }
      return () => {
        headingElement.innerHTML = headingMarkup;
        paraElement.innerHTML = paragraphMarkup;
      };
    }, root);

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="about-us"
      data-snap-section
      className="relative z-10 w-full bg-transparent overflow-hidden pt-10 md:pt-16 pb-24 md:pb-40"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 mb-24 md:mb-32">
        {/* (All Work) Label */}
        <div className="w-full text-center mb-[60px] sm:mb-[90px] md:mb-[110px] lg:mb-[130px]">
          <h2
            className="text-[#25A9E0] inline-block transition-transform duration-300 hover:scale-95"
            onClick={() => navigate('/portfolio')}
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(42px, 6.5vw, 91px)',
              lineHeight: '1.13',
              letterSpacing: '-3.4px',
              cursor: 'pointer',
            }}
          >
            Our Work
          </h2>
        </div>

        {/* Large Statement Heading */}
        <h3
          ref={headingRef}
          className="text-white text-left max-w-[1300px] mb-20 md:mb-28"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(36px, 5.8vw, 91px)',
            lineHeight: '1.15',
            letterSpacing: '-0.035em',
          }}
        >
          <span className="inline-block w-12 sm:w-20 md:w-28 lg:w-36" aria-hidden="true" />
          We turn ambitious ideas into scalable digital products businesses rely on.
        </h3>

        {/* Bottom Split Description Grid */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
          {/* Left Column: About Paragraph & CTA Button */}
          <div className="w-full lg:max-w-[740px] flex flex-col gap-10">
            <div
              ref={paragraphRef}
              className="text-left text-[#9ca3af]"
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(18px, 1.85vw, 26px)',
                lineHeight: '1.45',
                letterSpacing: '-0.02em',
              }}
            >
              <span className="inline-block w-8 sm:w-12 md:w-16" aria-hidden="true" />
              <strong className="text-white font-bold">About us.</strong> MarkCoders is a custom software development company helping businesses plan, design and build web applications, mobile apps, eCommerce platforms and digital products. We combine strategy, UI/UX, engineering and quality assurance to deliver reliable solutions from concept to launch.
            </div>

            {/* Figma Pixel-Perfect Button */}
            <div>
              <a
                href="https://calendly.com/saarang-markcoders/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-[15px] text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer no-underline"
                style={{
                  width: '223.65px',
                  height: '52.88px',
                  borderRadius: '15px',
                  background: '#25A9E0',
                  boxShadow: '0 4px 20px rgba(37, 169, 224, 0.3)',
                  fontFamily: 'Switzer, sans-serif',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '30px',
                  letterSpacing: '-0.5px',
                }}
              >
                {/* Arrow Icon 19.08px x 19.08px */}
                <svg
                  width="19.08"
                  height="19.08"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Explore More</span>
              </a>
            </div>
          </div>

          {/* Right Column: Secondary Description */}
          <div className="w-full lg:max-w-[340px] lg:pt-2">
            <p
              className="text-[#9ca3af] text-left"
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(16px, 1.45vw, 26px)',
                lineHeight: '1.4',
                letterSpacing: '-0.02em',
              }}
            >
              From responsive websites and SaaS platforms to APIs and mobile
applications, we build intuitive, secure and high-performance products
ready to scale.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width Expanding Video/Image Showcase on scroll */}
      <div className="w-full flex justify-center items-center py-6">
        <div
          ref={videoWrapperRef}
          className="relative h-[55vh] md:h-[75vh] overflow-hidden mx-auto"
          style={{ width: 'calc(100% - 48px)', maxWidth: '1350px', borderRadius: '24px' }}
        >
          <img
            ref={videoImgRef}
            src={videoImg}
            alt="Showcase Video Background"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default AboutAndVideo;

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SLIDE_INTERVAL_MS = 4500;

const testimonials = [
  {
    quote:
      'Pleasure to work with from start to finish. They translated complex flows into something intuitive a rare balance between aesthetics and functionality.',
    name: 'Emma Watson',
  },
  {
    quote:
      'Saarang was very quick to respond to feedback and worked with us to get the design just right.',
    name: 'Cassandra Sigmon',
  },
  {
    quote:
      'They took our messy brief and turned it into a polished experience. Fast iterations, thoughtful UX, and zero drama throughout the build.',
    name: 'Sofia Reyes',
  },
  {
    quote:
      'A rare team that cares about both craft and shipping. Our launch felt smooth, and the final product still looks fresh months later.',
    name: 'Daniel Okonkwo',
  },
];

const TrustSection = () => {
  const sectionRef = useRef(null);
  const bgFadeRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const slideContentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const timerRef = useRef(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      const cards = cardsRef.current?.children;

      // Same scroll-scrub char opacity reveal as AboutAndVideo
      if (heading) {
        const childNodes = Array.from(heading.childNodes);
        heading.innerHTML = '';

        let isFirstText = true;

        childNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
            heading.appendChild(document.createElement('br'));
            return;
          }

          const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
          if (!text) return;

          if (isFirstText) {
            const spacer = document.createElement('span');
            spacer.className = 'inline-block w-[102px]';
            spacer.setAttribute('aria-hidden', 'true');
            heading.appendChild(spacer);
            isFirstText = false;
          }

          const words = text.split(' ').filter(Boolean);
          words.forEach((word) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'inline-block mr-[0.25em] whitespace-nowrap ';

            for (const char of word) {
              const charSpan = document.createElement('span');
              charSpan.textContent = char;
              charSpan.className = 'trust-heading-char';
              charSpan.style.opacity = '0.15';
              wordSpan.appendChild(charSpan);
            }

            heading.appendChild(wordSpan);
          });
        });

        const headingChars = heading.querySelectorAll('.trust-heading-char');

        gsap.to(headingChars, {
          opacity: 1,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: heading,
            start: 'top 90%',
            end: 'bottom 40%',
            scrub: true,
          },
        });
      }

      gsap.set(cards, { opacity: 0, y: 120 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 15%',
          scrub: 1.2,
        },
      });

      // Fade a black layer in rather than tweening the section's
      // backgroundColor — colour interpolation repaints the whole full-bleed
      // section every scrub frame, opacity on its own layer does not.
      if (bgFadeRef.current) {
        tl.fromTo(
          bgFadeRef.current,
          { opacity: 0 },
          { opacity: 1, ease: 'none', duration: 1 },
          0
        );
      }

      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: 'power2.out',
          duration: 0.9,
        },
        0.55
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const goToSlide = (nextIndex, direction = 1) => {
    if (
      nextIndex === activeIndexRef.current ||
      !slideContentRef.current ||
      isAnimatingRef.current
    ) {
      return;
    }

    isAnimatingRef.current = true;
    const el = slideContentRef.current;
    const dir = direction >= 0 ? 1 : -1;

    gsap.to(el, {
      autoAlpha: 0,
      xPercent: -12 * dir,
      duration: 0.28,
      ease: 'power2.in',
      force3D: true,
      overwrite: 'auto',
      onComplete: () => {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
        gsap.fromTo(
          el,
          { autoAlpha: 0, xPercent: 12 * dir },
          {
            autoAlpha: 1,
            xPercent: 0,
            duration: 0.35,
            ease: 'power2.out',
            force3D: true,
            overwrite: 'auto',
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          }
        );
      },
    });
  };

  const startAutoplay = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goToSlide((activeIndexRef.current + 1) % testimonials.length, 1);
    }, SLIDE_INTERVAL_MS);
  };

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDotClick = (i) => {
    const dir = i > activeIndexRef.current ? 1 : -1;
    goToSlide(i, dir);
    startAutoplay();
  };

  const handlePrev = () => {
    const prev =
      (activeIndexRef.current - 1 + testimonials.length) % testimonials.length;
    goToSlide(prev, -1);
    startAutoplay();
  };

  const handleNext = () => {
    const next = (activeIndexRef.current + 1) % testimonials.length;
    goToSlide(next, 1);
    startAutoplay();
  };

  const current = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      data-snap-section
      className="relative w-full max-w-[100%] overflow-x-hidden px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-24 md:py-32"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div
        ref={bgFadeRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: '#000000', opacity: 0, willChange: 'opacity' }}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto w-full min-w-0">
        {/* ── Heading ── */}
        <h2
          ref={headingRef}
          className="text-white font-medium leading-[1.08] tracking-[-0.035em] mb-10 sm:mb-14 md:mb-20 max-w-[1100px] break-words"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontSize: 'clamp(32px, 7.5vw, 91px)',
          }}
        > 
          A Technology Partner You Can Rely On.
          <br />
          High standards. Reliable
          <br />
          Delivery.
        </h2>

        {/* ── Cards row ── */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 w-full"
        >
          {/* ── Left: Stats / trust card (blue) ── */}
          <div
            className="relative w-full lg:w-[38%] lg:flex-[0_0_38%] min-w-0 min-h-[280px] sm:min-h-[340px] md:min-h-[400px] flex flex-col justify-between overflow-hidden"
            style={{
              backgroundColor: '#1B75BB',
              borderRadius: '20px',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            {/* Large quotation mark */}
            <span
              className="select-none block"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(64px, 14vw, 130px)',
                lineHeight: 0.65,
                color: 'rgba(255,255,255,0.92)',
                marginBottom: '20px',
              }}
              aria-hidden
            >
              “
            </span>

            {/* Bottom text */}
            <div className="min-w-0 mt-auto">
              <p
                className="text-white font-medium tracking-[-0.02em] mb-2 sm:mb-3 break-words leading-[1.15]"
                style={{
                  fontFamily: 'Switzer, sans-serif',
                  fontSize: 'clamp(24px, 5vw, 30px)',
                }}
              >
                300+ websites.
                <br />
                70+ applications.
              </p>
              <p
                className="text-white/80"
                style={{
                  fontFamily: 'Switzer, sans-serif',
                  fontSize: 'clamp(13px, 1.6vw, 22px)',
                  fontWeight: 500,
                }}
              >
                Built for businesses across industries and markets.
              </p>
            </div>
          </div>

          {/* ── Right: Testimonial slider (dark) ── */}
          <div
            className="relative w-full lg:flex-1 min-w-0 min-h-[320px] sm:min-h-[360px] md:min-h-[400px] flex flex-col overflow-hidden"
            style={{
              backgroundColor: '#151515',
              borderRadius: '20px',
              padding: 'clamp(20px, 3.5vw, 36px)',
            }}
          >
            {/* Main content: avatar + text — fixed min height prevents layout shake */}
            <div className="relative flex-1 min-h-[210px] sm:min-h-[230px] md:min-h-[250px] overflow-hidden">
              <div
                ref={slideContentRef}
                className="flex h-full w-full flex-col sm:flex-row items-center sm:items-stretch gap-5 sm:gap-6 md:gap-8 min-w-0 will-change-transform"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Letter avatar */}
                <div className="shrink-0 flex items-center justify-center">
                  <div
                    className="rounded-full border border-white/10 flex items-center justify-center select-none"
                    style={{
                      width: 'clamp(110px, 18vw, 168px)',
                      height: 'clamp(110px, 18vw, 168px)',
                      backgroundColor: '#1B75BB',
                      fontFamily: 'Switzer, sans-serif',
                      fontWeight: 600,
                      fontSize: 'clamp(40px, 7vw, 64px)',
                      color: '#ffffff',
                      letterSpacing: '-0.02em',
                    }}
                    aria-hidden
                  >
                    {current.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Quote text panel — transparent bg */}
                <div className="flex-1 min-w-0 flex flex-col justify-center w-full bg-transparent px-0 py-1 sm:py-2">
                  <p
                    className="text-white/90 font-normal break-words"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontSize: 'clamp(15px, 2.2vw, 24px)',
                      lineHeight: 1.55,
                      letterSpacing: '-0.01em',
                      minHeight: '4.8em',
                    }}
                  >
                    {current.quote}
                  </p>
                  <div className="mt-5 sm:mt-6 min-w-0">
                    <p
                      className="text-white font-medium truncate"
                      style={{
                        fontFamily: 'Switzer, sans-serif',
                        fontSize: 'clamp(14px, 1.5vw, 16px)',
                        lineHeight: 1.3,
                      }}
                    >
                      {current.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: pagination (center) + arrows (right) */}
            <div className="mt-6 sm:mt-8 flex items-center justify-between gap-3">
              <div className="hidden sm:block flex-1" aria-hidden />

              <div
                className="flex flex-1 sm:flex-none items-center justify-start sm:justify-center gap-2.5"
                role="tablist"
                aria-label="Testimonials"
              >
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => handleDotClick(i)}
                    className="rounded-full border-0 p-0 transition-[background-color,width,height] duration-250"
                    style={{
                      width: i === activeIndex ? '10px' : '8px',
                      height: i === activeIndex ? '10px' : '8px',
                      cursor: 'pointer',
                      backgroundColor:
                        i === activeIndex
                          ? 'rgba(255,255,255,0.95)'
                          : 'rgba(255,255,255,0.28)',
                    }}
                  />
                ))}
              </div>

              <div className="flex flex-1 items-center justify-end gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={handlePrev}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[10px] border border-white/15 bg-black text-white transition-colors duration-300 hover:bg-white hover:text-black hover:border-white"
                >
                  <ArrowLeft size={24} strokeWidth={2} className="pointer-events-none" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={handleNext}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[10px] border border-white/15 bg-black text-white transition-colors duration-300 hover:bg-white hover:text-black hover:border-white"
                >
                  <ArrowRight size={24} strokeWidth={2} className="pointer-events-none" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

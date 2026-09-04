import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceFramework = ({
  headingLine1 = 'A framework that',
  headingLine2 = 'drives excellence',
  ctaLabel = 'Discuss Our Approach',
  cards = [],
}) => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const cardsRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cardsCol = cardsRef.current;
    if (!section || !track || !cardsCol) return;

    const mm = gsap.matchMedia();

    // Desktop: pin section immediately when it reaches the top; slide cards up
    mm.add('(min-width: 1024px)', () => {
      const getTravel = () => {
        const trackHeight = track.clientHeight;
        const cardsHeight = cardsCol.scrollHeight;
        return Math.max(0, cardsHeight - trackHeight);
      };

      gsap.set(cardsCol, { y: 0 });

      const st = ScrollTrigger.create({
        trigger: section,
        // Start as soon as this section hits the top (the SS moment)
        start: 'top top',
        end: () => `+=${Math.max(getTravel(), 1)}`,
        scrub: 0.45,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(cardsCol, { y: -getTravel() * self.progress });
        },
      });

      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current.children,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      gsap.fromTo(
        section,
        { backgroundColor: '#000000' },
        {
          backgroundColor: '#ffffff',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 45%',
            scrub: 1,
          },
        }
      );

      const refresh = () => ScrollTrigger.refresh(true);
      requestAnimationFrame(refresh);
      const timers = [100, 350, 700].map((ms) => window.setTimeout(refresh, ms));

      return () => {
        timers.forEach((id) => window.clearTimeout(id));
        st.kill();
        gsap.set(cardsCol, { clearProps: 'transform' });
      };
    });

    // Mobile / tablet: normal flow
    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(
        section,
        { backgroundColor: '#000000' },
        {
          backgroundColor: '#ffffff',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1.2,
          },
        }
      );

      cardsCol.querySelectorAll('.framework-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, [cards]);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full bg-black overflow-hidden py-16 md:py-20 lg:py-0 lg:h-[100svh]"
      style={{
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
      }}
    >
      <div className="w-[90vw] h-full mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 lg:gap-10 lg:py-20">
        {/* Left — stays put while section is pinned */}
        <div
          ref={leftRef}
          className="w-full lg:w-[min(553px,38%)] flex flex-col gap-8 md:gap-10 shrink-0"
        >
          <h2
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: '1.06',
              letterSpacing: 'clamp(-1.5px, -0.25vw, -3.4px)',
              color: '#00060B',
            }}
          >
            {headingLine1}
            <br />
            {headingLine2}
          </h2>

          <button
            type="button"
            className="inline-flex items-center gap-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer w-fit shrink-0"
            style={{
              width: '243px',
              height: '53px',
              paddingLeft: '18px',
              paddingRight: '22px',
              borderRadius: '14px',
              background: '#25A9E0',
              boxShadow: '0 4px 20px rgba(37, 169, 224, 0.3)',
              fontFamily: 'Switzer, sans-serif',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '30px',
              letterSpacing: '-0.5px',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 -rotate-45"
              aria-hidden
            >
              <path
                d="M1 7H13M13 7L7 1M13 7L7 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {ctaLabel}
          </button>
        </div>

        {/* Right — fixed viewport track; cards stack is absolute so it can't expand page height */}
        <div
          ref={trackRef}
          className="relative w-full lg:flex-1 lg:h-full min-h-[420px] lg:min-h-0 overflow-hidden"
        >
          <div
            ref={cardsRef}
            className="lg:absolute lg:top-0 lg:left-0 lg:right-0 flex flex-col gap-5 md:gap-6 w-full items-stretch lg:items-end will-change-transform"
          >
            {cards.map((card) => (
              <article
                key={card.number}
                className="framework-card w-full max-w-[678.71px] h-auto lg:w-full xl:w-[678.71px] lg:h-[395.99px] bg-white rounded-[24px] p-8 md:p-10 flex flex-col justify-between shrink-0"
                style={{
                  boxShadow: '0px 0px 13px 0px rgba(140, 140, 140, 0.25)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5 md:mb-6">
                    <h3
                      className="uppercase select-none"
                      style={{
                        fontFamily: 'Switzer, sans-serif',
                        fontWeight: 600,
                        fontSize: 'clamp(24px, 2.5vw, 35px)',
                        lineHeight: '100%',
                        letterSpacing: '-1.4px',
                        color: '#25A9E0',
                      }}
                    >
                      {card.title}
                    </h3>
                    <span
                      className="uppercase select-none shrink-0"
                      style={{
                        fontFamily: 'Switzer, sans-serif',
                        fontWeight: 600,
                        fontSize: 'clamp(24px, 2.5vw, 35px)',
                        lineHeight: '100%',
                        letterSpacing: '-1.4px',
                        color: '#25A9E0',
                      }}
                    >
                      {card.number}
                    </span>
                  </div>

                  <p
                    className="mb-6 md:mb-8 max-w-[480px]"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontWeight: 500,
                      fontSize: 'clamp(18px, 1.6vw, 22px)',
                      lineHeight: '31px',
                      letterSpacing: '-0.5px',
                      color: '#1E1E1E',
                    }}
                  >
                    {card.description}
                  </p>
                </div>

                <ul className="flex flex-col gap-1.5 md:gap-2">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3"
                      style={{
                        fontFamily: 'Switzer, sans-serif',
                        fontWeight: 500,
                        fontSize: 'clamp(18px, 1.6vw, 22px)',
                        lineHeight: '31px',
                        letterSpacing: '-0.5px',
                        color: '#1E1E1E',
                      }}
                    >
                      <span
                        className="mt-[11px] w-1.5 h-1.5 rounded-full bg-[#1E1E1E] shrink-0"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFramework;

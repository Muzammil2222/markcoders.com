import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: 'DISCOVER',
    number: '01',
    description:
      'Uncover opportunities by diving deep into your business, market, and customers.',
    items: ['Market research', 'Competitive analysis', 'Stakeholder interviews'],
  },
  {
    title: 'DEFINE',
    number: '02',
    description:
      'Craft a unique brand identity that resonates with your audience and sets you apart.',
    items: ['Brand strategy', 'Positioning statement', 'Messaging framework'],
  },
  {
    title: 'DESIGN',
    number: '03',
    description:
      "Elevate your brand's visuals with logos, fonts, colors for use across all platforms.",
    items: ['Logo suite', 'Visual system', 'Brand assets'],
  },
  {
    title: 'DELIVER',
    number: '04',
    description:
      'Deliverables include brand guidelines and asset libraries for smooth execution.',
    items: ['Brand guidelines', 'Asset library', 'Team training'],
  },
];

const BrandingLightSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full bg-black overflow-hidden py-20 md:py-28 lg:py-32"
      style={{
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
      }}
    >
      {/* 80vw of parent (100vw), centered — flex space-between */}
      <div className="w-[90vw] mx-auto flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8">
        {/* Left: heading + CTA (sticky on desktop) */}
        <div className="w-full lg:w-auto lg:max-w-[553px] lg:sticky lg:top-28 flex flex-col gap-8 md:gap-10 shrink-0 self-start">
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
            A framework that
            <br />
            drives excellence
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
            Discuss Our Approach
          </button>
        </div>

        {/* Right: process cards */}
        <div className="flex flex-col gap-5 md:gap-6 w-full lg:w-auto items-stretch lg:items-end shrink-0">
          {cards.map((card) => (
            <article
              key={card.number}
              className="w-full max-w-[678.71px] h-auto lg:w-[678.71px] lg:h-[395.99px] bg-white rounded-[24px] p-8 md:p-10 flex flex-col justify-between"
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
    </section>
  );
};

export default BrandingLightSection;

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ *
 * NAV_TOP_PX          — height of the fixed navbar. Every pinned
 *                       element in this section rests just below it.
 * CARD_TOP_STEP(_MAX) — each card pins a little lower than the one
 *                       before it, so earlier cards peek out from
 *                       behind the current one.
 *
 * Why pin (not a y = progress * distance fake-sticky):
 * Locomotive transforms the scroll container. Hand-written sticky
 * offsets go stale after any refresh that runs while an element is
 * already translated. ScrollTrigger.pin owns measuring / refresh /
 * reverse scroll, and pinSpacing:false keeps the stacked-card layout.
 *
 * Pin the wrapper, scale the <article> — otherwise the pin transform
 * and the depth tween fight on the same element.
 * ------------------------------------------------------------------ */
const NAV_TOP_PX = 88;
const CARD_TOP_STEP = 14;
const CARD_TOP_STEP_MAX = 56;

const cardTopPx = (index, navTop) =>
  navTop + Math.min(index * CARD_TOP_STEP, CARD_TOP_STEP_MAX);

const createSticky = ({ slot, pinEl, endTrigger, top }) =>
  ScrollTrigger.create({
    trigger: slot,
    pin: pinEl,
    pinSpacing: false,
    start: `top ${top}px`,
    endTrigger,
    // Release when the stack parent would carry this card away — same
    // moment CSS sticky would. Avoids every card snapping off at once.
    end: () => `bottom ${top + pinEl.offsetHeight}px`,
    invalidateOnRefresh: true,
    anticipatePin: 1,
  });

const ServiceFramework = ({
  headingLine1 = 'A framework that',
  headingLine2 = 'drives excellence',
  ctaLabel = 'Discuss Our Approach',
  cards = [],
}) => {
  const sectionRef = useRef(null);
  const leftSlotRef = useRef(null);
  const leftRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const slotRefs = useRef([]);
  const pinRefs = useRef([]);
  const cardRefs = useRef([]);

  // Stable identity for the effect — module-level data arrays are fine;
  // an inline `cards={[]}` default would otherwise rebuild triggers every render.
  const cardsKey = cards.map((c) => c.number).join('|');

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = cardsWrapperRef.current;
    if (!section || !wrapper) return;

    slotRefs.current.length = cards.length;
    pinRefs.current.length = cards.length;
    cardRefs.current.length = cards.length;

    const mm = gsap.matchMedia();

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
            end: 'top 40%',
            scrub: 1.2,
          },
        }
      );

      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current.children,
          { y: 32, opacity: 0 },
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
    }, section);

    const setupCardStack = ({ stickLeft = false, navTop = NAV_TOP_PX } = {}) => {
      const slots = slotRefs.current;
      const cardEls = cardRefs.current;
      const pins = pinRefs.current;

      if (stickLeft && leftSlotRef.current && leftRef.current) {
        createSticky({
          slot: leftSlotRef.current,
          pinEl: leftRef.current,
          endTrigger: wrapper,
          top: navTop,
        });
      }

      slots.forEach((slot, i) => {
        const card = cardEls[i];
        const pinEl = pins[i];
        if (!slot || !card || !pinEl) return;

        createSticky({
          slot,
          pinEl,
          endTrigger: wrapper,
          top: cardTopPx(i, navTop),
        });

        const nextSlot = slots[i + 1];
        if (nextSlot) {
          gsap.fromTo(
            card,
            { scale: 1, opacity: 1 },
            {
              scale: 0.95,
              opacity: 0.55,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: nextSlot,
                start: 'top bottom',
                end: `top ${cardTopPx(i + 1, navTop)}px`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      return () => gsap.set(cardEls.filter(Boolean), { clearProps: 'transform,opacity' });
    };

    mm.add('(min-width: 1024px)', () => setupCardStack({ stickLeft: true }));

    mm.add('(min-width: 768px) and (max-width: 1023px)', () =>
      setupCardStack({ stickLeft: false, navTop: 72 })
    );

    mm.add('(max-width: 767px)', () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const t = window.setTimeout(refresh, 400);

    return () => {
      window.clearTimeout(t);
      ctx.revert();
      mm.revert();
    };
    // cardsKey: avoid tearing down pins when parent re-renders with a new [] default
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsKey]);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full bg-black"
      style={{
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
      }}
    >
      <div className="w-[90vw] mx-auto flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-12 pt-5 lg:pt-8 pb-24 md:pb-40">
        <div ref={leftSlotRef} className="w-full lg:w-[min(553px,38%)] shrink-0">
          <div ref={leftRef} className="flex flex-col gap-8 md:gap-10">
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
        </div>

        <div
          ref={cardsWrapperRef}
          className="relative w-full lg:flex-1 lg:max-w-[700px] lg:pb-[30vh]"
        >
          {cards.map((card, index) => {
            const isLast = index === cards.length - 1;

            return (
              <div
                key={card.number}
                ref={(el) => {
                  slotRefs.current[index] = el;
                }}
                className={isLast ? 'mb-6 md:mb-[35vh]' : 'mb-6 md:mb-[50vh]'}
              >
                {/* Pin target — scale/opacity stay on <article> so they don't fight the pin transform */}
                <div
                  ref={(el) => {
                    pinRefs.current[index] = el;
                  }}
                >
                  <article
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="relative w-full max-w-[678.71px] ml-auto min-h-[360px] lg:min-h-[396px] bg-white rounded-[24px] p-8 md:p-10 flex flex-col justify-between"
                    style={{
                      zIndex: index + 1,
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFramework;

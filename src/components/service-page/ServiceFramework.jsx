// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// /** Clears the fixed Navbar */
// const NAV_TOP = '88px';

// const ServiceFramework = ({
//   headingLine1 = 'A framework that',
//   headingLine2 = 'drives excellence',
//   ctaLabel = 'Discuss Our Approach',
//   cards = [],
// }) => {
//   const sectionRef = useRef(null);
//   const leftRef = useRef(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         section,
//         { backgroundColor: '#000000' },
//         {
//           backgroundColor: '#ffffff',
//           ease: 'none',
//           scrollTrigger: {
//             trigger: section,
//             start: 'top 85%',
//             end: 'top 40%',
//             scrub: 1.2,
//           },
//         }
//       );

//       if (leftRef.current) {
//         gsap.fromTo(
//           leftRef.current.children,
//           { y: 32, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 0.75,
//             stagger: 0.1,
//             ease: 'power3.out',
//             scrollTrigger: {
//               trigger: section,
//               start: 'top 75%',
//               toggleActions: 'play none none none',
//             },
//           }
//         );
//       }
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative z-30 w-full bg-black"
//       style={{
//         borderTopLeftRadius: '24px',
//         borderTopRightRadius: '24px',
//       }}
//     >
//       <div className="w-[90vw] mx-auto flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-12 pt-5 lg:pt-8 pb-24 md:pb-40">
//         {/* Left column — sticky for the whole card stack */}
//         <div
//           ref={leftRef}
//           className="w-full lg:w-[min(553px,38%)] flex flex-col gap-8 md:gap-10 shrink-0 lg:sticky lg:self-start"
//           style={{ top: NAV_TOP }}
//         >
//           <h2
//             style={{
//               fontFamily: 'Switzer, sans-serif',
//               fontWeight: 500,
//               fontSize: 'clamp(36px, 5vw, 72px)',
//               lineHeight: '1.06',
//               letterSpacing: 'clamp(-1.5px, -0.25vw, -3.4px)',
//               color: '#00060B',
//             }}
//           >
//             {headingLine1}
//             <br />
//             {headingLine2}
//           </h2>

//           <button
//             type="button"
//             className="inline-flex items-center gap-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer w-fit shrink-0"
//             style={{
//               width: '243px',
//               height: '53px',
//               paddingLeft: '18px',
//               paddingRight: '22px',
//               borderRadius: '14px',
//               background: '#25A9E0',
//               boxShadow: '0 4px 20px rgba(37, 169, 224, 0.3)',
//               fontFamily: 'Switzer, sans-serif',
//               fontWeight: 500,
//               fontSize: '18px',
//               lineHeight: '30px',
//               letterSpacing: '-0.5px',
//             }}
//           >
//             <svg
//               width="14"
//               height="14"
//               viewBox="0 0 14 14"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               className="shrink-0 -rotate-45"
//               aria-hidden
//             >
//               <path
//                 d="M1 7H13M13 7L7 1M13 7L7 13"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             {ctaLabel}
//           </button>
//         </div>

//         {/*
//           Sticky card stack:
//           each card sticks under the nav; the next one scrolls up over it.
//           Last card needs bottom space too, or it never settles on top of the stack.
//         */}
//         <div className="relative w-full lg:flex-1 lg:max-w-[700px] lg:pb-[30vh]">
//           {cards.map((card, index) => {
//             const isLast = index === cards.length - 1;

//             return (
//               <article
//                 key={card.number}
//                 className="sticky w-full max-w-[678.71px] ml-auto min-h-[360px] lg:min-h-[396px] bg-white rounded-[24px] p-8 md:p-10 flex flex-col justify-between"
//                 style={{
//                   // Slight step so each layer peeks as a real stack
//                   top: `calc(${NAV_TOP} + ${index * 14}px)`,
//                   zIndex: index + 1,
//                   // Keep scroll room after the last card so it can stick over the previous one
//                   marginBottom: isLast ? '35vh' : '50vh',
//                   boxShadow: '0px 0px 13px 0px rgba(140, 140, 140, 0.25)',
//                 }}
//               >
//                 <div>
//                   <div className="flex items-center justify-between gap-4 mb-5 md:mb-6">
//                     <h3
//                       className="uppercase select-none"
//                       style={{
//                         fontFamily: 'Switzer, sans-serif',
//                         fontWeight: 600,
//                         fontSize: 'clamp(24px, 2.5vw, 35px)',
//                         lineHeight: '100%',
//                         letterSpacing: '-1.4px',
//                         color: '#25A9E0',
//                       }}
//                     >
//                       {card.title}
//                     </h3>
//                     <span
//                       className="uppercase select-none shrink-0"
//                       style={{
//                         fontFamily: 'Switzer, sans-serif',
//                         fontWeight: 600,
//                         fontSize: 'clamp(24px, 2.5vw, 35px)',
//                         lineHeight: '100%',
//                         letterSpacing: '-1.4px',
//                         color: '#25A9E0',
//                       }}
//                     >
//                       {card.number}
//                     </span>
//                   </div>

//                   <p
//                     className="mb-6 md:mb-8 max-w-[480px]"
//                     style={{
//                       fontFamily: 'Switzer, sans-serif',
//                       fontWeight: 500,
//                       fontSize: 'clamp(18px, 1.6vw, 22px)',
//                       lineHeight: '31px',
//                       letterSpacing: '-0.5px',
//                       color: '#1E1E1E',
//                     }}
//                   >
//                     {card.description}
//                   </p>
//                 </div>

//                 <ul className="flex flex-col gap-1.5 md:gap-2">
//                   {card.items.map((item) => (
//                     <li
//                       key={item}
//                       className="flex items-start gap-3"
//                       style={{
//                         fontFamily: 'Switzer, sans-serif',
//                         fontWeight: 500,
//                         fontSize: 'clamp(18px, 1.6vw, 22px)',
//                         lineHeight: '31px',
//                         letterSpacing: '-0.5px',
//                         color: '#1E1E1E',
//                       }}
//                     >
//                       <span
//                         className="mt-[11px] w-1.5 h-1.5 rounded-full bg-[#1E1E1E] shrink-0"
//                         aria-hidden
//                       />
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceFramework;


import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ *
 * NAV_TOP_PX          — height of the fixed navbar. Every "stuck"
 *                        element in this section rests just below it.
 * CARD_TOP_STEP(_MAX)  — each card's pinned position is offset a
 *                        little further down than the one before it,
 *                        so the earlier cards peek out from behind
 *                        the current one instead of sitting exactly
 *                        underneath it. Capped so a long list of
 *                        cards doesn't drift too far down the screen.
 *
 * Why GSAP `pin` instead of CSS `position: sticky`:
 * this site runs Lenis for smooth scrolling. Lenis is fine with
 * native `position: sticky` in some setups, but it's a very common
 * source of "sticky doesn't stick" / "stuck element jumps or repeats"
 * bugs, because Lenis can drive scroll through a transformed wrapper,
 * and a transform on an ancestor changes how the browser resolves a
 * descendant's sticky/fixed positioning. GSAP's ScrollTrigger `pin`
 * doesn't have that problem — it detects whether it's inside a
 * transformed scroller and pins with a transform in that case instead
 * of relying on the browser's native sticky/fixed behavior. It does
 * need Lenis to tell it when a scroll happened though — see the note
 * at the bottom of this file before wiring this up.
 * ------------------------------------------------------------------ */
const NAV_TOP_PX = 88;
const CARD_TOP_STEP = 14;
const CARD_TOP_STEP_MAX = 56;

const cardTopPx = (index) =>
  NAV_TOP_PX + Math.min(index * CARD_TOP_STEP, CARD_TOP_STEP_MAX);

const ServiceFramework = ({
  headingLine1 = 'A framework that',
  headingLine2 = 'drives excellence',
  ctaLabel = 'Discuss Our Approach',
  cards = [],
}) => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const setCardRef = (el, index) => {
    cardRefs.current[index] = el;
  };

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = cardsWrapperRef.current;
    if (!section || !wrapper) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Section background: black -> white as the section arrives.
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

      // Left column: fade/slide the heading + CTA in once. The "stay
      // in place" part is handled separately below by the pin, which
      // is media-gated so it only runs on large screens.
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
    }, sectionRef);

    // Pinning is desktop-only: on small screens the left column and
    // cards just flow normally (nothing pinned, no overlap to fight
    // with on a narrow viewport). matchMedia re-runs this whenever
    // the viewport crosses the 1024px line, and automatically calls
    // the returned cleanup function when it stops matching.
    mm.add('(min-width: 1024px)', () => {
      const triggers = [];

      // Left column stays put for exactly as long as the card stack
      // (`wrapper`) is scrolling past. Pinning the sibling instead of
      // relying on `position: sticky` keeps this correct even though
      // the right column is much taller and everything is inside a
      // Lenis-driven scroll.
      if (leftRef.current) {
        triggers.push(
          ScrollTrigger.create({
            trigger: wrapper,
            start: `top ${NAV_TOP_PX}px`,
            end: 'bottom bottom',
            pin: leftRef.current,
            pinSpacing: false,
            anticipatePin: 1,
          })
        );
      }

      // Cards: pin each one in turn so it holds in place while the
      // next card scrolls up and settles over it. All the currently-
      // pinned cards share the same release point (`endTrigger` /
      // `end`: the bottom of the whole stack reaching the top of the
      // viewport), so near the end of the section the accumulated
      // stack releases together and scrolls away as a group.
      const cardEls = cardRefs.current.filter(Boolean);
      cardEls.forEach((card, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: `top ${cardTopPx(i)}px`,
            endTrigger: wrapper,
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          })
        );

        // Polish: as the next card arrives and settles into its own
        // pinned spot, scale/dim this one down a touch so the stack
        // reads as layered depth instead of one card flatly swapping
        // for another.
        const nextCard = cardEls[i + 1];
        if (nextCard) {
          const dampen = gsap.to(card, {
            scale: 0.95,
            opacity: 0.55,
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top bottom',
              end: `top ${cardTopPx(i + 1)}px`,
              scrub: 0.8,
            },
          });
          triggers.push(dampen.scrollTrigger);
        }
      });

      return () => triggers.forEach((st) => st && st.kill());
    });

    // Switzer is a custom web font; if it finishes loading after
    // ScrollTrigger has already measured card/text heights, pin
    // positions can be off by a few pixels. Recalculate once it's in.
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [cards]);

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
        {/* Left column — pinned by GSAP on large screens (see effect above) */}
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

        {/* Right column — the card stack, pinned card-by-card by GSAP on large screens */}
        <div
          ref={cardsWrapperRef}
          className="relative w-full lg:flex-1 lg:max-w-[700px] lg:pb-[30vh]"
        >
          {cards.map((card, index) => {
            const isLast = index === cards.length - 1;

            return (
              <article
                key={card.number}
                ref={(el) => setCardRef(el, index)}
                className="relative w-full max-w-[678.71px] ml-auto min-h-[360px] lg:min-h-[396px] bg-white rounded-[24px] p-8 md:p-10 flex flex-col justify-between"
                style={{
                  zIndex: index + 1,
                  // Scroll room after this card before the next one
                  // takes over; the last one gets less so the section
                  // doesn't end on a long empty scroll.
                  marginBottom: isLast ? '35vh' : '50vh',
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFramework;

/* ------------------------------------------------------------------ *
 * One thing to check elsewhere in the app (not in this file):
 *
 * If Lenis isn't already wired to ScrollTrigger, pin/scrub-based
 * effects like the ones above will look laggy or slightly desynced
 * from the actual scroll position. Wherever Lenis is initialized
 * (root layout / main entry), it should look roughly like:
 *
 *   const lenis = new Lenis();
 *   lenis.on('scroll', ScrollTrigger.update);
 *   gsap.ticker.add((time) => lenis.raf(time * 1000));
 *   gsap.ticker.lagSmoothing(0);
 *
 * If Lenis is set up in "virtual scroll" mode with its own
 * wrapper/content elements (rather than smoothing the page's native
 * scroll), ScrollTrigger also needs a scrollerProxy pointing at that
 * wrapper so it reads the right scroll position — worth checking if
 * pins still look off after this rewrite.
 * ------------------------------------------------------------------ */
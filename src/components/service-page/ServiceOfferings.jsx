import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const headingStyle = {
  fontFamily: 'Switzer, sans-serif',
  fontWeight: 500,
  fontSize: 'clamp(36px, 6.5vw, 91px)',
  lineHeight: '1.13',
  letterSpacing: 'clamp(-1.5px, -0.25vw, -3.4px)',
  color: '#FFFFFF',
};

/** Scale a nowrap title block so the longest line fills ~80vw. */
function fitRightLeftHeading(el) {
  if (!el || typeof window === 'undefined') return;
  const target = window.innerWidth * 0.8;
  const maxPx = 44;
  const minPx = 16;
  el.style.fontSize = `${maxPx}px`;
  const measured = el.scrollWidth;
  if (!measured) return;
  const next = Math.max(minPx, Math.min(maxPx, (target / measured) * maxPx));
  el.style.fontSize = `${next}px`;
}

/**
 * Right-left-concept split (mobile):
 * "Web Development That" + "Drives Real Results"
 * → "Web Development" / "That Drives" / "Real Results"
 */
function splitRightLeftLines(headingLine1, headingLine2) {
  const line1 = String(headingLine1 || '').trim();
  const line2Words = String(headingLine2 || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const thatMatch = line1.match(/^(.*?)\s+That$/i);
  if (thatMatch) {
    const top = thatMatch[1];
    const first = line2Words[0] || '';
    const middle = first ? `That ${first}` : 'That';
    const bottom = line2Words.slice(1).join(' ');
    return { top, middle, bottom: bottom || first };
  }

  // Fallback when line1 doesn't end with "That"
  const top = line1;
  if (line2Words.length <= 1) {
    return { top, middle: '', bottom: line2Words[0] || '' };
  }
  const midCount = Math.max(1, Math.ceil(line2Words.length / 2));
  return {
    top,
    middle: line2Words.slice(0, midCount).join(' '),
    bottom: line2Words.slice(midCount).join(' '),
  };
}

const ServiceOfferings = ({
  headingLine1,
  headingLine2,
  headingIndent = '',
  collageImage,
  collageAlt = 'Work collage',
  items = [],
}) => {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const mobileHeadingRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const section = sectionRef.current;
    if (!list || !section) return;

    const rows = list.querySelectorAll('.offering-row');
    if (!rows.length) return;

    const ctx = gsap.context(() => {
      gsap.set(rows, { x: 80, opacity: 0 });

      rows.forEach((row) => {
        gsap.to(row, {
          x: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [items]);

  const { top: mobileTop, middle: mobileMiddle, bottom: mobileBottom } =
    splitRightLeftLines(headingLine1, headingLine2);

  useLayoutEffect(() => {
    const el = mobileHeadingRef.current;
    if (!el) return undefined;

    const run = () => fitRightLeftHeading(el);
    run();
    window.addEventListener('resize', run);
    document.fonts?.ready?.then(run);
    return () => window.removeEventListener('resize', run);
  }, [headingLine1, headingLine2]);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full bg-[#030712] text-white pt-20 md:pt-28 lg:pt-32 pb-24 md:pb-32 lg:pb-40 overflow-x-hidden"
    >
      {/* Mobile: Right-left-concept — left → center → right staircase */}
      <div className="md:hidden w-full px-6 mb-10">
        <h2
          ref={mobileHeadingRef}
          className="select-none font-medium flex flex-col w-full"
          style={{
            ...headingStyle,
            fontSize: '44px',
            lineHeight: '1.15',
          }}
        >
          <span className="block w-full text-left whitespace-nowrap">
            {mobileTop}
          </span>
          {mobileMiddle ? (
            <span className="block w-full text-center whitespace-nowrap">
              {mobileMiddle}
            </span>
          ) : null}
          <span className="block w-full text-right whitespace-nowrap">
            {mobileBottom}
          </span>
        </h2>
      </div>

      {/* Desktop: original two-line layout */}
      <div className="hidden md:block">
        <div className="w-screen flex items-center pl-6 md:pl-10 lg:pl-16">
          <h2 className="select-none font-medium" style={headingStyle}>
            {headingLine1}
          </h2>
        </div>

        <div className="w-screen flex items-center pl-6 md:pl-10 lg:pl-16 mb-14 md:mb-20 lg:mb-24">
          <h2 className="select-none font-medium flex" style={headingStyle}>
            {headingIndent ? (
              <span className="invisible whitespace-pre" aria-hidden>
                {headingIndent}
              </span>
            ) : null}
            <span>{headingLine2}</span>
          </h2>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-stretch">
          <div className="w-full rounded-[28px] md:rounded-[36px] overflow-hidden border border-white/40 bg-white/5 p-2.5 sm:p-3 self-stretch">
            <img
              src={collageImage}
              alt={collageAlt}
              className="w-full h-full object-cover rounded-[20px] md:rounded-[28px] block"
              draggable={false}
            />
          </div>

          <div className="flex flex-col min-h-0 lg:h-full">
            <ul ref={listRef} className="flex flex-col w-full h-full min-h-[420px] lg:min-h-0">
              {items.map((label, index) => {
                const num = String(index + 1).padStart(2, '0');
                const isLast = index === items.length - 1;

                return (
                  <li
                    key={label}
                    className={`offering-row flex-1 flex items-center gap-4 md:gap-6 will-change-transform ${
                      isLast ? '' : 'border-b border-white/25'
                    }`}
                  >
                    <span
                      className="shrink-0 select-none w-[2ch]"
                      style={{
                        fontFamily: 'Switzer, sans-serif',
                        fontWeight: 500,
                        fontSize: 'clamp(20px, 2.2vw, 30px)',
                        lineHeight: '100%',
                        letterSpacing: '-1.4px',
                        color: '#25A9E0',
                      }}
                    >
                      {num}
                    </span>
                    <span
                      className="text-white select-none"
                      style={{
                        fontFamily: 'Switzer, sans-serif',
                        fontWeight: 500,
                        fontSize: 'clamp(18px, 2.2vw, 30px)',
                        lineHeight: '100%',
                        letterSpacing: '-1.4px',
                      }}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOfferings;

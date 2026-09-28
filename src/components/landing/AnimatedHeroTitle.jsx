import { forwardRef, useLayoutEffect, useRef } from 'react';

const TITLE_SIZES = {
  xl: 'clamp(40px, 12vw, 200px)',
  lg: 'clamp(2.5rem, 10vw, 11rem)',
};

const FIT_MAX_PX = 220;
const FIT_MIN_PX = 28;
const FIT_VW = 0.8;

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else ref.current = node;
    });
  };
}

function fitTitleToViewport(el) {
  if (!el || typeof window === 'undefined') return;

  // Start large, then scale so the line fills ~80vw (single line).
  el.style.fontSize = `${FIT_MAX_PX}px`;
  const measured = el.scrollWidth;
  if (!measured) return;

  const target = window.innerWidth * FIT_VW;
  const next = Math.max(
    FIT_MIN_PX,
    Math.min(FIT_MAX_PX, (target / measured) * FIT_MAX_PX),
  );
  el.style.fontSize = `${next}px`;
}

/**
 * Per-letter hover bold — same as Home hero heading.
 * Single-line titles auto-size to ~80vw; use \\n in `text` for intentional breaks.
 */
const AnimatedHeroTitle = forwardRef(function AnimatedHeroTitle(
  { text, size = 'lg', className = '', fitViewport = true },
  ref
) {
  const localRef = useRef(null);
  const hasBreaks = text.includes('\n');
  const shouldFit = fitViewport && !hasBreaks;

  useLayoutEffect(() => {
    const el = localRef.current;
    if (!el || !shouldFit) return undefined;

    const run = () => fitTitleToViewport(el);
    run();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(run) : null;
    ro?.observe(document.documentElement);
    window.addEventListener('resize', run);

    // Fonts can load after first paint and change metrics
    document.fonts?.ready?.then(run);

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', run);
    };
  }, [text, shouldFit, size, className]);

  return (
    <h1
      ref={mergeRefs(localRef, ref)}
      className={`leading-[0.9] tracking-[-0.04em] text-white max-w-full ${
        hasBreaks ? '' : 'whitespace-nowrap'
      } ${className}`}
      style={{
        fontFamily: 'Switzer, sans-serif',
        fontSize: shouldFit
          ? `${FIT_MAX_PX}px`
          : TITLE_SIZES[size] || size || TITLE_SIZES.lg,
      }}
    >
      {text.split('').map((char, i) =>
        char === '\n' ? (
          <br key={`br-${i}`} />
        ) : (
          <span
            key={`${char}-${i}`}
            className="inline-block font-semibold cursor-default transition-[font-weight] duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ fontWeight: 600 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.fontWeight = '800';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.fontWeight = '600';
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        )
      )}
    </h1>
  );
});

export default AnimatedHeroTitle;

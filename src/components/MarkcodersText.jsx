import { useLayoutEffect, useRef, useState } from 'react';

const WORD = 'MARKCODERS';

// SVG units (font-size = 100). Tweak these to change the look.
const FONT_SIZE = 100;
const BASELINE = 100;
const CAP_HEIGHT = 70; // approx cap-height ratio of Switzer/Inter at size 100
const CAP_TOP = BASELINE - CAP_HEIGHT;
const SHOWN = 1; // full letters visible (no bottom crop)
// Extra room past the baseline so glyph feet aren't clipped by the SVG viewBox
const VISIBLE = CAP_HEIGHT * SHOWN + 12;

const MarkcodersText = () => {
  const textRef = useRef(null);
  const [box, setBox] = useState({ x: 0, w: 700 });

  // Measure the word so it always spans the full width at any screen size
  useLayoutEffect(() => {
    const measure = () => {
      const el = textRef.current;
      if (!el) return;
      const b = el.getBBox();
      if (b.width) setBox({ x: b.x, w: b.width });
    };
    measure();
    document.fonts?.ready.then(measure); // re-measure once Switzer has loaded
  }, []);

  return (
    <div className="w-full px-[2.5vw]">
      <svg
        viewBox={`${box.x} ${CAP_TOP} ${box.w} ${VISIBLE}`}
        className="block h-auto w-full"
        role="img"
        aria-label={WORD}
      >
        <defs>
          <linearGradient
            id="markcoders-blue"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={CAP_TOP}
            x2="0"
            y2={CAP_TOP + VISIBLE}
          >
            <stop offset="0" stopColor="#00060B" />
            <stop offset="0.4" stopColor="#012A7A" />
            <stop offset="0.8" stopColor="#005EF7" />
            <stop offset="1" stopColor="#25A9E0" />
          </linearGradient>
        </defs>
        <text
          ref={textRef}
          x="0"
          y={BASELINE}
          fill="url(#markcoders-blue)"
          fontSize={FONT_SIZE}
          fontWeight="600"
          style={{
            fontFamily:
              "Switzer, 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          {WORD}
        </text>
      </svg>
    </div>
  );
};

export default MarkcodersText;

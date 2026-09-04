import image15 from '../assets/image 15.png';

const services = [
  'Brand identity and logo systems',
  'Brand positioning and messaging',
  'Visual language and design systems',
  'Brand guideline development',
  'Campaign branding and creative direction',
  'Brand refresh and rebranding projects',
];

const UiUxServices = () => {
  const headingStyle = {
    fontFamily: 'Switzer, sans-serif',
    fontWeight: 500,
    fontSize: 'clamp(36px, 6.5vw, 91px)',
    lineHeight: '1.13',
    letterSpacing: 'clamp(-1.5px, -0.25vw, -3.4px)',
    color: '#FFFFFF',
  };

  return (
    <section className="relative z-20 w-full bg-[#030712] text-white pt-20 md:pt-28 lg:pt-32 pb-24 md:pb-32 lg:pb-40 overflow-x-hidden">
      {/* Line 1 — left-padded */}
      <div className="w-screen flex items-center pl-6 md:pl-10 lg:pl-16">
        <h2 className="select-none font-medium" style={headingStyle}>
          Branding Services That
        </h2>
      </div>

      {/* Line 2 — indented so "Build" aligns under "Services" */}
      <div className="w-screen flex items-center pl-6 md:pl-10 lg:pl-16 mb-14 md:mb-20 lg:mb-24">
        <h2 className="select-none font-medium flex" style={headingStyle}>
          <span className="invisible whitespace-pre" aria-hidden>
            Branding{' '}
          </span>
          <span>Build Meaningful Brands</span>
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16">
        {/* Two columns: image + list share the same top/bottom edge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-stretch">
          {/* Left: collage — sets the row height */}
          <div className="w-full rounded-[28px] md:rounded-[36px] overflow-hidden border border-white/40 bg-white/5 p-2.5 sm:p-3 self-stretch">
            <img
              src={image15}
              alt="Branding work collage"
              className="w-full h-full object-cover rounded-[20px] md:rounded-[28px] block"
              draggable={false}
            />
          </div>

          {/* Right: list stretches full image height; rows evenly spaced */}
          <div className="flex flex-col min-h-0 lg:h-full">
            <ul className="flex flex-col w-full h-full min-h-[420px] lg:min-h-0">
              {services.map((label, index) => {
                const num = String(index + 1).padStart(2, '0');
                const isLast = index === services.length - 1;

                return (
                  <li
                    key={label}
                    className={`flex-1 flex items-center gap-4 md:gap-6 ${
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

export default UiUxServices;

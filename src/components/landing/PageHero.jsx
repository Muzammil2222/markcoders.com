import AnimatedHeroTitle from './AnimatedHeroTitle';

/**
 * Landing hero — content paints immediately (no GSAP on critical path).
 * Soft CSS motion only for the accent dot / footer float.
 */
const PageHero = ({
  title,
  subtitle,
  align = 'left',
  layout = 'stack',
  titleSize = 'lg',
  showDot = false,
  spread = false,
  fullWidthTitle = false,
  animateFooter = true,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  subtitleContainerClassName = 'max-w-md',
  subtitleStyle = {},
  children,
}) => {
  const isCenter = align === 'center';
  const isSplit = layout === 'split';

  const subtitleEl = subtitle && (
    <p
      className={`${subtitleClassName
          ? subtitleClassName
          : `text-lg md:text-xl leading-relaxed text-gray-300 font-light ${isCenter
            ? 'mt-10 md:mt-14 max-w-[640px] text-white/55 text-lg md:text-xl lg:text-2xl'
            : 'max-w-md'
          }`
        }`}
      style={{ fontFamily: 'Switzer, sans-serif', ...subtitleStyle }}
    >
      {subtitle}
    </p>
  );

  const dotEl = showDot && (
    <div
      className={`w-3 h-3 bg-white mc-hero-dot ${isCenter ? 'mx-auto' : ''}`}
      style={{ boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.3)' }}
    />
  );

  return (
    <section
      className={`relative overflow-visible ${spread ? 'flex flex-col flex-1' : ''} ${className}`}
    >
      <div
        className={`${
          fullWidthTitle
            ? 'w-full max-w-[1400px] mx-auto'
            : 'max-w-[1400px] mx-auto w-full'
        } relative z-10 ${
          isCenter ? 'flex flex-col items-center text-center' : ''
        } ${spread ? 'flex flex-col flex-1 h-full justify-between' : ''}`}
      >
        <AnimatedHeroTitle
          text={title}
          size={titleSize}
          className={`${
            isSplit ? (spread ? 'mb-0' : 'mb-12 md:mb-16') : ''
          } ${fullWidthTitle ? 'max-w-full' : ''} ${titleClassName}`}
        />

        {isSplit ? (
          <div
            className={`w-full max-w-[1400px] ${fullWidthTitle ? 'mx-auto' : ''} flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 ${
              spread ? 'mt-auto pt-10 md:pt-16' : 'mt-8 md:mt-12'
            }`}
          >
            <div className={`flex flex-col gap-6 ${subtitleContainerClassName}`}>
              {dotEl}
              {subtitleEl}
            </div>
            {children && (
              <div
                className={`w-full md:w-auto md:max-w-[480px] lg:max-w-[520px] ${
                  animateFooter ? 'mc-hero-float' : ''
                }`}
              >
                {children}
              </div>
            )}
          </div>
        ) : (
          <>
            {showDot && !isSplit && (
              <div className={isCenter ? 'mt-8 md:mt-10' : 'mt-8'}>{dotEl}</div>
            )}
            {subtitleEl}
            {children && (
              <div
                className={`w-full ${isCenter
                    ? 'flex justify-center mt-12 md:mt-16 lg:mt-20'
                    : 'mt-8 md:mt-12'
                  } ${animateFooter ? 'mc-hero-float' : ''}`}
              >
                {children}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PageHero;

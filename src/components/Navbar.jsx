import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import LOGO_SRC from '../assets/logo.png';
import { getScrollY, subscribeScroll } from '../lib/scrollBus';

const NAV_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Case Studies', to: '/case-studies' },
];

const CALENDLY_URL = 'https://calendly.com/saarang-markcoders/30min';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const btnRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const targets = [logoRef.current, linksRef.current, btnRef.current].filter(Boolean);

    const ctx = gsap.context(() => {
      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y: -24 });

      const tl = gsap.timeline({ delay: 0.3 });

      if (logoRef.current) {
        tl.to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
        });
      }
      if (linksRef.current) {
        tl.to(
          linksRef.current,
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          '-=0.5'
        );
      }
      if (btnRef.current) {
        tl.to(
          btnRef.current,
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          '-=0.5'
        );
      }
    }, nav);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastScrollY = getScrollY();
    let isHidden = false;
    let ticking = false;

    const showNav = () => {
      if (!isHidden) return;
      isHidden = false;
      gsap.to(nav, {
        yPercent: 0,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: true,
        pointerEvents: 'auto',
      });
    };

    const hideNav = () => {
      if (isHidden) return;
      isHidden = true;

      const menu = mobileMenuRef.current;
      const hamburger = hamburgerRef.current;
      if (menu && !menu.classList.contains('max-h-0')) {
        menu.classList.remove('max-h-[320px]', 'opacity-100');
        menu.classList.add('max-h-0', 'opacity-0');
        hamburger?.classList.remove('active');
      }

      gsap.to(nav, {
        yPercent: -120,
        duration: 0.4,
        ease: 'power3.inOut',
        overwrite: true,
        pointerEvents: 'none',
      });
    };

    gsap.set(nav, { yPercent: 0, pointerEvents: 'auto' });
    isHidden = false;
    lastScrollY = getScrollY();

    const onScroll = (currentScrollY) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = typeof currentScrollY === 'number' ? currentScrollY : getScrollY();
        const delta = y - lastScrollY;

        if (y <= 40) {
          showNav();
        } else if (delta > 6 && y > 90) {
          hideNav();
        } else if (delta < -6) {
          showNav();
        }

        lastScrollY = y;
        ticking = false;
      });
    };

    const unsubscribe = subscribeScroll(onScroll);

    return () => {
      unsubscribe();
      gsap.killTweensOf(nav);
      gsap.set(nav, { clearProps: 'yPercent,pointerEvents,transform' });
    };
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    const menu = mobileMenuRef.current;
    const hamburger = hamburgerRef.current;
    if (!menu || !hamburger) return;

    if (menu.classList.contains('max-h-0')) {
      menu.classList.remove('max-h-0', 'opacity-0');
      menu.classList.add('max-h-[320px]', 'opacity-100');
      hamburger.classList.add('active');
    } else {
      menu.classList.remove('max-h-[320px]', 'opacity-100');
      menu.classList.add('max-h-0', 'opacity-0');
      hamburger.classList.remove('active');
    }
  };

  const isActive = (to) =>
    location.pathname === to ||
    (to !== '/' && !to.includes('#') && location.pathname.startsWith(to));

  return createPortal(
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[60] flex justify-center pt-3 sm:pt-4 md:pt-5 px-3 sm:px-4 will-change-transform pointer-events-none"
    >
      <div
        className="pointer-events-auto w-[min(94vw,560px)] xl:w-[min(94vw,1080px)] rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] overflow-hidden"
        style={{
          background: 'rgba(18, 18, 18, 0.92)',
        }}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-3 xl:gap-4 pl-3 pr-2 sm:pl-4 sm:pr-2.5 xl:pl-5 xl:pr-3 py-2 xl:py-2.5 min-w-0">
          <Link
            to="/"
            ref={logoRef}
            className="flex items-center cursor-pointer select-none no-underline shrink-0 min-w-0 max-w-[42%] xl:max-w-none"
          >
            <img
              src={LOGO_SRC}
              alt="Markcoders"
              className="h-[24px] sm:h-[28px] xl:h-[30px] w-auto max-w-full object-contain object-left"
              decoding="async"
              draggable={false}
            />
          </Link>

          <div
            ref={linksRef}
            className="hidden xl:flex items-center justify-center gap-4 2xl:gap-7 flex-1 min-w-0 px-2"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-[13px] 2xl:text-[15px] font-medium tracking-wide whitespace-nowrap no-underline transition-colors duration-300 shrink-0 ${
                  isActive(item.to)
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div ref={btnRef} className="hidden xl:block shrink-0">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-9 2xl:h-10 px-4 2xl:px-5 rounded-full bg-white text-[#0a0a0a] text-[13px] 2xl:text-[14px] font-semibold no-underline transition-transform duration-300 hover:scale-[1.03] cursor-pointer whitespace-nowrap"
            >
              Get Started
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
                className="-rotate-45"
              >
                <path
                  d="M1 7H13M13 7L7 1M13 7L7 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <button
            ref={hamburgerRef}
            type="button"
            className="xl:hidden flex flex-col gap-1.5 p-2.5 mr-0.5 cursor-pointer bg-transparent border-none rounded-full hover:bg-white/5 shrink-0"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="w-5 h-0.5 bg-white rounded-full" />
            <span className="w-5 h-0.5 bg-white rounded-full" />
            <span className="w-3.5 h-0.5 bg-white rounded-full self-end" />
          </button>
        </div>

        <div
          ref={mobileMenuRef}
          className="xl:hidden max-h-0 opacity-0 overflow-hidden transition-all duration-400 ease-in-out"
        >
          <div className="px-5 pb-5 pt-1 flex flex-col gap-1 border-t border-white/10">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`py-2.5 text-[15px] font-medium no-underline transition-colors duration-300 ${
                  isActive(item.to)
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={toggleMobileMenu}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-full bg-white text-[#0a0a0a] text-[14px] font-semibold no-underline cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Get Started
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
                className="-rotate-45"
              >
                <path
                  d="M1 7H13M13 7L7 1M13 7L7 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>,
    document.body
  );
};

export default Navbar;

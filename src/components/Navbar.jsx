import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import LOGO_SRC from '../assets/logo.png';
import { getScrollY, subscribeScroll } from '../lib/scrollBus';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Portfolio', to: '/portfolio' },
];

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const btnRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const location = useLocation();

  // Intro fade-in for logo / links / CTA
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const targets = [logoRef.current, linksRef.current, btnRef.current].filter(Boolean);

    const ctx = gsap.context(() => {
      if (!targets.length) return;

      gsap.set(targets, {
        opacity: 0,
        y: -30,
      });

      const tl = gsap.timeline({ delay: 0.3 });

      if (logoRef.current) {
        tl.to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
      if (linksRef.current) {
        tl.to(
          linksRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        );
      }
      if (btnRef.current) {
        tl.to(
          btnRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        );
      }
    }, nav);

    return () => ctx.revert();
  }, []);

  // Hide on scroll down, show on scroll up (Locomotive via scrollBus + native fallback)
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
        menu.classList.remove('max-h-[400px]', 'opacity-100');
        menu.classList.add('max-h-0', 'opacity-0');
        hamburger?.classList.remove('active');
      }

      gsap.to(nav, {
        yPercent: -110,
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

    if (menu.classList.contains('max-h-0')) {
      menu.classList.remove('max-h-0', 'opacity-0');
      menu.classList.add('max-h-[400px]', 'opacity-100');
      hamburger.classList.add('active');
    } else {
      menu.classList.remove('max-h-[400px]', 'opacity-100');
      menu.classList.add('max-h-0', 'opacity-0');
      hamburger.classList.remove('active');
    }
  };

  // Portal to document.body so position:fixed works with Locomotive's
  // transformed scroll container (no transform on the nav itself).
  return createPortal(
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[60] px-6 md:px-10 lg:px-16 py-5 will-change-transform"
      style={{
        // No backdrop-filter: a full-width blur re-rasterizes on every scrolled
        // frame. The gradient is the page background colour, so a near-opaque
        // fill reads the same without the per-frame cost.
        background:
          'linear-gradient(180deg, rgba(3,7,18,1) 0%, rgba(3,7,18,0.98) 60%, rgba(3,7,18,0.92) 100%)',
      }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link
          to="/"
          ref={logoRef}
          className="flex items-center cursor-pointer select-none no-underline"
        >
          <img
            src={LOGO_SRC}
            alt="Markcoders"
            className="h-[40px] w-auto object-contain shrink-0"
            decoding="async"
            draggable={false}
          />
        </Link>

        <div
          ref={linksRef}
          className="hidden lg:flex items-center gap-6 xl:gap-10"
        >
          {NAV_LINKS.map((item) => {
            const isActive =
              location.pathname === item.to ||
              (item.to !== '/' &&
                !item.to.includes('#') &&
                location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`text-[16px] xl:text-[20px] transition-colors duration-300 relative group font-medium tracking-wide no-underline ${
                  isActive
                    ? 'text-[#25A9E0]'
                    : 'text-gray-300 hover:text-[#25A9E0]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#25A9E0] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div ref={btnRef} className="hidden lg:block">
          <a
            href="https://calendly.com/saarang-markcoders/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 xl:px-7 py-2.5 xl:py-3 rounded-[15px] text-base xl:text-lg font-normal text-white cursor-pointer no-underline"
            style={{
              background: '#25A9E0',
              boxShadow: '0 4px 20px rgba(26, 122, 248, 0.3)',
            }}
          >
            Get in Touch
          </a>
        </div>

        <button
          ref={hamburgerRef}
          className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-white rounded-full hamburger-line-1" />
          <span className="w-6 h-0.5 bg-white rounded-full hamburger-line-2" />
          <span className="w-4 h-0.5 bg-white rounded-full hamburger-line-3" />
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        className="lg:hidden max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="pt-6 pb-4 flex flex-col gap-4">
          {NAV_LINKS.map((item) => {
            const isActive =
              location.pathname === item.to ||
              (item.to !== '/' &&
                !item.to.includes('#') &&
                location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`transition-colors duration-300 text-base py-2 border-b border-white/5 no-underline ${
                  isActive
                    ? 'text-[#25A9E0]'
                    : 'text-gray-300 hover:text-[#25A9E0]'
                }`}
                onClick={toggleMobileMenu}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="https://calendly.com/saarang-markcoders/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-6 py-3 rounded-full text-sm font-semibold text-white w-full cursor-pointer no-underline text-center box-border"
            style={{
              background: 'linear-gradient(135deg, #1a7af8 0%, #1565d8 100%)',
            }}
            onClick={toggleMobileMenu}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>,
    document.body
  );
};

export default Navbar;

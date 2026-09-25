import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarkcodersText from "./MarkcodersText";
import BlueWaves from "./BlueWaves";

import "../App.css";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const EXPLORE_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Portfolio", to: "/portfolio" },
];

const SocialIcon = ({ name }) => {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    className: "footer__social-icon",
  };

  if (name === "instagram") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }

  // facebook
  return (
    <svg {...common} fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
};

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/markcoders",
    icon: "linkedin",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/markcodersofficial/",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/markcoders.official/",
    icon: "instagram",
  }
];

const HEADING_LINES = [
  "Design for those who want to",
  "become a better version of",
  "themselves.",
];

const Footer = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const lines = root.querySelectorAll(".js-line");
      const cta = root.querySelectorAll(".js-cta");
      const cols = root.querySelectorAll(".js-col");
      const brand = root.querySelectorAll(".js-brand");

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          // No explicit scroller: inherit ScrollTrigger.defaults, which is the
          // Locomotive container on desktop and the window on touch devices.
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        if (lines.length) {
          tl.fromTo(
            lines,
            { yPercent: 115, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.09 }
          );
        }
        if (cta.length) {
          tl.fromTo(
            cta,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.55"
          );
        }
        if (cols.length) {
          tl.fromTo(
            cols,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 },
            "-=0.5"
          );
        }
        if (brand.length) {
          tl.fromTo(
            brand,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.35"
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="footer footer-bg">
      <div className="footer-bg__waves" aria-hidden="true">
        <BlueWaves color={[0.0, 0.37, 0.97]} level={0.38} amplitude={0.08} />
      </div>
      <div className="footer__inner mx-auto w-[90%] sm:w-[92%] lg:w-[95%] max-w-[1440px] pt-16 sm:pt-20 lg:pt-24 pb-40">
        <div className="footer__top flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="footer__intro max-w-md">
            <h2
              className="footer__heading font-medium text-white"
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontSize: 'clamp(22px, 3.5vw, 35px)',
                lineHeight: 'clamp(26px, 4vw, 39px)',
                letterSpacing: '-1px',
              }}
            >
              {HEADING_LINES.map((line) => (
                <span className="footer__line-mask" key={line}>
                  <span className="js-line footer__line">{line}</span>
                </span>
              ))}
            </h2>

            <a
              href="https://calendly.com/saarang-markcoders/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="js-cta inline-flex items-center justify-center gap-2.5 px-7 text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl mt-20 group cursor-pointer"
              style={{
                height: '52.88px',
                borderRadius: '15px',
                background: '#25A9E0',
                boxShadow: '0 4px 20px rgba(37, 169, 224, 0.3)',
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 500,
                fontSize: '18px',
                lineHeight: '30px',
                letterSpacing: '-0.5px',
                textDecoration: 'none'
              }}
            >
              <svg
                width="19.08"
                height="19.08"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Get in Touch</span>
            </a>
          </div>

          <nav
            className="footer__columns flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-16 lg:gap-24"
            aria-label="Footer"
          >
            <div className="js-col footer__col">
              <h3 className="footer__col-title">Explore</h3>
              <ul>
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="js-col footer__col">
              <h3 className="footer__col-title">Socials</h3>
              <ul>
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`footer__link footer__social-link footer__social-link--${link.icon}`}
                    >
                      <SocialIcon name={link.icon} />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="js-col footer__col max-w-[280px]">
              <h3 className="footer__col-title">Contact</h3>
              <ul>
                <li>
                  <a
                    href="tel:+923341218085"
                    className="footer__link footer__social-link footer__contact-link--phone"
                  >
                    <svg
                      className="footer__social-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                    </svg>
                    <span>0334 1218085</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@markcoders.com"
                    className="footer__link footer__social-link footer__contact-link--mail"
                  >
                    <svg
                      className="footer__social-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span>info@markcoders.com</span>
                  </a>
                </li>
                <li className="footer__address footer__social-link">
                  <svg
                    className="footer__social-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                  </svg>
                  <span className="footer__address-text">
                    E15, Street No. 2, Block A,
                    <br />
                    Gulshan-e-Jamal,
                    <br />
                    Karachi
                  </span>
                </li>
              </ul>
            </div>
          </nav>
        </div>

      </div>

      <div className="js-brand footer__brand-wrap">
        <MarkcodersText />
      </div>
    </footer>
  );
};

export default Footer;

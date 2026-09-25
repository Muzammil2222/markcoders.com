import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSectionBgTransition } from "../lib/sectionBgTransition";

import chatgptImg from "../assets/ChatGPT Logo - Black - 512x512 - zonalogo.com.png";
import claudeImg from "../assets/Claude-AI-Icon---Colored---512x512---zonalogo.com.png";
import codexImg from "../assets/Codex Logo - Colored - 512x512 - zonalogo.com.png";
import cursorImg from "../assets/Cursor Icon - Black - 451x512 - zonalogo.com.png";
import geminiImg from "../assets/Google-Gemini-Icon---Colored---512x512---zonalogo.com.png";

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { name: "ChatGPT", img: chatgptImg },
  { name: "Claude", img: claudeImg },
  { name: "Codex", img: codexImg },
  { name: "Cursor", img: cursorImg },
  { name: "Gemini", img: geminiImg },
];

const cards = [
  {
    title: "App Development",
    desc: "We design and develop mobile apps, web applications, SaaS products, customer portals, dashboards, and internal tools around your users and business requirements.",
    to: "/services/app-development",
  },
  {
    title: "Website Development",
    desc: "Modern, responsive websites designed to communicate your value clearly and guide visitors toward inquiries, bookings, purchases, or other important actions.",
    to: "/services/web-development",
    isRight: true,
  },
  {
    title: "CMS Development",
    desc: "Flexible websites and online stores that give your team practical control over pages, products, media, and everyday content updates.",
    to: "/services/cms-development",
  },
  {
    title: "UI/UX Design",
    desc: "User journeys, interfaces, and interactive experiences designed around how people understand, navigate, and use your digital product.",
    to: "/services/ui-ux",
    isRight: true,
  },
  {
    title: "Graphic Design",
    desc: "Brand identities and digital visuals that help your business remain recognizable wherever customers interact with it.",
    to: "/services/graphic-design",
  },
  {
    title: "API Integration & Automation",
    desc: "Connected platforms and automated workflows that reduce repetitive work, improve data movement, and help your business tools work together.",
    to: "/services/api-integration",
    isRight: true,
  },
];

const ServiceCard = ({ card }) => (
  <Link
    to={card.to}
    className="service-card bg-white rounded-[28px] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] group cursor-pointer relative flex flex-col h-auto no-underline"
    style={{ transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(0.975)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    <h3 className="text-[32px] md:text-[36px] font-medium tracking-[-0.05em] mb-5 text-[#111]">
      {card.title}
    </h3>
    <div className="w-full h-[1px] bg-[#e5e5e5] mb-12" />
    <div className="mb-10 max-w-[95%]">
      <p className="text-[#111] text-[14px] md:text-[20px] leading-[1.4] font-medium tracking-[-0.01em]">
        {card.desc}
      </p>
    </div>
    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-9 h-9 bg-[#f2f2f2] rounded-[8px] flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110 group-hover:bg-[#e4e4e4]">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#111] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <path
          d="M4 12L12 4M12 4H5.33M12 4V10.67"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </Link>
);

const ToolsSection = () => {
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    return initSectionBgTransition(sectionRef.current, {
      from: "#f5f5f0",
      to: "#030712",
      start: "top bottom",
      end: "top 55%",
      scrub: 1.2,
      colorTargets: [
        { selector: ".tools-heading", from: "#111111", to: "#ffffff" },
        { selector: ".bottom-intro p", from: "#222222", to: "#a3a3a3" },
      ],
    });
  }, []);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    let ctx = gsap.context(() => {
      const headings = root.querySelectorAll(".tools-heading");
      const icons = root.querySelectorAll(".tool-icon");
      const bottomIntro = root.querySelector(".bottom-intro");
      const serviceCards = root.querySelectorAll(".service-card");

      // 1. Top Headings Animation
      if (headings.length) {
        gsap.fromTo(
          headings,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headings[0],
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // 2. Tools Icons Staggered Pop-in
      if (icons.length) {
        gsap.fromTo(
          icons,
          { opacity: 0, scale: 0.6, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            stagger: 0.05,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: icons[0],
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // 3. Bottom Intro Text Reveal
      if (bottomIntro) {
        gsap.fromTo(
          bottomIntro,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bottomIntro,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // 4. Cards Staggered Slide Up
      if (serviceCards.length) {
        gsap.fromTo(
          serviceCards,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: serviceCards[0],
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-snap-section
      className="relative w-full py-24 md:py-32"
      style={{
        backgroundColor: "#f5f5f0",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Top Heading with Tools */}
        <div className="flex flex-col mb-24 md:mb-32">
          <div className="overflow-hidden mb-6 md:mb-8">
            <h2
              className="tools-heading font-medium tracking-tight leading-[1.05] pb-[0.12em]"
              style={{
                fontFamily: "Switzer, sans-serif",
                fontSize: "clamp(56px, 9vw, 110px)",
                letterSpacing: "-0.04em",
              }}
            >
              Our Technology &
            </h2>
          </div>

          {/* Tools Row */}
          <div
            className="flex flex-wrap items-end justify-center md:justify-start gap-[12px] md:gap-[23px] my-2 relative z-20 h-[80px] md:h-[120px]"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {tools.map((tool, index) => {
              const isHovered = hoveredIndex === index;
              const isAdjacent =
                hoveredIndex === index - 1 || hoveredIndex === index + 1;
              const isFar = hoveredIndex !== null && !isHovered && !isAdjacent;

              // Mobile vs Desktop sizes
              const baseSize = "w-[48px] h-[48px] md:w-[73px] md:h-[73px]";
              const adjacentSize = "w-[56px] h-[56px] md:w-[84px] md:h-[84px]";
              const hoveredSize = "w-[64px] h-[64px] md:w-[104px] md:h-[104px]";

              const currentSizeClass = isHovered
                ? hoveredSize
                : isAdjacent
                  ? adjacentSize
                  : baseSize;
              return (
                <div
                  key={index}
                  className="tool-icon relative group flex flex-col items-center justify-end h-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  {/* Icon Box — light tile so black logos stay readable on dark */}
                  <div
                    className={`${currentSizeClass} rounded-[12px] md:rounded-[22px] flex items-center justify-center cursor-pointer overflow-hidden bg-[#f5f5f5]`}
                    style={{
                      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      boxShadow: isHovered
                        ? "0 16px 32px rgba(0,0,0,0.45)"
                        : isAdjacent
                          ? "0 8px 20px rgba(0,0,0,0.35)"
                          : "0 4px 12px rgba(0,0,0,0.25)",
                      transform: isHovered
                        ? "translateY(-12px)"
                        : isAdjacent
                          ? "translateY(-6px)"
                          : "translateY(0)",
                      opacity: isFar ? 0.85 : 1,
                    }}
                  >
                    <img
                      src={tool.img}
                      alt={tool.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Tooltip Label */}
                  <div
                    className="absolute top-full mt-3 pointer-events-none z-30"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      transform: isHovered
                        ? "translateY(0) scale(1)"
                        : "translateY(-10px) scale(0.95)",
                    }}
                  >
                    <span className="bg-[#1a1a1a] text-white text-[11px] font-bold py-[6px] px-[12px] rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.4)] border border-white/10 whitespace-nowrap tracking-wide">
                      {tool.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="overflow-hidden flex justify-end w-full mt-6 md:mt-8">
            <h2
              className="tools-heading font-medium tracking-tight leading-[1.05] pb-[0.12em]"
              style={{
                fontFamily: "Switzer, sans-serif",
                fontSize: "clamp(56px, 9vw, 110px)",
                letterSpacing: "-0.04em",
              }}
            >
              Your Growth.
            </h2>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="mt-16 md:mt-24">
          {/* Top Intro Text & Button */}
          <div className="bottom-intro max-w-[480px] mb-20 md:mb-32">
            <p className="text-[16px] md:text-[26px] leading-[1.4] mb-8 font-medium tracking-[-0.02em]">
              We use modern frameworks, cloud platforms and proven engineering
              practices to build secure, scalable digital products. From custom
              software and APIs to eCommerce and mobile apps, every technology
              choice is driven by performance, maintainability and business
              growth.
            </p>
            <button className="flex items-center gap-2 bg-[#23b3e8] hover:bg-[#1ca2d4] transition-colors text-white font-medium py-[12px] px-[24px] rounded-[12px] text-[18px] group">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M4 12L12 4M12 4H5.33M12 4V10.67"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              Explore Our Process
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 relative items-start">
            {/* Left Column (Shifted down for masonry effect) */}
            <div className="flex flex-col gap-6 md:gap-10 md:mt-[100px]">
              {cards
                .filter((c) => !c.isRight)
                .map((card) => (
                  <ServiceCard key={card.to} card={card} />
                ))}
            </div>

            {/* Right Column (Starts higher) */}
            <div className="flex flex-col gap-6 md:gap-10">
              {cards
                .filter((c) => c.isRight)
                .map((card) => (
                  <ServiceCard key={card.to} card={card} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;

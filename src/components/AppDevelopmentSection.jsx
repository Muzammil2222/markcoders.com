import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import appDevImg from '../assets/services/AppDevelopment-BC7DxIEZ.webp';

gsap.registerPlugin(ScrollTrigger);

const accordionData = [
  {
    title: 'Mobile App Development',
    content: 'iOS, Android, and cross-platform applications designed with intuitive navigation, reliable performance, and practical features.'
  },
  {
    title: 'Web Applications & SaaS Products',
    content: 'Custom web applications and scalable SaaS platforms built to streamline operations and enhance user experiences.'
  },
  {
    title: 'Backend, Database & Admin Systems',
    content: 'Robust server-side architecture, secure databases, and comprehensive admin panels for complete system control.'
  },
  {
    title: 'App Integrations',
    content: 'Seamless API integrations with third-party services to extend your application\'s capabilities.'
  },
  {
    title: 'Testing, Launch & Support',
    content: 'Rigorous QA testing, smooth deployment processes, and ongoing maintenance to ensure long-term success.'
  }
];

const AppDevelopmentSection = ({ previewImageRef, to }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const targetImageContainerRef = useRef(null);
  const targetImageRef = useRef(null);
  const cloneRef = useRef(null);
  const [morphComplete, setMorphComplete] = useState(false);

  useEffect(() => {
    if (!previewImageRef?.current || !targetImageContainerRef.current) return;

    const heroImg = previewImageRef.current;
    const targetContainer = targetImageContainerRef.current;

    document.querySelectorAll('.services-morph-clone').forEach((el) => el.remove());

    const timer = setTimeout(() => {
      const clone = document.createElement('img');
      clone.src = appDevImg;
      clone.alt = 'App Development';
      clone.className = 'services-morph-clone';
      clone.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        border-radius: 15px;
        object-fit: cover;
        will-change: transform, width, height, top, left;
        transition: none;
      `;
      document.body.appendChild(clone);
      cloneRef.current = clone;

      const positionClone = () => {
        const r = heroImg.getBoundingClientRect();
        clone.style.top = r.top + 'px';
        clone.style.left = r.left + 'px';
        clone.style.width = r.width + 'px';
        clone.style.height = r.height + 'px';
      };
      positionClone();

      gsap.set(clone, { opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 95%',
        end: 'top 20%',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;

          const heroRect = heroImg.getBoundingClientRect();
          const targetRect = targetContainer.getBoundingClientRect();

          const startTop = heroRect.top;
          const startLeft = heroRect.left;
          const startWidth = heroRect.width;
          const startHeight = heroRect.height;

          const endTop = targetRect.top;
          const endLeft = targetRect.left;
          const endWidth = targetRect.width;
          const endHeight = targetRect.height;

          const currentTop = startTop + (endTop - startTop) * progress;
          const currentLeft = startLeft + (endLeft - startLeft) * progress;
          const currentWidth = startWidth + (endWidth - startWidth) * progress;
          const currentHeight = startHeight + (endHeight - startHeight) * progress;
          const currentRadius = 15 + (24 - 15) * progress; // 24px is target border radius

          clone.style.top = currentTop + 'px';
          clone.style.left = currentLeft + 'px';
          clone.style.width = currentWidth + 'px';
          clone.style.height = currentHeight + 'px';
          clone.style.borderRadius = currentRadius + 'px';

          if (progress > 0.02) {
            clone.style.opacity = '1';
            heroImg.style.opacity = '0';
          } else {
            clone.style.opacity = '0';
            heroImg.style.opacity = '1';
          }

          if (progress > 0.95) {
            setMorphComplete(true);
            clone.style.opacity = '0';
          } else {
            setMorphComplete(false);
          }
        },
      });

      return () => {
        st.kill();
        clone.remove();
      };
    }, 300);

    return () => {
      clearTimeout(timer);
      if (cloneRef.current) {
        cloneRef.current.remove();
      }
    };
  }, [previewImageRef]);

  // Removed old reveal animations to replace with reel effect in parent

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-[#030712] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        
        {/* Left Side: Content & Accordion */}
        <div ref={leftContentRef} className="flex flex-col">
          <h2 className="text-[40px] md:text-[52px] lg:text-[60px] font-bold tracking-[-0.02em] leading-[1.1] mb-6" style={{ fontFamily: 'Switzer, sans-serif' }}>
            App Development
          </h2>
          <p className="text-[#a1a1aa] text-[18px] md:text-[22px] leading-[1.6] mb-12 max-w-[540px]" style={{ fontFamily: 'Switzer, sans-serif' }}>
            We design and develop mobile apps, web applications, SaaS products, customer portals, dashboards, and internal tools around your users and business requirements.
          </p>
          
          <div className="flex flex-col border-t border-white/10">
            {accordionData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-white/10 overflow-hidden">
                  <button 
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full py-6 md:py-8 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                  >
                    <span className="text-[20px] md:text-[24px] font-bold tracking-tight pr-4 transition-colors duration-300 group-hover:text-[#25A9E0]" style={{ fontFamily: 'Switzer, sans-serif' }}>
                      {item.title}
                    </span>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/50'}`}>
                      {isOpen ? (
                        <div className="w-3.5 h-[2px] bg-black" />
                      ) : (
                        <div className="relative w-3.5 h-3.5">
                          <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-white/70 group-hover:bg-white transition-colors duration-300" />
                          <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-white/70 group-hover:bg-white transition-colors duration-300" />
                        </div>
                      )}
                    </div>
                  </button>
                  
                  <div 
                    className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0 mb-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[#a1a1aa] text-[16px] md:text-[18px] leading-[1.6] max-w-[500px]" style={{ fontFamily: 'Switzer, sans-serif' }}>
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12">
            {to ? (
              <Link
                to={to}
                className="px-7 py-3 rounded-[15px] text-lg font-normal text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer flex items-center gap-3 w-fit no-underline"
                style={{
                  background: '#25A9E0',
                  boxShadow: '0 4px 20px rgba(37, 169, 224, 0.3)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-45 shrink-0">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                View Details
              </Link>
            ) : (
              <button
                type="button"
                className="px-7 py-3 rounded-[15px] text-lg font-normal text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer flex items-center gap-3"
                style={{
                  background: '#25A9E0',
                  boxShadow: '0 4px 20px rgba(37, 169, 224, 0.3)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-45 shrink-0">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                View Details
              </button>
            )}
          </div>
        </div>
        
        {/* Right Side: Image */}
        <div ref={targetImageContainerRef} className="relative w-full h-full lg:h-[800px] rounded-[24px] overflow-hidden mt-8 lg:mt-0">
          <img ref={targetImageRef} src={appDevImg} alt="App Development" className="w-full h-full object-cover rounded-[24px]" style={{ opacity: morphComplete ? 1 : 0 }} />
        </div>
        
      </div>
    </section>
  );
};

export default AppDevelopmentSection;

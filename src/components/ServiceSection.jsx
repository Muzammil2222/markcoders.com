import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceSection = ({ title, subtitle, accordionData, imageSrc, imageAlt, reverse = false, to }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageContainerRef = useRef(null);

  const ctaClassName =
    'px-7 py-3 rounded-[15px] text-lg font-normal text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer flex items-center gap-3 w-fit no-underline';
  const ctaStyle = {
    background: '#25A9E0',
    boxShadow: '0 4px 20px rgba(37, 169, 224, 0.3)',
  };

  const ctaContent = (
    <>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform -rotate-45 shrink-0"
      >
        <path
          d="M1 7H13M13 7L7 1M13 7L7 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      View Details
    </>
  );

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-[#030712] text-white overflow-hidden">
      <div className={`max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}>
        
        {/* Content Side */}
        <div ref={contentRef} className={`flex flex-col ${reverse ? 'lg:col-start-2' : ''}`}>
          <h2 className="text-[40px] md:text-[52px] lg:text-[60px] font-bold tracking-[-0.02em] leading-[1.1] mb-6" style={{ fontFamily: 'Switzer, sans-serif' }}>
            {title}
          </h2>
          <p className="text-[#a1a1aa] text-[18px] md:text-[22px] leading-[1.6] mb-12 max-w-[540px]" style={{ fontFamily: 'Switzer, sans-serif' }}>
            {subtitle}
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
              <Link to={to} className={ctaClassName} style={ctaStyle}>
                {ctaContent}
              </Link>
            ) : (
              <button type="button" className={ctaClassName} style={ctaStyle}>
                {ctaContent}
              </button>
            )}
          </div>
        </div>
        
        {/* Image Side */}
        <div ref={imageContainerRef} className={`relative w-full h-full lg:h-[800px] rounded-[24px] overflow-hidden mt-8 lg:mt-0 ${reverse ? 'lg:col-start-1' : ''}`}>
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover rounded-[24px]" />
        </div>
        
      </div>
    </section>
  );
};

export default ServiceSection;

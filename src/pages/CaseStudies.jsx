import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/landing/PageHero';
import canvasBg from '../assets/canvasbg.gif';

import imgSauced from '../assets/Portfolio/Sauced-2rG--Umz.webp';
import imgAtlas from '../assets/Portfolio/Cozy101-DOKmVxsg.webp';
import imgMeridian from '../assets/Portfolio/alextarnava-DvmfbhVB.webp';
import imgVantage from '../assets/Portfolio/vantage-CmEHyY-D.webp';
import imgAura from '../assets/Portfolio/eko-DF8SVeeE.webp';
import imgDPacific from '../assets/Portfolio/checkmyride-CSxqntTt.webp';
import imgEasylife from '../assets/Portfolio/gardeninminutes-D0oKrHHj.webp';
import imgScanZilla from '../assets/Portfolio/farkle-C0Whz4yg.webp';
import imgNexus from '../assets/Portfolio/wordsmith-DpXww4zo.webp';

const CASE_STUDIES = [
  {
    id: 1,
    title: 'Sauced',
    highlight: 'Discover & Share',
    tags: '• Design • Development',
    category: 'Mobile Apps',
    description: 'Full-platform design and mobile app rollout for Sauced — the hot sauce discovery platform connecting 685K+ sauce lovers, brand pros, and event organizers in one fiery experience.',
    image: imgSauced,
    link: '#',
  },
  {
    id: 2,
    title: 'Project',
    highlight: 'Atlas',
    tags: '• Design • Development',
    category: 'Web Apps',
    description: 'A fully custom B2B ERP platform that replaced spreadsheets and phone-tag with a unified system — covering interactive quoting, field measurement capture, production tracking, and CRM sync for a specialty manufacturer with a nationwide dealer network.',
    image: imgAtlas,
    link: '#',
  },
  {
    id: 3,
    title: 'Project',
    highlight: 'Meridian',
    tags: '• Design • Development',
    category: 'Web Apps',
    description: 'Cross-border order fulfillment automation platform that connects e-commerce storefronts, overseas factories, and international shipping providers into one seamless, role-based pipeline.',
    image: imgMeridian,
    link: '#',
  },
  {
    id: 4,
    title: 'Project',
    highlight: 'Vantage',
    tags: '• Design • Development',
    category: 'Websites',
    description: 'Automotive inventory automation platform that eliminates manual feed processing, enables self-service dealer configuration, and keeps hundreds of dealership websites in perfect sync — automatically.',
    image: imgVantage,
    link: '#',
  },
  {
    id: 5,
    title: 'Project',
    highlight: 'Aura',
    tags: '• Design • Development',
    category: 'Mobile Apps',
    description: 'A full-stack AI-powered mental wellness mobile app — featuring a voice-first therapy interface, adaptive mood intelligence, and a full suite of personalized mental health tools built entirely in React Native.',
    image: imgAura,
    link: '#',
  },
  {
    id: 6,
    title: 'D-Pacific',
    highlight: 'Distribution',
    tags: '• Design • Development',
    category: 'Web Apps',
    description: 'A purpose-built distribution ERP for a fast-moving FMCG distributor — covering multi-role dashboards, product & stock management, order tracking, invoicing, and payment collection across a live field sales network.',
    image: imgDPacific,
    link: '#',
  },
  {
    id: 7,
    title: 'Easylife Kitchens',
    highlight: 'DQS',
    tags: '• Design • Development',
    category: 'Web Apps',
    description: 'A Dynamic Quoting & Order Intelligence Platform for South Africa\'s leading kitchen manufacturer — connecting 45+ showrooms, franchise branches, and factory pricing into one seamless system.',
    image: imgEasylife,
    link: '#',
  },
  {
    id: 8,
    title: '',
    highlight: 'ScanZilla',
    tags: '• Design • Development',
    category: 'Web Apps',
    description: 'An AI-powered document scanning and data extraction platform that transforms raw documents, receipts, and forms into structured, searchable, and actionable data — eliminating manual data entry at scale.',
    image: imgScanZilla,
    link: '#',
  },
  {
    id: 9,
    title: 'Project',
    highlight: 'Nexus',
    tags: '• Design • Development',
    category: 'Web Apps',
    description: 'A full-stack project collaboration platform that unifies team communication, file management, structured action tracking, automated escalation, and role-based visibility in one centralized workspace.',
    image: imgNexus,
    link: '#',
  },
];

const FILTERS = ['All', 'Websites', 'Mobile Apps', 'Web Apps'];

const CaseStudiesHero = () => {
  return (
    <section className="relative min-h-[60svh] lg:min-h-[70svh] flex flex-col justify-end pt-28 pb-12 px-6 md:px-10 lg:px-16 overflow-visible z-10">
      <img
        src={canvasBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 opacity-80"
        style={{ filter: 'brightness(0.9) contrast(1.1)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(rgb(0, 6, 11) 0%, rgb(0 0 0 / 89%) 25%, rgba(0, 6, 11, 0.3) 50%, rgba(0, 6, 11, 0.8) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 35%, rgba(26, 122, 248, 0.15) 0%, transparent 65%)',
        }}
      />
      
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center pb-12">
        <PageHero
          title="Case Studies"
          subtitle="We work with innovators of all sizes, from startups to industry leaders, to create exceptional products and drive meaningful change."
          layout="split"
          spread
          showDot
          titleSize="clamp(64px, 12vw, 150px)"
          className="flex-1"
          titleClassName="!tracking-[-1.4px] my-auto"
          subtitleClassName="text-[20px] sm:text-[24px] lg:!text-[28px] leading-[1.3] font-[500] tracking-[-1px] text-white/90"
          subtitleContainerClassName="max-w-xl lg:max-w-2xl"
        />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(3,7,18,1) 100%)',
        }}
      />
    </section>
  );
};

const CaseStudies = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredStudies = CASE_STUDIES.filter(study => 
    activeFilter === 'All' || study.category === activeFilter
  );

  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
      <Navbar />
      
      <main className="w-full flex-1">
        <CaseStudiesHero />
        
        {/* Filters Section */}
        <div className="relative z-50 -mt-8 mb-12 flex w-full max-w-xl mx-auto flex-wrap items-center justify-center gap-1.5 rounded-3xl border border-white/10 bg-[#141414] p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_40px_rgba(0,0,0,0.45)] sm:-mt-12 sm:gap-2 sm:rounded-full sm:p-2 px-4">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:px-5 sm:text-sm ${
                activeFilter === filter 
                  ? 'bg-[#25a9e0] text-white' 
                  : 'text-white/55 hover:bg-white/5 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid Section */}
        <section className="relative z-0 w-full bg-[#030712] pb-20 sm:pb-28">
          <div className="px-5 sm:px-10 lg:px-16 max-w-[1600px] mx-auto">
            <div className="grid w-full gap-8 sm:gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-14">
              {filteredStudies.map(study => (
                <article key={study.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0A] sm:rounded-[1.75rem] aspect-[4/3]">
                    {/* Hover Overlay Desktop */}
                    <div className="absolute inset-0 hidden flex-col justify-between bg-black/80 p-8 sm:p-10 lg:flex lg:p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="relative z-10 max-w-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h2 className="text-[clamp(1.85rem,3.2vw,2.85rem)] font-black leading-[1.1] tracking-tight text-white">
                          {study.title} <span className="text-[#25a9e0]">{study.highlight}</span>
                        </h2>
                        <p className="mt-5 line-clamp-4 text-xl leading-relaxed text-white/70 sm:text-2xl">
                          {study.description}
                        </p>
                      </div>
                      <a className="relative z-10 mt-8 inline-flex w-fit items-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-black transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#25a9e0] hover:text-white translate-y-4 group-hover:translate-y-0" href={study.link}>
                        View Case Study
                      </a>
                    </div>
                    <img src={study.image} alt={study.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  
                  {/* Text Mobile/Tablet */}
                  <div className="mt-4 px-0.5 sm:mt-5 sm:px-1">
                    <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                      {study.title} {study.highlight}
                    </h3>
                    <p className="mt-1 text-sm text-white/55 sm:mt-1.5 sm:text-base">{study.tags}</p>
                    <p className="mt-2 line-clamp-3 text-base leading-relaxed text-white/70 lg:hidden">
                      {study.description}
                    </p>
                    <a className="mt-3 inline-flex items-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#25a9e0] hover:text-white lg:hidden" href={study.link}>
                      View Case Study
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;

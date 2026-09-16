import React, { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { caseStudiesData } from '../data/caseStudiesData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TrustSection from '../components/TrustSection';
import WorkAndPlaySection from '../components/WorkAndPlaySection';
import TeamSection from '../components/TeamSection.jsx';
import { getLocoScroll, scrollToTarget } from '../lib/scrollBus';

gsap.registerPlugin(ScrollTrigger);

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const data = caseStudiesData[slug];

  const heroTextRef = useRef(null);
  const heroContentRef = useRef(null);
  const problemsRef = useRef(null);
  const featuresRef = useRef(null);
  const beforeAfterRef = useRef(null);
  const testimonialTextRef = useRef(null);

  useEffect(() => {
    // Reset to top via Locomotive (window.scrollTo alone does nothing under loco)
    const loco = getLocoScroll();
    if (loco) {
      loco.scrollTo(0, { duration: 0, disableLerp: true });
    }
    window.scrollTo(0, 0);

    // Strip leftover hash from a previous #overview click so browser doesn't re-jump
    if (window.location.hash) {
      const { pathname, search } = window.location;
      window.history.replaceState(null, '', `${pathname}${search}`);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (heroContentRef.current) {
        tl.fromTo(heroContentRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
        );
      }

      if (heroTextRef.current) {
        gsap.to(heroTextRef.current, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroTextRef.current.parentElement,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (testimonialTextRef.current) {
        gsap.to(testimonialTextRef.current, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: testimonialTextRef.current.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      const fadeSections = [problemsRef.current, featuresRef.current, beforeAfterRef.current];
      fadeSections.forEach((section) => {
        if (section) {
          gsap.fromTo(section,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [slug]);

  const handleExplore = (e) => {
    e.preventDefault();
    scrollToTarget('#overview', { offset: -96, duration: 900 });
  };

  if (!data) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
      <Navbar />
      <main className="w-full flex-1 bg-black text-white">
        {/* 1. Hero Section */}
        <section className="relative isolate w-full overflow-hidden pb-12 pt-24 sm:min-h-[90svh] sm:pb-20 sm:pt-32 lg:flex lg:min-h-[85svh] lg:items-center">
          {/* Parallax Background Text */}
          <p
            ref={heroTextRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none text-center text-[12vw] font-bold leading-[0.9] tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.08)]"
          >
            MARK<br />CODERS
          </p>

          <div className="relative z-10 mx-auto w-[calc(100%-48px)] md:w-[calc(100%-80px)] lg:w-[calc(100%-128px)] max-w-[1400px]" ref={heroContentRef}>
            <div className="mt-6 grid items-center gap-8 sm:mt-8 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
              <div>
                {/* Breadcrumbs */}
                <p className="mb-6 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/55 sm:text-sm">
                  <Link className="transition-colors hover:text-white" to="/">Home</Link>
                  <span>/</span>
                  <Link className="transition-colors hover:text-white" to="/case-studies">Case Studies</Link>
                  <span>/</span>
                  <span className="text-white/70">{data.title}</span>
                </p>

                <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <span className="size-2 shrink-0 rounded-full bg-[#25a9e0]"></span>
                  <span className="truncate text-xs text-white/90 sm:text-sm">{data.badge || 'Case Study'}</span>
                </span>

                <h1 className="mt-5 text-[clamp(2rem,8vw,4.75rem)] font-bold leading-[1.08] tracking-tight sm:mt-6">
                  {data.highlight ? (
                    <>
                      {data.title} <span className="text-[#25a9e0]">{data.highlight}</span>
                    </>
                  ) : (
                    <span className="text-[#25a9e0]">{data.title}</span>
                  )}
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg">
                  {data.description}
                </p>

                <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  <button
                    type="button"
                    onClick={handleExplore}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25a9e0] px-5 py-3 text-sm font-medium text-white transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#1a85b8] hover:shadow-[0_8px_28px_rgba(37,169,224,0.35)] sm:w-auto sm:gap-2.5 sm:px-7 sm:py-3.5 sm:text-base cursor-pointer border-0"
                  >
                    Explore Case Study
                  </button>
                  <a
                    href="https://calendly.com/jared-dean-techdejure"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/80 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black sm:w-auto sm:px-7 sm:py-3.5 sm:text-base no-underline cursor-pointer"
                  >
                    Start a Project
                  </a>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[533px] overflow-hidden rounded-2xl bg-[#0A0A0A] sm:rounded-[1.75rem] aspect-[533/460] lg:ml-auto lg:mr-0 lg:h-[460px]">
                {data.image && (
                  <img src={data.image} alt={data.title} className="h-full w-full object-cover" />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Stats Section */}
        {data.stats && (
          <section className="border-t border-white/10 bg-black">
            <div className="mx-auto grid w-[calc(100%-48px)] md:w-[calc(100%-80px)] lg:w-[calc(100%-128px)] max-w-[1400px] grid-cols-2 lg:grid-cols-4">
              {data.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-6 sm:px-10 sm:py-10 ${idx % 2 !== 0 ? 'border-l border-white/10' : ''} ${idx >= 2 ? 'border-t border-white/10 lg:border-t-0 lg:border-l' : ''}`}
                >
                  <p className="text-lg font-bold tracking-tight text-[#25a9e0] sm:text-2xl">{stat.value}</p>
                  <p className="mt-1.5 text-xs leading-snug text-white/55 sm:mt-2 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Overview / Problems */}
        {data.overview && (
          <section id="overview" className="scroll-mt-24 bg-white py-12 text-black sm:py-24" ref={problemsRef}>
            <div className="mx-auto w-[calc(100%-48px)] md:w-[calc(100%-80px)] lg:w-[calc(100%-128px)] max-w-[1400px]">
              <div className="grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-16">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/20 bg-white px-3.5 py-1.5 sm:gap-2.5 sm:px-4 sm:py-2">
                  <span className="size-2 rounded-full bg-[#25a9e0] sm:size-2.5"></span>
                  <span className="text-xs font-semibold tracking-tight sm:text-sm">{data.overview.tag}</span>
                </div>
                <div>
                  <h2 className="text-[clamp(1.5rem,5.5vw,3.25rem)] font-bold leading-[1.15] tracking-tight">
                    {data.overview.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-black/55 sm:mt-4 sm:text-lg">
                    {data.overview.description}
                  </p>
                </div>
              </div>

              {data.overview.cards && (
                <div className="mt-8 grid gap-3 sm:mt-12 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.overview.cards.map((card, idx) => (
                    <article key={idx} className="flex min-h-0 flex-col justify-between rounded-2xl bg-[#F4F4F4] p-5 sm:min-h-[16rem] sm:rounded-[1.5rem] sm:p-7 transition-transform hover:-translate-y-1 duration-300">
                      <span className="text-xs text-black/45 sm:text-sm">{card.num}</span>
                      <div className="mt-6 sm:mt-0">
                        <h3 className="text-lg font-bold tracking-tight sm:text-2xl">{card.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-black/55 sm:mt-3 sm:text-base">{card.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. Mid Quote Statement */}
        {data.midQuote && (
          <section className="bg-black py-10 sm:py-16">
            <div className="mx-auto w-[calc(100%-48px)] md:w-[calc(100%-80px)] lg:w-[calc(100%-128px)] max-w-[1400px]">
              <p className="max-w-5xl text-base font-medium leading-relaxed text-white sm:text-xl">
                <span>{data.midQuote.text} </span>
                <span className="text-[#25a9e0]">{data.midQuote.highlight}</span>
                <span> {data.midQuote.suffix}</span>
              </p>
            </div>
          </section>
        )}

        {/* 5. What We Built */}
        {data.whatWeBuilt && (
          <section className="bg-white py-12 text-black sm:py-24" ref={featuresRef}>
            <div className="mx-auto w-[calc(100%-48px)] md:w-[calc(100%-80px)] lg:w-[calc(100%-128px)] max-w-[1400px]">
              <div className="grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-16">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/20 bg-white px-3.5 py-1.5 sm:gap-2.5 sm:px-4 sm:py-2">
                  <span className="size-2 rounded-full bg-[#25a9e0] sm:size-2.5"></span>
                  <span className="text-xs font-semibold tracking-tight sm:text-sm">{data.whatWeBuilt.tag}</span>
                </div>
                <div>
                  <h2 className="text-[clamp(1.5rem,5.5vw,3.25rem)] font-bold leading-[1.15] tracking-tight">
                    {data.whatWeBuilt.title} <span className="text-[#25a9e0]">{data.whatWeBuilt.highlight}</span>
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-black/55 sm:mt-4 sm:text-lg">
                    {data.whatWeBuilt.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-black/8 sm:mt-12 sm:rounded-[1.5rem]">
                <div className="hidden bg-black px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white sm:grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
                  <span>Feature</span>
                  <span>Description</span>
                </div>

                {data.whatWeBuilt.features.map((feature, idx) => (
                  <div key={idx} className={`grid grid-cols-1 gap-1.5 px-4 py-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:items-center sm:gap-8 sm:px-7 sm:py-5 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F4F4F4]'}`}>
                    <p className="text-base font-bold tracking-tight sm:text-base">{feature.title}</p>
                    <p className="text-base leading-relaxed text-black/55 sm:text-lg">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Before & After */}
        {data.beforeAfter && (
          <section className="bg-[#F4F4F4] py-12 text-black sm:py-24" ref={beforeAfterRef}>
            <div className="mx-auto w-[calc(100%-48px)] md:w-[calc(100%-80px)] lg:w-[calc(100%-128px)] max-w-[1400px]">
              <div className="grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-16">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/20 bg-white px-3.5 py-1.5 sm:gap-2.5 sm:px-4 sm:py-2">
                  <span className="size-2 rounded-full bg-[#25a9e0] sm:size-2.5"></span>
                  <span className="text-xs font-semibold tracking-tight sm:text-sm">{data.beforeAfter.tag}</span>
                </div>
                <h2 className="text-[clamp(1.5rem,5.5vw,3.25rem)] font-bold leading-[1.15] tracking-tight">
                  {data.beforeAfter.title} <span className="text-[#25a9e0]">{data.beforeAfter.highlight}</span> {data.beforeAfter.suffix}
                </h2>
              </div>

              {/* Mobile Stacked Cards */}
              <div className="mt-8 space-y-3 sm:hidden">
                {data.beforeAfter.items.map((item, idx) => (
                  <article key={idx} className="rounded-2xl border border-black/8 bg-white p-4">
                    <p className="text-base font-bold tracking-tight">{item.area}</p>
                    <div className="mt-3 grid gap-3">
                      <div>
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-black/45">Before</p>
                        <p className="mt-1 text-sm text-black/55">{item.before}</p>
                      </div>
                      <div>
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-black/45">After</p>
                        <p className="mt-1 text-sm font-medium text-[#25a9e0]">{item.after}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Desktop Table Layout */}
              <div className="mt-12 hidden overflow-hidden rounded-[1.5rem] border border-black/8 sm:block">
                <div className="grid grid-cols-3 bg-black px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  <span>Area</span>
                  <span>Before</span>
                  <span>After</span>
                </div>
                {data.beforeAfter.items.map((item, idx) => (
                  <div key={idx} className={`grid grid-cols-3 items-center gap-6 px-7 py-5 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F4F4F4]'}`}>
                    <p className="font-bold tracking-tight">{item.area}</p>
                    <p className="text-sm text-black/55 sm:text-base">{item.before}</p>
                    <p className="text-sm font-medium text-[#25a9e0] sm:text-base">{item.after}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 7. Testimonial / Quote */}
        {data.testimonial && (
          <section className="relative isolate overflow-hidden bg-black py-12 sm:py-24">
            <p
              ref={testimonialTextRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none text-center text-[12vw] font-bold leading-[0.9] tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.08)]"
            >
              MARK<br />CODERS
            </p>
            <div className="relative z-10 mx-auto w-[calc(100%-48px)] md:w-[calc(100%-80px)] lg:w-[calc(100%-128px)] max-w-[1400px]">
              <p className="text-4xl font-bold leading-none text-[#25a9e0]/40 sm:text-6xl">“</p>
              <p className="mt-3 max-w-4xl text-base font-medium leading-relaxed sm:mt-4 sm:text-xl">
                <span>{data.testimonial.quote}</span>
                <span className="text-[#25a9e0]">{data.testimonial.highlight}</span>
                <span>{data.testimonial.suffix}</span>
              </p>
              <div className="mt-6 flex items-center gap-3 sm:mt-8">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#25a9e0] text-sm font-bold sm:size-11">
                  {data.testimonial.authorInitials}
                </span>
                <div>
                  <p className="text-sm font-bold sm:text-base">{data.testimonial.authorName}</p>
                  <p className="text-xs text-white/55 sm:text-sm">{data.testimonial.authorTitle}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <TeamSection roundedTop={true} />
        <WorkAndPlaySection />
        <TrustSection />

      </main>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;

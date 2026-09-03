import Navbar from '../components/Navbar';
import SplashCursor from '../components/SplashCursor';
import Footer from '../components/Footer';
import ServicesHero from '../components/ServicesHero';
import AppDevelopmentSection from '../components/AppDevelopmentSection';
import ServiceSection from '../components/ServiceSection';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Assets
import websiteDevImg from '../assets/services/WebsiteDevelopment-CsTaI-wB.webp';
import cmsDevImg from '../assets/services/CMSDevelopment-BqtLsmuH.webp';
import uiuxImg from '../assets/services/UIUXDesign-Drsg_a-L.webp';
import graphicDesignImg from '../assets/services/GraphicDesign-DhYkR5Ad.webp';
import apiImg from '../assets/services/API-lG8GiBXY.webp';

const websiteDevData = [
  { title: 'Marketing & Brand Websites', content: 'Purpose-built websites for companies, service providers, startups, and established brands that need a stronger online presence.' },
  { title: 'Landing Pages & Lead Generation', content: 'High-converting landing pages designed specifically to capture leads, drive sales, and maximize your marketing ROI.' },
  { title: 'Responsive Development', content: 'Pixel-perfect implementations ensuring your website looks and functions flawlessly across all devices and screen sizes.' },
  { title: 'Performance & Technical SEO', content: 'Optimized code structure, lightning-fast load times, and best practices to ensure search engines can easily crawl and rank your site.' },
  { title: 'Forms, Booking & CRM Connections', content: 'Seamlessly integrated contact forms, scheduling systems, and CRM tools to capture user data effortlessly.' },
];

const cmsDevData = [
  { title: 'WordPress Development', content: 'Custom WordPress websites, themes, page templates, plugins, blogs, service pages, and content management setups.' },
  { title: 'Shopify & WooCommerce', content: 'Robust e-commerce solutions tailored for physical and digital products, with streamlined checkout experiences.' },
  { title: 'Webflow & Framer Development', content: 'Next-generation visual development for ultra-fast, highly customized, and visually stunning marketing websites.' },
  { title: 'Content Migration & Organization', content: 'Secure and structured transferring of your existing data, posts, and media to your new platform without losing SEO value.' },
  { title: 'CMS Training & Support', content: 'Comprehensive hand-off sessions and ongoing assistance so your team feels confident managing everyday updates.' },
];

const uiuxData = [
  { title: 'User Research & Experience Strategy', content: 'We study your users, goals, product requirements, and common challenges before planning the experience.' },
  { title: 'Information Architecture & User Flows', content: 'Logical structuring of content and intuitive pathways designed to guide users seamlessly from entry to conversion.' },
  { title: 'Wireframes & Interactive Prototypes', content: 'Low and high-fidelity clickable mockups that allow you to test and validate ideas before development begins.' },
  { title: 'Interface Design', content: 'Beautiful, modern, and accessible visual designs that align perfectly with your brand identity and aesthetic goals.' },
  { title: 'Design Systems & Developer Handoff', content: 'Comprehensive style guides and component libraries ensuring consistency and smooth transitions to the engineering team.' },
];

const graphicDesignData = [
  { title: 'Brand Identity & Logo Design', content: 'Logos, typography, color palettes, and visual guidelines created to give your business a recognizable identity.' },
  { title: 'Marketing & Sales Materials', content: 'Brochures, flyers, business cards, and promotional assets designed to leave a lasting impression in the physical world.' },
  { title: 'Social Media & Advertising Design', content: 'Eye-catching graphics and ad creatives optimized for engagement across various social platforms.' },
  { title: 'Presentations & Pitch Decks', content: 'Professional and persuasive slide decks crafted to help you secure funding, close deals, or captivate an audience.' },
  { title: 'Website, App & Print Graphics', content: 'Custom illustrations, icons, and supporting visual elements tailored specifically for your digital and print mediums.' },
];

const apiData = [
  { title: 'Custom API Development', content: 'Secure APIs that allow websites, applications, databases, and external services to exchange information reliably.' },
  { title: 'Third-Party Platform Integrations', content: 'Connecting your custom software with essential tools like Stripe, Twilio, SendGrid, Google Workspace, and more.' },
  { title: 'Workflow Automation', content: 'Automating repetitive tasks between your internal tools to save time, reduce human error, and increase efficiency.' },
  { title: 'CRM, Payment & Booking Connections', content: 'Synchronizing customer data, automating invoicing, and handling complex booking schedules seamlessly.' },
  { title: 'Data Synchronization & Monitoring', content: 'Real-time data mapping and robust error tracking to ensure all connected systems stay perfectly aligned.' },
];

function Services() {
  const previewImageRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.reel-item');
      
      items.forEach((item) => {
        gsap.set(item, { transformPerspective: 2500, transformOrigin: 'center center' });
        
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
            end: "bottom 5%",
            scrub: 1,
          }
        });
        
        // Starts tilted back at the bottom, flattens in center
        tl.fromTo(item, 
          { rotationX: -25, scale: 0.85, opacity: 0.4 }, 
          { rotationX: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
        )
        // Tilts forward at the top
        .to(item, 
          { rotationX: 25, scale: 0.85, opacity: 0.4, duration: 1, ease: "power2.in" }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={12}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#005ef7"
      />
      <Navbar />
      <main ref={mainRef}>
        <ServicesHero previewImageRef={previewImageRef} />
        
        <div className="reel-item">
          <AppDevelopmentSection previewImageRef={previewImageRef} />
        </div>
        
        <div className="reel-item">
          <ServiceSection 
            title="Website Development"
            subtitle="Modern, responsive websites designed to communicate your value clearly and guide visitors toward inquiries, bookings, purchases, or other important actions."
            accordionData={websiteDevData}
            imageSrc={websiteDevImg}
            imageAlt="Website Development"
          />
        </div>

        <div className="reel-item">
          <ServiceSection 
            title="CMS Development"
            subtitle="Flexible websites and online stores that give your team practical control over pages, products, media, and everyday content updates."
            accordionData={cmsDevData}
            imageSrc={cmsDevImg}
            imageAlt="CMS Development"
          />
        </div>

        <div className="reel-item">
          <ServiceSection 
            title="UI/UX Design"
            subtitle="User journeys, interfaces, and interactive experiences designed around how people understand, navigate, and use your digital product."
            accordionData={uiuxData}
            imageSrc={uiuxImg}
            imageAlt="UI/UX Design"
          />
        </div>

        <div className="reel-item">
          <ServiceSection 
            title="Graphic Design"
            subtitle="Brand identities and digital visuals that help your business remain recognizable wherever customers interact with it."
            accordionData={graphicDesignData}
            imageSrc={graphicDesignImg}
            imageAlt="Graphic Design"
          />
        </div>

        <div className="reel-item">
          <ServiceSection 
            title="API Integration & Automation"
            subtitle="Connected platforms and automated workflows that reduce repetitive work, improve data movement, and help your business tools work together."
            accordionData={apiData}
            imageSrc={apiImg}
            imageAlt="API Integration & Automation"
          />
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default Services;

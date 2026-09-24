import image14 from '../../../assets/image 14.webp';
import image15 from '../../../assets/image 15.png';
import vantageImg from '../../../assets/vantage.webp';
import saucedImg from '../../../assets/sauced.webp';
import savmontImg from '../../../assets/Savmont.webp';
import jerseyImg from '../../../assets/jersey2.webp';

// Same layout as other service pages — swap text/images when content is ready
export const webDevelopmentData = {
  hero: {
    title: 'Web Development',
    subtitle: 'Modern, responsive websites designed to communicate your value clearly and guide visitors toward action.',
    cardTitle: 'Our work',
    cardSubtitle: 'Building digital experiences that convert',
    cardImage: image14,
    cardImageAlt: 'Our work',
  },
  showcase: {
    imageSrc: image14,
    imageAlt: 'Web development showcase',
  },
  offerings: {
    headingLine1: 'Web Development That',
    headingLine2: 'Drives Real Results',
    headingIndent: 'Web ',
    collageImage: image15,
    collageAlt: 'Web development collage',
    items: [
      'Discovery & Content Review',
      'Sitemap & User Journey',
      'Wireframes & Content Planning',
      'UI Design & Approval',
      'Responsive Development',
      'QA, SEO & Integrations',
      'Launch & Support',
    ],
  },
  framework: {
    headingLine1: 'A framework that',
    headingLine2: 'drives excellence',
    ctaLabel: 'Discuss Our Approach',
    cards: [
      {
        title: 'DISCOVER',
        number: '01',
        description:
          'Understand your business goals, audience, content, functionality, and conversion priorities.',
        items: ['Business & user goals', 'Competitor research', 'Feature & content planning'],
      },
      {
        title: 'PLAN',
        number: '02',
        description:
          'Define website structure, user journeys, technical requirements, integrations, and the right technology stack.',
        items: ['Sitemap & user flows', 'Technical architecture', 'CMS & integration planning'],
      },
      {
        title: 'DEVELOP',
        number: '03',
        description:
          'Build a responsive, secure, SEO-ready website engineered for speed, usability, and scalability.',
        items: ['Front-end & back-end development', 'Responsive implementation', 'CMS & API integrations'],
      },
      {
        title: 'OPTIMIZE & LAUNCH',
        number: '04',
        description:
          'Test, optimize, and deploy your website for strong performance, search visibility, and reliable operation.',
        items: ['Technical SEO', 'Performance & QA testing', 'Deployment & monitoring'],
      },
    ],
  },
  featuredWork: {
    titleLine1: 'Featured',
    titleLine2: 'Work.',
    images: [
      { src: vantageImg, alt: 'Vantage', link: 'https://vantage-contractors.com/' },
      { src: saucedImg, alt: 'Sauced', link: 'https://play.google.com/store/apps/details?id=com.sauced&pcampaignid=web_share' },
      { src: savmontImg, alt: 'Savmont', link: 'https://strive-d595ee.webflow.io/' },
      { src: jerseyImg, alt: 'TIG The Jersey Generator', link: 'https://thejerseygenerator.com/' },
    ],
  },
};

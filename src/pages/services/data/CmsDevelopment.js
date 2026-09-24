import image14 from '../../../assets/image 14.webp';
import image15 from '../../../assets/image 15.png';
import vantageImg from '../../../assets/vantage.webp';
import saucedImg from '../../../assets/sauced.webp';
import savmontImg from '../../../assets/Savmont.webp';
import jerseyImg from '../../../assets/jersey2.webp';

export const CmsDevelopmentData = {
  hero: {
    title: 'CMS Development',
    subtitle: 'Flexible websites and online stores that give your team practical control over pages, products, and content.',
    cardTitle: 'Our work',
    cardSubtitle: 'Content systems your team can own',
    cardImage: image14,
    cardImageAlt: 'Our work',
  },
  showcase: {
    imageSrc: image14,
    imageAlt: 'CMS development showcase',
  },
  offerings: {
    headingLine1: 'CMS Development That',
    headingLine2: 'Puts You in Control',
    headingIndent: 'CMS ',
    collageImage: image15,
    collageAlt: 'CMS development collage',
    items: [
      'Platform & Content Review',
      'CMS Architecture',
      'User Roles & Workflows',
      'Design & Template Planning',
      'CMS Development & Migration',
      'Testing & Team Training',
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
          'Define content structure, publishing workflows, integrations, user roles, and website goals before development.',
        items: ['Content & workflow audit', 'CMS requirements', 'Integration planning'],
      },
      {
        title: 'ARCHITECT',
        number: '02',
        description:
          'Plan scalable content models, templates, permissions, plugins, and technical architecture around your CMS.',
        items: ['Content architecture', 'Roles & permissions', 'Plugin & API planning'],
      },
      {
        title: 'DEVELOP',
        number: '03',
        description:
          'Build a secure, responsive, easy-to-manage CMS website tailored to your content and business requirements.',
        items: ['Custom themes & components', 'CMS customization', 'Third-party integrations'],
      },
      {
        title: 'MIGRATE & LAUNCH',
        number: '04',
        description:
          'Move content safely, validate functionality, optimize performance, and deploy the CMS to production.',
        items: ['Content migration', 'QA & performance testing', 'Deployment & training'],
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

import image14 from '../../../assets/image 14.webp';
import image15 from '../../../assets/image 15.png';
import vantageImg from '../../../assets/vantage.webp';
import saucedImg from '../../../assets/sauced.webp';
import savmontImg from '../../../assets/Savmont.webp';
import jerseyImg from '../../../assets/jersey2.webp';

export const AppDevelopmentData = {
  hero: {
    title: 'App Development',
    subtitle: 'Mobile apps, web applications, and SaaS products built around your users and business requirements.',
    cardTitle: 'Our work',
    cardSubtitle: 'Shipping products that scale with you',
    cardImage: image14,
    cardImageAlt: 'Our work',
  },
  showcase: {
    imageSrc: image14,
    imageAlt: 'App development showcase',
  },
  offerings: {
    headingLine1: 'App Development That',
    headingLine2: 'Powers Real Products',
    headingIndent: 'App ',
    collageImage: image15,
    collageAlt: 'App development collage',
    items: [
      'Mobile app development (iOS, Android, cross-platform)',
      'Web applications and SaaS products',
      'Backend, database and admin systems',
      'App integrations and third-party services',
      'Testing, launch and ongoing support',
      'Performance, security and scalability',
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
          'Define app goals, target users, core features, and technical requirements before development begins.',
        items: ['Product requirements', 'User & feature research', 'Technical feasibility'],
      },
      {
        title: 'ARCHITECT',
        number: '02',
        description:
          'Plan a scalable mobile app architecture, user flows, APIs, database structure, and technology stack.',
        items: ['Application architecture', 'API & database planning', 'Technology selection'],
      },
      {
        title: 'DEVELOP',
        number: '03',
        description:
          'Build secure, high-performance iOS and Android applications with clean, maintainable code.',
        items: ['Front-end & back-end development', 'API & third-party integrations', 'Scalable codebase'],
      },
      {
        title: 'TEST & LAUNCH',
        number: '04',
        description:
          'Validate quality, performance, and security before releasing a production-ready mobile application.',
        items: ['QA & device testing', 'Performance optimization', 'App Store & Play Store deployment'],
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

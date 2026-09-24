import image14 from '../../../assets/image 14.webp';
import image15 from '../../../assets/image 15.png';
import vantageImg from '../../../assets/vantage.webp';
import saucedImg from '../../../assets/sauced.webp';
import savmontImg from '../../../assets/Savmont.webp';
import jerseyImg from '../../../assets/jersey2.webp';

// Same layout as other service pages — swap text/images when content is ready
export const apiIntegrationData = {
  hero: {
    title: 'API',
    subtitle: 'Connected platforms and automated workflows that help your business tools work together.',
    cardTitle: 'Our work',
    cardSubtitle: 'Integrations that remove friction',
    cardImage: image14,
    cardImageAlt: 'Our work',
  },
  showcase: {
    imageSrc: image14,
    imageAlt: 'API integration showcase',
  },
  offerings: {
    headingLine1: 'API Services That',
    headingLine2: 'Connect Your Stack',
    headingIndent: 'API ',
    collageImage: image15,
    collageAlt: 'API integration collage',
    items: [
      'Workflow & System Review',
      'Integration Planning',
      'Data Mapping & Security',
      'API & Automation Development',
      'Testing & Error Handling',
      'Deployment & Documentation',
      'Monitoring & Support',
    ],
  },
  framework: {
    headingLine1: 'A framework that',
    headingLine2: 'drives excellence',
    ctaLabel: 'Discuss Our Approach',
    cards: [
      {
        title: 'ANALYZE',
        number: '01',
        description:
          'Map workflows, systems, repetitive tasks, data movement, and integration opportunities across your operations.',
        items: ['Workflow audit', 'System & data mapping', 'Automation opportunities'],
      },
      {
        title: 'ARCHITECT',
        number: '02',
        description:
          'Design secure automation flows and API connections that keep systems reliable and data synchronized.',
        items: ['Integration architecture', 'API & webhook planning', 'Security & error handling'],
      },
      {
        title: 'INTEGRATE & AUTOMATE',
        number: '03',
        description:
          'Build custom API integrations and automated workflows that reduce manual work and connect your tools.',
        items: ['API & third-party integrations', 'Workflow automation', 'Data synchronization'],
      },
      {
        title: 'TEST & OPTIMIZE',
        number: '04',
        description:
          'Validate reliability, monitor failures, and optimize automations for stable long-term performance.',
        items: ['End-to-end testing', 'Logging & monitoring', 'Performance optimization'],
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

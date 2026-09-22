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
      'Custom API development',
      'Third-party platform integrations',
      'Workflow automation',
      'CRM, payment and booking connections',
      'Data synchronization and monitoring',
      'Secure authentication and access control',
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
          'Uncover opportunities by diving deep into your business, market, and customers.',
        items: ['Market research', 'Competitive analysis', 'Stakeholder interviews'],
      },
      {
        title: 'DEFINE',
        number: '02',
        description:
          'Craft a unique brand identity that resonates with your audience and sets you apart.',
        items: ['Brand strategy', 'Positioning statement', 'Messaging framework'],
      },
      {
        title: 'DESIGN',
        number: '03',
        description:
          "Elevate your brand's visuals with logos, fonts, colors for use across all platforms.",
        items: ['Logo suite', 'Visual system', 'Brand assets'],
      },
      {
        title: 'DELIVER',
        number: '04',
        description:
          'Deliverables include brand guidelines and asset libraries for smooth execution.',
        items: ['Brand guidelines', 'Asset library', 'Team training'],
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

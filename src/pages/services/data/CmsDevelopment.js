import image14 from '../../../assets/image 14.png';
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
      'WordPress development and custom themes',
      'Shopify and WooCommerce stores',
      'Webflow and Framer development',
      'Content migration and organization',
      'CMS training and ongoing support',
      'Plugins, templates and editor workflows',
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

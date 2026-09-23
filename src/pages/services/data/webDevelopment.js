import { asset } from '../../../lib/cdn';

const image14 = asset('image 14.webp');
const image15 = asset('image 15.png');
const vantageImg = asset('vantage.webp');
const saucedImg = asset('sauced.webp');
const savmontImg = asset('Savmont.webp');
const jerseyImg = asset('jersey2.webp');

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
      'Marketing and brand websites',
      'Landing pages and lead generation',
      'Responsive frontend development',
      'Performance and technical SEO',
      'Forms, booking and CRM connections',
      'Ongoing maintenance and support',
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

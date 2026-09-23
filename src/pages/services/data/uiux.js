import image14 from '../../../assets/image 14.webp';
import image15 from '../../../assets/image 15.png';
import vantageImg from '../../../assets/vantage.webp';
import saucedImg from '../../../assets/sauced.webp';
import savmontImg from '../../../assets/Savmont.webp';
import jerseyImg from '../../../assets/jersey2.webp';

// Same structure as branding — swap text/images here when UI/UX content is ready
export const uiuxData = {
  hero: {
    title: 'UI/UX',
    subtitle: 'Branding shapes perception, builds trust, and creates lasting value.',
    cardTitle: 'Our work',
    cardSubtitle: 'Designing a bold voice for thought leadership',
    cardImage: image14,
    cardImageAlt: 'Our work',
  },
  showcase: {
    imageSrc: image14,
    imageAlt: 'UI/UX showcase',
  },
  offerings: {
    headingLine1: 'Branding Services That',
    headingLine2: 'Build Meaningful Brands',
    headingIndent: 'Branding ',
    collageImage: image15,
    collageAlt: 'UI/UX work collage',
    items: [
      'Brand identity and logo systems',
      'Brand positioning and messaging',
      'Visual language and design systems',
      'Brand guideline development',
      'Campaign branding and creative direction',
      'Brand refresh and rebranding projects',
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

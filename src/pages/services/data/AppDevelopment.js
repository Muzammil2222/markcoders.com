import image14 from '../../../assets/image 14.png';
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

import image14 from '../../../assets/image 14.png';
import image15 from '../../../assets/image 15.png';
import vantageImg from '../../../assets/vantage.webp';
import saucedImg from '../../../assets/sauced.webp';
import savmontImg from '../../../assets/Savmont.webp';
import jerseyImg from '../../../assets/jersey2.webp';

export const GraphicDesignData = {
  hero: {
    title: 'Graphic Design',
    subtitle: 'Brand identities and digital visuals that help your business stay recognizable wherever customers meet you.',
    cardTitle: 'Our work',
    cardSubtitle: 'Visual systems that travel with your brand',
    cardImage: image14,
    cardImageAlt: 'Our work',
  },
  showcase: {
    imageSrc: image14,
    imageAlt: 'Graphic design showcase',
  },
  offerings: {
    headingLine1: 'Graphic Design That',
    headingLine2: 'Builds Recognition',
    headingIndent: 'Graphic ',
    collageImage: image15,
    collageAlt: 'Graphic design collage',
    items: [
      'Brand identity and logo design',
      'Marketing and sales materials',
      'Social media and advertising design',
      'Presentations and pitch decks',
      'Website, app and print graphics',
      'Illustration, icons and visual assets',
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

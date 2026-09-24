import image14 from '../../../assets/image 14.webp';
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
      'Creative Brief & Direction',
      'Brand & Audience Research',
      'Concepts & Visual Exploration',
      'Design Development',
      'Review & Refinement',
      'Final Artwork & File Preparation',
      'Ongoing Brand Support'
    ]
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
          'Understand your brand, audience, message, campaign goals, and visual requirements before creative work begins.',
        items: ['Brand review', 'Audience & market research', 'Creative direction'],
      },
      {
        title: 'CONCEPTUALIZE',
        number: '02',
        description:
          'Translate strategy into focused visual concepts aligned with your brand identity and communication goals.',
        items: ['Moodboards & concepts', 'Visual direction', 'Design exploration'],
      },
      {
        title: 'DESIGN',
        number: '03',
        description:
          'Develop polished visual assets with consistent typography, imagery, layout, and brand application.',
        items: ['Brand & marketing collateral', 'Social & campaign creatives', 'Digital & print design'],
      },
      {
        title: 'REFINE & DELIVER',
        number: '04',
        description:
          'Refine approved concepts and prepare production-ready assets for every required platform and format.',
        items: ['Design revisions', 'Format adaptation', 'Production-ready assets'],
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

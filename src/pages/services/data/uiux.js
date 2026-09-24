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
      'Discovery & Kickoff',
      'Research & UX Strategy',
      'Wireframing & Experience Mapping',
      'UI Design & Prototyping',
      'Usability Testing & Refinement',
      'Developer Handoff',
      'Launch Support',
    ],
  },
  framework: {
    headingLine1: 'A framework that',
    headingLine2: 'drives excellence',
    ctaLabel: 'Discuss Our Approach',
    cards: [
      {
        title: 'RESEARCH',
        number: '01',
        description:
          'Understand users, business goals, pain points, behaviors, and product opportunities through focused discovery.',
        items: ['User research', 'Competitor analysis', 'Product & usability insights'],
      },
      {
        title: 'DEFINE',
        number: '02',
        description:
          'Turn research into clear user journeys, information architecture, and experience priorities.',
        items: ['User flows', 'Information architecture', 'Wireframes'],
      },
      {
        title: 'DESIGN',
        number: '03',
        description:
          'Create intuitive, high-fidelity interfaces supported by reusable components and a consistent visual system.',
        items: ['High-fidelity UI design', 'Design systems', 'Interactive prototypes'],
      },
      {
        title: 'VALIDATE & HANDOFF',
        number: '04',
        description:
          'Test the experience, refine key interactions, and prepare development-ready design specifications.',
        items: ['Usability testing', 'Design refinement', 'Developer handoff'],
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

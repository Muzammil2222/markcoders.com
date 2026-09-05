import imgSauced from '../assets/case studies/sauced-1_IwkNFW.webp';
import imgAtlas from '../assets/case studies/atlas-CJvbMeez.jpg';
import imgMeridian from '../assets/case studies/meridian-C0PfNsQw.jpg';
import imgVantage from '../assets/case studies/vantage-hQQo3mBo.jpg';
import imgAura from '../assets/case studies/aura-D94zrlUD.jpg';
import imgDPacific from '../assets/case studies/d-pacific-BJOU6N19.jpg';
import imgEasylife from '../assets/case studies/easylife-BBPFfYkg.jpg';
import imgScanZilla from '../assets/case studies/scanzilla-fTga8FP5.jpg';
import imgNexus from '../assets/case studies/nexus-Clf_NSag.webp';

export const caseStudiesData = {
  sauced: {
    slug: 'sauced',
    badge: 'Case Study — Mobile App',
    title: 'Sauced',
    highlight: '',
    description: 'Full-platform design and mobile app rollout for Sauced — the hot sauce discovery platform connecting 685K+ sauce lovers, brand pros, and event organizers in one fiery experience.',
    image: imgSauced,
    stats: [
      { value: '685K+', label: 'Sauce Lovers' },
      { value: '8 mo', label: 'Work Duration' },
      { value: 'iOS + Android', label: 'Native Apps' },
      { value: 'Food', label: 'Community Platform' },
    ],
    overview: {
      tag: 'The Problems',
      title: 'The problems we were brought in to solve.',
      description: 'Sauced is a U.S.-based hot sauce discovery and community platform that connects sauce lovers, artisan makers, and brand managers in one unified ecosystem.',
      cards: [
        {
          num: '/01',
          title: 'Fragmented Systems Across Roles',
          description: 'Separate tools for consumers, brand managers, and event organizers made coordination impossible and created a disjointed experience that killed engagement before it started.'
        },
        {
          num: '/02',
          title: 'No Mobile App for Sauce Pros',
          description: 'Brand managers and event organizers had no mobile tools for real-time updates, product management, or community interaction — operating blind in a mobile-first world.'
        },
        {
          num: '/03',
          title: 'Missing Discovery & Visibility Tools',
          description: 'No structured product taxonomy, heat indexing, or personalization engine meant users couldn’t find the sauces they’d love — and brands had no way to reach their audience.'
        },
        {
          num: '/04',
          title: 'Static Platform with No Engagement Loop',
          description: 'Fixed listings with no ratings, awards, community events, or social sharing meant zero retention. Users visited once and never returned.'
        }
      ]
    },
    midQuote: {
      text: 'We re-engineered Sauced with',
      highlight: 'mobile power, smart discovery, and community tools',
      suffix: 'built to dissolve every bottleneck and keep every user coming back for more heat.'
    },
    whatWeBuilt: {
      tag: 'What We Built',
      title: 'What We Built For',
      highlight: 'Sauced',
      description: 'Full-platform design and mobile rollout for Sauced — delivering a native iOS & Android app, real-time discovery feeds, and brand management tools for 685K+ sauce enthusiasts.',
      features: [
        { title: 'Mobile App for Sauce Lovers', description: 'A native iOS and Android app for discovering, rating, and sharing sauces with real-time feeds, tasting notes, and heat indexes.' },
        { title: 'Real-Time Brand Dashboards', description: 'Brand managers get listings, analytics, event promotion, and community engagement in one place.' },
        { title: 'Smart Discovery Engine', description: 'Structured taxonomy, heat indexing, and personalized recommendations so users find sauces they actually love.' },
        { title: 'Community Awards System', description: 'A dynamic awards and community voting engine that drives engagement, retention, and organic growth.' }
      ]
    },
    beforeAfter: {
      tag: 'Before & After',
      title: 'Before',
      highlight: '&',
      suffix: 'after the platform.',
      items: [
        { area: 'Consumer experience', before: 'Desktop-only, disjointed tools', after: 'Native iOS & Android app' },
        { area: 'Brand tools', before: 'No mobile management', after: 'Real-time brand dashboards' },
        { area: 'Discovery', before: 'No taxonomy or heat index', after: 'Smart search and recommendations' },
        { area: 'Retention', before: 'One-and-done visits', after: 'Awards, ratings, and community loops' }
      ]
    },
    testimonial: {
      quote: 'We re-engineered Sauced with mobile power, smart discovery, and community tools built to dissolve every bottleneck and ',
      highlight: 'keep every user coming back for more heat',
      suffix: '.',
      authorInitials: 'MC',
      authorName: 'MarkCoders Engineering Team',
      authorTitle: 'Sauced — Product Team'
    }
  },
  
  // Stubs for other projects so they don't break if clicked
  'project-atlas': {
    slug: 'project-atlas',
    badge: 'Case Study — Web Apps',
    title: 'Project Atlas',
    highlight: '',
    description: 'A fully custom B2B ERP platform that replaced spreadsheets and phone-tag with a unified system — covering interactive quoting, field measurement capture, production tracking, and CRM sync for a specialty manufacturer with a nationwide dealer network.',
    image: imgAtlas,
    stats: [
      { value: '~Hours → 2 min', label: 'Quote Time Reduction' },
      { value: '~40–50%', label: 'Admin Back-and-Forth Cut' },
      { value: 'Near Zero', label: 'Measurement Errors' },
      { value: 'Real-Time', label: 'AR Visibility' }
    ],
    overview: {
      tag: 'The Problems',
      title: 'The problems we were brought in to solve.',
      description: 'The client ran a complex, seasonal manufacturing business but had no single system holding it together. Every department — sales, production, accounting, field staff — worked from a different tool, spreadsheet, or email inbox.',
      cards: [
        { num: '/01', title: 'Quoting Took Hours', description: 'Generating a quote for a custom pool cover took hours. Prices had to be calculated manually, per dealer, per product — and mistakes were common.' },
        { num: '/02', title: 'All Orders Through Phone & Email', description: 'Dealers had no way to place orders or check status online. Everything came through phone and email, and during peak season, the team couldn’t keep up.' },
        { num: '/03', title: 'Paper-Based Measurements', description: 'Field technicians sent back pool measurements on paper or by photo. That data then had to be re-entered manually, introducing errors before production even started.' },
        { num: '/04', title: 'No CRM or Dealer History', description: 'The sales team had no record of dealer relationships, conversations, or follow-up history.' },
        { num: '/05', title: 'Zero Live Visibility', description: 'Management had no live view of daily output, unpaid invoices, or payment totals — someone had to compile that manually each week.' }
      ]
    },
    midQuote: {
      text: 'Delivery of the platform fundamentally changed how the client operates — replacing a fragmented, manual-heavy workflow with a',
      highlight: 'unified system that spans every department.',
      suffix: ''
    },
    whatWeBuilt: {
      tag: 'What We Built',
      title: 'A Platform That Runs',
      highlight: 'the Whole Business',
      description: 'A fully custom platform that covers the entire business workflow — from the moment a dealer submits a quote, all the way through production, invoicing, and payment — with separate interfaces for internal staff and dealers.',
      features: [
        { title: 'Live quoting tool', description: 'Dealers and staff configure a custom cover or liner step by step, and the price updates instantly with the correct dealer discount. What used to take hours now takes under 2 minutes.' },
        { title: 'Dealer Portal', description: 'Dealers log in to submit orders, view their history, and receive digital measurement forms. No more phone tag.' },
        { title: 'Interactive 2D Cover Builder', description: 'Step-by-step configurator for custom safety covers with live dealer-discounted pricing.' },
        { title: 'Digital field forms', description: 'Sent as a simple email link, field technicians fill in pool measurements on their phone and submit directly into the system.' },
        { title: 'Admin dashboard', description: 'A real-time view of daily production output, payments received, and overdue invoices.' },
        { title: 'CRM sync', description: 'Dealer and contact data syncs directly to HubSpot, giving the sales team full visibility into their network.' }
      ]
    },
    beforeAfter: {
      tag: 'Before & After',
      title: 'The',
      highlight: 'Before',
      suffix: '& After',
      items: [
        { area: 'Custom Quote Time', before: 'Hours per quote', after: 'Under 2 minutes' },
        { area: 'Dealer phone/email volume', before: 'High — all requests manual', after: '~40–50% reduction' },
        { area: 'Measurement Errors', before: 'Common — paper-based', after: 'Near-eliminated' },
        { area: 'AR & payment visibility', before: 'Weekly manual reports', after: 'Real-time dashboard' },
        { area: 'CRM data', before: 'None', after: 'Full HubSpot sync' },
        { area: 'Document Generation', before: 'Manual (spreadsheets)', after: 'Fully automated' }
      ]
    },
    testimonial: {
      quote: 'We built a purpose-fit ERP platform that ',
      highlight: 'replaced spreadsheets and phone-tag with a unified system',
      suffix: ' — covering everything from interactive custom quoting to field measurement collection, production tracking, and CRM sync — for a specialty manufacturer with a nationwide dealer network.',
      authorInitials: 'LA',
      authorName: 'Lead Architects',
      authorTitle: 'Project Atlas Team'
    }
  },
  'project-meridian': {
    slug: 'project-meridian',
    badge: 'Case Study — Web Apps',
    title: 'Project Meridian',
    highlight: '',
    description: 'Cross-border order fulfillment automation platform that connects e-commerce storefronts, overseas factories, and international shipping providers into one seamless, role-based pipeline.',
    image: imgMeridian,
    stats: [
      { value: '~70%', label: 'Manual Processing Cut' },
      { value: '~50%', label: 'Support Inquiries Reduced' },
      { value: 'Hours → Mins', label: 'Invoice Generation' },
      { value: '30 min', label: 'Scheduled Automation' }
    ],
    overview: {
      tag: 'The Problems',
      title: 'The problems we were brought in to solve.',
      description: 'Every incoming order had to be checked manually, and the storefront, factory, shipping provider, and invoicing were completely separate.',
      cards: [
        { num: '/01', title: '100% Manual Order Validation', description: 'Every incoming order had to be checked manually — product details, customisation options, shipping eligibility. Any issue meant the order just sat there waiting for someone to fix it.' },
        { num: '/02', title: 'Completely Siloed Systems', description: 'The storefront, factory, shipping provider, and invoicing were all completely separate. Staff spent the majority of their day copying information from one system to another.' },
        { num: '/03', title: 'Zero Order Visibility', description: 'Nobody had a clear view of where any order was at a given moment. Customers had to email or call to find out, which buried the support team under status queries all day.' },
        { num: '/04', title: 'Manual Shipping Labels', description: 'International shipping labels were created by hand, leading to frequent mismatches, wrong deliveries, and costly returns.' },
        { num: '/05', title: 'No Invoice or Payment Process', description: 'There was no proper process for invoicing or getting payments approved — only ad-hoc emails.' },
        { num: '/06', title: 'No Role-Based Access', description: 'Factory, customer, and admin users all needed different views, but the workflow treated everyone the same.' }
      ]
    },
    midQuote: {
      text: 'We built an automated order fulfillment engine that connects a client’s e-commerce storefront, overseas factory, and international shipping provider into',
      highlight: 'one seamless, role-based pipeline',
      suffix: '— replacing weeks of manual work with a system that processes orders in minutes.'
    },
    whatWeBuilt: {
      tag: 'What We Built',
      title: 'A Single',
      highlight: 'Automated Fulfillment Pipeline',
      description: 'A single platform that connects the online store, the overseas factory, and the international shipping provider into one fully automated pipeline — with a tailored interface for every type of user.',
      features: [
        { title: 'Automated Order Intake', description: 'The moment a customer places an order, the system picks it up, checks it against the product catalogue, and assigns it a status automatically.' },
        { title: 'Full Order Tracking', description: 'Every order moves through Pending → In Production → Shipped → Invoiced → Paid with timestamps visible to every relevant team member.' },
        { title: 'Automated Shipping', description: 'Waybills and shipping labels are generated automatically based on destination country.' },
        { title: 'Factory Connection', description: 'Orders are sent directly to the overseas factory. Factory staff can accept, update, and ship from their own view.' },
        { title: 'Invoice & Payment Workflow', description: 'Invoices are generated in bulk. Payments go through factory flag → manager approve → admin mark paid.' },
        { title: 'Customer Self-Service', description: 'Customers can check status, leave notes, raise tickets, and download invoices themselves.' },
        { title: 'Automated Alerts', description: 'If an order sits in the same status too long, the system flags it automatically.' },
        { title: 'Scheduled Automation', description: 'Every 30 minutes the system processes pending orders, generates waybills, and sends them to the factory.' }
      ]
    },
    beforeAfter: {
      tag: 'Before & After',
      title: 'The',
      highlight: 'Before',
      suffix: '& After',
      items: [
        { area: 'Order processing time', before: '15–20 min per order, manually', after: 'Automated every 30 minutes' },
        { area: 'Shipping label creation', before: 'Manual — frequent errors', after: 'Fully automated' },
        { area: 'Invoice generation', before: 'Hours of manual work', after: 'Minutes, generated in bulk' },
        { area: 'Customer support load', before: 'Overwhelmed with status queries', after: '~50% reduction' },
        { area: 'Payment approvals', before: 'Ad-hoc emails', after: 'Structured approval workflow' },
        { area: 'Factory visibility', before: 'None', after: 'Real-time tracking + overdue alerts' },
        { area: 'Capacity to scale', before: 'Bottlenecked by headcount', after: 'Order volume grew without adding staff' }
      ]
    },
    testimonial: {
      quote: 'We built an automated order fulfillment engine that connects a client’s e-commerce storefront, overseas factory, and international shipping provider into ',
      highlight: 'one seamless, role-based pipeline',
      suffix: ' — replacing weeks of manual work with a system that processes orders in minutes.',
      authorInitials: 'LA',
      authorName: 'Lead Architects',
      authorTitle: 'Project Meridian Team'
    }
  },
  'project-vantage': { 
    slug: 'project-vantage', 
    badge: 'Case Study — Data Analytics',
    title: 'Project Vantage', 
    highlight: '',
    description: 'A comprehensive data analytics and visibility platform that unifies disparate data sources into actionable insights for enterprise decision-makers.',
    image: imgVantage,
    stats: [
      { value: '3TB+', label: 'Data Processed Daily' },
      { value: '99.9%', label: 'Uptime' },
      { value: 'Real-Time', label: 'Dashboard Sync' },
      { value: '50+', label: 'Integrations' }
    ],
    overview: {
      tag: 'The Problems',
      title: 'The problems we were brought in to solve.',
      description: 'The client struggled with siloed data across multiple departments. Executives relied on outdated, manual reports that took weeks to compile, leading to delayed strategic decisions.',
      cards: [
        { num: '/01', title: 'Siloed Information', description: 'Data was trapped in separate tools, making it impossible to get a unified view of company performance.' },
        { num: '/02', title: 'Manual Reporting', description: 'Teams spent countless hours manually aggregating data into spreadsheets, prone to human error.' },
        { num: '/03', title: 'Delayed Insights', description: 'By the time reports were ready, the data was often obsolete, severely hindering agile decision-making.' },
        { num: '/04', title: 'Lack of Scalability', description: 'The existing reporting infrastructure could not handle the growing volume of data as the company expanded.' }
      ]
    },
    midQuote: {
      text: 'We delivered a centralized platform that transformed',
      highlight: 'fragmented data into a real-time strategic asset',
      suffix: 'for the entire enterprise.'
    },
    whatWeBuilt: {
      tag: 'What We Built',
      title: 'A Unified',
      highlight: 'Analytics Command Center',
      description: 'A scalable, cloud-native analytics platform that automatically ingests, normalizes, and visualizes data from across the organization.',
      features: [
        { title: 'Centralized Data Lake', description: 'A robust architecture that securely stores and processes massive volumes of structured and unstructured data.' },
        { title: 'Real-Time Dashboards', description: 'Customizable, interactive dashboards providing instant visibility into key performance indicators (KPIs).' },
        { title: 'Automated ETL Pipelines', description: 'Automated data extraction, transformation, and loading (ETL) processes that eliminate manual work.' },
        { title: 'Predictive Analytics', description: 'Integrated machine learning models that forecast trends and highlight potential business risks.' }
      ]
    },
    beforeAfter: {
      tag: 'Before & After',
      title: 'The',
      highlight: 'Before',
      suffix: '& After',
      items: [
        { area: 'Reporting Time', before: 'Weeks of manual compilation', after: 'Instant, real-time access' },
        { area: 'Data Accuracy', before: 'Prone to human error', after: 'Automated and validated' },
        { area: 'Scalability', before: 'Struggled with growth', after: 'Cloud-native, infinite scale' },
        { area: 'Decision Making', before: 'Reactive and delayed', after: 'Proactive and data-driven' }
      ]
    },
    testimonial: {
      quote: 'Project Vantage fundamentally shifted how we operate. We now have ',
      highlight: 'immediate, accurate insights at our fingertips',
      suffix: ', allowing us to move faster and with greater confidence than ever before.',
      authorInitials: 'CT',
      authorName: 'Client Team',
      authorTitle: 'Project Vantage'
    }
  },
  'project-aura': { 
    slug: 'project-aura', 
    badge: 'Case Study — Health & Wellness',
    title: 'Project Aura', 
    highlight: '',
    description: 'An intelligent corporate wellness platform designed to monitor, manage, and improve employee well-being through personalized, data-driven interventions.',
    image: imgAura,
    stats: [
      { value: '40%', label: 'Engagement Increase' },
      { value: '10k+', label: 'Active Users' },
      { value: '15%', label: 'Productivity Boost' },
      { value: 'iOS & Web', label: 'Cross-Platform' }
    ],
    overview: {
      tag: 'The Problems',
      title: 'The problems we were brought in to solve.',
      description: 'The organization lacked a cohesive strategy to address rising employee burnout and declining well-being, relying on fragmented and underutilized wellness programs.',
      cards: [
        { num: '/01', title: 'Low Program Adoption', description: 'Existing wellness initiatives saw single-digit participation rates due to poor visibility and disjointed experiences.' },
        { num: '/02', title: 'Generic Approaches', description: 'One-size-fits-all programs failed to address the specific, varied needs of a diverse workforce.' },
        { num: '/03', title: 'No Measurable ROI', description: 'HR leaders had no reliable way to track the impact of wellness investments on overall company performance.' },
        { num: '/04', title: 'Reactive Rather Than Proactive', description: 'Support was typically only provided after an employee reported significant stress or burnout.' }
      ]
    },
    midQuote: {
      text: 'We created a proactive, personalized wellness ecosystem that empowers employees and gives leadership',
      highlight: 'actionable insights to foster a healthier workplace.',
      suffix: ''
    },
    whatWeBuilt: {
      tag: 'What We Built',
      title: 'A Proactive',
      highlight: 'Wellness Ecosystem',
      description: 'A mobile-first application and HR administrative dashboard that delivers tailored wellness programs, tracks engagement, and provides anonymous organizational health metrics.',
      features: [
        { title: 'Personalized Wellness Journeys', description: 'AI-driven recommendations for mindfulness, fitness, and mental health resources based on user preferences and goals.' },
        { title: 'Anonymous Pulse Surveys', description: 'Frequent, low-friction check-ins to gauge team morale and identify early signs of burnout.' },
        { title: 'HR Analytics Dashboard', description: 'Aggregated, anonymized data providing leadership with clear visibility into the overall health and engagement of the organization.' },
        { title: 'Integration with Wearables', description: 'Seamless syncing with popular fitness trackers to provide a holistic view of physical well-being.' }
      ]
    },
    beforeAfter: {
      tag: 'Before & After',
      title: 'The',
      highlight: 'Before',
      suffix: '& After',
      items: [
        { area: 'Program Engagement', before: 'Under 10% participation', after: 'Over 40% active daily usage' },
        { area: 'Wellness Approach', before: 'Generic, one-size-fits-all', after: 'Highly personalized journeys' },
        { area: 'Burnout Detection', before: 'Reactive, often too late', after: 'Proactive early warning system' },
        { area: 'Leadership Visibility', before: 'No clear metrics or ROI', after: 'Real-time health dashboards' }
      ]
    },
    testimonial: {
      quote: 'Aura didn’t just give us an app; it gave us a ',
      highlight: 'comprehensive strategy to genuinely care for our team',
      suffix: '. The insights we’ve gained have completely transformed our approach to HR.',
      authorInitials: 'HR',
      authorName: 'HR Leadership',
      authorTitle: 'Project Aura'
    }
  },
  'd-pacific-distribution': { 
    slug: 'd-pacific-distribution', 
    badge: 'Case Study — Logistics',
    title: 'D-Pacific Distribution', 
    highlight: '',
    description: 'A custom B2B distribution and inventory management portal that streamlined ordering, tracking, and fulfillment for a rapidly expanding regional logistics network.',
    image: imgDPacific,
    stats: [
      { value: '3x', label: 'Order Volume Capacity' },
      { value: 'Zero', label: 'Lost Shipments' },
      { value: '24/7', label: 'Client Portal Access' },
      { value: 'API', label: 'ERP Integration' }
    ],
    overview: {
      tag: 'The Problems',
      title: 'The problems we were brought in to solve.',
      description: 'D-Pacific was outgrowing its manual order processing systems. Phone and email orders were leading to fulfillment errors, lost inventory, and frustrated B2B clients.',
      cards: [
        { num: '/01', title: 'Manual Order Entry', description: 'Sales reps spent hours entering orders from emails and faxes into the legacy ERP, causing delays and typos.' },
        { num: '/02', title: 'Inventory Blind Spots', description: 'Lack of real-time syncing meant clients frequently ordered out-of-stock items, requiring messy back-order management.' },
        { num: '/03', title: 'No Client Visibility', description: 'B2B clients had to call support simply to check on their order status or request duplicate invoices.' },
        { num: '/04', title: 'Inefficient Routing', description: 'Warehouse picking and delivery routing were handled manually, resulting in wasted time and fuel.' }
      ]
    },
    midQuote: {
      text: 'We digitized the entire supply chain workflow, creating a',
      highlight: 'frictionless bridge between D-Pacific and its B2B partners',
      suffix: 'that eliminated errors and accelerated fulfillment.'
    },
    whatWeBuilt: {
      tag: 'What We Built',
      title: 'A Modern B2B',
      highlight: 'Distribution Portal',
      description: 'A full-scale B2B e-commerce and logistics platform seamlessly integrated with their existing ERP, providing self-service tools for clients and automation for the warehouse.',
      features: [
        { title: 'B2B Self-Service Portal', description: 'Clients can browse live inventory, place orders, apply custom pricing tiers, and track shipments 24/7.' },
        { title: 'Real-Time ERP Sync', description: 'Bi-directional integration ensures that inventory levels, pricing, and order statuses are always up-to-date across all systems.' },
        { title: 'Automated Invoicing & Payments', description: 'Invoices are generated instantly upon shipment, with integrated online payment options for faster accounts receivable.' },
        { title: 'Smart Warehouse Routing', description: 'Digital pick lists optimized for warehouse layout, reducing picking time by over 30%.' }
      ]
    },
    beforeAfter: {
      tag: 'Before & After',
      title: 'The',
      highlight: 'Before',
      suffix: '& After',
      items: [
        { area: 'Order Processing', before: 'Manual data entry', after: 'Automated and self-service' },
        { area: 'Client Support Calls', before: 'High volume for status checks', after: 'Reduced by 70%' },
        { area: 'Inventory Accuracy', before: 'Frequent out-of-stock orders', after: 'Real-time live syncing' },
        { area: 'Fulfillment Speed', before: '2-3 days average', after: 'Same-day processing' }
      ]
    },
    testimonial: {
      quote: 'The new portal has completely modernized our operations. We are processing ',
      highlight: 'three times the volume with the exact same headcount',
      suffix: ', and our clients love the transparency.',
      authorInitials: 'DP',
      authorName: 'Operations Director',
      authorTitle: 'D-Pacific Distribution'
    }
  },
  'easylife-kitchens-dqs': { 
    slug: 'easylife-kitchens-dqs', 
    badge: 'Case Study — Custom Quoting',
    title: 'Easylife Kitchens DQS', 
    highlight: '',
    description: 'A dynamic Design and Quoting System (DQS) tailored for kitchen manufacturers, turning a complex, days-long estimation process into a seamless, interactive experience.',
    image: imgEasylife,
    stats: [
      { value: 'Days → Mins', label: 'Quote Turnaround' },
      { value: '100%', label: 'Pricing Accuracy' },
      { value: 'Cloud', label: 'Based Platform' },
      { value: 'Franchise', label: 'Ready System' }
    ],
    overview: {
      tag: 'The Problems',
      title: 'The problems we were brought in to solve.',
      description: 'Generating accurate quotes for custom kitchens involved complex spreadsheets, manual calculations for materials and labor, and constant back-and-forth with clients, leading to lost sales.',
      cards: [
        { num: '/01', title: 'Complex Variable Pricing', description: 'Calculating costs for different materials, finishes, hardware, and dimensions was highly manual and error-prone.' },
        { num: '/02', title: 'Lengthy Sales Cycles', description: 'Clients often waited days to receive a revised quote after requesting a minor design change.' },
        { num: '/03', title: 'Inconsistent Margin Control', description: 'Individual designers sometimes applied incorrect discounts or missed items, eating into company profits.' },
        { num: '/04', title: 'Disconnected Workflows', description: 'The quoting tool didn\'t talk to the factory, meaning approved designs had to be re-entered for manufacturing.' }
      ]
    },
    midQuote: {
      text: 'We engineered a system that captures the complexity of custom manufacturing and wraps it in a',
      highlight: 'lightning-fast, user-friendly quoting engine.',
      suffix: ''
    },
    whatWeBuilt: {
      tag: 'What We Built',
      title: 'A Dynamic',
      highlight: 'Quoting Engine',
      description: 'A cloud-based quoting and configuration tool that empowers designers to build custom kitchens and generate accurate, beautiful proposals in real-time.',
      features: [
        { title: 'Interactive Configurator', description: 'Designers can easily swap materials, cabinet styles, and hardware, with prices updating instantly on the screen.' },
        { title: 'Automated Bill of Materials (BOM)', description: 'Once a quote is approved, the system automatically generates a precise BOM for the factory floor.' },
        { title: 'Centralized Pricing Management', description: 'Admins can update material costs globally, ensuring all franchises are quoting with the latest prices.' },
        { title: 'Professional Proposal Generation', description: 'One-click generation of polished, branded PDF proposals that impress clients and accelerate sign-offs.' }
      ]
    },
    beforeAfter: {
      tag: 'Before & After',
      title: 'The',
      highlight: 'Before',
      suffix: '& After',
      items: [
        { area: 'Quote Generation', before: '2-3 days per revision', after: 'Instant, live updates' },
        { area: 'Pricing Errors', before: 'Common margin leakage', after: '100% systemic accuracy' },
        { area: 'Factory Handover', before: 'Manual re-entry required', after: 'Automated BOM generation' },
        { area: 'Client Experience', before: 'Slow and disjointed', after: 'Professional and immediate' }
      ]
    },
    testimonial: {
      quote: 'This system has revolutionized our sales floor. We can now sit with a client, adjust their design, and ',
      highlight: 'give them a perfect quote right there on the spot',
      suffix: '.',
      authorInitials: 'EK',
      authorName: 'Franchise Owner',
      authorTitle: 'Easylife Kitchens'
    }
  },
  'scanzilla': { 
    slug: 'scanzilla', 
    badge: 'Case Study — Mobile Tools',
    title: 'ScanZilla', 
    highlight: '',
    description: 'A blazing-fast, cross-platform barcode scanning and inventory management application built to replace expensive proprietary hardware with standard smartphones.',
    image: imgScanZilla,
    stats: [
      { value: 'Millisecond', label: 'Scan Speed' },
      { value: 'Offline', label: 'First Architecture' },
      { value: '$10k+', label: 'Hardware Savings' },
      { value: 'Any Device', label: 'BYOD Ready' }
    ],
    overview: {
      tag: 'The Problems',
      title: 'The problems we were brought in to solve.',
      description: 'The client was spending heavily on proprietary, single-purpose barcode scanners that were clunky, hard to update, and prone to breaking in rough warehouse environments.',
      cards: [
        { num: '/01', title: 'Expensive Hardware', description: 'Traditional scanners cost upwards of $1,000 each, making scaling the workforce incredibly expensive.' },
        { num: '/02', title: 'Poor Connectivity', description: 'Warehouse dead zones meant scanners often failed to sync, leading to lost data and double-counting.' },
        { num: '/03', title: 'Cumbersome UX', description: 'The software on legacy scanners was outdated, hard to train new staff on, and lacked modern features.' },
        { num: '/04', title: 'Maintenance Headaches', description: 'Repairing broken proprietary scanners took weeks, causing severe operational bottlenecks.' }
      ]
    },
    midQuote: {
      text: 'We turned everyday smartphones into',
      highlight: 'enterprise-grade scanning powerhouses',
      suffix: 'that operate flawlessly even in the deepest warehouse dead zones.'
    },
    whatWeBuilt: {
      tag: 'What We Built',
      title: 'An Enterprise',
      highlight: 'Scanning App',
      description: 'A high-performance React Native application featuring an offline-first database, advanced camera optimization, and seamless cloud syncing.',
      features: [
        { title: 'High-Speed Scanning Engine', description: 'Optimized camera integration that reads damaged, curved, or low-light barcodes in milliseconds.' },
        { title: 'Offline-First Capabilities', description: 'Workers can scan hundreds of items without an internet connection; the app automatically syncs when back online.' },
        { title: 'BYOD Support', description: 'Bring Your Own Device capability allows the company to deploy the app instantly to any iOS or Android phone.' },
        { title: 'Live Inventory Dashboard', description: 'A web-based admin panel providing real-time visibility into warehouse stock levels and worker activity.' }
      ]
    },
    beforeAfter: {
      tag: 'Before & After',
      title: 'The',
      highlight: 'Before',
      suffix: '& After',
      items: [
        { area: 'Hardware Costs', before: '$1,000+ per device', after: 'Standard smartphone costs (BYOD)' },
        { area: 'Offline Reliability', before: 'Failed syncs in dead zones', after: 'Flawless offline queueing' },
        { area: 'Training Time', before: 'Days to learn legacy UI', after: 'Minutes with modern UX' },
        { area: 'Deployment Speed', before: 'Waiting weeks for hardware', after: 'Instant app download' }
      ]
    },
    testimonial: {
      quote: 'ScanZilla allowed us to ditch the expensive clunky scanners. The app is ',
      highlight: 'faster, more reliable, and infinitely easier to deploy',
      suffix: ' across our entire warehouse team.',
      authorInitials: 'SZ',
      authorName: 'Warehouse Manager',
      authorTitle: 'ScanZilla'
    }
  },
  'project-nexus': { 
    slug: 'project-nexus', 
    badge: 'Case Study — Integration',
    title: 'Project Nexus', 
    highlight: '',
    description: 'A centralized middleware platform that orchestrates data flow between legacy on-premise systems and modern cloud applications, eliminating data silos.',
    image: imgNexus,
    stats: [
      { value: 'Millions', label: 'Events Handled Daily' },
      { value: 'Zero', label: 'Data Loss' },
      { value: '12+', label: 'Systems Connected' },
      { value: 'SOC2', label: 'Compliant' }
    ],
    overview: {
      tag: 'The Problems',
      title: 'The problems we were brought in to solve.',
      description: 'The enterprise was crippled by a fragmented tech stack. Crucial customer and operational data was locked in legacy systems that couldn\'t communicate with modern SaaS tools.',
      cards: [
        { num: '/01', title: 'Data Silos', description: 'Customer information in the CRM didn\'t match billing data in the ERP, causing severe customer service issues.' },
        { num: '/02', title: 'Brittle Point-to-Point Integrations', description: 'Existing custom scripts connecting systems were fragile; when one API changed, the whole chain broke.' },
        { num: '/03', title: 'Security & Compliance Risks', description: 'Manual data transfers via CSV exports posed significant security risks and compliance headaches.' },
        { num: '/04', title: 'Slow Feature Rollouts', description: 'Developing new digital products took months because accessing the underlying legacy data was so difficult.' }
      ]
    },
    midQuote: {
      text: 'We architected a robust integration layer that acts as the',
      highlight: 'central nervous system for the entire enterprise',
      suffix: ', safely bridging the old and the new.'
    },
    whatWeBuilt: {
      tag: 'What We Built',
      title: 'A Robust',
      highlight: 'Integration Hub',
      description: 'A scalable, event-driven middleware platform providing secure, standardized APIs to unify data across the organization\'s entire software ecosystem.',
      features: [
        { title: 'Event-Driven Architecture', description: 'Real-time data synchronization using message queues to ensure absolute reliability and zero data loss.' },
        { title: 'Centralized API Gateway', description: 'A single, secure entry point for all internal applications to access enterprise data, simplifying development.' },
        { title: 'Legacy System Adapters', description: 'Custom-built connectors that safely extract data from older on-premise databases without impacting performance.' },
        { title: 'Comprehensive Monitoring', description: 'Detailed logging and tracing tools that provide instant visibility into the health of all integrations.' }
      ]
    },
    beforeAfter: {
      tag: 'Before & After',
      title: 'The',
      highlight: 'Before',
      suffix: '& After',
      items: [
        { area: 'Data Consistency', before: 'Frequent mismatches', after: 'Single source of truth' },
        { area: 'Integration Stability', before: 'Brittle and prone to breaking', after: 'Resilient and monitored' },
        { area: 'Development Velocity', before: 'Months to access data', after: 'Days using standardized APIs' },
        { area: 'Security', before: 'Risky manual transfers', after: 'Encrypted, compliant pipelines' }
      ]
    },
    testimonial: {
      quote: 'Project Nexus unlocked the data we needed to innovate. We finally have a ',
      highlight: 'reliable, secure foundation to build our digital future',
      suffix: ' upon without ripping and replacing our core systems.',
      authorInitials: 'PN',
      authorName: 'Chief Technology Officer',
      authorTitle: 'Project Nexus'
    }
  }
};

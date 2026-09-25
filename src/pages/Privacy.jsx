import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'

const Footer = lazy(() => import('../components/Footer'))

const PRIVACY_SECTIONS = [
  {
    title: 'Introduction',
    paragraphs: [
      'MarkCoders (“we,” “us,” or “our”) respects your privacy. This Privacy Policy explains how we collect, use, share, and protect information when you visit our website, contact us, request a quote, submit a project inquiry, or use our services.',
      'By accessing our website or using our services, you acknowledge the practices described in this Privacy Policy.',
    ],
  },
  {
    title: 'Information We Collect',
    paragraphs: [
      'We may collect personal information that you voluntarily provide, including your name, email address, phone number, company name, project details, uploaded files, messages, and other information submitted through our website, forms, email, phone, or other communication channels.',
      'We may also collect technical and non-personal information, including your browser type, device type, IP address, pages visited, referring website, approximate location, and general website usage data.',
    ],
  },
  {
    title: 'How We Use Information',
    paragraphs: ['We may use the information we collect to:'],
    bullets: [
      'Respond to inquiries and project requests',
      'Prepare quotes, proposals, and service recommendations',
      'Deliver and manage our services',
      'Communicate about projects, payments, revisions, and support',
      'Operate, maintain, and improve our website',
      'Protect against fraud, misuse, and security threats',
      'Meet legal, contractual, and business record requirements',
    ],
  },
  {
    title: 'Cookies and Tracking Technologies',
    paragraphs: [
      'Our website may use cookies, analytics tools, pixels, and similar technologies to improve website performance, understand visitor activity, and enhance the user experience.',
      'You may disable cookies through your browser settings. However, some website features may not work properly when cookies are disabled.',
    ],
  },
  {
    title: 'Sharing of Information',
    paragraphs: [
      'We do not sell or rent personal information.',
      'We may share information only when necessary with employees, contractors, service providers, hosting providers, analytics platforms, payment processors, professional advisers, or government authorities when required by law.',
      'Mobile numbers, SMS consent, and text-message opt-in information will not be shared with third parties or affiliates for marketing or promotional purposes.',
    ],
  },
  {
    title: 'Third-Party Services',
    paragraphs: [
      'Our website and services may include links, plugins, APIs, payment tools, hosting providers, analytics platforms, and other third-party services.',
      'These providers may process information according to their own privacy policies. MarkCoders is not responsible for the content, security, privacy practices, or policies of third-party websites or platforms.',
    ],
  },
  {
    title: 'Data Security and Retention',
    paragraphs: [
      'We use reasonable administrative, technical, and organizational measures to protect information against unauthorized access, misuse, loss, alteration, or disclosure.',
      'However, no online transmission or storage method is completely secure, and we cannot guarantee absolute security.',
      'We retain information only for as long as reasonably necessary to provide services, maintain business records, resolve disputes, meet contractual obligations, and comply with legal requirements.',
    ],
  },
  {
    title: 'Your Choices',
    paragraphs: [
      'You may contact us to request access to, correction of, or deletion of your personal information. Some information may need to be retained to meet legal, contractual, security, or business record requirements.',
      'You may unsubscribe from marketing emails at any time using the unsubscribe option included in the message or by contacting us directly. We may still send essential project, billing, legal, security, or service-related communications.',
      'Privacy-related requests may be sent to:',
    ],
  },
]

function Privacy() {
  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
      <Navbar />
      <main>
        <section
          data-snap-section
          className="relative w-screen min-h-[50vh] h-[50vh] flex flex-col items-center justify-center px-6"
          style={{ background: '#030712' }}
        >
          <h1
            className="text-center text-white font-medium tracking-tight leading-[1.1]"
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontSize: 'clamp(36px, 7vw, 72px)',
              letterSpacing: '-0.03em',
            }}
          >
            Privacy Policy
          </h1>
        </section>

        <section
          data-snap-section
          className="relative w-full bg-white text-[#111] rounded-t-[32px] md:rounded-t-[48px] -mt-6 z-10"
        >
          <div className="max-w-[820px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-10 md:pb-12">
            <div className="flex flex-col gap-10 md:gap-14">
              {PRIVACY_SECTIONS.map((section, index) => (
                <article key={section.title} className="flex flex-col gap-4">
                  <h2
                    className="font-semibold tracking-tight text-[#111]"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontSize: 'clamp(22px, 3vw, 28px)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {index + 1}. {section.title}
                  </h2>
                  {section.paragraphs?.map((p) => (
                    <p
                      key={p.slice(0, 48)}
                      className="text-[#333] text-[15px] md:text-[17px] leading-[1.65] font-medium tracking-[-0.01em]"
                      style={{ fontFamily: 'Switzer, sans-serif' }}
                    >
                      {p}
                    </p>
                  ))}
                  {section.bullets?.length > 0 && (
                    <ul className="list-disc pl-5 md:pl-6 flex flex-col gap-2.5">
                      {section.bullets.map((item) => (
                        <li
                          key={item}
                          className="text-[#333] text-[15px] md:text-[17px] leading-[1.65] font-medium tracking-[-0.01em]"
                          style={{ fontFamily: 'Switzer, sans-serif' }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Full-bleed divider */}
          <hr className="w-screen max-w-[100vw] relative left-1/2 -translate-x-1/2 border-0 border-t border-[#e5e5e5] m-0" />

          <div className="max-w-[820px] mx-auto px-6 md:px-10 pt-10 md:pt-12 pb-16 md:pb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16">
              <div>
                <h3
                  className="font-semibold text-[#111] mb-2"
                  style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontSize: 'clamp(18px, 2.5vw, 22px)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Email
                </h3>
                <a
                  href="mailto:info@markcoders.com"
                  className="text-[#666] text-[15px] md:text-[16px] font-medium no-underline hover:text-[#25A9E0] transition-colors"
                  style={{ fontFamily: 'Switzer, sans-serif' }}
                >
                  info@markcoders.com
                </a>
              </div>
              <div>
                <h3
                  className="font-semibold text-[#111] mb-2"
                  style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontSize: 'clamp(18px, 2.5vw, 22px)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Phone
                </h3>
                <a
                  href="tel:+923341218085"
                  className="text-[#666] text-[15px] md:text-[16px] font-medium no-underline hover:text-[#25A9E0] transition-colors"
                  style={{ fontFamily: 'Switzer, sans-serif' }}
                >
                  0334 1218085
                </a>
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}

export default Privacy

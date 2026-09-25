import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'

const Footer = lazy(() => import('../components/Footer'))

const TERMS_SECTIONS = [
  {
    title: 'Introduction',
    paragraphs: [
      'Welcome to MarkCoders. These Terms and Conditions govern your use of our website and services.',
      'By visiting our website, contacting us, requesting a quote, approving a proposal, making a payment, or purchasing our services, you agree to these Terms and Conditions.',
    ],
  },
  {
    title: 'Services and Scope',
    paragraphs: [
      'MarkCoders provides app development, website development, CMS development, UI/UX design, graphic design, API integration, automation, and related digital services.',
      'The exact scope, timeline, pricing, deliverables, revision allowance, and payment terms for each project will be defined in the applicable proposal, invoice, package, contract, or other written agreement.',
      'Each project is limited to its approved scope of work. Requests outside the agreed scope may require additional charges and may affect the delivery timeline.',
      'The client is responsible for providing the information, content, images, brand materials, files, credentials, feedback, and approvals required to complete the project. Delays in providing these items may affect the agreed schedule.',
    ],
  },
  {
    title: 'Payments',
    paragraphs: [
      'Payment terms will be stated in the applicable proposal, invoice, or written agreement. Unless otherwise agreed in writing:',
    ],
    bullets: [
      'Work may begin after the required deposit or upfront payment is received.',
      'Milestone payments must be completed before the next project stage begins.',
      'Final files, source code, deployment, credentials, or handover may be withheld until all outstanding payments are cleared.',
      'Late or missed payments may pause the project and extend its delivery timeline.',
    ],
  },
  {
    title: 'Revisions',
    paragraphs: [
      'Revision limits depend on the selected package, proposal, or written agreement. All revisions must remain within the approved project scope.',
      'New concepts, major changes in direction, additional pages, new features, or other work outside the approved scope may require additional charges.',
      'Clients are expected to provide organized feedback within five business days of receiving a design, draft, build, or revision request. When no response is received, the work may be considered approved or the project may be placed on hold.',
    ],
  },
  {
    title: 'Refund Policy',
    paragraphs: [
      'Refund eligibility depends on the project stage and the amount of work already completed.',
      'Unless otherwise agreed in writing, deposits and upfront payments become non-refundable once work has started. Completed, approved, delivered, or transferred work is non-refundable.',
      'Payments for ongoing services are non-refundable once the applicable billing period has begun. All refund requests must be submitted in writing and will be reviewed according to the completed work and project agreement.',
    ],
  },
  {
    title: 'Ownership',
    paragraphs: [
      'After full payment has been received, the client owns the final approved custom deliverables created specifically for the project, unless otherwise agreed in writing.',
      'MarkCoders retains ownership of pre-existing code, tools, templates, frameworks, workflows, internal processes, rejected concepts, unused designs, and general knowledge developed before or independently of the project.',
      'Third-party materials such as plugins, themes, fonts, stock images, hosting services, APIs, software, and domains remain subject to their respective licensing terms.',
    ],
  },
  {
    title: 'Portfolio Rights',
    paragraphs: [
      'Unless otherwise agreed in writing, MarkCoders may display completed work, project names, screenshots, logos, case studies, and general project descriptions in its portfolio, website, marketing materials, and sales presentations.',
      'Confidential information, private data, credentials, and protected business materials will not be shared without permission. Projects covered by a valid confidentiality or non-disclosure agreement will be treated according to that agreement.',
    ],
  },
  {
    title: 'Third-Party Services',
    paragraphs: [
      'Projects may depend on third-party platforms, hosting providers, plugins, APIs, payment processors, app stores, advertising platforms, analytics tools, or other external services.',
      'MarkCoders is not responsible for third-party outages, service limitations, pricing changes, policy changes, account suspensions, security incidents, or data loss caused by those providers.',
      'Any third-party subscription, licensing, transaction, hosting, or platform fees are the client’s responsibility unless they are specifically included in the written project agreement.',
    ],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'MarkCoders provides its services with reasonable skill and care. However, we do not guarantee specific business results, revenue, search rankings, traffic, downloads, leads, conversions, sales, or approval by third-party platforms.',
      'To the maximum extent permitted by applicable law, MarkCoders will not be liable for indirect, incidental, special, or consequential losses arising from the website, services, completed work, or third-party platforms.',
      'Our total liability for any claim will not exceed the amount paid for the specific service connected to that claim. Nothing in these Terms excludes liability that cannot legally be limited or excluded.',
    ],
  },
]

function Terms() {
  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
      <Navbar />
      <main>
        {/* Full-viewport centered hero */}
        <section
          data-snap-section
          className="relative w-screen min-h-[50vh] h-[50vh] flex flex-col items-center justify-center px-6"
          style={{ background: '#030712' }}
        >
          <span
            className="inline-flex items-center justify-center rounded-full px-5 py-1.5 mb-6 text-white text-[13px] md:text-[14px] font-medium tracking-wide"
            style={{ background: '#25A9E0' }}
          >
            Support
          </span>
          <h1
            className="text-center text-white font-medium tracking-tight leading-[1.1]"
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontSize: 'clamp(36px, 7vw, 72px)',
              letterSpacing: '-0.03em',
            }}
          >
            Terms and Conditions
          </h1>
        </section>

        {/* White content body */}
        <section
          data-snap-section
          className="relative w-full bg-white text-[#111] rounded-t-[32px] md:rounded-t-[48px] -mt-6 z-10"
        >
          <div className="max-w-[820px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="flex flex-col gap-10 md:gap-14">
              {TERMS_SECTIONS.map((section, index) => (
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
                          key={item.slice(0, 48)}
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
        </section>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}

export default Terms

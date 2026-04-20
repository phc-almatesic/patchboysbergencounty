import Link from "next/link";
import type { Metadata } from "next";
import { BUSINESS, SERVICES, FAQ } from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import TrackedCTA from "@/components/TrackedCTA";
import TrackedLink from "@/components/TrackedLink";

const PAGE_TITLE = "Drywall Repair FAQs | Bergen County NJ | The Patch Boys";
const PAGE_DESCRIPTION =
  "Answers to common drywall repair, ceiling repair, pricing, insurance, and service questions from Bergen County homeowners, landlords, and property managers.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/faq/" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/faq/",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Drywall Repair FAQs - ${BUSINESS.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function FAQPage() {
  const allFAQs = [
    ...FAQ.map((f) => ({ q: f.q, a: f.a })),
    ...SERVICES.flatMap((s) => s.serviceFAQs.map((f) => ({ q: f.q, a: f.a }))),
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">FAQs</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Drywall Repair FAQs — Bergen County, NJ
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Straight answers to the questions we hear most from homeowners, landlords, and property managers across Bergen County. Don&apos;t see your question? Call {BUSINESS.phone} or request a free estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TrackedCTA
                href="/contact"
                event="cta_click"
                params={{ button_text: "Get Free Estimate", location: "faq_hero" }}
                className="bg-orange text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors text-center"
              >
                Get Free Estimate
              </TrackedCTA>
              <TrackedLink
                href={`tel:${BUSINESS.phone}`}
                event="phone_click"
                params={{ location: "faq_hero" }}
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-navy focus:outline-2 focus:outline-offset-2 focus:outline-white transition-colors text-center"
              >
                Call {BUSINESS.phone}
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Quick-jump nav */}
              <nav aria-label="FAQ sections" className="bg-gray-warm rounded-lg p-5 mb-10">
                <p className="font-bold text-navy mb-3">Jump to a section:</p>
                <ul className="flex flex-wrap gap-2 text-sm">
                  <li>
                    <a href="#general" className="bg-white text-navy font-medium px-3 py-1.5 rounded-lg hover:bg-orange hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-navy transition-colors inline-block">General</a>
                  </li>
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <a href={`#${s.slug}`} className="bg-white text-navy font-medium px-3 py-1.5 rounded-lg hover:bg-orange hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-navy transition-colors inline-block">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* General FAQs */}
              <h2 id="general" className="text-3xl font-bold text-navy mb-6 scroll-mt-24">General Questions</h2>
              <div className="space-y-4 mb-12">
                {FAQ.map((faq, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
                    <h3 className="font-bold text-navy mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>

              {/* Service-specific FAQs */}
              {SERVICES.map((service) => (
                <div key={service.slug} className="mb-12">
                  <h2 id={service.slug} className="text-3xl font-bold text-navy mb-2 scroll-mt-24">
                    {service.title} FAQs
                  </h2>
                  <p className="text-gray-600 mb-6">
                    <Link href={`/services/${service.slug}`} className="text-orange font-semibold hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded">
                      See full {service.title.toLowerCase()} details →
                    </Link>
                  </p>
                  <div className="space-y-4">
                    {service.serviceFAQs.map((faq, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
                        <h3 className="font-bold text-navy mb-2">{faq.q}</h3>
                        <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-navy mb-4">Get a Free Estimate</h2>
                <p className="text-gray-600 mb-5 text-sm">Have a question we didn&apos;t answer? Fill out this form and we&apos;ll contact you within 1 hour.</p>
                <ContactForm variant="compact" />
              </div>

              <div className="bg-navy rounded-xl p-6 text-white">
                <h2 className="text-xl font-bold mb-4">Our Services</h2>
                <ul className="space-y-3">
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="flex items-center gap-3 hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2 transition-colors">
                        <span aria-hidden="true">{s.icon}</span>
                        <span>{s.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange rounded-xl p-6 text-white text-center">
                <h2 className="text-xl font-bold mb-2">Need Help Now?</h2>
                <p className="text-white/90 mb-4 text-sm">Call for same-day service</p>
                <TrackedLink
                  href={`tel:${BUSINESS.phone}`}
                  event="phone_click"
                  params={{ location: "faq_sidebar" }}
                  className="block bg-white text-orange font-bold py-3 rounded-lg hover:bg-gray-100 focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors"
                >
                  {BUSINESS.phone}
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQPage + BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: allFAQs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bergencountypatchboys.com/" },
                { "@type": "ListItem", position: 2, name: "FAQs", item: "https://www.bergencountypatchboys.com/faq/" },
              ],
            },
          ]),
        }}
      />
    </>
  );
}

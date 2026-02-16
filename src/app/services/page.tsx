import Link from "next/link";
import { SERVICES, BUSINESS } from "@/lib/data";
import ServiceImage from "@/components/ServiceImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drywall Repair Services in Bergen County NJ",
  description: "Professional drywall repair, ceiling repair, plaster repair, drywall installation, popcorn ceiling removal, and texture matching services throughout Bergen County, NJ.",
  alternates: {
    canonical: "/services/",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Drywall Repair Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Complete drywall and plaster repair solutions for Bergen County homeowners. From small patches to full installations.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-16">
            {SERVICES.map((service, idx) => (
              <div
                key={service.slug}
                id={service.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:direction-rtl" : ""}`}
              >
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="text-5xl mb-4" aria-hidden="true">{service.icon}</div>
                  <Link href={`/services/${service.slug}`} className="focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded">
                    <h2 className="text-3xl font-bold text-navy mb-4 hover:text-orange transition-colors">{service.title}</h2>
                  </Link>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.longDesc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="text-orange font-bold mt-0.5" aria-hidden="true">✓</span>
                        <span className="text-gray-700">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-block bg-navy text-white font-bold px-8 py-3 rounded-lg hover:bg-navy-light focus:outline-2 focus:outline-offset-2 focus:outline-navy transition-colors"
                    >
                      Learn More
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-block bg-orange text-white font-bold px-8 py-3 rounded-lg hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors"
                    >
                      Get Free Estimate
                    </Link>
                  </div>
                </div>
                <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                  <ServiceImage service={service.slug} size="large" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-warm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">Not Sure What Service You Need?</h2>
          <p className="text-lg text-gray-600 mb-8">
            No problem! Request a free estimate and our expert technicians will assess your situation and recommend the right solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-orange text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors text-lg">
              Request Free Estimate
            </Link>
            <a href={`tel:${BUSINESS.phone}`} className="bg-navy text-white font-bold px-8 py-4 rounded-lg hover:bg-navy-light focus:outline-2 focus:outline-offset-2 focus:outline-white transition-colors text-lg">
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

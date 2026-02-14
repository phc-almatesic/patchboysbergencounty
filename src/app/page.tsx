import Link from "next/link";
import { BUSINESS, SERVICES, BERGEN_TOWNS, TESTIMONIALS, FAQ } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

function HeroSection() {
  return (
    <section className="relative bg-navy overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-orange/20 text-orange font-semibold px-4 py-2 rounded-full text-sm mb-6">
              Serving All of Bergen County, NJ
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Expert Drywall Repair in{" "}
              <span className="text-orange">Bergen County</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Holes, cracks, water damage — we fix it all. Professional drywall repairs with free estimates, same-day service, and results so seamless you&apos;ll forget there was ever damage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/contact"
                className="bg-orange text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-dark transition-colors text-lg shadow-lg text-center"
              >
                Get Your Free Estimate
              </Link>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-navy transition-colors text-lg text-center"
              >
                📞 {BUSINESS.phone}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
              <span className="flex items-center gap-2">✅ Free Estimates</span>
              <span className="flex items-center gap-2">✅ Same-Day Service</span>
              <span className="flex items-center gap-2">✅ Fully Insured</span>
              <span className="flex items-center gap-2">✅ Satisfaction Guaranteed</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-navy mb-2">Get a Free Estimate</h2>
            <p className="text-gray-600 mb-6 text-sm">Fill out this quick form and we&apos;ll contact you within 1 hour.</p>
            <ContactForm variant="compact" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { number: "1,000+", label: "Repairs Completed" },
    { number: "4.9★", label: "Average Rating" },
    { number: "Same Day", label: "Service Available" },
    { number: "100%", label: "Satisfaction Guarantee" },
  ];

  return (
    <section className="bg-gray-warm py-8 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-orange">{stat.number}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Our Drywall Repair Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From small nail holes to full ceiling repairs, we handle every type of drywall and plaster project in Bergen County.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange/30 transition-all"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-orange transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {service.shortDesc}
              </p>
              <span className="text-orange font-semibold text-sm group-hover:underline">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Request Your Free Estimate",
      desc: "Call us or fill out our online form. We'll schedule a convenient time to assess your repair needs — no obligation.",
    },
    {
      num: "2",
      title: "We Repair Your Walls",
      desc: "Our skilled technicians arrive on time, protect your home, and expertly repair your drywall with precision and care.",
    },
    {
      num: "3",
      title: "Enjoy Flawless Results",
      desc: "We clean up, walk you through the work, and leave you with walls that look like they were never damaged.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-warm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">Getting your walls repaired is simple.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="w-16 h-16 bg-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            What Bergen County Homeowners Say
          </h2>
          <p className="text-lg text-gray-600">
            Don&apos;t just take our word for it — see what our customers have to say.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-orange text-lg mb-3">{"★".repeat(t.rating)}</div>
              <p className="text-gray-700 leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="font-bold text-navy">{t.name}</p>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceAreasPreview() {
  const featured = BERGEN_TOWNS.slice(0, 12);
  return (
    <section className="py-16 md:py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Serving All of Bergen County
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            From Hackensack to Mahwah, Ridgewood to Fort Lee — we provide expert drywall repair services to every community in Bergen County, NJ.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {featured.map((town) => (
            <Link
              key={town.slug}
              href={`/areas/${town.slug}`}
              className="bg-white/10 hover:bg-orange text-white font-medium py-3 px-4 rounded-lg text-center text-sm transition-colors"
            >
              {town.name}
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/areas" className="text-orange font-semibold hover:underline text-lg">
            View all {BERGEN_TOWNS.length} service areas →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-warm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-navy cursor-pointer hover:text-orange transition-colors list-none flex items-center justify-between">
                {item.q}
                <span className="text-orange text-xl ml-4 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <HowItWorks />
      <TestimonialsSection />
      <ServiceAreasPreview />
      <FAQSection />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: BUSINESS.name,
            description: BUSINESS.description,
            telephone: BUSINESS.phone,
            email: BUSINESS.email,
            areaServed: {
              "@type": "County",
              name: "Bergen County",
              containedInPlace: {
                "@type": "State",
                name: "New Jersey",
              },
            },
            serviceType: SERVICES.map((s) => s.title),
            priceRange: "$$",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Drywall Repair Services",
              itemListElement: SERVICES.map((s) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: s.title,
                  description: s.shortDesc,
                },
              })),
            },
          }),
        }}
      />
    </>
  );
}

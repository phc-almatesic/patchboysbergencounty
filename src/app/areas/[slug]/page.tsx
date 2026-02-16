import Link from "next/link";
import { notFound } from "next/navigation";
import { BERGEN_TOWNS, SERVICES, BUSINESS, TESTIMONIALS } from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BERGEN_TOWNS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const town = BERGEN_TOWNS.find((t) => t.slug === slug);
  if (!town) return {};
  const pageTitle = `Drywall Repair ${town.name} NJ | Patch Boys`;
  const ogDesc = `Expert drywall repair services in ${town.name}, NJ ${town.zip}. Free estimates and same-day service.`;
  return {
    title: { absolute: pageTitle },
    description: `Expert drywall repair, ceiling repair, and plaster repair services in ${town.name}, NJ ${town.zip}. Free estimates, same-day service, and satisfaction guaranteed. Call ${BUSINESS.phone}.`,
    keywords: [
      `drywall repair ${town.name} NJ`,
      `ceiling repair ${town.name}`,
      `plaster repair ${town.name} NJ`,
      `drywall contractor ${town.name}`,
      `sheetrock repair ${town.name} New Jersey`,
    ],
    alternates: {
      canonical: `/areas/${slug}/`,
    },
    openGraph: {
      title: pageTitle,
      description: ogDesc,
      url: `https://www.bergencountypatchboys.com/areas/${slug}/`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: ogDesc,
    },
  };
}

export default async function TownPage({ params }: Props) {
  const { slug } = await params;
  const town = BERGEN_TOWNS.find((t) => t.slug === slug);
  if (!town) notFound();

  const nearbyTowns = BERGEN_TOWNS.filter((t) => t.slug !== slug).slice(0, 6);
  // Deterministic testimonial selection based on slug to avoid hydration mismatches
  const slugHash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const relevantTestimonial = TESTIMONIALS[slugHash % TESTIMONIALS.length];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/areas" className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1">Service Areas</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">{town.name}, NJ</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Drywall Repair in {town.name}, NJ
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Professional drywall repair, ceiling repair, and plaster repair services for {town.name} homeowners.
                Free estimates, same-day service, and flawless results guaranteed.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-8">
                <span className="flex items-center gap-2"><span aria-hidden="true">✅</span> Free Estimates</span>
                <span className="flex items-center gap-2"><span aria-hidden="true">✅</span> Same-Day Service</span>
                <span className="flex items-center gap-2"><span aria-hidden="true">✅</span> Serving {town.name} {town.zip}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`tel:${BUSINESS.phone}`} className="bg-orange text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-dark transition-colors text-center text-lg">
                  Call {BUSINESS.phone}
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h2 className="text-xl font-bold text-navy mb-2">Get a Free Estimate in {town.name}</h2>
              <p className="text-gray-600 text-sm mb-4">Quick response — usually within 1 hour</p>
              <ContactForm variant="compact" />
            </div>
          </div>
        </div>
      </section>

      {/* Services in Town */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">
            Our Services in {town.name}, NJ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-orange/30 transition-all"
              >
                <div className="text-3xl mb-3" aria-hidden="true">{service.icon}</div>
                <h3 className="text-lg font-bold text-navy group-hover:text-orange transition-colors mb-2">
                  {service.title} in {town.name}
                </h3>
                <p className="text-gray-600 text-sm">{service.shortDesc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-warm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">
                Why {town.name} Homeowners Choose The Patch Boys
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Local Bergen County Team", desc: `We know ${town.name} and Bergen County. Our local technicians arrive quickly and understand the unique needs of homes in your area.` },
                  { title: "Free, No-Obligation Estimates", desc: "We'll assess your repair needs and give you an honest, upfront price before any work begins. No surprises, no pressure." },
                  { title: "Same-Day Repairs Available", desc: "Most drywall repairs are completed in a single visit. Call in the morning, enjoy perfect walls by evening." },
                  { title: "Invisible Repair Results", desc: "Our texture matching and finishing expertise means you won't be able to tell where the damage was. That's our guarantee." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-0.5">✓</div>
                    <div>
                      <h3 className="font-bold text-navy">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="text-orange text-lg mb-3" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="text-gray-700 leading-relaxed italic mb-4">&ldquo;{relevantTestimonial.text}&rdquo;</p>
              <p className="font-bold text-navy">{relevantTestimonial.name}</p>
              <p className="text-sm text-gray-500">{relevantTestimonial.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Towns */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-navy mb-6">
            Also Serving Nearby Communities
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {nearbyTowns.map((t) => (
              <Link
                key={t.slug}
                href={`/areas/${t.slug}`}
                className="bg-gray-warm text-navy font-medium px-4 py-2 rounded-lg hover:bg-orange hover:text-white transition-colors"
              >
                {t.name}, NJ
              </Link>
            ))}
            <Link href="/areas" className="text-orange font-semibold px-4 py-2">View all areas →</Link>
          </div>
        </div>
      </section>

      {/* LocalBusiness + BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "@id": "https://www.bergencountypatchboys.com/#business",
              name: `${BUSINESS.name} - ${town.name}`,
              description: `Professional drywall repair services in ${town.name}, NJ ${town.zip}`,
              url: `https://www.bergencountypatchboys.com/areas/${town.slug}/`,
              telephone: BUSINESS.phone,
              email: BUSINESS.email,
              image: "https://www.bergencountypatchboys.com/logo.png",
              priceRange: "$$",
              areaServed: [
                {
                  "@type": "City",
                  name: town.name,
                  containedInPlace: {
                    "@type": "AdministrativeArea",
                    name: "Bergen County, New Jersey",
                  },
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: town.name,
                addressRegion: "NJ",
                postalCode: town.zip,
                addressCountry: "US",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bergencountypatchboys.com/" },
                { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://www.bergencountypatchboys.com/areas/" },
                { "@type": "ListItem", position: 3, name: `${town.name}, NJ` },
              ],
            },
          ]),
        }}
      />
    </>
  );
}

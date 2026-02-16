import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, BUSINESS, BERGEN_TOWNS } from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  const pageTitle = `${service.title} Bergen County NJ | Patch Boys`;
  const pageDesc = `Professional ${service.title.toLowerCase()} services in Bergen County, New Jersey. ${service.shortDesc} Free estimates available.`;
  return {
    title: { absolute: pageTitle },
    description: pageDesc,
    keywords: service.keywords,
    alternates: {
      canonical: `/services/${slug}/`,
    },
    openGraph: {
      title: pageTitle,
      description: `Professional ${service.title.toLowerCase()} services in Bergen County, NJ. ${service.shortDesc}`,
      url: `https://www.bergencountypatchboys.com/services/${slug}/`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: `Professional ${service.title.toLowerCase()} services in Bergen County, NJ. ${service.shortDesc}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = SERVICES.filter((s) => s.slug !== slug);
  const topTowns = BERGEN_TOWNS.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/services" className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1">Services</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {service.title} in Bergen County, NJ
              </h1>
              <p className="text-xl text-gray-300 mb-8">{service.shortDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-orange text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors text-center">
                  Get Free Estimate
                </Link>
                <a href={`tel:${BUSINESS.phone}`} className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-navy focus:outline-2 focus:outline-offset-2 focus:outline-white transition-colors text-center">
                  Call {BUSINESS.phone}
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h2 className="text-xl font-bold text-navy mb-4">Request a Free {service.title} Estimate</h2>
              <ContactForm variant="compact" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-navy mb-6">
                Professional {service.title} Services in Bergen County
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">{service.longDesc}</p>

              <h3 className="text-2xl font-bold text-navy mb-4">Why Choose Us for {service.title}?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 bg-gray-warm p-4 rounded-lg">
                    <span className="text-orange font-bold text-xl" aria-hidden="true">✓</span>
                    <span className="text-gray-700 font-medium">{b}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-navy mb-4">
                {service.title} in Your Bergen County Town
              </h3>
              <p className="text-gray-600 mb-4">
                We provide {service.title.toLowerCase()} services throughout Bergen County, including:
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {topTowns.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/areas/${t.slug}`}
                    className="bg-gray-warm text-navy font-medium px-3 py-1.5 rounded-lg text-sm hover:bg-orange hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-navy transition-colors"
                  >
                    {t.name}
                  </Link>
                ))}
                <Link href="/areas" className="text-orange font-semibold px-3 py-1.5 text-sm hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded">+ more</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-navy rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Our Other Services</h3>
                <ul className="space-y-3">
                  {otherServices.map((s) => (
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
                <h3 className="text-xl font-bold mb-2">Need Help Now?</h3>
                <p className="text-white/90 mb-4 text-sm">Call for same-day service</p>
                <a href={`tel:${BUSINESS.phone}`} className="block bg-white text-orange font-bold py-3 rounded-lg hover:bg-gray-100 focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors">
                  {BUSINESS.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service + BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: `${service.title} in Bergen County, NJ`,
              description: service.longDesc,
              url: `https://www.bergencountypatchboys.com/services/${slug}/`,
              provider: {
                "@type": "HomeAndConstructionBusiness",
                "@id": "https://www.bergencountypatchboys.com/#business",
                name: BUSINESS.name,
                telephone: BUSINESS.phone,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: BUSINESS.addressLocality,
                  addressRegion: BUSINESS.addressRegion,
                  postalCode: BUSINESS.postalCode,
                  addressCountry: "US",
                },
              },
              areaServed: {
                "@type": "AdministrativeArea",
                name: "Bergen County, New Jersey",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bergencountypatchboys.com/" },
                { "@type": "ListItem", position: 2, name: "Services", item: "https://www.bergencountypatchboys.com/services/" },
                { "@type": "ListItem", position: 3, name: service.title },
              ],
            },
          ]),
        }}
      />
    </>
  );
}

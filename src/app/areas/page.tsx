import Link from "next/link";
import { BERGEN_TOWNS, SERVICES, BUSINESS } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Bergen County Service Areas | Drywall Repair" },
  description: `The Patch Boys provides professional drywall repair services to all ${BERGEN_TOWNS.length}+ communities in Bergen County, New Jersey. Find drywall repair near you.`,
  alternates: {
    canonical: "/areas/",
  },
  openGraph: {
    title: "Bergen County Service Areas | Drywall Repair Near You",
    description: `Professional drywall repair services in all ${BERGEN_TOWNS.length}+ Bergen County communities. Find drywall repair near you.`,
    url: "https://www.bergencountypatchboys.com/areas/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bergen County Drywall Repair Service Areas",
    description: `Serving all ${BERGEN_TOWNS.length}+ Bergen County communities. Find drywall repair near you.`,
  },
};

export default function AreasPage() {
  return (
    <>
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bergen County Service Areas
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We provide expert drywall repair services to every community in Bergen County, NJ. Click your town to learn more about our services in your area.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {BERGEN_TOWNS.map((town) => (
              <Link
                key={town.slug}
                href={`/areas/${town.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-orange/30 transition-all"
              >
                <h2 className="text-lg font-bold text-navy group-hover:text-orange transition-colors">
                  {town.name}, NJ
                </h2>
                <p className="text-sm text-gray-500 mt-1">ZIP: {town.zip}</p>
                <p className="text-sm text-orange font-medium mt-2">Drywall repair services →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-warm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">Don&apos;t See Your Town?</h2>
          <p className="text-lg text-gray-600 mb-8">
            We serve all of Bergen County! If your town isn&apos;t listed, we still come to you. Call us or request an estimate online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-orange text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-dark transition-colors text-lg">
              Request Free Estimate
            </Link>
            <a href={`tel:${BUSINESS.phone}`} className="bg-navy text-white font-bold px-8 py-4 rounded-lg hover:bg-navy-light transition-colors text-lg">
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ItemList + BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Drywall Repair Service Areas in Bergen County NJ",
              description: "All Bergen County communities served by The Patch Boys.",
              numberOfItems: BERGEN_TOWNS.length,
              itemListElement: BERGEN_TOWNS.map((t, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `${t.name}, NJ`,
                url: `https://www.bergencountypatchboys.com/areas/${t.slug}/`,
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bergencountypatchboys.com/" },
                { "@type": "ListItem", position: 2, name: "Service Areas" },
              ],
            },
          ]),
        }}
      />
    </>
  );
}

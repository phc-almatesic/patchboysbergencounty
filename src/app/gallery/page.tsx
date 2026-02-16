import Link from "next/link";
import { BUSINESS } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Before & After Gallery | Drywall Repair Results" },
  description: "See the incredible before and after results of our drywall repair work throughout Bergen County, NJ. Invisible patches guaranteed.",
  alternates: {
    canonical: "/gallery/",
  },
  openGraph: {
    title: "Before & After Drywall Repair Gallery | Bergen County NJ",
    description: "See the incredible before and after results of our drywall repair work throughout Bergen County, NJ.",
    url: "https://www.bergencountypatchboys.com/gallery/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Before & After Drywall Repair Gallery",
    description: "See our drywall repair results throughout Bergen County, NJ. Invisible patches guaranteed.",
  },
};

const GALLERY_ITEMS = [
  { title: "Large Hole Repair", location: "Ridgewood, NJ", desc: "Doorknob damage patched and textured to match", beforeColor: "from-red-100 to-red-50", afterColor: "from-green-50 to-emerald-50" },
  { title: "Water Damage Ceiling", location: "Paramus, NJ", desc: "Bathroom leak ceiling repair with texture matching", beforeColor: "from-amber-100 to-yellow-50", afterColor: "from-sky-50 to-blue-50" },
  { title: "Plaster Crack Repair", location: "Teaneck, NJ", desc: "Historic home plaster crack stabilized and refinished", beforeColor: "from-stone-200 to-stone-100", afterColor: "from-stone-50 to-amber-50" },
  { title: "Popcorn Ceiling Removal", location: "Fort Lee, NJ", desc: "Full living room popcorn ceiling removed and smoothed", beforeColor: "from-gray-200 to-gray-100", afterColor: "from-violet-50 to-purple-50" },
  { title: "Multiple Nail Holes", location: "Hackensack, NJ", desc: "12 nail holes patched after picture rearrangement", beforeColor: "from-orange-100 to-orange-50", afterColor: "from-teal-50 to-cyan-50" },
  { title: "Drywall Installation", location: "Fair Lawn, NJ", desc: "Basement finishing with new drywall installation", beforeColor: "from-zinc-200 to-zinc-100", afterColor: "from-lime-50 to-green-50" },
  { title: "Corner Bead Repair", location: "Bergenfield, NJ", desc: "Damaged corner bead replaced and refinished", beforeColor: "from-rose-100 to-rose-50", afterColor: "from-indigo-50 to-blue-50" },
  { title: "Texture Matching", location: "Englewood, NJ", desc: "Knockdown texture perfectly matched on repaired section", beforeColor: "from-yellow-100 to-amber-50", afterColor: "from-pink-50 to-rose-50" },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Work — Before &amp; After
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See the results that Bergen County homeowners love. Every repair is finished to be completely invisible.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                {/* Before/After comparison */}
                <div className="grid grid-cols-2 h-56">
                  <div className={`bg-gradient-to-br ${item.beforeColor} flex flex-col items-center justify-center relative p-4`}>
                    <div className="absolute top-3 left-3 bg-red-500/80 text-white text-xs font-bold px-2 py-1 rounded">BEFORE</div>
                    <div className="text-5xl opacity-60 mb-2">😟</div>
                    <p className="text-gray-500 text-xs text-center font-medium">Damaged</p>
                  </div>
                  <div className={`bg-gradient-to-br ${item.afterColor} flex flex-col items-center justify-center relative p-4 border-l border-gray-100`}>
                    <div className="absolute top-3 right-3 bg-green-500/80 text-white text-xs font-bold px-2 py-1 rounded">AFTER</div>
                    <div className="text-5xl mb-2">😍</div>
                    <p className="text-gray-500 text-xs text-center font-medium">Flawless</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                    <span className="text-xs font-medium text-orange bg-orange/10 px-2 py-1 rounded-full">{item.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-orange/5 border border-orange/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-navy mb-2">Real Photos Coming Soon!</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We&apos;re building our before &amp; after photo gallery from actual Bergen County jobs. In the meantime, request your free estimate and see our quality firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-orange text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-dark transition-colors">
                Get Free Estimate
              </Link>
              <a href={`tel:${BUSINESS.phone}`} className="bg-navy text-white font-bold px-8 py-4 rounded-lg hover:bg-navy-light transition-colors">
                Call {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bergencountypatchboys.com/" },
              { "@type": "ListItem", position: 2, name: "Gallery" },
            ],
          }),
        }}
      />
    </>
  );
}

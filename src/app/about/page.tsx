import Link from "next/link";
import Image from "next/image";
import { BUSINESS } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About The Patch Boys of Bergen County NJ",
  description: "Learn about The Patch Boys of Bergen County — your local drywall repair experts. Fully licensed, insured, and committed to flawless results.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About {BUSINESS.name}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bergen County&apos;s trusted drywall repair specialists. Part of a nationally recognized franchise with local expertise.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Your Local Drywall Repair Experts</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The Patch Boys of Bergen County is your go-to team for all drywall and plaster repair needs. As part of The Patch Boys national franchise — a proud member of the BELFOR Franchise Group — we combine the resources and proven systems of a national brand with the personal touch and dedication of a local business.
                </p>
                <p>
                  We specialize exclusively in drywall repair, which means we&apos;re not a jack-of-all-trades handyman service. Drywall is all we do, and we do it exceptionally well. Our focused expertise means faster repairs, better results, and pricing that&apos;s fair because we&apos;ve streamlined our process.
                </p>
                <p>
                  Every home in Bergen County deserves flawless walls and ceilings. Whether you have a small nail hole in Ridgewood, water-damaged ceiling in Hackensack, or need popcorn ceiling removed in Paramus — we&apos;re here to help with free estimates and same-day service.
                </p>
              </div>
            </div>
            <div className="bg-gray-warm rounded-2xl p-12 flex items-center justify-center">
              <Image src="/logo.png" alt="The Patch Boys" width={300} height={170} className="w-auto max-h-40" />
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Quality Craftsmanship",
                desc: "Every repair is performed to the highest standard. We don't cut corners — we fix them. Our goal is invisible repairs that look like the damage never happened.",
                icon: "🏆",
              },
              {
                title: "Respect for Your Home",
                desc: "We treat your home like our own. Drop cloths protect your floors, we clean up thoroughly, and our uniformed technicians are always professional and courteous.",
                icon: "🏠",
              },
              {
                title: "Honest, Fair Pricing",
                desc: "Our free estimates are straightforward and all-inclusive. No hidden fees, no upselling. The price we quote is the price you pay.",
                icon: "💰",
              },
            ].map((v) => (
              <div key={v.title} className="text-center p-6">
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-2">{v.title}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Differentiators */}
          <div className="bg-navy rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Why The Patch Boys?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Drywall repair is ALL we do — focused expertise",
                "Free, no-obligation estimates every time",
                "Most repairs completed in a single visit",
                "Fully licensed and insured for your protection",
                "Backed by the BELFOR Franchise Group",
                "Satisfaction guaranteed on every repair",
                "Clean, uniformed, professional technicians",
                "Serving all 70+ Bergen County communities",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-orange text-xl">✓</span>
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-warm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Request your free estimate today and see why Bergen County homeowners trust The Patch Boys.
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
    </>
  );
}

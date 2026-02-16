import Link from "next/link";
import Image from "next/image";
import { BUSINESS, SERVICES, BERGEN_TOWNS } from "@/lib/data";

export default function Footer() {
  const topTowns = BERGEN_TOWNS.slice(0, 12);

  return (
    <footer className="bg-navy-dark text-white pb-16 lg:pb-0" role="contentinfo">
      {/* CTA banner */}
      <div className="bg-orange py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Fix Your Walls?
          </h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Get a free, no-obligation estimate today. Most repairs completed same day!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-orange font-bold px-8 py-4 rounded-lg hover:bg-gray-100 focus:outline-2 focus:outline-offset-2 focus:outline-white transition-colors text-lg shadow-lg"
            >
              Request Free Estimate
            </Link>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="bg-navy text-white font-bold px-8 py-4 rounded-lg hover:bg-navy-light focus:outline-2 focus:outline-offset-2 focus:outline-white transition-colors text-lg shadow-lg"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Image src="/logo.png" alt="The Patch Boys of Bergen County" width={160} height={90} className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {BUSINESS.description}
            </p>
            <p className="text-gray-400 text-sm mb-4">{BUSINESS.hours}</p>
            <a
              href="https://www.google.com/search?q=The+Patch+Boys+of+Bergen+County+NJ+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white/10 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors"
            >
              Leave Us a Review
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange">Our Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-gray-300 hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1 transition-colors text-sm">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange">Service Areas</h3>
            <ul className="space-y-2">
              {topTowns.map((t) => (
                <li key={t.slug}>
                  <Link href={`/areas/${t.slug}`} className="text-gray-300 hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1 transition-colors text-sm">
                    {t.name}, NJ
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/areas" className="text-orange font-semibold text-sm hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1">
                  View all areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                <strong className="text-white">Phone:</strong><br />
                <a href={`tel:${BUSINESS.phone}`} className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1 transition-colors">{BUSINESS.phone}</a>
              </p>
              <p>
                <strong className="text-white">Email:</strong><br />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1 transition-colors">{BUSINESS.email}</a>
              </p>
              <p>
                <strong className="text-white">Service Area:</strong><br />
                Bergen County, New Jersey
              </p>
              <p>
                <strong className="text-white">Hours:</strong><br />
                {BUSINESS.hours}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-block mt-4 bg-orange text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-white transition-colors text-sm"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1 transition-colors">About</Link>
            <span className="text-white/20" aria-hidden="true">|</span>
            <Link href="/contact" className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1 transition-colors">Contact</Link>
            <span className="text-white/20" aria-hidden="true">|</span>
            <span>A BELFOR Franchise Group Company</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

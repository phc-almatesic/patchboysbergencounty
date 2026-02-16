import { BUSINESS } from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import GoogleMap from "@/components/GoogleMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Free Drywall Repair Estimate in Bergen County NJ",
  description: "Request a free, no-obligation drywall repair estimate in Bergen County, NJ. Call or fill out our form for fast, professional service.",
  alternates: {
    canonical: "/contact/",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Your Free Estimate
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to fix your walls? Fill out the form below or give us a call. We respond within 1 business hour.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-navy mb-6">Request a Free Estimate</h2>
                <ContactForm variant="full" />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-orange rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Prefer to Call?</h3>
                <p className="text-white/90 mb-4">Speak with us directly for immediate assistance or to schedule your free estimate.</p>
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="block bg-white text-orange font-bold py-4 rounded-lg text-center text-lg hover:bg-gray-100 focus:outline-2 focus:outline-offset-2 focus:outline-white transition-colors"
                  aria-label={`Call us at ${BUSINESS.phone}`}
                >
                  📞 {BUSINESS.phone}
                </a>
              </div>

              <div className="bg-navy rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Contact Info</h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Phone:</strong><br />
                    <a href={`tel:${BUSINESS.phone}`} className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1 transition-colors">{BUSINESS.phone}</a>
                  </p>
                  <p>
                    <strong>Email:</strong><br />
                    <a href={`mailto:${BUSINESS.email}`} className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1 transition-colors">{BUSINESS.email}</a>
                  </p>
                  <p>
                    <strong>Hours:</strong><br />
                    {BUSINESS.hours}
                  </p>
                  <p>
                    <strong>Service Area:</strong><br />
                    All of Bergen County, NJ
                  </p>
                </div>
              </div>

              <div className="bg-gray-warm rounded-xl p-6">
                <h3 className="text-xl font-bold text-navy mb-4">What to Expect</h3>
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="bg-orange text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" aria-label="Step 1">1</span>
                    <span>We&apos;ll contact you within 1 business hour to discuss your needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-orange text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" aria-label="Step 2">2</span>
                    <span>Schedule a convenient time for a free, in-home estimate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-orange text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" aria-label="Step 3">3</span>
                    <span>Get a clear, upfront price — no surprises, no obligation</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-warm">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-navy mb-6 text-center">Our Service Area — All of Bergen County</h2>
          <GoogleMap />
        </div>
      </section>
    </>
  );
}

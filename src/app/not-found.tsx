import Link from "next/link";
import { BUSINESS } from "@/lib/data";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-8xl mb-6">🕳️</div>
        <h1 className="text-5xl md:text-6xl font-bold text-navy mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
          Looks Like This Page Has a Hole in It
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          Don&apos;t worry — patching holes is literally what we do.
        </p>
        <p className="text-gray-500 mb-8">
          Unfortunately, we can&apos;t patch this one. The page you&apos;re looking for has been moved, removed, or never existed (kind of like that &ldquo;small&rdquo; hole behind the couch you&apos;ve been ignoring).
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="bg-orange text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-dark transition-colors text-lg"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="bg-navy text-white font-bold px-8 py-4 rounded-lg hover:bg-navy-light transition-colors text-lg"
          >
            Get a Free Estimate
          </Link>
        </div>
        <div className="bg-gray-warm rounded-xl p-6 inline-block">
          <p className="text-gray-600 text-sm mb-1">Got a real hole that needs fixing?</p>
          <a href={`tel:${BUSINESS.phone}`} className="text-orange font-bold text-lg hover:underline">
            Call {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

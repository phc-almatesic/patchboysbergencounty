"use client";

import { useState } from "react";
import { BUSINESS, BERGEN_TOWNS } from "@/lib/data";

export default function ContactForm({ variant = "full" }: { variant?: "full" | "compact" }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">
          We&apos;ve received your request and will contact you within 1 business hour.
          For immediate assistance, call us at{" "}
          <a href={`tel:${BUSINESS.phone}`} className="font-bold underline">{BUSINESS.phone}</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={variant === "full" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            required
            placeholder="John Smith"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            required
            placeholder="(201) 555-0199"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
          />
        </div>
      </div>

      <div className={variant === "full" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Town / City *</label>
          <select
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-white"
          >
            <option value="">Select your town...</option>
            {BERGEN_TOWNS.map((t) => (
              <option key={t.slug} value={t.name}>{t.name}</option>
            ))}
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Service Needed</label>
        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-white">
          <option value="">Select a service...</option>
          <option value="drywall-repair">Drywall Repair</option>
          <option value="ceiling-repair">Ceiling Repair</option>
          <option value="plaster-repair">Plaster Repair</option>
          <option value="drywall-installation">Drywall Installation</option>
          <option value="popcorn-ceiling">Popcorn Ceiling Removal</option>
          <option value="texture-matching">Texture Matching</option>
          <option value="painting">Painting & Touch-Up</option>
          <option value="other">Other / Not Sure</option>
        </select>
      </div>

      {variant === "full" && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Describe Your Project</label>
          <textarea
            rows={4}
            placeholder="Tell us about your drywall repair needs, the number of holes/areas to fix, and any other details..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all resize-y"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-orange text-white font-bold py-4 px-8 rounded-lg hover:bg-orange-dark transition-colors shadow-lg text-lg"
      >
        Get My Free Estimate →
      </button>

      <p className="text-xs text-gray-500 text-center">
        No obligation. We&apos;ll contact you within 1 business hour.
      </p>
    </form>
  );
}

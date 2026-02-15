"use client";

import { useState } from "react";
import { BUSINESS, BERGEN_TOWNS } from "@/lib/data";
import { pushEvent } from "./TrackingProvider";

export default function ContactForm({ variant = "full" }: { variant?: "full" | "compact" }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
        pushEvent("form_submitted", {
          form_type: variant === "full" ? "contact_page" : "inline_hero",
          service: data.get("service")?.toString() || "",
          town: data.get("town")?.toString() || "",
        });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
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
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
      <input type="hidden" name="_subject" value="New Estimate Request – Patch Boys Bergen County" />
      {/* Honeypot field - hidden from real users, catches bots */}
      <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-700">
          Something went wrong. Please try again or call us at{" "}
          <a href={`tel:${BUSINESS.phone}`} className="font-bold underline">{BUSINESS.phone}</a>
        </div>
      )}

      <div className={variant === "full" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            required
            placeholder="John Smith"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            name="phone"
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
            name="email"
            required
            placeholder="john@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Town / City *</label>
          <select
            name="town"
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
        <select name="service" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-white">
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
        <>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Describe Your Project</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your drywall repair needs, the number of holes/areas to fix, and any other details..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Upload Photos of Your Damage <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange hover:bg-orange-50 transition-all">
              <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">Tap to upload photos</span>
              <span className="text-xs text-gray-400 mt-1">Up to 4 images (JPG, PNG, HEIC)</span>
              <input
                type="file"
                name="photos"
                multiple
                accept="image/jpeg,image/png,image/heic,image/heif"
                className="hidden"
                onChange={(e) => {
                  const label = e.target.closest("label");
                  const files = e.target.files;
                  if (label && files && files.length > 0) {
                    const span = label.querySelector("span");
                    if (span) span.textContent = `${files.length} photo${files.length > 1 ? "s" : ""} selected`;
                  }
                }}
              />
            </label>
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-orange text-white font-bold py-4 px-8 rounded-lg hover:bg-orange-dark transition-colors shadow-lg text-lg disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Get My Free Estimate →"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        No obligation. We&apos;ll contact you within 1 business hour.
      </p>
    </form>
  );
}

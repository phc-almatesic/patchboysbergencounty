"use client";

import { BUSINESS } from "@/lib/data";
import { trackEvent } from "@/lib/tracking";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 flex gap-2 lg:hidden z-40">
      <a
        href={`tel:${BUSINESS.phone}`}
        onClick={() =>
          trackEvent("phone_click", { location: "sticky_cta" })
        }
        className="flex-1 bg-navy text-white font-bold py-3 rounded-lg text-center text-sm"
      >
        📞 Call Now
      </a>
      <a
        href="/contact"
        onClick={() =>
          trackEvent("cta_clicked", {
            button_text: "Free Estimate",
            location: "sticky_cta",
          })
        }
        className="flex-1 bg-orange text-white font-bold py-3 rounded-lg text-center text-sm"
      >
        Free Estimate
      </a>
    </div>
  );
}

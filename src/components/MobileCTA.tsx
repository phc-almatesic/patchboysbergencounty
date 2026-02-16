"use client";

import { BUSINESS } from "@/lib/data";
import { pushEvent } from "./TrackingProvider";

export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 flex gap-2 lg:hidden z-40" aria-label="Mobile action buttons" role="region">
      <a
        href={`tel:${BUSINESS.phone}`}
        className="flex-1 bg-navy text-white font-bold py-3 rounded-lg text-center text-sm hover:bg-navy-light focus:outline-2 focus:outline-offset-2 focus:outline-navy transition-colors"
        onClick={() => pushEvent("phone_click", { location: "mobile_sticky_bar" })}
        aria-label={`Call us at ${BUSINESS.phone}`}
      >
        📞 Call Now
      </a>
      <a
        href="/contact"
        className="flex-1 bg-orange text-white font-bold py-3 rounded-lg text-center text-sm hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors"
        onClick={() => pushEvent("cta_clicked", { button_text: "Free Estimate", location: "mobile_sticky_bar" })}
      >
        Free Estimate
      </a>
    </div>
  );
}

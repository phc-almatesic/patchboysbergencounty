"use client";

import { BUSINESS } from "@/lib/data";
import { pushEvent } from "./TrackingProvider";

export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 flex gap-2 lg:hidden z-40">
      <a
        href={`tel:${BUSINESS.phone}`}
        className="flex-1 bg-navy text-white font-bold py-3 rounded-lg text-center text-sm"
        onClick={() => pushEvent("phone_click", { location: "mobile_sticky_bar" })}
      >
        📞 Call Now
      </a>
      <a
        href="/contact"
        className="flex-1 bg-orange text-white font-bold py-3 rounded-lg text-center text-sm"
        onClick={() => pushEvent("cta_clicked", { button_text: "Free Estimate", location: "mobile_sticky_bar" })}
      >
        Free Estimate
      </a>
    </div>
  );
}

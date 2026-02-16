"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

/**
 * Fires a page_404 event once when the 404 page mounts, capturing
 * the URL the user tried to visit so the business owner can
 * identify broken links or typos.
 */
export default function NotFoundTracker() {
  useEffect(() => {
    trackEvent("page_404", {
      page_url: window.location.pathname + window.location.search,
      referrer: document.referrer || "direct",
    });
  }, []);

  return null;
}

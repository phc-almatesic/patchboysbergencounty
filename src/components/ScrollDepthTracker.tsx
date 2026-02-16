"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/tracking";

/**
 * Fires scroll_depth events at 25%, 50%, 75%, and 100% thresholds.
 * Each threshold fires only once per page view.
 * Mount this component once in the root layout.
 */
export default function ScrollDepthTracker() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const t of thresholds) {
        if (percent >= t && !firedRef.current.has(t)) {
          firedRef.current.add(t);
          trackEvent("scroll_depth", {
            percent: String(t),
            page_path: window.location.pathname,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}

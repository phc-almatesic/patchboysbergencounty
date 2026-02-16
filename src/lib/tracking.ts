declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Push an event to the GTM dataLayer.
 *
 * Centralised helper used by every component on the site. It
 * guards against SSR (typeof window) and lazily initialises the
 * dataLayer array if GTM hasn't loaded yet, preventing race
 * conditions.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string>
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

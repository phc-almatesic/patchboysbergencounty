"use client";

import { trackEvent } from "@/lib/tracking";

/**
 * A thin client wrapper around an <a> tag that fires a GTM dataLayer
 * event on click. Use this inside server components that cannot call
 * trackEvent directly.
 */
export default function TrackedLink({
  href,
  event,
  params,
  className,
  children,
  target,
  rel,
  "aria-label": ariaLabel,
}: {
  href: string;
  event: string;
  params: Record<string, string>;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onClick={() => trackEvent(event, params)}
    >
      {children}
    </a>
  );
}

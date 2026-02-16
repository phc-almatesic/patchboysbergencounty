"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/tracking";

/**
 * A client-side Next.js Link that fires a GTM event on click.
 * Use inside server components for CTA buttons that need tracking.
 */
export default function TrackedCTA({
  href,
  event,
  params,
  className,
  children,
}: {
  href: string;
  event: string;
  params: Record<string, string>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent(event, params)}
    >
      {children}
    </Link>
  );
}

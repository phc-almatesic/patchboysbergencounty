"use client";

import { BUSINESS } from "@/lib/data";
import { trackEvent } from "@/lib/tracking";

export default function PhoneLink({
  className,
  children,
  location,
}: {
  className?: string;
  children: React.ReactNode;
  location: string;
}) {
  return (
    <a
      href={`tel:${BUSINESS.phone}`}
      onClick={() => trackEvent("phone_click", { location })}
      className={className}
    >
      {children}
    </a>
  );
}

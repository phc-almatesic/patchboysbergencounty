"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BUSINESS, SERVICES } from "@/lib/data";
import { pushEvent } from "./TrackingProvider";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="hidden sm:inline">Serving All of Bergen County, NJ</span>
          <div className="flex items-center gap-4 mx-auto sm:mx-0">
            <a href={`tel:${BUSINESS.phone}`} className="font-bold hover:text-orange transition-colors" onClick={() => pushEvent("phone_click", { location: "top_bar" })}>
              📞 {BUSINESS.phone}
            </a>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="hidden md:inline">{BUSINESS.hours}</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="The Patch Boys of Bergen County" width={180} height={100} className="h-14 w-auto" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-navy font-semibold hover:text-orange transition-colors">Home</Link>
            <div className="relative group">
              <Link href="/services" className="text-navy font-semibold hover:text-orange transition-colors py-2">Services</Link>
              <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-56">
                  {SERVICES.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center gap-3 px-4 py-2.5 text-sm text-navy hover:bg-gray-warm hover:text-orange transition-colors">
                      <span>{s.icon}</span>
                      <span className="font-medium">{s.title}</span>
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link href="/services" className="block px-4 py-2.5 text-sm text-orange font-semibold hover:bg-gray-warm transition-colors">
                      View All Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/areas" className="text-navy font-semibold hover:text-orange transition-colors">Service Areas</Link>
            <Link href="/about" className="text-navy font-semibold hover:text-orange transition-colors">About</Link>
            <Link href="/contact" className="text-navy font-semibold hover:text-orange transition-colors">Contact</Link>
            <Link
              href="/contact"
              className="bg-orange text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-dark transition-colors shadow-md"
            >
              Free Estimate
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-navy transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-navy transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-navy transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <nav className="flex flex-col p-4 gap-4">
              <Link href="/" className="text-navy font-semibold py-2" onClick={() => setMobileOpen(false)}>Home</Link>
              <button onClick={() => setServicesOpen(!servicesOpen)} className="text-navy font-semibold py-2 text-left flex items-center justify-between">
                Services
                <span className={`text-xs transition-transform ${servicesOpen ? "rotate-180" : ""}`}>▼</span>
              </button>
              {servicesOpen && (
                <div className="flex flex-col gap-1 pl-4 -mt-2">
                  {SERVICES.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="text-gray-600 py-1.5 text-sm flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                      <span>{s.icon}</span> {s.title}
                    </Link>
                  ))}
                  <Link href="/services" className="text-orange font-semibold py-1.5 text-sm" onClick={() => setMobileOpen(false)}>
                    View All Services
                  </Link>
                </div>
              )}
              <Link href="/areas" className="text-navy font-semibold py-2" onClick={() => setMobileOpen(false)}>Service Areas</Link>
              <Link href="/about" className="text-navy font-semibold py-2" onClick={() => setMobileOpen(false)}>About</Link>
              <Link href="/contact" className="text-navy font-semibold py-2" onClick={() => setMobileOpen(false)}>Contact</Link>
              <Link
                href="/contact"
                className="bg-orange text-white font-bold px-6 py-3 rounded-lg text-center"
                onClick={() => setMobileOpen(false)}
              >
                Free Estimate
              </Link>
              <a href={`tel:${BUSINESS.phone}`} className="bg-navy text-white font-bold px-6 py-3 rounded-lg text-center" onClick={() => pushEvent("phone_click", { location: "mobile_menu" })}>
                Call {BUSINESS.phone}
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BUSINESS, SERVICES } from "@/lib/data";
import { trackEvent } from "@/lib/tracking";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        // Return focus to hamburger button
        mobileToggleRef.current?.focus();
      }
    };

    if (mobileOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMobileToggle = () => {
    const opening = !mobileOpen;
    setMobileOpen(opening);
    if (opening) {
      trackEvent("mobile_menu_open", {});
    }
  };

  const handleNavClick = (label: string, location: string) => {
    trackEvent("nav_click", { link_text: label, location });
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="hidden sm:inline">Serving All of Bergen County, NJ</span>
          <div className="flex items-center gap-4 mx-auto sm:mx-0">
            <a href={`tel:${BUSINESS.phone}`} className="font-bold hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1 transition-colors" onClick={() => trackEvent("phone_click", { location: "top_bar" })}>
              {BUSINESS.phone}
            </a>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="hidden md:inline">{BUSINESS.hours}</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded">
            <Image src="/logo.png" alt="The Patch Boys of Bergen County" width={180} height={100} className="h-14 w-auto" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            <Link href="/" className="text-navy font-semibold hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2 transition-colors"
              onClick={() => handleNavClick("Home", "desktop_nav")}
            >Home</Link>
            <div className="relative group">
              <Link href="/services" className="text-navy font-semibold hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2 py-2 transition-colors"
                onClick={() => handleNavClick("Services", "desktop_nav")}
              >Services</Link>
              <div className="absolute top-full left-0 pt-2 hidden group-hover:block group-focus-within:block">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-56">
                  {SERVICES.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center gap-3 px-4 py-2.5 text-sm text-navy hover:bg-gray-warm hover:text-orange focus:bg-gray-warm focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors"
                      onClick={() => trackEvent("services_dropdown_click", { service: s.title, location: "desktop_nav" })}
                    >
                      <span aria-hidden="true">{s.icon}</span>
                      <span className="font-medium">{s.title}</span>
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link href="/services" className="block px-4 py-2.5 text-sm text-orange font-semibold hover:bg-gray-warm focus:bg-gray-warm focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors rounded"
                      onClick={() => handleNavClick("View All Services", "desktop_dropdown")}
                    >
                      View All Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/areas" className="text-navy font-semibold hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2 transition-colors"
              onClick={() => handleNavClick("Service Areas", "desktop_nav")}
            >Service Areas</Link>
            <Link href="/about" className="text-navy font-semibold hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2 transition-colors"
              onClick={() => handleNavClick("About", "desktop_nav")}
            >About</Link>
            <Link href="/blog" className="text-navy font-semibold hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2 transition-colors"
              onClick={() => handleNavClick("Blog", "desktop_nav")}
            >Blog</Link>
            <Link href="/contact" className="text-navy font-semibold hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2 transition-colors"
              onClick={() => handleNavClick("Contact", "desktop_nav")}
            >Contact</Link>
            <Link
              href="/contact"
              className="bg-orange text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-white transition-colors shadow-md"
              onClick={() => trackEvent("cta_click", { button_text: "Free Estimate", location: "desktop_nav" })}
            >
              Free Estimate
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            ref={mobileToggleRef}
            onClick={handleMobileToggle}
            className="lg:hidden flex flex-col gap-1.5 p-2 focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-6 h-0.5 bg-navy transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-navy transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-navy transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg" ref={mobileMenuRef} id="mobile-menu">
            <nav className="flex flex-col p-4 gap-4" role="navigation" aria-label="Mobile navigation">
              <Link href="/" className="text-navy font-semibold py-2 hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2" onClick={() => { setMobileOpen(false); handleNavClick("Home", "mobile_nav"); }}>Home</Link>
              <button
                onClick={() => {
                  const opening = !servicesOpen;
                  setServicesOpen(opening);
                  if (opening) trackEvent("services_dropdown_open", { location: "mobile_nav" });
                }}
                className="text-navy font-semibold py-2 text-left flex items-center justify-between hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2 -mx-2"
                aria-expanded={servicesOpen}
                aria-controls="mobile-services-submenu"
              >
                Services
                <span className={`text-xs transition-transform ${servicesOpen ? "rotate-180" : ""}`}>&#x25BC;</span>
              </button>
              {servicesOpen && (
                <div className="flex flex-col gap-1 pl-4 -mt-2" id="mobile-services-submenu">
                  {SERVICES.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="text-gray-600 py-1.5 text-sm flex items-center gap-2 hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2 -mx-2" onClick={() => { setMobileOpen(false); trackEvent("services_dropdown_click", { service: s.title, location: "mobile_nav" }); }}>
                      <span aria-hidden="true">{s.icon}</span> {s.title}
                    </Link>
                  ))}
                  <Link href="/services" className="text-orange font-semibold py-1.5 text-sm hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2 -mx-2" onClick={() => { setMobileOpen(false); handleNavClick("View All Services", "mobile_dropdown"); }}>
                    View All Services
                  </Link>
                </div>
              )}
              <Link href="/areas" className="text-navy font-semibold py-2 hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2" onClick={() => { setMobileOpen(false); handleNavClick("Service Areas", "mobile_nav"); }}>Service Areas</Link>
              <Link href="/about" className="text-navy font-semibold py-2 hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2" onClick={() => { setMobileOpen(false); handleNavClick("About", "mobile_nav"); }}>About</Link>
              <Link href="/blog" className="text-navy font-semibold py-2 hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2" onClick={() => { setMobileOpen(false); handleNavClick("Blog", "mobile_nav"); }}>Blog</Link>
              <Link href="/contact" className="text-navy font-semibold py-2 hover:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-2" onClick={() => { setMobileOpen(false); handleNavClick("Contact", "mobile_nav"); }}>Contact</Link>
              <Link
                href="/contact"
                className="bg-orange text-white font-bold px-6 py-3 rounded-lg text-center hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-orange"
                onClick={() => { setMobileOpen(false); trackEvent("cta_click", { button_text: "Free Estimate", location: "mobile_nav" }); }}
              >
                Free Estimate
              </Link>
              <a href={`tel:${BUSINESS.phone}`} className="bg-navy text-white font-bold px-6 py-3 rounded-lg text-center hover:bg-navy-light focus:outline-2 focus:outline-offset-2 focus:outline-orange" onClick={() => trackEvent("phone_click", { location: "mobile_menu" })}>
                Call {BUSINESS.phone}
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

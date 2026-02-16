import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { GTMHead, GTMBody } from "@/components/TrackingProvider";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bergencountypatchboys.com"),
  title: {
    default: `${BUSINESS.name} | Expert Drywall Repair in Bergen County NJ`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: BUSINESS.description,
  keywords: [
    "drywall repair Bergen County NJ",
    "drywall repair near me",
    "ceiling repair Bergen County",
    "plaster repair NJ",
    "popcorn ceiling removal Bergen County",
    "drywall installation Bergen County NJ",
    "sheetrock repair NJ",
    "the patch boys bergen county",
  ],
  openGraph: {
    title: `${BUSINESS.name} | Expert Drywall Repair`,
    description: BUSINESS.description,
    siteName: BUSINESS.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${BUSINESS.name} - Expert Drywall Repair in Bergen County NJ`,
      },
    ],
  },
  alternates: {
    canonical: "./",
  },
  verification: {
    google: "UnEz0qNT_LB9d814wd-ltBhBgisNGNH-xli_Zih9paQ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <GTMHead />
      </head>
      <body className="min-h-screen flex flex-col">
        <GTMBody />
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:bg-orange focus:text-white focus:px-4 focus:py-2 focus:outline-2 focus:outline-offset-2 focus:outline-white"
        >
          Skip to main content
        </a>
        <Header />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}

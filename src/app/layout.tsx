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
        url: "/logo.png",
        width: 600,
        height: 340,
        alt: BUSINESS.name,
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}

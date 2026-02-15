import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BUSINESS } from "@/lib/data";
import StickyCTA from "@/components/StickyCTA";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {GTM_ID && (
          <>
            {/* Google Tag Manager */}
            <Script id="google-tag-manager" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            {/* End Google Tag Manager */}
          </>
        )}
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        {GTM_ID && (
          <>
            {/* Google Tag Manager (noscript) */}
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
            {/* End Google Tag Manager (noscript) */}
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        <StickyCTA />
      </body>
    </html>
  );
}

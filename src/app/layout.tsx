import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
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
    type: "website",
    locale: "en_US",
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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NQGXKB2R');`}
        </Script>
        {/* End Google Tag Manager */}
        <link rel="icon" href="/logo.png" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4MHD09BJF3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4MHD09BJF3');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NQGXKB2R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Sticky mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 flex gap-2 lg:hidden z-40">
          <a
            href={`tel:${BUSINESS.phone}`}
            className="flex-1 bg-navy text-white font-bold py-3 rounded-lg text-center text-sm"
          >
            📞 Call Now
          </a>
          <a
            href="/contact"
            className="flex-1 bg-orange text-white font-bold py-3 rounded-lg text-center text-sm"
          >
            Free Estimate
          </a>
        </div>
      </body>
    </html>
  );
}

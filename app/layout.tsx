import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "./providers/auth";
import Script from "next/script"; // ✅ Viktigt för GTM-skriptet

export const metadata = {
  title: "Book Browser",
  description: "Search and manage book cards",
  verification: {
    google: "gUcFRMHJKCI2-rZJPYiW9SXpgPa9INnFujKGaJbDVB8",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Tag Manager via next/script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W2R53WWT');
            `,
          }}
        />
      </head>
      <body>
        {/* ✅ Noscript-version av GTM */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W2R53WWT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

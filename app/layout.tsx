import "./globals.css";
import { Montserrat } from "next/font/google";
import { ReactNode } from "react";
import { AuthProvider } from "./providers/auth";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

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
      <body className={montserrat.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

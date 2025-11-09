import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "./providers/auth";

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
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

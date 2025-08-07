import './globals.css';
import { Montserrat } from 'next/font/google';
import { ReactNode } from 'react';
//import { Inter } from 'next/font/google';
import { AuthProvider } from './providers/auth';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });
//const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Book Browser',
  description: 'Search and manage book cards',
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
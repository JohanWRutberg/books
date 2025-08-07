'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[140px] py-2">
          {/* Rubriken till vänster */}
          <h1 className="text-xl font-bold text-gray-900 self-center">Marked By Tropes</h1>

          {/* Loggan i mitten */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Image
              src="/Markedbytropes.png"
              alt="Logo"
              width={140}
              height={140}
              className="rounded-full"
            />
          </div>

          {/* Desktop-nav */}
          <nav className="hidden md:flex gap-6 text-gray-700 items-center">
            <Link href="/">Home</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
            {session?.user && <Link href="/admin">Admin</Link>}
            {session ? (
              <button onClick={() => signOut()} className="text-sm text-blue-600">Logout</button>
            ) : (
              <button onClick={() => signIn()} className="text-sm text-blue-600">Login</button>
            )}
          </nav>

          {/* Hamburger-icon (mobil) */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobilmeny (visas bara när öppen) */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col items-center gap-4 bg-white shadow-md rounded-md mt-2 text-gray-700 text-base">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:underline">
            Home
          </Link>
          <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:underline">
            About
          </Link>
          <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:underline">
            Contact
          </Link>
          {session?.user && (
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="hover:underline">
              Admin
            </Link>
          )}
          {session ? (
            <button
              onClick={() => {
                signOut();
                setMobileMenuOpen(false);
              }}
              className="text-gray-700 hover:underline cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                signIn();
                setMobileMenuOpen(false);
              }}
              className="text-gray-700 hover:underline cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
}

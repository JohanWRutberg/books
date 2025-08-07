'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header({ search, setSearch }: { search: string; setSearch: (s: string) => void }) {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between p-4 shadow bg-white sticky top-0 z-10">
      {/* Rubriken till vänster */}
      <h1 className="text-3xl font-bold text-gray-900">
  Marked By Tropes
</h1>

      {/* Logga och länkar i en kolumn */}
      <nav className="flex flex-col items-center gap-2">
        <Image
          src="/Markedbytropes.png"
          alt="Logo"
          width={140}
          height={140}
          className="rounded-full"
        />
        <div className="flex gap-6 text-gray-700">
          <Link href="/">Home</Link>
          <Link href="#">About</Link>
          <Link href="#">Contact</Link>
          {session?.user ? <Link href="/admin">Admin</Link> : null}
        </div>
      </nav>

      {/* Sök och login längst till höger */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-1 border rounded-md"
        />
        {session ? (
          <button onClick={() => signOut()} className="text-sm text-blue-600">
            Logout
          </button>
        ) : (
          <button onClick={() => signIn()} className="text-sm text-blue-600">
            Login
          </button>
        )}
      </div>
    </header>
  );
}

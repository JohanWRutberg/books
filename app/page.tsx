'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import { Book } from './types';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filtered = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-sky-100">
      <Header />
      <div className="flex justify-center mt-12 px-4 max-w-[1400px] mx-auto p-6">
        <input
          type="text"
          placeholder="Search books..."
          className="w-3xl p-2 border border-gray-300 rounded text-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
  
  <div className="max-w-[1400px] mx-auto p-6 mt-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {filtered.map((book) => (
      <Card key={book._id} book={book} />
    ))}
  </div>
</div>
</main>
  );
}
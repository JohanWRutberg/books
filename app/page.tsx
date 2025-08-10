"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import { Book } from "./types";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // State för den bok som är hovered
  const [hoveredBook, setHoveredBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  const filtered = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-sky-100">
      <Header />

      {/* Sökfält */}
      <div className="flex justify-center mt-12 px-4 max-w-[1400px] mx-auto p-6">
        <input
          type="text"
          placeholder="Search books..."
          className="w-3xl p-2 border border-gray-300 rounded text-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="max-w-[1400px] mx-auto p-6 mt-12 flex gap-6 relative">
        {/* Boklistan */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading ? (
            <div className="flex justify-center items-center h-64 col-span-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            </div>
          ) : (
            filtered.map((book) => (
              <Card
                key={book._id}
                book={book}
                onHover={() => setHoveredBook(book)}
                onHoverLeave={() => setHoveredBook(null)}
              />
            ))
          )}
        </div>

        {/* Flytande ruta som visar endast hoverText */}
        {hoveredBook && hoveredBook.hoverText && (
          <div
            className="fixed top-40 right-8 w-96 max-w-full bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg pointer-events-none select-none z-50"
            style={{ maxHeight: "60vh", overflowY: "auto" }}
          >
            <p className="text-gray-600 font-semibold text-xs whitespace-pre-line">
              {hoveredBook.hoverText}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

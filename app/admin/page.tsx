'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Book } from '../types';

export default function AdminPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string>('');
  const [link, setLink] = useState('');

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async () => {
  if (!title || !description) return alert('Please fill in all fields');

  if (imageFile) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const result = reader.result;
      if (typeof result === 'string') {
        await saveBook(result); // ✔️ Typen är nu garanterat string
      } else {
        console.error('Image conversion failed');
      }
    };
    reader.readAsDataURL(imageFile);
  } else {
    await saveBook(null);
  }
};

  const saveBook = async (imageBase64: string | null) => {
  const res = await fetch('/api/books', {
    method: editingId ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: editingId,
      title,
      imageBase64,
      description,
      link,
    }),
  });
  if (res.ok) {
    setToast(editingId ? 'Book updated!' : 'Book added!');
    fetchBooks();
    setTitle('');
    setImageFile(null);
    setDescription('');
    setEditingId(null);
    setLink('');  // <--- Lägg till detta
  }
};

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    const res = await fetch('/api/books', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setToast('Book deleted!');
      fetchBooks();
    }
  };

  const startEdit = (book: Book) => {
    setTitle(book.title);
    setDescription(book.description);
    setEditingId(book._id);
    setLink(book.link || '');
    setImageFile(null);
  };

  if (!session || session.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return <div className="p-6 text-center">Access denied</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Link href="/" className="text-blue-600 underline text-sm">← Back to main page</Link>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Book' : 'Add a new book'}</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full mb-4 p-2 border rounded"
          />
          <label className="inline-block mb-4">
            <span className="block text-sm font-medium mb-1">Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="inline-block px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
              Choose File
            </label>
            {imageFile && <span className="ml-2 text-sm">{imageFile.name}</span>}
          </label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="External link (https://...)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="block w-full mb-4 p-2 border rounded"
          />
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
            {editingId ? 'Update' : 'Submit'}
          </button>
        </div>

        <h2 className="mt-10 mb-4 text-xl font-semibold">All Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
  {books.map((book) => (
    <div
  key={book._id}
  className="w-full max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[300px] border p-4 rounded bg-gray-50 shadow-sm mx-auto flex flex-col justify-between h-full"
>
  <div>
    <div className="font-bold text-lg mb-2">{book.title}</div>

    {book.imageUrl && (
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-full h-auto mb-2 rounded"
      />
    )}

    <p className="text-sm text-gray-700 mb-4">{book.description}</p>
  </div>

  <div className="mt-auto flex gap-2">
    <button
      onClick={() => startEdit(book)}
      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
    >
      Edit
    </button>
    <button
      onClick={() => handleDelete(book._id)}
      className="px-3 py-1 text-sm bg-red-600 text-white rounded"
    >
      Delete
    </button>
  </div>
</div>
  ))}
</div>

      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {toast}
          <button onClick={() => setToast('')} className="ml-2 text-sm underline">Close</button>
        </div>
      )}
    </div>
  );
}

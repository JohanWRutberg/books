'use client';

import { Book } from '../types';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Card({ book }: { book: Book }) {
  const CardContent = (
    <motion.div
  className="backdrop-blur-lg bg-white/30 shadow-lg rounded-xl overflow-hidden w-full h-[8cm] flex flex-col"
  whileHover={{ scale: 1.05 }}
>
      <div className="relative w-full h-[60%]">
        <Image src={book.imageUrl} alt={book.title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-2 text-sm text-center font-semibold text-gray-700">
        {book.title}
      </div>
      <div className="px-2 text-xs text-gray-600 overflow-auto">
        {book.description}
      </div>
    </motion.div>
  );

  return book.link ? (
    <a
      href={book.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block cursor-pointer"
    >
      {CardContent}
    </a>
  ) : (
    CardContent
  );
}

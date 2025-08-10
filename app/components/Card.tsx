"use client";

import React from "react";
import { Book } from "../types";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
  book: Book;
  onHover?: () => void;
  onHoverLeave?: () => void;
}

export default function Card({ book, onHover, onHoverLeave }: CardProps) {
  const CardContent = (
    <motion.div
      className="backdrop-blur-lg bg-white/30 shadow-lg rounded-xl overflow-hidden w-full flex flex-col"
      whileHover={{ scale: 1.03 }}
      onMouseEnter={onHover}
      onMouseLeave={onHoverLeave}
      style={{ cursor: book.link ? "pointer" : "default" }}
    >
      <div className="relative w-full pb-[100%] bg-white flex items-center justify-center">
        {book.imageUrl && (
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>

      <div className="p-2 text-sm text-center font-semibold text-gray-700">
        {book.title}
      </div>

      <div className="px-2 pb-2 text-xs text-gray-600">{book.description}</div>
    </motion.div>
  );

  if (book.link) {
    return (
      <a
        href={book.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onHover}
        onMouseLeave={onHoverLeave}
        className="block"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
}

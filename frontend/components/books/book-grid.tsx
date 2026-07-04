'use client';
import { BookCard } from '@/components/books/book-card';
import { useEffect, useState } from 'react';
import { bookService } from '@/services/book.service';
import { IBookPopulated } from '@/lib/type';

export function BookGrid() {
  const [booksData, setBooksData] = useState<IBookPopulated[]>([]);
  useEffect(() => {
    const getAllBooks = async () => {
      const fetchBooks: IBookPopulated[] = await bookService.getAllBooks();
      setBooksData(fetchBooks);
    };
    getAllBooks();
  }, []);
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {booksData.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}

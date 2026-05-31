import type { Book } from "@/lib/data";
import { BookCard } from "@/components/books/book-card";

export function BookGrid({ books }: { books: Book[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

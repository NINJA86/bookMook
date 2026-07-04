import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { books, categories } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-14">
      <div className="space-y-4">
        <p className="text-sm font-medium text-primary">Browse by topic</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">Categories</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Explore the BookMook collection by genre and discover shelves tailored to your reading mood.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const categoryBooks = books.filter((book) => book.category === category);
          return (
            <Card key={category} className="border-border/70 transition hover:-translate-y-1 hover:border-primary/35">
              <CardContent className="space-y-5 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-3xl font-semibold">{category}</h2>
                    <p className="mt-2 text-muted-foreground">{categoryBooks.length} titles available</p>
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary">Shelf</Badge>
                </div>
                <div className="space-y-3">
                  {categoryBooks.slice(0, 3).map((book) => (
                    <div key={book.slug} className="rounded-[22px] border border-border bg-background/60 p-4">
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                  ))}
                </div>
                <Link href={`/?category=${encodeURIComponent(category)}#catalog`} className="text-sm font-medium text-primary">
                  View this category
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

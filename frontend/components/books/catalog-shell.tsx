"use client";

import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { BookGrid } from "@/components/books/book-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Book } from "@/lib/data";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

type CatalogShellProps = {
  books: Book[];
  categories: string[];
};

export function CatalogShell({ books, categories }: CatalogShellProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const activeCategory = searchParams.get("category") ?? "All";

  const filteredBooks = useMemo(() => {
    const normalizedQuery = normalize(query);

    return books.filter((book) => {
      const matchesQuery =
        !normalizedQuery ||
        [book.title, book.author, book.category].some((value) => normalize(value).includes(normalizedQuery));
      const matchesCategory = activeCategory === "All" || book.category === activeCategory;

      return matchesQuery && matchesCategory;
    });
  }, [activeCategory, books, query]);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.trim()) {
        params.set(key, value.trim());
      } else {
        params.delete(key);
      }
    });

    router.replace(`/?${params.toString()}`.replace(/\?$/, ""), { scroll: false });
  };

  return (
    <div className="space-y-8">
      <Card className="border-primary/15 bg-card/90 shadow-xl shadow-primary/5">
        <CardContent className="space-y-5 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-primary">
                <SlidersHorizontal className="h-4 w-4" />
                <p className="text-sm font-medium">Smart catalog search</p>
              </div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">Find your next shelf favorite</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Search instantly by title, author, or category. Results update as you type, so browsing stays fluid.
              </p>
            </div>
            <div className="flex w-full max-w-xl items-center gap-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => updateParams({ q: event.target.value || null })}
                  placeholder="Search books, authors, or categories"
                  className="pl-11"
                />
              </div>
              {(query || activeCategory !== "All") && (
                <Button variant="outline" onClick={() => updateParams({ q: null, category: null })}>
                  Reset
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => updateParams({ category: category === "All" ? null : category })}
                  aria-pressed={active}
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Badge
                    className={active ? "border-primary/30 bg-primary text-primary-foreground" : "border-border bg-background text-foreground"}
                  >
                    {category}
                  </Badge>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Catalog results</p>
          <p className="text-muted-foreground">
            {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
            {query ? ` matched "${query}"` : " available to browse"}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/categories">Explore categories</Link>
        </Button>
      </div>

      {filteredBooks.length ? (
        <BookGrid books={filteredBooks} />
      ) : (
        <Card>
          <CardContent className="flex flex-col items-start gap-3 p-8">
            <h3 className="font-display text-2xl font-semibold">No books match that search yet</h3>
            <p className="max-w-xl text-muted-foreground">
              Try a different title, author, or category, or clear the filters to return to the full collection.
            </p>
            <Button variant="outline" onClick={() => updateParams({ q: null, category: null })}>
              Clear search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

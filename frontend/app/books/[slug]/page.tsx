import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, HeartHandshake, ShieldCheck, Star } from "lucide-react";

import { BookGrid } from "@/components/books/book-grid";
import { PurchasePanel } from "@/components/commerce/purchase-panel";
import { BookReviews } from "@/components/reviews/book-reviews";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { books, getBookBySlug, getRelatedBooks } from "@/lib/data";

export function generateStaticParams() {
  return books.map((book) => ({
    slug: book.slug
  }));
  
}

export default async function BookDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const relatedBooks = getRelatedBooks(book.category, book.slug);

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-6 py-14">
      <Button asChild variant="ghost" className="px-0 text-muted-foreground hover:bg-transparent hover:text-foreground">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>
      </Button>

      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="space-y-6">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[32px] border border-border bg-muted/60 shadow-glow">
            <Image src={book.cover} alt={book.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 34vw" priority />
          </div>
          <PurchasePanel book={book} />
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <Badge key={tag} className="border-border bg-background text-foreground">
                  {tag}
                </Badge>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-primary">{book.category}</p>
              <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">{book.title}</h1>
              <p className="mt-2 text-lg text-muted-foreground">by {book.author}</p>
            </div>
            <p className="max-w-3xl text-lg text-muted-foreground">{book.longDescription}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-border bg-card/70 p-5">
              <p className="text-sm text-muted-foreground">Rating</p>
              <div className="mt-2 flex items-center gap-2 text-amber-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-xl font-semibold text-foreground">{book.rating}</span>
              </div>
            </div>
            <div className="rounded-[24px] border border-border bg-card/70 p-5">
              <p className="text-sm text-muted-foreground">Format</p>
              <p className="mt-2 text-xl font-semibold">{book.format}</p>
            </div>
            <div className="rounded-[24px] border border-border bg-card/70 p-5">
              <p className="text-sm text-muted-foreground">Pages</p>
              <p className="mt-2 text-xl font-semibold">{book.pages}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-4xl font-semibold">${book.price}</p>
            <Button asChild size="lg">
              <Link href="#buy-panel">Buy now</Link>
            </Button>
            <Button variant="outline" size="lg">
              Save for later
            </Button>
          </div>

          <Card>
            <CardContent className="space-y-5 p-6">
              <h2 className="font-display text-3xl font-semibold">Why readers love it</h2>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-start gap-3 rounded-[24px] border border-border bg-background/50 p-4">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Thoughtfully designed detail pages keep discovery immersive and premium.</p>
                </div>
                <div className="flex items-start gap-3 rounded-[24px] border border-border bg-background/50 p-4">
                  <HeartHandshake className="mt-1 h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Curated descriptions make each title feel editorial instead of transactional.</p>
                </div>
                <div className="flex items-start gap-3 rounded-[24px] border border-border bg-background/50 p-4">
                  <ShieldCheck className="mt-1 h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Local image assets render reliably without depending on remote sources.</p>
                </div>
                <div className="flex items-start gap-3 rounded-[24px] border border-border bg-background/50 p-4">
                  <Check className="mt-1 h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Reader reviews and purchase controls stay integrated into one clean flow.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="space-y-6">
        <div>
          <p className="text-sm font-medium text-primary">Reader community</p>
          <h2 className="font-display text-4xl font-semibold">Reviews and comments</h2>
        </div>
        <BookReviews slug={book.slug} initialReviews={book.reviews} />
      </section>

      {relatedBooks.length ? (
        <section className="space-y-6">
          <div>
            <p className="text-sm font-medium text-primary">More to explore</p>
            <h2 className="font-display text-4xl font-semibold">Related books</h2>
          </div>
          <BookGrid books={relatedBooks} />
        </section>
      ) : null}
    </div>
  );
}

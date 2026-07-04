import Link from 'next/link';
import { ArrowRight, BookOpenText, Compass } from 'lucide-react';

import { CatalogShell } from '@/components/books/catalog-shell';
import { BookGrid } from '@/components/books/book-grid';
import { NewsletterForm } from '@/components/books/newsletter-form';
import { FeaturedCommentsCarousel } from '@/components/home/featured-comments-carousel';
import { HeroBookSwiper } from '@/components/home/hero-book-swiper';
import { TypewriterTitle } from '@/components/home/typewriter-title';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { books, categories, featuredBooks, newArrivals } from '@/lib/data';

const typewriterWords = ['Great Books!', 'Read Anywhere!', 'کیر:)'];

export default function HomePage() {
  return (
    <div className="pb-24">
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:py-24">
          <div className="space-y-8">
            <Badge className="border-primary/25 bg-primary/10 text-primary">
              Freshly curated shelves
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-4xl font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                <span className="block text-foreground">
                  BookMook helps you
                </span>
                <TypewriterTitle
                  words={typewriterWords}
                  className="mt-3 block text-primary"
                />
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                BookMook pairs editorial discovery with effortless shopping, so
                browsing, buying, and revisiting great books all feel
                intentional.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="#catalog">
                  Explore catalog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/25 hover:border-primary/40 hover:bg-primary/8"
              >
                <Link href="/categories">Explore categories</Link>
              </Button>
            </div>
            <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-border/70 bg-card/70 p-4">
                <p className="text-2xl font-semibold">{books.length}</p>
                <p className="text-sm text-muted-foreground">Curated books</p>
              </div>
              <div className="rounded-[24px] border border-border/70 bg-card/70 p-4">
                <p className="text-2xl font-semibold">{categories.length}</p>
                <p className="text-sm text-muted-foreground">
                  Unique categories
                </p>
              </div>
              <div className="rounded-[24px] border border-border/70 bg-card/70 p-4">
                <p className="text-2xl font-semibold">24/7</p>
                <p className="text-sm text-muted-foreground">
                  Reader-ready browsing
                </p>
              </div>
            </div>
          </div>

          <HeroBookSwiper books={featuredBooks} />
        </div>
      </section>

      <section id="featured" className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Featured picks</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight">
              Books with momentum
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                className="border-border bg-background text-foreground"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        <BookGrid />
      </section>

      <FeaturedCommentsCarousel />

      <section id="catalog" className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        <CatalogShell books={books} categories={categories} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-border/70 bg-card/80">
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium text-primary">New arrivals</p>
              <h2 className="font-display text-4xl font-semibold tracking-tight">
                Fresh on the shelf
              </h2>
            </div>
            <div className="space-y-4">
              {newArrivals.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.slug}`}
                  className="flex items-center justify-between gap-4 rounded-[24px] border border-border bg-background/70 p-4 transition hover:border-primary/40"
                >
                  <div>
                    <p className="font-semibold">{book.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {book.author}
                    </p>
                  </div>
                  <p className="font-semibold">${book.price}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/15 bg-gradient-to-br from-card via-card to-primary/10">
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium text-primary">
                Why readers stay
              </p>
              <h2 className="font-display text-4xl font-semibold tracking-tight">
                A bookstore built for discovery
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-border bg-background/60 p-5">
                <Compass className="mb-3 h-5 w-5 text-primary" />
                <p className="font-medium">Search that actually helps</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Find books instantly by title, author, or category with live
                  filtering.
                </p>
              </div>
              <div className="rounded-[24px] border border-border bg-background/60 p-5">
                <BookOpenText className="mb-3 h-5 w-5 text-primary" />
                <p className="font-medium">Editorial book details</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every product page highlights the book, not just the price
                  tag.
                </p>
              </div>
            </div>
            <p className="max-w-xl text-muted-foreground">
              Subscribe for new releases, beautifully curated reading lists, and
              BookMook-exclusive bundles.
            </p>
            <NewsletterForm />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

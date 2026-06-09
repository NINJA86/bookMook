import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

import type { Book } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { IBookPopulated } from '@/lib/type';

export function BookCard({ book }: { book: IBookPopulated }) {
  return (
    <Link href={`/books/${book.slug}`} className="group h-full">
      <Card className="flex h-full flex-col overflow-hidden border-border/60 transition duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted/60">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {book.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                className="border-white/20 bg-slate-950/40 text-white"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <CardContent className="flex flex-1 flex-col space-y-4 p-5">
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary">
              {book.category.name}
            </p>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground">{book.author.name}</p>
          </div>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {book.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-sm text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span>{book.rating}</span>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-lg font-semibold">${book.price}</p>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

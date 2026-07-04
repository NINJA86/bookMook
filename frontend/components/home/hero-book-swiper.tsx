"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { Book } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type HeroBookSwiperProps = {
  books: Book[];
};

export function HeroBookSwiper({ books }: HeroBookSwiperProps) {
  return (
    <Card className="hero-slider-panel overflow-hidden border-primary/20 shadow-glow">
      <CardContent className="p-0">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={850}
          autoplay={{ delay: 3600, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          watchSlidesProgress
          className="bookmook-hero-swiper"
        >
          {books.map((book) => (
            <SwiperSlide key={book.id} className="!h-auto">
              <div className="grid h-full gap-6 p-6 sm:p-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
                <div className="relative mx-auto aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-[28px] border border-white/15 bg-slate-950/20 shadow-2xl">
                  <Image src={book.cover} alt={book.title} fill className="object-cover" sizes="(max-width: 1024px) 240px, 20vw" priority />
                </div>
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-primary">
                    <Badge className="border-primary/25 bg-primary/12 text-primary">Recommended now</Badge>
                    <div className="flex items-center gap-1 text-sm text-amber-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{book.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Book suggestion</p>
                    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{book.title}</h2>
                    <p className="text-base text-muted-foreground">{book.description}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-white/12 bg-background/65 p-4 dark:bg-white/5">
                      <p className="text-sm text-muted-foreground">Author</p>
                      <p className="mt-1 text-lg font-semibold">{book.author}</p>
                    </div>
                    <div className="rounded-[22px] border border-white/12 bg-background/65 p-4 dark:bg-white/5">
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="mt-1 text-lg font-semibold">{book.category}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button asChild>
                      <Link href={`/books/${book.slug}`}>
                        View book
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <p className="text-lg font-semibold text-foreground">${book.price}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </CardContent>
    </Card>
  );
}

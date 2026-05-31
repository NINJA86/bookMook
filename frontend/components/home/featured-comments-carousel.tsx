"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Card, CardContent } from "@/components/ui/card";
import { featuredReviews } from "@/lib/data";

export function FeaturedCommentsCarousel() {
  return (
    <section className="mx-auto max-w-7xl space-y-8 px-6 py-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Featured comments</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight">Readers who keep the shelves moving</h2>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          A flowing wall of reader reactions inspired by modern testimonial sections, with local avatars and continuously moving feedback cards.
        </p>
      </div>

      <Swiper
        modules={[Autoplay]}
        loop
        speed={5000}
        allowTouchMove
        grabCursor
        autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={{
          0: { slidesPerView: 1.1, spaceBetween: 16 },
          768: { slidesPerView: 2.15, spaceBetween: 18 },
          1280: { slidesPerView: 3.25, spaceBetween: 20 }
        }}
        className="bookmook-featured-comments-swiper"
      >
        {featuredReviews.map((review) => (
          <SwiperSlide key={`${review.id}-featured`} className="h-auto">
            <Card className="h-full border-border/70 bg-card/88 shadow-lg backdrop-blur">
              <CardContent className="flex h-full flex-col gap-5 p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-border bg-muted">
                    <Image src={review.avatar} alt={review.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.location ?? "BookMook reader"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${review.id}-${index}`} className={`h-4 w-4 ${index < review.rating ? "fill-current" : "opacity-30"}`} />
                  ))}
                </div>

                <p className="text-base leading-7 text-foreground/90">{review.comment}</p>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">From the shelf</p>
                    <p className="font-medium">{review.bookTitle}</p>
                  </div>
                  <Link href={`/books/${review.bookSlug}`} className="text-sm font-medium text-primary transition hover:opacity-80">
                    Read more
                  </Link>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

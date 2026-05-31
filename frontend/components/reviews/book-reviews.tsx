"use client";

import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { Pagination, Autoplay, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { Review } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const storageKey = (slug: string) => `bookmook-reviews-${slug}`;

type BookReviewsProps = {
  slug: string;
  initialReviews: Review[];
};

export function BookReviews({ slug, initialReviews }: BookReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey(slug));
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Review[];
      if (Array.isArray(parsed) && parsed.length) {
        setReviews(parsed);
      }
    } catch {
      // Ignore corrupted local review payloads and keep the seed content.
    }
  }, [slug]);

  useEffect(() => {
    window.localStorage.setItem(storageKey(slug), JSON.stringify(reviews));
  }, [reviews, slug]);

  const averageRating = useMemo(() => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length ? (total / reviews.length).toFixed(1) : "0.0";
  }, [reviews]);

  const fallbackAvatar = useMemo(() => `/avatars/avatar-${(slug.length % 10) + 1}.png`, [slug]);

  const submitReview = () => {
    if (!name.trim() || !comment.trim()) {
      return;
    }

    const nextReview: Review = {
      id: `${Date.now()}`,
      name: name.trim(),
      comment: comment.trim(),
      rating,
      location: location.trim() || undefined,
      avatar: fallbackAvatar
    };

    setReviews((current) => [nextReview, ...current]);
    setName("");
    setLocation("");
    setComment("");
    setRating(5);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <Card className="review-ocean border-primary/15 overflow-hidden">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-primary">Reader comments</p>
              <h2 className="font-display text-3xl font-semibold">What readers are saying</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Average rating</p>
              <p className="text-2xl font-semibold">{averageRating}</p>
            </div>
          </div>

          <Swiper
            modules={[Pagination, Autoplay, EffectCreative]}
            slidesPerView={1}
            loop={reviews.length > 1}
            speed={1100}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            effect="creative"
            creativeEffect={{
              prev: { translate: ["-8%", 24, -80], opacity: 0.2, scale: 0.95 },
              next: { translate: ["8%", -24, -80], opacity: 0.2, scale: 0.95 }
            }}
            className="bookmook-review-swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="min-h-[280px] rounded-[28px] border border-white/12 bg-background/72 p-6 shadow-xl backdrop-blur dark:bg-white/6">
                  <div className="mb-5 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={`${review.id}-${index}`} className={`h-4 w-4 ${index < review.rating ? "fill-current" : "opacity-35"}`} />
                    ))}
                  </div>
                  <p className="text-lg leading-8 text-foreground/90">&ldquo;{review.comment}&rdquo;</p>
                  <div className="mt-8">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.location ?? "BookMook reader"}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-5 p-6">
          <div>
            <p className="text-sm font-medium text-primary">Leave a review</p>
            <h3 className="font-display text-3xl font-semibold">Share your reading experience</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
            <Input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City or region" />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Your rating</p>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => {
                const current = index + 1;
                return (
                  <button
                    key={current}
                    type="button"
                    onClick={() => setRating(current)}
                    className="rounded-full p-1 text-amber-400 transition hover:scale-105"
                    aria-label={`Rate ${current} stars`}
                  >
                    <Star className={`h-5 w-5 ${current <= rating ? "fill-current" : "opacity-30"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <Textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Write a calm, honest review..." className="min-h-36" />

          <Button onClick={submitReview} className="w-full sm:w-fit">
            Submit review
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

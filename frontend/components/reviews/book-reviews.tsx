'use client';

import { useEffect, useMemo, useState } from 'react';
import { Star, Type } from 'lucide-react';
import { Pagination, Autoplay, EffectCreative } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { bookService } from '@/services/book.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ICommentInput, ICommentPopulated } from '@/lib/type';

type BookReviewsProps = {
  slug: string;
  bookId: string;
};

export function BookReviews({ slug, bookId }: BookReviewsProps) {
  const [comments, setComments] = useState<ICommentPopulated[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await bookService.getCommentByBookId(bookId);
      setComments(data);
    };

    fetchComments();
  }, [bookId]);

  const averageRating = useMemo(() => {
    if (!comments.length) return '0.0';
    const total = comments.reduce((sum, c) => sum + c.rating, 0);
    return (total / comments.length).toFixed(1);
  }, [comments]);

  const submitReview = async () => {
    if (!name.trim() || !comment.trim()) return;
    const commentData = {
      avatar: '/avatars/avatar-15.png',
      rating,
      location,
      text: comment,
      book: bookId,
      user: '6a21b25f56ce652752b06a23',
    } as ICommentInput;
    await bookService.addCommentWithBookId(bookId, commentData);

    // اینجا call به سرور برای ثبت کامنت اضافه کن
    // await bookService.addComment(bookId, { name, comment, rating, location });

    setName('');
    setLocation('');
    setComment('');
    setRating(5);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <Card className="review-ocean border-primary/15 overflow-hidden">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-primary">
                Reader comments
              </p>
              <h2 className="font-display text-3xl font-semibold">
                What readers are saying
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Average rating</p>
              <p className="text-2xl font-semibold">{averageRating}</p>
            </div>
          </div>

          <Swiper
            modules={[Pagination, Autoplay, EffectCreative]}
            slidesPerView={1}
            loop={comments.length > 1}
            speed={700}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            effect="creative"
            creativeEffect={{
              prev: { translate: ['-8%', 24, -80], opacity: 0.05, scale: 0.8 },
              next: { translate: ['8%', -24, -80], opacity: 0.05, scale: 0.8 },
            }}
            className="bookmook-review-swiper"
          >
            {comments.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="min-h-[280px] rounded-[28px] border border-white/12 bg-background/72 p-6 shadow-xl backdrop-blur dark:bg-white/6">
                  <div className="mb-5 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 fill-current ${index < review.rating ? 'opacity-100' : 'opacity-20'}`}
                      />
                    ))}
                  </div>
                  <p className="text-lg leading-8 text-foreground/90">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-8">
                    <p className="font-semibold">{review.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {review.location ?? 'BookMook reader'}
                    </p>
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
            <h3 className="font-display text-3xl font-semibold">
              Share your reading experience
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or region"
            />
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
                    <Star
                      className={`h-5 w-5 ${current <= rating ? 'fill-current' : 'opacity-30'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a calm, honest review..."
            className="min-h-36"
          />

          <Button onClick={submitReview} className="w-full sm:w-fit">
            Submit review
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

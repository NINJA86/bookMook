"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CreditCard, Minus, Plus, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import type { Book } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const shippingFee = 4;

type PurchasePanelProps = {
  book: Book;
};

export function PurchasePanel({ book }: PurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [purchased, setPurchased] = useState(false);

  const subtotal = useMemo(() => book.price * quantity, [book.price, quantity]);
  const total = subtotal + shippingFee;

  const buyNow = () => {
    setPurchased(true);
    toast.success(`Purchase confirmed for ${book.title}`, {
      description: `You bought ${quantity} ${quantity === 1 ? "copy" : "copies"} for $${total}.`
    });
  };

  return (
    <Card id="buy-panel" className="border-primary/15 bg-gradient-to-br from-card via-card to-primary/10">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">Purchase this book</p>
            <h2 className="font-display text-3xl font-semibold">Ready to order?</h2>
          </div>
          <CreditCard className="h-5 w-5 text-primary" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[22px] border border-border bg-background/70 p-4">
            <p className="text-sm text-muted-foreground">Format</p>
            <p className="mt-1 font-semibold">{book.format}</p>
          </div>
          <div className="rounded-[22px] border border-border bg-background/70 p-4">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="mt-1 font-semibold">${book.price}</p>
          </div>
        </div>

        <div className="rounded-[24px] border border-border bg-background/70 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Quantity</p>
              <p className="text-xs text-muted-foreground">Adjust how many copies you want to buy.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="rounded-full p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-8 text-center font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="rounded-full p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-[24px] border border-border bg-background/70 p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>${shippingFee}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 text-lg font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={buyNow}>
            Buy now
          </Button>
          <Button variant="outline" size="lg">
            Add to cart
          </Button>
        </div>

        <div className="flex items-start gap-3 rounded-[22px] border border-primary/20 bg-primary/8 p-4 text-sm text-muted-foreground">
          {purchased ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> : <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />}
          <p>
            {purchased
              ? "Thank you. Your purchase has been confirmed and your order is ready for the next step in checkout."
              : "Secure checkout, clean order summary, and a purchase flow designed to stay simple and readable."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

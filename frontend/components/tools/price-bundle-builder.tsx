"use client";

import { useMemo, useState } from "react";

import { books } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PriceBundleBuilder() {
  const [selected, setSelected] = useState<string[]>([books[0].id, books[1].id]);

  const total = useMemo(
    () => books.filter((book) => selected.includes(book.id)).reduce((sum, book) => sum + book.price, 0),
    [selected]
  );

  function toggle(id: string) {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <Card>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Bundle Builder</h3>
          <p className="text-sm text-muted-foreground">Mix books and preview a custom cart total instantly.</p>
        </div>
        <div className="grid gap-3">
          {books.map((book) => {
            const active = selected.includes(book.id);
            return (
              <button
                key={book.id}
                type="button"
                onClick={() => toggle(book.id)}
                className={`flex items-center justify-between rounded-3xl border px-4 py-3 text-left transition ${
                  active ? "border-primary bg-primary/10" : "border-border bg-background/60"
                }`}
              >
                <div>
                  <p className="font-medium">{book.title}</p>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </div>
                <p className="font-semibold">${book.price}</p>
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-between rounded-3xl border border-border bg-background/60 p-4">
          <div>
            <p className="text-sm text-muted-foreground">Bundle total</p>
            <p className="text-3xl font-semibold">${total}</p>
          </div>
          <Button>Add bundle to cart</Button>
        </div>
      </CardContent>
    </Card>
  );
}

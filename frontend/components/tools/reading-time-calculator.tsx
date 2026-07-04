"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function ReadingTimeCalculator() {
  const [pages, setPages] = useState("320");
  const [speed, setSpeed] = useState("40");

  const result = useMemo(() => {
    const pageCount = Number(pages) || 0;
    const pagesPerHour = Number(speed) || 1;

    if (pageCount <= 0 || pagesPerHour <= 0) {
      return "Enter valid values.";
    }

    const hours = pageCount / pagesPerHour;
    return `${hours.toFixed(1)} hours`;
  }, [pages, speed]);

  return (
    <Card>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Reading Time Calculator</h3>
          <p className="text-sm text-muted-foreground">Estimate how long a book will take at your pace.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Input value={pages} onChange={(event) => setPages(event.target.value)} type="number" placeholder="Pages" />
          <Input
            value={speed}
            onChange={(event) => setSpeed(event.target.value)}
            type="number"
            placeholder="Pages per hour"
          />
        </div>
        <div className="rounded-3xl border border-primary/20 bg-primary/10 p-4">
          <p className="text-sm text-muted-foreground">Estimated reading time</p>
          <p className="text-3xl font-semibold">{result}</p>
        </div>
        <Button variant="secondary">Save as reading goal</Button>
      </CardContent>
    </Card>
  );
}

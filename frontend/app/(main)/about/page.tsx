import { BookOpen, Palette, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    title: "Editorial browsing",
    description: "We present books with the care of a boutique magazine so readers can discover titles with more confidence.",
    icon: Sparkles
  },
  {
    title: "Book-first visuals",
    description: "The interface is calm, tactile, and designed around the books rather than generic storefront patterns.",
    icon: Palette
  },
  {
    title: "Thoughtful discovery",
    description: "Search, categories, and detailed pages all work together to help readers build a stronger personal library.",
    icon: BookOpen
  }
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="space-y-5">
          <p className="text-sm font-medium text-primary">About BookMook</p>
          <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">A modern bookstore made for readers, not just shoppers.</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            BookMook blends a clean ecommerce structure with an editorial, library-inspired visual language. The goal is simple: make exploring books feel calm, elevated, and memorable.
          </p>
        </div>
        <Card className="hero-panel border-primary/15">
          <CardContent className="space-y-4 p-8">
            <p className="text-sm font-medium text-primary">Our approach</p>
            <p className="text-muted-foreground">
              We focus on rich presentation, readable layouts, responsive behavior, and design details that support book discovery across desktop and mobile.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <Card key={value.title}>
              <CardContent className="space-y-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="font-display text-3xl font-semibold">{value.title}</h2>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

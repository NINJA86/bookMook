import Link from "next/link";

import { BookmookLogo } from "@/components/brand/bookmook-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-3">
          <BookmookLogo compact className="w-fit" />
          <p className="max-w-md text-sm text-muted-foreground">
            BookMook is a design-forward online bookstore focused on beautifully presented books, thoughtful discovery, and reader-friendly browsing.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-medium text-foreground">Explore</p>
          <div className="space-y-2 text-muted-foreground">
            <p><Link href="/categories">Categories</Link></p>
            <p><Link href="/about">About</Link></p>
            <p><Link href="/contact">Contact</Link></p>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-medium text-foreground">Built with</p>
          <div className="space-y-2 text-muted-foreground">
            <p>Next.js App Router</p>
            <p>React + shadcn-inspired UI</p>
            <p>Responsive, local-first book assets</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

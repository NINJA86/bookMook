"use client";

import Link from "next/link";
import { MoonStar, ShoppingBag, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { BookmookLogo } from "@/components/brand/bookmook-logo";
import { HeaderSearch } from "@/components/layout/header-search";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/tools", label: "Tools" }
];

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <BookmookLogo />

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <HeaderSearch />
          </div>
          <Button variant="ghost" size="icon" aria-label="Bag">
            <ShoppingBag className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {resolvedTheme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </Button>
          <div className="md:hidden">
            <HeaderSearch />
          </div>
        </div>
      </div>
      <div className="border-t border-border/50 px-6 py-3 lg:hidden">
        <nav className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto text-sm text-muted-foreground">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

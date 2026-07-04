"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function HeaderSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const applySearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }

    if (pathname !== "/") {
      router.push(`/?${params.toString()}`.replace(/\?$/, ""));
    } else {
      router.replace(`/?${params.toString()}`.replace(/\?$/, ""), { scroll: false });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search books">
          <Search className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search the BookMook shelves</DialogTitle>
          <DialogDescription>Find books by title, author, or category and jump straight into the catalog.</DialogDescription>
        </DialogHeader>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Input
            value={query}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              if (pathname === "/") {
                applySearch(value);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                applySearch(query);
                setOpen(false);
              }
            }}
            placeholder="Search by title, author, or category"
            className="sm:flex-1"
          />
          <Button
            type="button"
            onClick={() => {
              applySearch(query);
              setOpen(false);
            }}
          >
            Search
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

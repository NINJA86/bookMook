import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BookmookLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BookmookLogo({
  compact = false,
  className,
}: BookmookLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <Image
        src="/brand/bookmook-logo.png"
        alt="BookMook logo"
        width={44}
        height={44}
        className="h-11 w-11 rounded-2xl shadow-lg"
        priority
      />
      {!compact ? (
        <div>
          <p className="font-display text-xl font-semibold tracking-tight text-foreground">
            BookMook
          </p>
          <p className="text-xs text-muted-foreground">
            Curated books for curious minds
          </p>
        </div>
      ) : null}
    </Link>
  );
}

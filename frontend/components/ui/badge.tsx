import { cn } from "@/lib/utils";

export function Badge({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}

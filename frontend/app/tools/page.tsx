import { PriceBundleBuilder } from "@/components/tools/price-bundle-builder";
import { ReadingTimeCalculator } from "@/components/tools/reading-time-calculator";

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-16">
      <div className="space-y-3">
        <p className="text-sm font-medium text-primary">Reader tools</p>
        <h1 className="text-5xl font-semibold tracking-tight">Helpful utilities for thoughtful readers</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          A pair of interactive tools that make the storefront feel more useful than a static catalog.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ReadingTimeCalculator />
        <PriceBundleBuilder />
      </div>
    </div>
  );
}

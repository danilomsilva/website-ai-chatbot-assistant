import Link from "next/link";

import { categories } from "@/lib/catalog";

const categoryLabels: Record<string, string> = {
  laptops: "Laptops",
  desktops: "Desktops",
  monitors: "Monitors",
  desks: "Desks",
  chairs: "Chairs",
  accessories: "Accessories",
};

export default function ProductsPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-wide text-neon-cyan uppercase">
          Shop by category
        </h1>
        <p className="mt-2 text-muted">
          Each category comes in three tiers — Essential, Pro, and Elite —
          so you can compare trade-offs directly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/category/${category}`}
            className="neon-border rounded-lg bg-surface p-6 transition-all"
          >
            <h2 className="text-lg font-medium text-foreground">
              {categoryLabels[category]}
            </h2>
          </Link>
        ))}
      </div>
    </main>
  );
}

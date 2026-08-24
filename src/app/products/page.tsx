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
        <h1 className="text-3xl font-semibold tracking-tight">
          Shop by category
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Each category comes in three tiers — Essential, Pro, and Elite —
          so you can compare trade-offs directly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/category/${category}`}
            className="rounded-lg border border-zinc-200 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
          >
            <h2 className="text-lg font-medium">
              {categoryLabels[category]}
            </h2>
          </Link>
        ))}
      </div>
    </main>
  );
}

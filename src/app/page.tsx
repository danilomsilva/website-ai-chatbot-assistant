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

export default function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16">
      <section className="flex flex-col items-start gap-4">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Engineered setups, not just specs.
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Fractal Pattern designs laptops, desktops, monitors, desks, chairs,
          and accessories built to work together — not just sold together.
        </p>
        <Link
          href="/products"
          className="mt-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Browse products
        </Link>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Shop by category</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="rounded-lg border border-zinc-200 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
            >
              <span className="font-medium">{categoryLabels[category]}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

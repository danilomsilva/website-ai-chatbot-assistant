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
        <h1 className="font-display text-4xl font-bold tracking-tight text-transparent uppercase sm:text-5xl">
          <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text">
            Engineered setups,
          </span>
          <br />
          <span className="bg-gradient-to-r from-neon-magenta to-neon-purple bg-clip-text">
            not just specs.
          </span>
        </h1>
        <p className="max-w-xl text-lg text-muted">
          Fractal Pattern designs laptops, desktops, monitors, desks, chairs,
          and accessories built to work together — not just sold together.
        </p>
        <Link
          href="/products"
          className="neon-button mt-2 rounded-md px-5 py-3 text-sm font-semibold tracking-wide uppercase"
        >
          Browse products
        </Link>
      </section>

      <section>
        <h2 className="font-display mb-4 text-lg font-bold tracking-wide text-neon-cyan uppercase">
          Shop by category
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="neon-border rounded-lg bg-surface p-6 transition-all"
            >
              <span className="font-medium text-foreground">
                {categoryLabels[category]}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

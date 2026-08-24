import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatPrice, formatSpecValue, humanizeSpecKey } from "@/lib/catalog/format";
import { categories, getProductsByCategory } from "@/lib/catalog";
import type { Category } from "@/lib/catalog/types";

const categoryLabels: Record<Category, string> = {
  laptops: "Laptops",
  desktops: "Desktops",
  monitors: "Monitors",
  desks: "Desks",
  chairs: "Chairs",
  accessories: "Accessories",
};

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!categories.includes(category as Category)) {
    notFound();
  }

  const products = getProductsByCategory(category as Category);
  const specKeys = Object.keys(products[0].specs);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {categoryLabels[category as Category]}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Compare the three tiers side by side.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">
            Spec comparison of {categoryLabels[category as Category]} across
            Essential, Pro, and Elite tiers
          </caption>
          <thead>
            <tr>
              <th className="w-40 shrink-0" scope="col" />
              {products.map((product) => (
                <th
                  key={product.id}
                  scope="col"
                  className="w-48 p-3 text-left align-top"
                >
                  <Link href={`/products/${product.slug}`} className="flex flex-col gap-2">
                    <div className="relative aspect-square w-48 overflow-hidden rounded-lg">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="192px"
                        className="object-cover"
                      />
                    </div>
                    <span className="w-fit rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      {product.tier}
                    </span>
                    <span className="font-medium">{product.name}</span>
                    <span className="font-normal text-zinc-600 dark:text-zinc-400">
                      {formatPrice(product.price)}
                    </span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specKeys.map((key) => (
              <tr key={key} className="border-t border-zinc-200 dark:border-zinc-800">
                <th
                  scope="row"
                  className="w-40 shrink-0 p-3 text-left font-normal text-zinc-500 dark:text-zinc-400"
                >
                  {humanizeSpecKey(key)}
                </th>
                {products.map((product) => (
                  <td key={product.id} className="w-48 p-3">
                    {formatSpecValue(
                      (product.specs as unknown as Record<string, unknown>)[
                        key
                      ],
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

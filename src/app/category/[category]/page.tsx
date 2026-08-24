import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatPrice,
  formatSpecValue,
  humanizeSpecKey,
  tierBadgeClasses,
} from "@/lib/catalog/format";
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
        <h1 className="font-display text-3xl font-bold tracking-wide text-neon-cyan uppercase">
          {categoryLabels[category as Category]}
        </h1>
        <p className="mt-2 text-muted">Compare the three tiers side by side.</p>
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
              {products.map((product, index) => (
                <th
                  key={product.id}
                  scope="col"
                  className="w-48 p-3 text-left align-top"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex flex-col gap-2"
                  >
                    <div className="neon-border relative aspect-square w-48 overflow-hidden rounded-lg">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="192px"
                        priority={index === 0}
                        className="object-cover"
                      />
                    </div>
                    <span
                      className={`w-fit rounded-full px-2 py-0.5 text-xs font-medium tracking-wide uppercase ${tierBadgeClasses(product.tier)}`}
                    >
                      {product.tier}
                    </span>
                    <span className="font-medium text-foreground">
                      {product.name}
                    </span>
                    <span className="font-normal text-muted">
                      {formatPrice(product.price)}
                    </span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specKeys.map((key) => (
              <tr key={key} className="border-t border-neon-cyan/20">
                <th
                  scope="row"
                  className="w-40 shrink-0 p-3 text-left font-normal text-muted"
                >
                  {humanizeSpecKey(key)}
                </th>
                {products.map((product) => (
                  <td key={product.id} className="w-48 p-3 text-foreground">
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

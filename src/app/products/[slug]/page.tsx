import Image from "next/image";
import { notFound } from "next/navigation";

import { formatPrice, formatSpecValue, humanizeSpecKey } from "@/lib/catalog/format";
import { allProducts, getProductBySlug } from "@/lib/catalog";

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:aspect-square sm:w-64 sm:shrink-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 16rem, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {product.tier}
          </span>
          <h1 className="text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {product.tagline}
          </p>
          <p className="text-2xl font-medium">{formatPrice(product.price)}</p>
        </div>
      </div>

      <p className="max-w-2xl text-zinc-700 dark:text-zinc-300">
        {product.description}
      </p>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Specs</h2>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-zinc-200 pb-2 dark:border-zinc-800">
              <dt className="text-zinc-500 dark:text-zinc-400">
                {humanizeSpecKey(key)}
              </dt>
              <dd className="font-medium">{formatSpecValue(value)}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}

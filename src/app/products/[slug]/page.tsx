import Image from "next/image";
import { notFound } from "next/navigation";

import {
  formatPrice,
  formatSpecValue,
  humanizeSpecKey,
  tierBadgeClasses,
} from "@/lib/catalog/format";
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
        <div className="neon-border relative aspect-square w-full overflow-hidden rounded-lg sm:w-64 sm:shrink-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 640px) 16rem, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-3">
          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase ${tierBadgeClasses(product.tier)}`}
          >
            {product.tier}
          </span>
          <h1 className="font-display text-3xl font-bold tracking-wide text-foreground uppercase">
            {product.name}
          </h1>
          <p className="text-muted">{product.tagline}</p>
          <p className="neon-text-cyan text-2xl font-semibold">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>

      <p className="max-w-2xl text-foreground/90">{product.description}</p>

      <section>
        <h2 className="font-display mb-4 text-lg font-bold tracking-wide text-neon-magenta uppercase">
          Specs
        </h2>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          {Object.entries(product.specs).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between border-b border-neon-cyan/20 pb-2"
            >
              <dt className="text-muted">{humanizeSpecKey(key)}</dt>
              <dd className="font-medium text-foreground">
                {formatSpecValue(value)}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}

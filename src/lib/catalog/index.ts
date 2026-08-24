import { accessories } from "@/lib/catalog/data/accessories";
import { chairs } from "@/lib/catalog/data/chairs";
import { desks } from "@/lib/catalog/data/desks";
import { desktops } from "@/lib/catalog/data/desktops";
import { laptops } from "@/lib/catalog/data/laptops";
import { monitors } from "@/lib/catalog/data/monitors";
import type { Category, Product } from "@/lib/catalog/types";

export const categories: Category[] = [
  "laptops",
  "desktops",
  "monitors",
  "desks",
  "chairs",
  "accessories",
];

export const allProducts: Product[] = [
  ...laptops,
  ...desktops,
  ...monitors,
  ...desks,
  ...chairs,
  ...accessories,
];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return allProducts.filter((product) => product.category === category);
}

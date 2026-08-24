import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Fractal Pattern
        </Link>
        <nav>
          <Link
            href="/products"
            className="text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
}

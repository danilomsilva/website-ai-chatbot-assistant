import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-neon-cyan/30 bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display neon-text-cyan text-lg font-bold tracking-widest uppercase"
        >
          Fractal Pattern
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/products"
            className="text-sm font-medium tracking-wide text-muted transition-colors hover:text-neon-cyan"
          >
            Products
          </Link>
          <Link
            href="/trust"
            className="text-sm font-medium tracking-wide text-muted transition-colors hover:text-neon-magenta"
          >
            How this works
          </Link>
        </nav>
      </div>
    </header>
  );
}

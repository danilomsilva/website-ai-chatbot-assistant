export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-8 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        Product: {slug} — placeholder
      </h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        Real specs render here once the catalog data and schema exist
        (Phase 2/3).
      </p>
    </main>
  );
}

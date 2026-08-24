import evalResults from "../../../eval/results.json";

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export default function TrustPage() {
  const generatedAt = new Date(evalResults.generatedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          How this works
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          The assistant is built to be provably non-hallucinating, not just
          claimed to be.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">The approach</h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Every product fact the assistant can state — specs, prices,
          features — comes from the same 18-item catalog that powers this
          site&apos;s product pages. The full catalog is given to the model
          as context on every request, so nothing is left out by a search
          step and nothing can be invented that isn&apos;t already in the
          data.
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          The assistant is explicitly instructed to decline anything the
          catalog doesn&apos;t cover — shipping, returns, availability,
          general questions unrelated to Fractal Pattern products — and to
          suggest contacting a person instead of guessing.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Measured results</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Last run: {generatedAt} · {evalResults.totalQuestions} test
          questions
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Citation accuracy
            </p>
            <p className="text-3xl font-semibold">
              {formatPercent(evalResults.citationAccuracy)}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Factual questions answered correctly from catalog data.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Refusal correctness
            </p>
            <p className="text-3xl font-semibold">
              {formatPercent(evalResults.refusalCorrectness)}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Out-of-scope questions correctly declined.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">The test questions</h2>
        {evalResults.results.map((result) => (
          <div
            key={result.id}
            className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {result.type === "grounded"
                  ? "Grounded fact check"
                  : "Out-of-scope refusal check"}
              </span>
              <span
                className={
                  result.passed
                    ? "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300"
                    : "rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/40 dark:text-red-300"
                }
              >
                {result.passed ? "Pass" : "Fail"}
              </span>
            </div>
            <p className="font-medium">{result.question}</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-600 dark:text-zinc-400">
              {result.response}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
